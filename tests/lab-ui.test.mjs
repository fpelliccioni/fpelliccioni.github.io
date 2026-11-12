import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as cheerio from 'cheerio';

const engine = vm.createContext({ console });
vm.runInContext(fs.readFileSync('public/assets/js/algorithms/main.js', 'utf8'), engine);

test('source markup and comparison operators remain literal when highlighted', () => {
  for (const source of [
    'return a < b && b > 0;',
    'print("<b>literal</b> & data");',
    'var text = "<script>not markup</script>";',
  ]) {
    const $ = cheerio.load('<code>' + engine.escapeCodeHtml(source) + '</code>');
    assert.equal($('code').text(), source);
    assert.equal($('code').children().length, 0);
  }
});

test('parse errors refer to the user code rather than the hidden library prelude', () => {
  const error = { message: 'Unexpected token (4:8)' };
  assert.equal(
    engine.formatSourceParseError({ message: 'Unexpected token (2:17)' }, '// library\n    '),
    'Unexpected token (1:13)',
  );
  assert.equal(
    engine.formatSourceParseError(error, '// library\n// helpers\n'),
    'Unexpected token (2:8)',
  );
  assert.equal(
    engine.formatSourceParseError(
      { message: 'Unexpected token (1:1)' },
      '// library\n// helpers\n',
    ),
    'Unexpected token (1:1)',
  );
  assert.equal(
    engine.formatSourceParseError({ message: 'Unexpected end of input' }, '// library\n'),
    'Unexpected end of input',
  );
});

test('both localized lab pages retain the engine DOM contract and accessible controls', () => {
  const ids = [
    'codeArea',
    'codeHighlight',
    'codeHighlightPre',
    'hg-left',
    'startButton',
    'stepButton',
    'restartButton',
    'editButton',
    'hg-right-a',
    'sequence',
    'hg-right-pre-a',
    'hg-right-x-a',
    'hg-right-x-b',
    'hg-right-y',
    'hg-right-b-b-data',
  ];
  for (const [route, lang] of [
    ['algorithms', 'en'],
    ['algoritmos', 'es'],
  ]) {
    const $ = cheerio.load(fs.readFileSync(`dist/${route}/index.html`, 'utf8'));
    assert.equal($('html').attr('lang'), lang);
    assert.equal($('meta[name=viewport]').length, 1);
    assert.equal(
      $('link[rel=canonical]').attr('href'),
      `https://componentsprogramming.com/${route}/`,
    );
    for (const id of ids) assert.equal($(`[id="${id}"]`).length, 1, `${route}: ${id}`);
    assert.ok($('#codeArea').attr('aria-label'));
    assert.ok($('#hg-right-b-b-data').attr('aria-label'));
    assert.equal($('[onclick]').length, 0);
    assert.ok($('#loadError').attr('role') === 'alert');
    for (const asset of $('script[src],link[rel=stylesheet]').toArray()) {
      const url = $(asset).attr('src') || $(asset).attr('href');
      assert.ok(fs.existsSync('dist' + url), `${route}: ${url}`);
    }
  }
});

test('scalar cells align with sequence cells and iterator centers across canvas scales', () => {
  const renderer = vm.createContext({ console });
  vm.runInContext(fs.readFileSync('public/assets/js/algorithms/test.js', 'utf8'), renderer);
  const two = {
    makeText: (text, x, y) => ({ text, x, y }),
    makeRectangle: (x, y, width, height) => ({ translation: { _x: x, _y: y }, width, height }),
    makeGroup: (...children) => ({ children }),
    update() {},
  };
  for (const [width, height] of [
    [960, 400],
    [1654, 569],
    [2200, 900],
  ]) {
    renderer.two_width = width;
    renderer.two_height = height;
    renderer.setSizes();
    const sequence = renderer.drawArray(two, null, 's', 0, ['H']);
    const scalar = renderer.drawArrayNamedElementSimple(
      two,
      renderer.defaultLeftMargin,
      150,
      'x',
      'x',
    );
    assert.equal(scalar.rect.translation._x, sequence[0].rect.translation._x);
    assert.equal(scalar.rect.width, sequence[0].rect.width);
    assert.equal(
      renderer.drawArrayNamedElementFinish(renderer.defaultLeftMargin, 'x', 'x'),
      scalar.x_finish,
    );
  }
});
