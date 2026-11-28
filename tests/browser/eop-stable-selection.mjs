import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('stable selection retains the original order of equivalent values', { timeout: 120000 }, async () => {
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
      ['compare_strict_or_reflexive', /Reflexive comparison: true/],
      ['select_0_2', /Selected: 1a/],
      ['select_0_3', /Selected: 1a/],
      ['select_2_3', /Selected: 2c/],
      ['select_1_4', /Selected: 2b/],
      ['select_1_4_ab', /Selected: 2b/],
      ['select_1_4_ab_cd', /Selected: 2b/],
      ['select_2_4', /Selected: 2c/],
      ['select_2_5', /Selected: 2c/],
      ['select_2_5_ab', /Selected: 2c/],
      ['select_2_5_ab_cd', /Selected: 2c/],
      ['median_5', /Selected: 2c/],
      ['median_5_adaptive', /Selected: 2b/],
    ]) {
      const url = new URL('/algoritmos/', base);
      url.searchParams.set('snippet', name);
      assert.match(await run(url), expected, name);
      if (name === 'median_5') assert.equal(await page.evaluate(() => globalThis.stats_pred_appls), 6);
      if (name === 'median_5_adaptive') assert.equal(await page.evaluate(() => globalThis.stats_pred_appls), 4);
    }

    const url = new URL('/algoritmos/', base);
    url.searchParams.set('lang', 'ts');
    url.searchParams.set('code', [
      'const less = (x: string, y: string) => x[0] < y[0];',
      'for (let key = 0; key < 5; ++key) {',
      '    pre(() => {',
      '        for (let n = 0; n < 625; ++n) {',
      '            const keys = [key, n % 5, Math.floor(n / 5) % 5, Math.floor(n / 25) % 5, Math.floor(n / 125)];',
      '            const [a, b, c, d, e] = keys.map((k, i) => String(k) + String(i));',
      '            const three = [a, b, c].sort();',
      '            const four = [a, b, c, d].sort();',
      '            const five = [a, b, c, d, e].sort();',
      '            if (select_0_2(a, b, less) !== [a, b].sort()[0]',
      '                || select_1_2(a, b, less) !== [a, b].sort()[1]',
      '                || select_0_3(a, b, c, less) !== three[0]',
      '                || select_1_3(a, b, c, less) !== three[1]',
      '                || select_2_3(a, b, c, less) !== three[2]',
      '                || select_1_4(a, b, c, d, less) !== four[1]',
      '                || select_2_4(a, b, c, d, less) !== four[2]',
      '                || median_5(a, b, c, d, e, less) !== five[2]',
      '                || median_5_adaptive(a, b, c, d, e, less) !== five[2]) return false;',
      '        }',
      '        return true;',
      '    }, "Stable order must agree with sorting by key and original index.");',
      '}',
      'print("Checked 3125 key patterns");',
      'select_1_4_ab(["2a", 0], ["1b", 1], ["3c", 2], ["4d", 3], less);',
    ].join('\n'));
    const output = await run(url);
    assert.match(output, /Checked 3125 key patterns/);
    assert.match(await page.locator('#loadErrorMessage').innerText(), /Precondition failed[^]*first pair must already be in stable order/i);
  } finally {
    await browser.close();
  }
});
