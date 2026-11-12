import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
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

test('catalog parses literal categories without executing code and combines search with filters', () => {
  const node = () => ({
    classList: { add() {} },
    setAttribute() {},
    appendChild() {},
    addEventListener() {},
  });
  const catalog = vm.createContext({
    document: {
      documentElement: { lang: 'es' },
      querySelector: () => null,
      createElement: node,
      body: node(),
    },
    window: {},
  });
  vm.runInContext(fs.readFileSync('public/assets/js/algorithms/acorn.js', 'utf8'), catalog);
  vm.runInContext(fs.readFileSync('public/assets/js/algorithms/catalog.js', 'utf8'), catalog);
  const api = catalog.window.LabCatalog;
  const categories = api.parseCategories(`function __catalog() {
    throw new Error('must not execute');
    return {find: ['search/linear', 'url'], min: ['selection', 'url'], dynamic: [dangerous()]};
  }`);
  assert.equal(categories.find, 'search/linear');
  assert.equal(categories.min, 'selection');
  assert.equal(categories.dynamic, undefined);
  assert.equal(Object.keys(api.parseCategories('function example() {}')).length, 0);
  const items = [
    { name: 'find_if', category: 'search/linear' },
    { name: 'lower_bound', category: 'search/binary' },
    { name: 'min', category: 'selection' },
  ];
  assert.deepEqual(
    Array.from(api.filter(items, 'FIND IF', ''), (x) => x.name),
    ['find_if'],
  );
  assert.deepEqual(
    Array.from(api.filter(items, 'busqueda', 'search/binary'), (x) => x.name),
    ['lower_bound'],
  );
  assert.equal(api.filter(items, 'find', 'selection').length, 0);
});

test('lab uses a dialog picker and standalone catalog shares its implementation', () => {
  for (const route of ['algorithms', 'algoritmos']) {
    const $ = cheerio.load(fs.readFileSync(`dist/${route}/index.html`, 'utf8'));
    assert.equal($('#exampleSelect').get(0).tagName, 'button');
    assert.equal($('#exampleSelect').attr('aria-haspopup'), 'dialog');
    assert.equal($('select').length, 0);
    assert.equal(
      $('script[src]').filter((_, el) =>
        /^\/assets\/js\/algorithms\/catalog\.[a-f0-9]{12}\.js$/.test($(el).attr('src')),
      ).length,
      1,
    );
  }
  const $ = cheerio.load(fs.readFileSync('dist/algorithms-catalog/index.html', 'utf8'));
  assert.equal($('[data-catalog-page]').length, 1);
  assert.equal(
    $('script[src]').filter((_, el) =>
      /^\/assets\/js\/algorithms\/catalog\.[a-f0-9]{12}\.js$/.test($(el).attr('src')),
    ).length,
    1,
  );
  assert.equal($('script:not([src])').length, 0);
});

test('lab pages reference matching content-addressed assets instead of cached legacy URLs', () => {
  for (const route of ['algorithms', 'algoritmos', 'algorithms-catalog']) {
    const $ = cheerio.load(fs.readFileSync(`dist/${route}/index.html`, 'utf8'));
    for (const el of $('script[src],link[rel=stylesheet],link[rel=icon]').toArray()) {
      const url = $(el).attr('src') || $(el).attr('href');
      const match = url.match(/\.([a-f0-9]{12})\.(js|css|svg)$/);
      assert.ok(match, `${route}: unversioned asset ${url}`);
      const content = fs.readFileSync('dist' + url);
      assert.equal(createHash('sha256').update(content).digest('hex').slice(0, 12), match[1]);
      const original = url.replace(/\.[a-f0-9]{12}(?=\.(js|css|svg)$)/, '');
      assert.deepEqual(content, fs.readFileSync('public' + original));
    }
  }
});

test('lab and catalog share tao-js defaults and preserve alternate external repositories', async () => {
  for (const [search, owner, repo] of [
    ['', 'fpelliccioni', 'tao-js'],
    ['?repo=algorithm_course', 'fpelliccioni', 'algorithm_course'],
    ['?user=other&repo=custom', 'other', 'custom'],
  ]) {
    const requested = [];
    const context = vm.createContext({
      window: {},
      location: { search },
      URLSearchParams,
      AbortController,
      setTimeout,
      clearTimeout,
      fetch: async (url) => {
        requested.push(url);
        return { ok: true, text: async () => 'function find() {}' };
      },
    });
    vm.runInContext(fs.readFileSync('public/assets/js/algorithms/acorn.js', 'utf8'), context);
    vm.runInContext(fs.readFileSync('public/assets/js/algorithms/library.js', 'utf8'), context);
    const library = context.window.LabLibrary;
    assert.equal(library.user, owner);
    assert.equal(library.repo, repo);
    await library.load('algorithms.js');
    assert.equal(
      requested[0],
      `https://raw.githubusercontent.com/${owner}/${repo}/master/build/algorithms.js`,
    );
    assert.deepEqual(
      Array.from(
        library.examples(
          'function find() {} function copy() {}',
          'function __find_usage() {} function __copy_usage() {} function __missing_usage() {}',
        ),
      ),
      ['copy', 'find'],
    );
  }
});
