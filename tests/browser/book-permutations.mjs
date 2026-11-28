import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('book reversal and rotation variants run in the lab', { timeout: 120000 }, async () => {
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
      ['reverse_swap_ranges_n', /\[1, 2, 6, 5\][^]*\[4, 3, 7\]/],
      ['reverse_swap_ranges', /\[8, 7, 6, 5\][^]*\[4, 3, 2, 1\]/],
      ['reverse_swap_ranges_bounded', /\[1, 7, 6, 5\][^]*\[4, 3, 2\]/],
      ['reverse_n_bidirectional', /\[5, 4, 3, 2, 1\]/],
      ['reverse_n', /\[5, 4, 3, 2, 1\]/],
      ['reverse_indexed', /\[5, 4, 3, 2, 1\]/],
      ['reverse_recursive', /\[5, 4, 3, 2, 1\]/],
      ['reverse_until', /\[5, 4, 3, 2, 1\]/],
      ['three_reverse_rotate', /\[3, 4, 5, 1, 2\]/],
      ['gries_mills_rotate', /\[3, 4, 5, 1, 2\]/],
      ['rotate_unguarded', /\[3, 4, 5, 1, 2\]/],
      ['rotate', /\[3, 4, 5, 1, 2\]/],
    ]) {
      const url = new URL('/algoritmos/', base);
      url.searchParams.set('snippet', name);
      assert.match(await run(url), expected, name);
    }

    const url = new URL('/algoritmos/', base);
    url.searchParams.set('lang', 'ts');
    url.searchParams.set('code', [
      'const d = seq([1, 2, 3, 4, 5, 6]);',
      'const [f, l] = rng(d);',
      'const m = successor(f, 2);',
      'const [front, back] = reverse_until(f, m, l);',
      'const frontIndex = distance(f, front);',
      'const backIndex = distance(f, back);',
      'print("Reverse positions: " + frontIndex + ", " + backIndex);',
      'const noRotation = rotate(f, f, l);',
      'const noRotationIndex = distance(f, noRotation);',
      'print("Empty prefix result: " + noRotationIndex);',
      'const subrangeStart = successor(f);',
      'const subrangeEnd = predecessor(l);',
      'const subrangeMiddle = successor(subrangeStart, 3);',
      'const rotated = rotate(subrangeStart, subrangeMiddle, subrangeEnd);',
      'const rotatedIndex = distance(f, rotated);',
      'print("Rotated result: " + rotatedIndex);',
      'print(d);',
      'rotate_unguarded(f, f, l);',
    ].join('\n'));
    const output = await run(url);
    assert.match(output, /Reverse positions: 2, 4/);
    assert.match(output, /Empty prefix result: 6/);
    assert.match(output, /Rotated result: 2/);
    assert.match(output, /\[6, 2, 5, 3, 4, 1\]/);
    assert.match(await page.locator('#loadErrorMessage').innerText(), /Precondition failed[^]*Both parts must be nonempty/i);
  } finally {
    await browser.close();
  }
});
