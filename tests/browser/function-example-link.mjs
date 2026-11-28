import assert from 'node:assert/strict';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';
const caller = 'rotate_indexed_nontrivial';
const callee = 'k_rotate_from_permutation_indexed';

async function clickToken(page, token) {
  const editor = page.locator('#codeArea');
  await editor.scrollIntoViewIfNeeded();
  const point = await editor.evaluate((element, token) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const measure = document.createElement('canvas').getContext('2d');
    measure.font = style.fontSize + ' ' + style.fontFamily;
    const lines = element.value.split('\n');
    const row = lines.findIndex(line => line.includes(token + '('));
    const column = lines[row].indexOf(token);
    const lineHeight = parseFloat(style.lineHeight);
    element.scrollTop = Math.max(0, (row - 2) * lineHeight);
    return {
      x: rect.left + parseFloat(style.paddingLeft) + (column + 0.5) * measure.measureText('0').width - element.scrollLeft,
      y: rect.top + parseFloat(style.paddingTop) + (row + 0.5) * lineHeight - element.scrollTop,
    };
  }, token);
  await page.mouse.click(point.x, point.y);
}

test('tooltips link to localized examples and protect edited source', async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    for (const [route, label] of [['/algoritmos/', 'Ver ejemplo →'], ['/algorithms/', 'View example →']]) {
      const url = new URL(route, base);
      url.searchParams.set('snippet', caller);
      await page.goto(url.href);
      const editor = page.locator('#codeArea');
      await page.waitForFunction(name => document.querySelector('#codeArea')?.value.includes(name + '('), callee);

      const tooltip = page.locator('.function-tooltip');
      const link = tooltip.getByRole('link', { name: label });
      if (route === '/algoritmos/') {
        await editor.fill((await editor.inputValue()) + '\n// Local edit');
      }
      await clickToken(page, callee);
      await link.waitFor();
      const destination = new URL(await link.getAttribute('href'));
      assert.equal(destination.pathname, route);
      assert.equal(destination.searchParams.get('snippet'), callee);

      await link.click();
      if (route === '/algoritmos/') {
        await page.getByRole('button', { name: 'Conservar mi código' }).click();
        assert.match(await editor.inputValue(), /Local edit/);
        await page.keyboard.press('Escape');
        await clickToken(page, callee);
        await link.click();
        await page.getByRole('button', { name: 'Reemplazar código' }).click();
      }
      await page.waitForURL(value => value.searchParams.get('snippet') === callee);
      assert.match(await editor.inputValue(), new RegExp('function ' + callee + '<'));
      assert.match(await editor.inputValue(), /const origin/);

      await clickToken(page, 'rng');
      await tooltip.waitFor({ state: 'visible' });
      assert.equal(await link.count(), 0);
    }
  } finally {
    await browser.close();
  }
});
