import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import * as cheerio from 'cheerio';
import { XMLValidator, XMLParser } from 'fast-xml-parser';
import { parse as parseYAML } from 'yaml';
const routes = JSON.parse(fs.readFileSync('tests/fixtures/legacy-routes.json'));
const baseline = JSON.parse(fs.readFileSync('tests/fixtures/legacy-content.json'));
const published = routes.filter((r) => r.published);
const site = 'https://componentsprogramming.com';
const output = (url) => path.join('dist', url.endsWith('/') ? `${url}index.html` : url);
const html = (url) => fs.readFileSync(output(url), 'utf8');
const hash = (s) => createHash('sha256').update(s.replace(/\r/g, '').trim()).digest('hex');
const sources = fs.globSync('src/content/blog/**/*.md').map((source) => ({
  route: { source },
  meta: parseYAML(fs.readFileSync(source, 'utf8').split('---')[1]),
}));
const currentPublic = sources.filter(
  (s) => s.meta.published !== false && Date.parse(s.meta.date) <= Date.now(),
);

test('all 54 published legacy routes exist; all nine drafts remain excluded', () => {
  assert.equal(published.length, 54);
  for (const r of published) assert.ok(fs.existsSync(output(r.url)), r.url);
  const visible = new Set(published.map((r) => r.url));
  for (const r of routes.filter((r) => !r.published)) {
    assert.equal(sources.find((s) => s.route.source === r.source).meta.published, false, r.source);
    if (!visible.has(r.url)) assert.ok(!fs.existsSync(output(r.url)), r.url);
  }
});
test('47 blog documents have canonical URLs, localized metadata and working translations', () => {
  for (const r of published.filter((r) => r.kind !== 'analyzer')) {
    const raw = html(r.url),
      $ = cheerio.load(raw);
    assert.equal($('html').attr('lang'), r.lang, r.url);
    assert.ok($('meta[name=description]').attr('content')?.trim(), r.url);
    assert.equal($('link[rel=canonical]').attr('href'), site + r.url, r.url);
    assert.equal($('h1').length, 1, `single h1: ${r.url}`);
    assert.ok(!raw.includes('{%') && !raw.includes('{{ site.'), `unconverted Liquid: ${r.url}`);
    for (const tag of ['html', 'head', 'body'])
      assert.equal((raw.match(new RegExp(`<${tag}(?:\\s|>)`, 'g')) || []).length, 1, r.url);
    for (const el of $('link[hreflang]').toArray()) {
      const target = $(el).attr('href');
      const other = cheerio.load(html(new URL(target).pathname));
      assert.ok(
        other(`link[hreflang="${r.lang}"][href="${site + r.url}"]`).length,
        `reciprocal: ${r.url}`,
      );
    }
    for (const el of $('script[src],link[rel=stylesheet]').toArray()) {
      const resource = $(el).attr('src') || $(el).attr('href');
      assert.ok(!resource.startsWith('http:') && !resource.startsWith('//'), resource);
      if (resource.startsWith('/')) assert.ok(fs.existsSync(output(resource)), resource);
    }
  }
});
test('source code, article images and old fragment links survive Markdown conversion', () => {
  const issues = [];
  for (const [url, old] of Object.entries(baseline)) {
    const $ = cheerio.load(html(url));
    const body = $('.prose');
    const codes = body
      .find('pre')
      .toArray()
      .map((el) => hash($(el).text()));
    if (JSON.stringify(codes) !== JSON.stringify(old.codeBlocks))
      issues.push(`code blocks: ${url} (${old.codeBlocks.length} → ${codes.length})`);
    for (const img of old.images)
      if (
        !body
          .find('img')
          .toArray()
          .some((el) => $(el).attr('src') === img)
      )
        issues.push(`image: ${url}: ${img}`);
    const anchors = new Set(
      body
        .find('[id],a[name]')
        .toArray()
        .flatMap((el) => [$(el).attr('id'), $(el).attr('name')])
        .filter(Boolean),
    );
    for (const anchor of old.anchors)
      if (!anchors.has(anchor)) issues.push(`anchor: ${url}#${anchor}`);
  }
  assert.deepEqual(issues, []);
});
test('the five reference pages remain unchanged during the lab UI refresh', () => {
  for (const r of published.filter(
    (r) => r.kind === 'analyzer' && !['/algorithms/', '/algoritmos/'].includes(r.url),
  ))
    assert.equal(
      createHash('sha256')
        .update(fs.readFileSync(output(r.url)))
        .digest('hex'),
      r.sha256,
      r.url,
    );
});
test('sitemap includes both languages and all institutional and analyzer pages', () => {
  const xml = fs.readFileSync('dist/sitemap.xml', 'utf8');
  assert.equal(XMLValidator.validate(xml), true);
  const parsed = new XMLParser().parse(xml);
  assert.deepEqual(
    parsed.urlset.url.map((r) => new URL(r.loc).pathname).sort(),
    [
      ...currentPublic.map((s) => s.meta.url),
      ...published.filter((r) => r.kind === 'analyzer').map((r) => r.url),
    ].sort(),
  );
});
test('all six legacy and language-specific feeds are valid and contain full articles', () => {
  for (const name of [
    'feed',
    'feed-es',
    'feed-rss',
    'feed-rss-es',
    'feed.links',
    'feed_original_atom',
  ]) {
    const raw = fs.readFileSync(`dist/${name}.xml`, 'utf8');
    assert.equal(XMLValidator.validate(raw), true, name);
    const parsed = new XMLParser({ ignoreAttributes: false }).parse(raw);
    const lang = name.includes('-es') ? 'es' : 'en';
    const expected = currentPublic
      .filter((s) => s.meta.published && s.meta.type === 'post' && s.meta.lang === lang)
      .sort((a, b) => Date.parse(b.meta.date) - Date.parse(a.meta.date))
      .slice(0, 20)
      .map((s) => site + s.meta.url)
      .sort();
    const items = parsed.rss?.channel.item || parsed.feed.entry;
    const actual = items.map((item) => item.link['@_href'] || item.link).sort();
    assert.deepEqual(actual, expected, name);
    for (const item of items)
      assert.ok((item.description || item.content['#text']).length > 100, 'full article content');
  }
});
test('internal blog navigation and article media resolve to generated files', () => {
  const failures = [];
  for (const r of published.filter((r) => r.kind !== 'analyzer')) {
    const $ = cheerio.load(html(r.url));
    for (const el of $('a[href],img[src]').toArray()) {
      const value = $(el).attr('href') || $(el).attr('src');
      if (!value || value.startsWith('#')) continue;
      let url;
      try {
        url = new URL(value, site + r.url);
      } catch {
        continue;
      }
      if (url.origin !== site) continue;
      let pathname = decodeURIComponent(url.pathname);
      const file = output(pathname);
      if (!fs.existsSync(file) && !fs.existsSync(path.join('dist', pathname, 'index.html')))
        failures.push(`${r.url}: ${value}`);
    }
  }
  assert.deepEqual(failures, []);
});

test('the interpreter, vendor and chart assets remain unchanged', () => {
  const assets = JSON.parse(fs.readFileSync('tests/fixtures/analyzer-assets.json'));
  // Display and renderer alignment changes are covered by lab-ui.test.mjs.
  for (const [file, expected] of Object.entries(assets).filter(
    ([file]) => !['assets/js/algorithms/main.js', 'assets/js/algorithms/test.js'].includes(file),
  ))
    assert.equal(
      createHash('sha256')
        .update(fs.readFileSync(path.join('dist', file)))
        .digest('hex'),
      expected,
      file,
    );
});
