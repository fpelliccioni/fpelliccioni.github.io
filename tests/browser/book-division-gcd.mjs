import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('book division and common measure variants run in the lab', { timeout: 120000 }, async () => {
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
      for (let i = 0; i < 1200 && await step.isEnabled(); ++i) await step.click();
      assert.equal(await step.isEnabled(), false, 'the program did not finish');
      return page.locator('#hg-right-y').innerText();
    }

    for (const [name, expected] of [
      ['slow_remainder', /Result: 5/],
      ['slow_quotient', /Result: 11/],
      ['remainder_nonnegative', /Result: 5/],
      ['remainder_nonnegative_iterative', /Result: 5/],
      ['quotient_remainder_nonnegative', /Quotient: 11, remainder: 5/],
      ['quotient_remainder_nonnegative_iterative', /Quotient: 11, remainder: 5/],
      ['subtractive_gcd', /Greatest common divisor: 14/],
      ['fast_subtractive_gcd', /Greatest common divisor: 14/],
      ['fast_segment_gcm', /Greatest common measure: 14/],
      ['gcm_recursive', /Greatest common measure: 14/],
    ]) {
      const url = new URL('/algoritmos/', base);
      url.searchParams.set('snippet', name);
      assert.match(await run(url), expected, name);
    }

    const url = new URL('/algoritmos/', base);
    url.searchParams.set('lang', 'ts');
    url.searchParams.set('code', [
      'const result = slow_remainder(24, 6, integer_monoid);',
      'const legacy = remainder_slow(24, 6);',
      'print("Exact division and positive segment remainder: " + result + ", " + legacy);',
      'const [q, r] = quotient_remainder_nonnegative_iterative(Number.MAX_SAFE_INTEGER, 7, integer_monoid);',
      'print("Large dividend: " + q + ", " + r);',
      'const bars: HalvableMonoid<string> = {',
      '    zero: "", contains: s => /^\\|*$/.test(s),',
      '    less: (a, b) => a.length < b.length, add: (a, b) => a + b,',
      '    subtract: (a, b) => a.slice(b.length), half: a => a.slice(0, Math.floor(a.length / 2)),',
      '};',
      'const [barCount, tail] = quotient_remainder_nonnegative_iterative("|||||||", "|||", bars);',
      'print("Generic division: " + barCount + ", " + tail.length);',
      'const mcd = fast_subtractive_gcd(0, 42, integer_monoid);',
      'print("MCD with zero: " + mcd);',
      'slow_quotient(5, 0, integer_monoid);',
    ].join('\n'));
    const output = await run(url);
    assert.match(output, /Exact division and positive segment remainder: 0, 6/);
    assert.match(output, /Large dividend: 1286742750677284, 3/);
    assert.match(output, /Generic division: 2, 1/);
    assert.match(output, /MCD with zero: 42/);
    assert.match(await page.locator('#loadErrorMessage').innerText(), /Precondition failed[^]*divisor must be positive/i);
  } finally {
    await browser.close();
  }
});
