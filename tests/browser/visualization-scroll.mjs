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
        const placeholder = page.locator('#visualEmpty');
        assert.equal(await placeholder.innerText(), 'Iniciá la ejecución para ver los datos.');
        assert.equal(await placeholder.locator('span').count(), 0);
        const empty = await dimensions();
        assert.equal(empty.content, empty.available);

        await page.locator('#startButton').click();
        const step = page.locator('#stepButton');
        await step.waitFor();
        assert.match(await placeholder.innerText(), /Avanzá hasta/);
        await step.click();
        await step.click();
        await stage.locator('svg text').first().waitFor();
        await placeholder.waitFor({ state: 'hidden' });

        const sourceHeading = await page.locator('.editor-panel > .panel-heading').boundingBox();
        const visualHeading = await page.locator('.visual-panel > .panel-heading').boundingBox();
        assert.equal(visualHeading.height, sourceHeading.height);
        assert.equal(await page.locator('.panel-hint, #editorLanguage').count(), 0);
        if (width > 1050) assert.equal(visualHeading.y, sourceHeading.y);

        const { available, content } = await dimensions();
        if (size === 10) {
          assert.equal(content, available);
        } else {
          assert.ok(content > available);
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
