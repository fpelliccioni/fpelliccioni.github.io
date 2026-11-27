import { transform } from '@babel/standalone';
import { newQuickJSAsyncWASMModule, newVariant, RELEASE_ASYNC } from 'quickjs-emscripten';
import wasm from '@jitl/quickjs-wasmfile-release-asyncify/wasm';

class GuestObject {
  constructor(properties = Object.create(null)) {
    this.properties = properties;
  }
}

function visibleBindings(path, offset) {
  return Object.entries(path.scope.getAllBindings())
    .filter(([, binding]) => binding.identifier.start >= offset)
    .map(([name]) => name);
}

function instrument(source, offset) {
  const points = [];
  const { code } = transform(source, {
    sourceType: 'script',
    plugins: [
      ({ types: t }) => ({
        visitor: {
          VariableDeclarator(path) {
            const { id, init, start } = path.node;
            if (
              start < offset ||
              !t.isIdentifier(id) ||
              !t.isCallExpression(init) ||
              !t.isIdentifier(init.callee, { name: 'predicate' }) ||
              !t.isArrowFunctionExpression(init.arguments[0])
            )
              return;
            const binding = path.scope.getBinding('predicate');
            if (binding && binding.identifier.start >= offset) return;

            // A computed property gives the arrow the same inferred name as
            // a direct initializer, without changing its lexical bindings.
            const label = t.stringLiteral(id.name);
            init.arguments[0] = t.memberExpression(
              t.objectExpression([t.objectProperty(label, init.arguments[0], true)]),
              t.stringLiteral(id.name),
              true,
            );
          },
          Statement: {
            exit(path) {
              const node = path.node;
              if (
                node.start == null ||
                node.start < offset ||
                path.isBlockStatement() ||
                path.isFunctionDeclaration() ||
                path.parentPath.isLabeledStatement()
              )
                return;
              const names = visibleBindings(path, offset);
              const entries = names.map((name) =>
                t.arrayExpression([
                  t.stringLiteral(name),
                  t.arrowFunctionExpression([], t.identifier(name)),
                ]),
              );
              const id = points.push(node) - 1;
              const hook = t.expressionStatement(
                t.callExpression(t.identifier('__labCheckpoint'), [
                  t.numericLiteral(id),
                  t.arrayExpression(entries),
                ]),
              );
              if (path.inList) path.insertBefore(hook);
              else if (
                path.key === 'body' ||
                path.key === 'consequent' ||
                path.key === 'alternate'
              ) {
                path.replaceWith(t.blockStatement([hook, node]));
                path.skip();
              }
            },
          },
          Loop(path) {
            // Checkpoint each iteration, including empty loop bodies.
            const { body, start } = path.node;
            if (start < offset) return;
            const point = { start, end: body.start, type: path.node.type };
            const id = points.push(point) - 1;
            const entries = visibleBindings(path, offset).map((name) =>
              t.arrayExpression([
                t.stringLiteral(name),
                t.arrowFunctionExpression([], t.identifier(name)),
              ]),
            );
            const hook = t.expressionStatement(
              t.callExpression(t.identifier('__labCheckpoint'), [
                t.numericLiteral(id),
                t.arrayExpression(entries),
              ]),
            );
            if (t.isBlockStatement(body)) body.body.unshift(hook);
            else path.node.body = t.blockStatement([hook, body]);
          },
        },
      }),
    ],
  });
  return { code, points };
}

export async function createSession(source, offset, initialize, draw) {
  let program;
  try {
    program = instrument(source, offset);
  } catch (error) {
    if (Number.isInteger(error.pos) && error.pos >= offset) {
      const lines = source.slice(offset, error.pos).split('\n');
      const message = error.reasonCode
        ? error.message.split('): ').at(-1).split('\n')[0]
        : error.message;
      throw new SyntaxError(
        message.replace(/ \(\d+:\d+\)$/, '') +
          ' (' +
          lines.length +
          ':' +
          (lines.at(-1).length + 1) +
          ')',
      );
    }
    throw error;
  }
  const { code, points } = program;
  const module = await newQuickJSAsyncWASMModule(
    newVariant(RELEASE_ASYNC, {
      wasmBinary: wasm.buffer,
      wasmLocation: 'embedded-quickjs.wasm',
    }),
  );
  const vm = module.newContext();
  const runtime = vm.runtime;
  runtime.setMemoryLimit(32 * 1024 * 1024);
  runtime.setMaxStackSize(512 * 1024);
  let deadline;
  let canceled = false;
  let resume;
  let result;
  let publish;
  let scope = { properties: Object.create(null) };
  const hostObjects = [];
  const guestFunctions = [];
  let rendering = false;
  runtime.setInterruptHandler(() => canceled || performance.now() > deadline);

  function read(handle, depth = 0) {
    const type = vm.typeof(handle);
    if (type === 'function') {
      const name = vm.getProp(handle, 'name').consume((h) => vm.getString(h));
      const length = vm.getProp(handle, 'length').consume((h) => vm.getNumber(h));
      const existing = guestFunctions.find(([guest]) => vm.eq(handle, guest));
      if (existing) return existing[1];
      const obj = new GuestObject();
      const retained = handle.dup();
      guestFunctions.push([retained, obj]);
      obj.call = (...args) => {
        if (!rendering) return undefined;
        const handles = args.map(write);
        try {
          const target = vm.getProp(retained, 'inner_function');
          try {
            const fn = vm.typeof(target) === 'function' ? target : retained;
            return vm
              .unwrapResult(vm.callFunction(fn, vm.undefined, handles))
              .consume((h) => read(h));
          } finally {
            target.dispose();
          }
        } catch {
          return undefined;
        } finally {
          handles.forEach((h) => h.dispose());
        }
      };
      obj.node = { id: name ? { name } : null, params: { length }, start: 0, end: 0 };
      for (const key of ['inner_code', 'inner_name', 'type', 'inner_parameters']) {
        obj.properties[key] = vm.getProp(handle, key).consume((h) => vm.dump(h));
      }
      return obj;
    }
    if (type !== 'object' || vm.eq(handle, vm.null)) return vm.dump(handle);
    for (const [guest, host] of hostObjects) if (vm.eq(handle, guest)) return host;
    const properties = Object.create(null);
    if (depth < 4) {
      const length = vm.getProp(handle, 'length').consume((h) => vm.getNumber(h));
      if (Number.isInteger(length) && length >= 0 && length <= 10000) {
        properties.length = length;
        for (let i = 0; i < length; i++) {
          properties[i] = vm.getProp(handle, i).consume((h) => read(h, depth + 1));
        }
      }
    }
    return new GuestObject(properties);
  }

  function write(value) {
    if (value === undefined) return vm.undefined;
    if (value === null) return vm.null;
    if (typeof value === 'boolean') return value ? vm.true : vm.false;
    if (typeof value === 'string') return vm.newString(value);
    if (typeof value === 'number') return vm.newNumber(value);
    if (typeof value === 'bigint') return vm.newBigInt(value);
    const match = hostObjects.find(([, host]) => host === value);
    if (match) return match[0].dup();
    const handle = Array.isArray(value) ? vm.newArray() : vm.newObject();
    hostObjects.push([handle.dup(), value]);
    if (Array.isArray(value)) {
      value.forEach((item, i) => write(item).consume((h) => vm.setProp(handle, i, h)));
    }
    return handle;
  }

  function expose(name, handle) {
    handle.consume((h) => vm.setProp(vm.global, name, h));
  }
  const adapter = {
    getScope: () => scope,
    createNativeFunction: (fn) => fn,
    setProperty(_scope, name, fn) {
      expose(
        name,
        vm.newFunction(name, (...args) => {
          if (rendering || canceled) return vm.undefined;
          return write(fn(...args.map((h) => read(h))));
        }),
      );
    },
  };
  function signal(event) {
    result = event;
    publish?.(event);
    publish = undefined;
  }
  expose(
    '__labPause',
    vm.newAsyncifiedFunction('__labPause', (id, names, values) => {
      if (rendering || canceled) return vm.undefined;
      const keys = vm.dump(names);
      const properties = Object.create(null);
      keys.forEach((name, index) => {
        properties[name] = vm.getProp(values, index).consume((h) => read(h));
      });
      scope = { properties };
      const point = points[vm.getNumber(id)];
      if (!point) return vm.undefined;
      rendering = true;
      try {
        draw?.(scope);
      } finally {
        rendering = false;
      }
      return new Promise((resolve) => {
        resume = () => resolve(vm.undefined);
        signal({ point, scope });
      });
    }),
  );
  try {
    initialize(adapter);
  } catch (error) {
    vm.dispose();
    throw error;
  }
  let running;
  const run = async () => {
    let error;
    try {
      const prelude =
        'const __labCheckpoint = ((pause) => (id, bindings) => {const keys = []; const values = []; for (const [key, read] of bindings) {try {const value = read(); keys.push(key); values.push(value);} catch {}} pause(id, keys, values);})(__labPause);\n';
      vm.unwrapResult(await vm.evalCodeAsync(prelude + code, 'algorithm.js')).dispose();
      if (runtime.hasPendingJob()) {
        throw new Error('Asynchronous jobs are not supported in step-by-step mode.');
      }
    } catch (failure) {
      error = failure;
    } finally {
      for (const [handle] of [...hostObjects, ...guestFunctions]) handle.dispose();
      vm.dispose();
      signal({ done: true, error });
    }
  };
  return {
    async next() {
      if (result?.done) return result;
      deadline = performance.now() + 2000;
      const event = new Promise((resolve) => {
        publish = resolve;
      });
      if (!running) running = run();
      else resume();
      return event;
    },
    async close() {
      if (result?.done) return;
      if (!running) {
        for (const [handle] of [...hostObjects, ...guestFunctions]) handle.dispose();
        vm.dispose();
        result = { done: true };
        return;
      }
      if (!result?.done) {
        canceled = true;
        resume?.();
      }
      await running;
    },
  };
}
export { GuestObject };
