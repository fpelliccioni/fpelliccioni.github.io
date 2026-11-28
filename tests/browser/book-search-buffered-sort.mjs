import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('book searches and buffered merge sorts run in the lab', { timeout: 120000 }, async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage();
    const fixtures = process.env.TAO_LOCAL_BUILD;
    if (fixtures) {
      await page.route('https://raw.githubusercontent.com/fpelliccioni/tao-js/master/build/*', async (route) => {
        const filename = new URL(route.request().url()).pathname.split('/').at(-1);
        await route.fulfill({
          contentType: 'application/javascript',
          headers: { 'access-control-allow-origin': '*' },
          body: await readFile(join(fixtures, filename)),
        });
      });
    }

    for (const [name, output] of [
      ['partition_point', /Boundary index: 3/],
      ['lower_bound', /Boundary index: 1/],
      ['upper_bound', /Boundary index: 4/],
      ['merge_n_with_buffer', /\[1, 2, 3, 3, 4, 5\]/],
      ['merge_n_adaptive', /\[1, 2, 3, 3, 4, 5\]/],
      ['sort_n_with_buffer', /\[1, 1, 2, 2, 3, 4, 5\]/],
      ['sort_n_adaptive', /\[1, 1, 2, 2, 3, 4, 5\]/],
    ]) {
      const url = new URL('/algoritmos/', base);
      url.searchParams.set('snippet', name);
      await page.goto(url.href);
      await page.waitForFunction(
        (name) => document.querySelector('#codeArea')?.value.includes('function ' + name + '<'),
        name,
      );
      await page.locator('#startButton').click();
      const step = page.locator('#stepButton');
      await step.waitFor();
      for (let i = 0; i < 1200 && await step.isEnabled(); ++i) await step.click();
      assert.equal(await step.isEnabled(), false, name + ' did not finish');
      assert.match(await page.locator('#hg-right-y').innerText(), output, name);
    }

    const url = new URL('/algoritmos/', base);
    url.searchParams.set('lang', 'ts');
    url.searchParams.set('code', [
      'const d = seq(["2a", "1a", "2b", "1b", "2c"]);',
      'const buffer = seq<string>([]);',
      'const byKey = relation<string>((a, b) => a[0] < b[0]);',
      'sort_n_adaptive(begin(d), size(d), begin(buffer), 0, byKey);',
      'print(d);',
      'const bad = seq([2, 1, 4]);',
      'const [f, l] = rng(bad);',
      'partition_point(f, l, even);',
    ].join('\n'));
    await page.goto(url.href);
    await page.locator('#startButton').click();
    const step = page.locator('#stepButton');
    await step.waitFor();
    for (let i = 0; i < 1000 && await step.isEnabled(); ++i) await step.click();
    assert.equal(await step.isEnabled(), false);
    const output = await page.locator('#hg-right-y').innerText();
    assert.deepEqual(await page.evaluate(() => globalThis.sequences.d.data), ['1a', '1b', '2a', '2b', '2c'], output);
    assert.match(await page.locator('#loadErrorMessage').innerText(), /Precondition failed[^]*predicate must be true before it is false/i);
  } finally {
    await browser.close();
  }
});
