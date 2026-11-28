import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('Horner evaluation and extended GCD run in the lab', { timeout: 120000 }, async () => {
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
      ['polynomial_value', /Polynomial value at 4: 25/],
      ['extended_gcd', /Bézout coefficient: -1[^]*Greatest common divisor: 14/],
    ]) {
      const url = new URL('/algoritmos/', base);
      url.searchParams.set('snippet', name);
      assert.match(await run(url), expected);
    }

    const url = new URL('/algoritmos/', base);
    url.searchParams.set('lang', 'ts');
    url.searchParams.set('code', [
      'const ring = {',
      '    zero: 0, one: 1,',
      '    add: (l: number, r: number) => (l + r) % 7,',
      '    multiply: (l: number, r: number) => (l * r) % 7,',
      '    equal: (l: number, r: number) => l === r,',
      '};',
      'const coefficients = seq([2, 3, 5], "coefficients", undefined, "stream");',
      'const [first, last] = rng(coefficients);',
      'const modValue = polynomial_value(first, last, 4, ring);',
      'print("Modular evaluation: " + modValue);',
      'const empty = seq<number>([]);',
      'const [f, l] = rng(empty);',
      'const value = polynomial_value(f, l, 4, ring);',
      'print("Empty polynomial: " + value);',
      'const [x, g] = extended_gcd(-196, -42);',
      'print("Signed result: " + x + ", " + g);',
      'const [zeroX, zeroG] = extended_gcd(0, 0);',
      'print("Zero result: " + zeroX + ", " + zeroG);',
      'extended_gcd(1.5, 2);',
    ].join('\n'));
    const output = await run(url);
    assert.match(output, /Modular evaluation: 0/);
    assert.match(output, /Empty polynomial: 0/);
    assert.match(output, /Signed result: 1, 14/);
    assert.match(output, /Zero result: 1, 0/);
    assert.match(await page.locator('#loadErrorMessage').innerText(), /Precondition failed[^]*Both operands must be safe integers/i);
  } finally {
    await browser.close();
  }
});
