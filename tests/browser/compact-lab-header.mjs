import assert from 'node:assert/strict';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('the lab opens directly on the controls and keeps help accessible', async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage();
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ['/algoritmos/', '/algorithms/']) {
        await page.goto(new URL(route, base).href, { waitUntil: 'domcontentloaded' });
        const header = await page.locator('.lab-header').boundingBox();
        const toolbar = page.locator('.lab-toolbar');
        const controls = await toolbar.boundingBox();
        assert.ok(controls.y - (header.y + header.height) <= 20);
        assert.equal(await page.locator('.lab-intro').count(), 0);

        const help = toolbar.locator('.lab-help');
        await help.locator('summary').click();
        assert.equal(await help.getAttribute('open'), '');
        const panel = await help.locator('div').boundingBox();
        assert.ok(panel.x >= 0 && panel.x + panel.width <= width);
        await help.locator('summary').click();
        assert.equal(await help.getAttribute('open'), null);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      }
    }
  } finally {
    await browser.close();
  }
});
