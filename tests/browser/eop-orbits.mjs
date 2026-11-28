import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('Elements of Programming orbit algorithms run in the lab', { timeout: 120000 }, async () => {
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

    async function run(url) {
      await page.goto(url.href);
      await page.locator('#startButton').click();
      const step = page.locator('#stepButton');
      await step.waitFor();
      for (let i = 0; i < 400 && await step.isEnabled(); ++i) await step.click();
      assert.equal(await step.isEnabled(), false, 'the program did not finish');
      return page.locator('#hg-right-y').innerText();
    }

    for (const [name, expected] of [
      ['collision_point', /Terminal state: 3/],
      ['collision_point_nonterminating_orbit', /Collision point: 2/],
      ['convergent_point', /Convergent point: 2/],
      ['connection_point', /Connection point: 1/],
      ['connection_point_nonterminating_orbit', /Connection point: 1/],
    ]) {
      const url = new URL('/algoritmos/', base);
      url.searchParams.set('snippet', name);
      assert.match(await run(url), expected, name);
    }

    const url = new URL('/algoritmos/', base);
    url.searchParams.set('lang', 'ts');
    url.searchParams.set('code', [
      'const next = (n: number) => n + 1;',
      'const defined = predicate(n => n < 2);',
      'const terminal = connection_point(0, next, defined);',
      'const stopped = collision_point(2, next, defined);',
      'const loop = connection_point_nonterminating_orbit(4, n => n);',
      'print("Terminal states: " + terminal + ", " + stopped);',
      'print("Fixed point: " + loop);',
      'convergent_point(0, 1, n => 1 - n);',
    ].join('\n'));
    const output = await run(url);
    assert.match(output, /Terminal states: 2, 2/);
    assert.match(output, /Fixed point: 4/);
    assert.match(await page.locator('#loadErrorMessage').innerText(), /Precondition failed[^]*same number of steps/i);
  } finally {
    await browser.close();
  }
});
