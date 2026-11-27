import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

test('the C++ pilot suspends before reads and advances and cancels a paused run', async () => {
  const { source, createSession } = Function(
    fs.readFileSync('dist/assets/js/algorithms/cpp-pilot.js', 'utf8') + '\nreturn LabCppPilot;',
  )();
  const trace = [];
  const operations = {
    sequence_internal(data) { return data.properties; },
    begin() { return 0; },
    end(data) { return data.length; },
    equal(a, b) { trace.push(['compare', a, b]); },
    source(index) { trace.push(['read', index]); },
    successor(index) { trace.push(['advance', index]); return index + 1; },
    log_predicate_call_internal(...args) { trace.push(args); },
    print(value) { trace.push(['print', value]); },
  };
  const open = () => createSession(
    (adapter) => {
      for (const [name, operation] of Object.entries(operations)) {
        adapter.setProperty(null, name, operation);
      }
    },
    () => {},
    'Index: ',
  );

  const canceled = await open();
  await canceled.next();
  await canceled.close();
  assert.deepEqual(await canceled.next(), { done: true });
  assert.deepEqual(trace, []);

  const session = await open();
  try {
    await session.next();
    await session.next();
    const condition = await session.next();
    assert.match(source.slice(condition.point.start, condition.point.end), /^while /);
    assert.deepEqual(trace, []);

    const advance = await session.next();
    assert.equal(source.slice(advance.point.start, advance.point.end), '++first;');
    assert.deepEqual(trace, [['compare', 0, 5], ['read', 0], ['even', 1, false]]);
    assert.equal(advance.scope.properties.first, 0);

    const nextCondition = await session.next();
    assert.equal(nextCondition.scope.properties.first, 1);
    assert.deepEqual(trace.at(-1), ['advance', 0]);

    for (;;) {
      const event = await session.next();
      assert.ifError(event.error);
      if (event.done) break;
    }
    assert.deepEqual(trace.slice(4), [
      ['compare', 1, 5], ['read', 1], ['even', 3, false], ['advance', 1],
      ['compare', 2, 5], ['read', 2], ['even', 8, true], ['print', 'Index: 2'],
    ]);
  } finally {
    await session.close();
  }
});
