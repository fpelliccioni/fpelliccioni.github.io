import assert from 'node:assert/strict';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('the visualization scrolls horizontally only when the drawing needs it', { timeout: 60000 }, async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage();
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const stage = page.locator('.visual-stage');
      const dimensions = () => stage.evaluate((el) => ({
        available: el.clientWidth,
        content: el.scrollWidth,
      }));

      for (const size of [10, 80]) {
        const url = new URL('/algoritmos/', base);
        url.searchParams.set('code', `const d = sequence(array_ascending(${size}));\nprint(d);`);
        await page.goto(url.href);
        const empty = await dimensions();
        assert.equal(empty.content, empty.available);

        await page.locator('#startButton').click();
        const step = page.locator('#stepButton');
        await step.waitFor();
        await step.click();
        await step.click();
        await stage.locator('svg text').first().waitFor();

        const { available, content } = await dimensions();
        if (size === 10) {
          assert.equal(content, available);
          assert.equal(await page.locator('.panel-hint').isVisible(), false);
        } else {
          assert.ok(content > available);
          if (width > 1050) assert.equal(await page.locator('.panel-hint').isVisible(), true);
          const scroll = await stage.evaluate((el) => {
            el.scrollLeft = el.scrollWidth;
            const svg = el.querySelector('#sequence svg');
            const box = svg.getBBox();
            return { offset: el.scrollLeft, svgWidth: svg.clientWidth, drawnRight: box.x + box.width };
          });
          assert.ok(scroll.offset > 0);
          assert.ok(scroll.svgWidth >= scroll.drawnRight);
        }
      }
    }
  } finally {
    await browser.close();
  }
});
