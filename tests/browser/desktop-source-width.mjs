import assert from 'node:assert/strict';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('the source panel gains desktop width without overflowing the page', async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage();
    for (const width of [390, 900, 1051, 1100, 1440, 1500, 1900]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(new URL('/algoritmos/', base).href, { waitUntil: 'domcontentloaded' });

      const measure = () => page.locator('#hg-left').evaluate((el) => el.getBoundingClientRect().width);
      const after = await measure();
      const oldGrid = await page.addStyleTag({ content: `
        @media (min-width: 1051px) and (max-width: 1499px) {
          .lab-workspace { grid-template-columns: minmax(460px, 1.4fr) minmax(280px, 1fr) minmax(200px, 0.65fr); }
        }
        @media (min-width: 1500px) {
          .lab-workspace { grid-template-columns: minmax(460px, 1.4fr) minmax(380px, 1.1fr) minmax(250px, 0.65fr); }
        }
      ` });
      const before = await measure();
      await oldGrid.evaluate((el) => el.remove());

      if (width >= 1051) {
        assert.ok(after >= before + 8, `${width}px viewport: source width ${before}px → ${after}px`);
        const canvas = await page.locator('.visual-panel').boundingBox();
        assert.ok(canvas.width >= 480, `${width}px viewport: canvas width ${canvas.width}px`);
      } else {
        assert.equal(after, before);
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    }
  } finally {
    await browser.close();
  }
});
