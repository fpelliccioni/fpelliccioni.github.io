import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('balanced reduction and iterative reversal run in the browser lab', { timeout: 60000 }, async () => {
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
      ['reduce_balanced_iterable', /Concatenation: abc/],
      ['reverse_n_adaptive_iterative', /\[7, 6, 5, 4, 3, 2, 1\]/],
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
      for (let i = 0; i < 300 && await step.isEnabled(); ++i) {
        await step.click();
      }
      assert.equal(await step.isEnabled(), false, name + ' did not finish');
      assert.match(await page.locator('#hg-right-y').innerText(), output);
    }
  } finally {
    await browser.close();
  }
});
