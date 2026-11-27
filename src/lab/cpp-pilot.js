import source from './cpp/find_if.cpp';
import binary from './cpp/find_if.wasm';

export { source };

export function supported() {
  return typeof WebAssembly.Suspending === 'function' && typeof WebAssembly.promising === 'function';
}

export async function createSession(initialize, draw, indexLabel) {
  const scope = { properties: Object.create(null) };
  const { properties } = scope;
  const operations = Object.create(null);
  initialize({
    getScope: () => scope,
    createNativeFunction: (fn) => fn,
    setProperty: (_scope, name, fn) => { operations[name] = fn; },
  });

  let offset = 0;
  const points = source.split('\n').map((line) => {
    const command = line.indexOf('lab::step(); ');
    const start = offset + (command >= 0 ? command + 'lab::step(); '.length : line.search(/\S|$/));
    offset += line.length + 1;
    return { start, end: offset - 1 };
  });

  let publish;
  let pause;
  let running;
  let done = false;
  let closed = false;
  const imports = {
    checkpoint: new WebAssembly.Suspending((line) => {
      draw(scope);
      return new Promise((resolve, reject) => {
        pause = { resolve, reject };
        publish({ point: points[line - 1], scope });
      });
    }),
    sequence(pointer, size) {
      const values = new Int32Array(instance.exports.memory.buffer, pointer, size);
      properties.data = operations.sequence_internal(
        { properties: { ...values, length: size } }, 'data', undefined, 'array', false, false,
      );
      properties.first = operations.begin(properties.data, 'first');
      properties.last = operations.end(properties.data, 'last');
    },
    compare() { operations.equal(properties.first, properties.last); },
    read() { operations.source(properties.first); },
    advance() { properties.first = operations.successor(properties.first); },
    predicate(value, result) { operations.log_predicate_call_internal('even', value, Boolean(result)); },
    output(index) { operations.print(indexLabel + index); },
  };
  const { instance } = await WebAssembly.instantiate(binary, { env: imports });
  const run = WebAssembly.promising(instance.exports.run);

  async function execute() {
    let error;
    try {
      await run();
    } catch (cause) {
      if (!closed) error = cause;
    } finally {
      done = true;
      pause = undefined;
      publish({ done, error });
    }
  }

  return {
    next() {
      if (done || closed) return Promise.resolve({ done: true });
      const event = new Promise((resolve) => { publish = resolve; });
      if (!running) running = execute();
      else pause.resolve();
      return event;
    },
    async close() {
      closed = true;
      pause?.reject(new Error('Session closed'));
      await running;
    },
  };
}
