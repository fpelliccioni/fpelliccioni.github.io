import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('seq and sequence support inferred names and coloring', async () => {
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
    const url = new URL('/algoritmos/', base);
    url.searchParams.set('lang', 'ts');
    url.searchParams.set('code', 'const d = seq([1, 2, 3], even);\nconst label = "original";\nconst other = sequence([4], label);\nconst plain = seq([6]);\nprint(d);');
    await page.goto(url.href);
    await page.locator('#startButton').click();
    const step = page.locator('#stepButton');
    await step.waitFor();
    for (let i = 0; i < 30 && await step.isEnabled(); ++i) await step.click();

    assert.deepEqual(await page.evaluate(() => Object.keys(globalThis.sequences)), ['d', 'original', 'plain']);
    const colors = await page.evaluate(() =>
      globalThis.sequences.d.elements.slice(0, 3).map((element) => element.group.children[0].fill),
    );
    assert.equal(colors[0], colors[2]);
    assert.notEqual(colors[0], colors[1]);
    assert.equal(await page.evaluate(() => globalThis.stats_pred_appls), 0);
    assert.match(await page.locator('#hg-right-y').innerText(), /\[1, 2, 3\]/);
  } finally {
    await browser.close();
  }
});
