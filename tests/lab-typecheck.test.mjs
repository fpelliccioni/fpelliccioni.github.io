import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

test('the lab type checker rejects a stream before executing a forward-only algorithm', () => {
  let response;
  const self = { postMessage(value) { response = value; } };
  vm.runInNewContext(fs.readFileSync('dist/assets/js/algorithms/typecheck-worker.js', 'utf8'), { self });
  const declarations = `
    type Iter<K> = { readonly category: K };
    type ForwardIterator = Iter<"array" | "sll" | "dll">;
    declare function begin<K>(kind: K): Iter<K>;
    declare function lower_bound_n<I extends ForwardIterator>(first: I): I;
  `;

  const check = source => {
    self.onmessage({ data: { source, declarations } });
    assert.equal(response.error, undefined);
    return Array.from(response.diagnostics);
  };

  assert.deepEqual(check('const i = lower_bound_n(begin("array"));'), []);
  assert.deepEqual(check('const i = lower_bound_n(begin("sll"));'), []);
  const source = 'const first = begin("stream");\nconst i = lower_bound_n(first);';
  const diagnostics = check(source);
  assert.equal(diagnostics.length, 1);
  assert.equal(diagnostics[0].code, 2345);
  assert.equal(diagnostics[0].line, 2);
  assert.equal(source.slice(diagnostics[0].start, diagnostics[0].start + diagnostics[0].length), 'first');
  assert.match(diagnostics[0].message, /ForwardIterator/);
});
