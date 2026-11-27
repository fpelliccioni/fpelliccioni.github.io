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
  const prefix = context.invisibleCode();
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
    assert.equal(context.stats_it_moves, 1);
    assert.equal(context.stats_pred_appls, 2);
    assert.match(panels.get('hg-right-b-b-data').value, /match\(/);
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
