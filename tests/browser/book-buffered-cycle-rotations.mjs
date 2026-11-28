import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('buffered and cycle rotations run in the lab', { timeout: 120000 }, async () => {
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
      ['k_rotate_from_permutation_indexed', /Source of the first position: 3/],
      ['k_rotate_from_permutation_random_access', /Source of the first position: 3/],
      ['rotate_indexed_nontrivial', /\[3, 4, 5, 1, 2\]/],
      ['rotate_random_access_nontrivial', /\[3, 4, 5, 1, 2\]/],
      ['rotate_cycles', /\[3, 4, 5, 6, 1, 2\]/],
      ['rotate_with_buffer_nontrivial', /\[3, 4, 5, 1, 2\]/],
      ['rotate_with_buffer_backward_nontrivial', /\[3, 4, 5, 1, 2\]/],
      ['rotate_partial_nontrivial', /\[3, 4, 5, 2, 1\]/],
      ['rotate_forward_step', /Next positions: 3, 4[^]*\[3, 4, 5, 2, 1\]/],
      ['rotate_forward', /\[3, 4, 5, 1, 2\]/],
      ['rotate_forward_annotated', /\[3, 4, 5, 1, 2\]/],
    ]) {
      const url = new URL('/algoritmos/', base);
      url.searchParams.set('snippet', name);
      assert.match(await run(url), expected, name);
    }

    const url = new URL('/algoritmos/', base);
    url.searchParams.set('lang', 'ts');
    url.searchParams.set('code', [
      'const d = seq([0, 1, 2, 3, 4, 5, 6, 9]);',
      'const f = successor(begin(d));',
      'const l = predecessor(end(d));',
      'const m = successor(f, 4);',
      'const point = rotate_indexed_nontrivial(f, m, l);',
      'const offset = distance(begin(d), point);',
      'print("Subrange boundary: " + offset);',
      'print(d);',
      'rotate_with_buffer_nontrivial(f, m, l, begin(d));',
    ].join('\n'));
    const output = await run(url);
    assert.match(output, /Subrange boundary: 3/);
    assert.match(output, /\[0, 5, 6, 1, 2, 3, 4, 9\]/);
    assert.match(await page.locator('#loadErrorMessage').innerText(), /Precondition failed[^]*buffer must be separate/i);
  } finally {
    await browser.close();
  }
});
