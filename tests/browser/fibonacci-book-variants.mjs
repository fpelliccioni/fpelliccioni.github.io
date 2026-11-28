import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('both Fibonacci variants run in the lab', { timeout: 120000 }, async () => {
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

    for (const name of ['fib0', 'fibonacci_iterative']) {
      const url = new URL('/algoritmos/', base);
      url.searchParams.set('snippet', name);
      assert.match(await run(url), /F\(6\) = 8/, name);
    }

    const url = new URL('/algoritmos/', base);
    url.searchParams.set('lang', 'ts');
    url.searchParams.set('code', [
      'const zero = fib0(0);',
      'const one = fib0(1);',
      'const recursive = fib0(5);',
      'const iterative = fibonacci_iterative(5);',
      'const max = fibonacci_iterative(78);',
      'print("Base cases: " + zero + ", " + one);',
      'print("Comparison: " + recursive + ", " + iterative);',
      'print("Largest exact result: " + max);',
      'fibonacci_iterative(79);',
    ].join('\n'));
    const output = await run(url);
    assert.match(output, /Base cases: 0, 1/);
    assert.match(output, /Comparison: 5, 5/);
    assert.match(output, /Largest exact result: 8944394323791464/);
    assert.match(await page.locator('#loadErrorMessage').innerText(), /Precondition failed[^]*The index must be an integer from 0 to 78/i);
  } finally {
    await browser.close();
  }
});
