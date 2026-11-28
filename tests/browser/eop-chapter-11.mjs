import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('chapter 11 partitions and linked sort run in the browser lab', { timeout: 120000 }, async () => {
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
      ['partition_single_cycle_sentinel', /Partition starts at index: 3/],
      ['partition_stable_n_adaptive', /Partition starts at index: 4[^]*\[7, 1, 3, 5, 2, 4, 6\]/],
      ['partition_stable_n_iterative', /Partition starts at index: 4[^]*\[7, 1, 3, 5, 2, 4, 6\]/],
      ['sort_linked_nonempty_n_iterative', /Node order: 1, 3, 4, 2, 0/],
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
      for (let i = 0; i < 700 && await step.isEnabled(); ++i) {
        await step.click();
      }
      assert.equal(await step.isEnabled(), false, name + ' did not finish');
      assert.match(await page.locator('#hg-right-y').innerText(), output);
      if (name.startsWith('partition_stable_')) {
        assert.equal(await page.evaluate(() => globalThis.stats_pred_appls), 7);
      }
      if (name.startsWith('sort_linked_')) {
        assert.deepEqual(await page.evaluate(() => globalThis.sequences.links.data), [-1, 3, 0, 4, 2]);
      }
    }
  } finally {
    await browser.close();
  }
});
