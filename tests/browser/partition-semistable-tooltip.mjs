// Run with npm run test:browser. Pass a site URL to test another deployment.
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? 'https://componentsprogramming.com';
const name = 'partition_semistable';
const browser = await chromium.launch({ channel: 'chrome' });

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  for (const [route, description] of [
    ['/algoritmos/', 'iteradores de avance mutables'],
    ['/algorithms/', 'mutable forward iterators'],
  ]) {
    const url = new URL(route, base);
    url.searchParams.set('snippet', name);
    await page.goto(url.href);

    const editor = page.locator('#codeArea');
    await page.waitForFunction(
      (name) => document.querySelector('#codeArea')?.value.includes('function ' + name + '<'),
      name,
    );
    await editor.scrollIntoViewIfNeeded();
    const point = await editor.evaluate((element, name) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const measure = document.createElement('canvas').getContext('2d');
      measure.font = style.fontSize + ' ' + style.fontFamily;
      const lines = element.value.split('\n');
      const row = lines.findIndex((line) => line.startsWith('function ' + name + '<'));
      const column = lines[row].indexOf(name) + 1;
      return {
        x: rect.left + parseFloat(style.paddingLeft) + (column + 0.5) * measure.measureText('0').width - element.scrollLeft,
        y: rect.top + parseFloat(style.paddingTop) + (row + 0.5) * parseFloat(style.lineHeight) - element.scrollTop,
      };
    }, name);
    await page.mouse.click(point.x, point.y);

    const tooltip = page.locator('.function-tooltip');
    await tooltip.waitFor({ state: 'visible' });
    const content = await tooltip.innerText();
    assert.ok(content.includes(description), content);
    assert.ok(content.includes('function ' + name + '<'), content);
    assert.match(content, /Elements of Programming/);

    await page.locator('#editorHeading').click();
    await tooltip.waitFor({ state: 'hidden' });
  }
  console.log('partition_semistable tooltip verified in Spanish and English.');
} finally {
  await browser.close();
}
