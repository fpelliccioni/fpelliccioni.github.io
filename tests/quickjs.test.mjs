import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

test('QuickJS pauses on modern JavaScript and uses the existing sequence and iterator bridge', async () => {
  const panels = new Map();
  const document = {
    getElementById(id) {
      if (!panels.has(id)) panels.set(id, { innerHTML: '', value: '', appendChild() {} });
      return panels.get(id);
    },
    createTextNode: String,
    createElement: () => ({ dataset: {}, style: {}, appendChild() {} }),
  };
  const context = vm.createContext({ document, console: { log() {} } });
  const read = (name) => fs.readFileSync(name, 'utf8');
  vm.runInContext(read('public/assets/js/algorithms/main.js'), context);
  vm.runInContext(read('public/assets/js/algorithms/lab.js').split('\nvar params =')[0], context);
  context.two = { update() {} };
  context.resetStatus();
  const quick = Function(read('dist/assets/js/algorithms/quickjs.js') + '\nreturn LabQuickJS;')();
  context.LabQuickJS = quick;
  const prefix = context.invisibleCode() + '\nfunction match() { return false; }\n';
  const code = `const data = sequence([3, 7, 9], "data");
let first = begin(data);
const last = end(data);
const match = predicate(x => x === ({}?.target ?? 7));
while (!equal(first, last) && !match(source(first))) first = successor(first);
const answer = source(first);
print(answer);`;
  const session = await quick.createSession(prefix + code, prefix.length, (adapter) => {
    context.myInterpreter = adapter;
    context.initFunctions(adapter);
  });
  const events = [];
  try {
    for (let i = 0; i < 40; i++) {
      const event = await session.next();
      assert.ifError(event.error);
      if (event.done) break;
      events.push(event);
    }
    assert.ok(events.some((event) => event.scope.properties.answer === 7));
    assert.ok(events.every((event) => event.point.start >= prefix.length));
    assert.equal(events[0].point.start, prefix.length);
    assert.match(code.slice(0, events[0].point.end - prefix.length), /^const data =/);
    assert.equal(context.stats_it_moves, 1);
    assert.equal(context.stats_pred_appls, 2);
    assert.match(panels.get('hg-right-b-b-data')?.value ?? '', /match\(/);
  } finally {
    await session.close();
  }
});

test('closing a paused QuickJS session leaves later statements unexecuted', async () => {
  const quick = Function(
    fs.readFileSync('dist/assets/js/algorithms/quickjs.js', 'utf8') + '\nreturn LabQuickJS;',
  )();
  const calls = [];
  const session = await quick.createSession('while (true) { print(42); }', 0, (adapter) => {
    adapter.setProperty(null, 'print', (value) => calls.push(value));
  });
  assert.equal((await session.next()).point.type, 'WhileStatement');
  await session.close();
  assert.deepEqual(calls, []);
  assert.equal((await session.next()).done, true);
});

test('the visualizer can evaluate a guest predicate without counting a user operation', async () => {
  const quick = Function(
    fs.readFileSync('dist/assets/js/algorithms/quickjs.js', 'utf8') + '\nreturn LabQuickJS;',
  )();
  const colors = [];
  const session = await quick.createSession(
    'const compare = x => x > 2; const marker = 3;',
    0,
    () => {},
    (scope) => {
      if (scope.properties.compare) colors.push(scope.properties.compare.call(3));
    },
  );
  try {
    while (!(await session.next()).done) {}
    assert.deepEqual(colors, [true]);
  } finally {
    await session.close();
  }
});

test('TypeScript keeps checkpoints on the typed editor source', async () => {
  const quick = Function(
    fs.readFileSync('dist/assets/js/algorithms/quickjs.js', 'utf8') + '\nreturn LabQuickJS;',
  )();
  const source = [
    'type Predicate<T> = (value: T) => boolean;',
    'function testIt<T>(value: T, predicate: Predicate<T>): boolean {',
    '  const result: boolean = predicate(value);',
    '  return result;',
    '}',
    'const result: boolean = testIt<number>(2, x => x === 2);',
    'print(result);',
  ].join('\n');
  const prefix = 'function identity(value) { return value; }\n';
  const output = [];
  const session = await quick.createSession(
    prefix + source,
    prefix.length,
    (adapter) => adapter.setProperty(null, 'print', (value) => output.push(value)),
    undefined,
    'typescript',
  );
  const highlighted = [];
  try {
    let done = false;
    for (let i = 0; i < 20; i++) {
      const event = await session.next();
      assert.ifError(event.error);
      if (event.done) {
        done = true;
        break;
      }
      highlighted.push(
        source.slice(event.point.start - prefix.length, event.point.end - prefix.length),
      );
    }
    assert.ok(done);
    assert.deepEqual(output, [true]);
    assert.ok(highlighted.includes('const result: boolean = predicate(value);'));
    assert.ok(highlighted.includes('const result: boolean = testIt<number>(2, x => x === 2);'));
    assert.ok(highlighted.every((source) => !source.startsWith('type Predicate')));
  } finally {
    await session.close();
  }
});

test('contracts can read sequences without changing metrics, trace, output, or checkpoints', async () => {
  const panels = new Map();
  const document = {
    getElementById(id) {
      if (!panels.has(id)) panels.set(id, { innerHTML: '', value: '', appendChild() {} });
      return panels.get(id);
    },
    createTextNode: String,
    createElement: () => ({ dataset: {}, style: {}, appendChild() {} }),
  };
  const context = vm.createContext({ document, console: { log() {} } });
  const read = (path) => fs.readFileSync(path, 'utf8');
  vm.runInContext(read('public/assets/js/algorithms/main.js'), context);
  vm.runInContext(read('public/assets/js/algorithms/lab.js').split('\nvar params =')[0], context);
  context.two = { update() {} };
  const quick = Function(read('dist/assets/js/algorithms/quickjs.js') + '\nreturn LabQuickJS;')();
  context.LabQuickJS = quick;

  async function run(check) {
    panels.clear();
    context.resetStatus();
    const prefix = context.invisibleCode();
    const source = `
      const data = sequence([1, 2], "data");
      const first = begin(data);
      const match = predicate(x => x === 2);
      ${check}
      print(match(source(successor(first))));
    `;
    const output = [];
    const session = await quick.createSession(prefix + source, prefix.length, (adapter) => {
      context.myInterpreter = adapter;
      context.initFunctions(adapter);
      adapter.setProperty(null, 'print', value => output.push(value));
    });
    try {
      let steps = 0;
      for (;;) {
        const event = await session.next();
        if (event.done) {
          return {
            error: event.error?.message,
            errorName: event.error?.name,
            output,
            steps,
            trace: panels.get('hg-right-b-b-data')?.value ?? '',
            moves: context.stats_it_moves,
            comparisons: context.stats_it_cmps,
            predicates: context.stats_pred_appls,
          };
        }
        steps++;
      }
    } finally {
      await session.close();
    }
  }
  const baseline = await run('');
  const checked = await run(`
    pre(() => {
      print("silent");
      return match(source(successor(first))) && !equal(first, end(data));
    });
    post(() => match(source(successor(first))));
  `);
  assert.deepEqual(checked, { ...baseline, steps: baseline.steps + 2 });
  assert.deepEqual(checked.output, [true]);
  const failed = await run('pre(() => false, "partition");');
  assert.equal(failed.errorName, 'LabContractError');
  assert.match(failed.error, /Precondition failed: partition/);
  assert.deepEqual(failed.output, []);
  const restored = await run('try { post(() => { throw Error("check failed"); }); } catch {}');
  assert.deepEqual(restored, { ...baseline, steps: baseline.steps + 2 });
});

test('sequence infers its name from the editor binding and keeps explicit names', async () => {
  const quick = Function(
    fs.readFileSync('dist/assets/js/algorithms/quickjs.js', 'utf8') + '\nreturn LabQuickJS;',
  )();
  const prefix = 'function sequence(data, name) { return capture(name); }\n';
  const source = `
    const d = sequence<number>([11, 22]);
    const values = sequence([49], "custom");
    {
      const sequence = (data: number[], name?: string) => capture(name ?? "local");
      const other = sequence([58]);
    }
  `;
  const names = [];
  const session = await quick.createSession(prefix + source, prefix.length, (adapter) => {
    adapter.setProperty(null, 'capture', (name) => names.push(name));
  }, undefined, 'typescript');
  try {
    for (;;) {
      const event = await session.next();
      assert.ifError(event.error);
      if (event.done) break;
    }
    assert.deepEqual(names, ['d', 'custom', 'local']);
  } finally {
    await session.close();
  }
});
