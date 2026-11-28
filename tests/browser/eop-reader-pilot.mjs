import assert from 'node:assert/strict';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';
const officialPdf = 'https://elementsofprogramming.com/eop.pdf';

test('the chapter 2 reader links printed pages to runnable examples', async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(new URL('/eop-interactivo/', base).href, { waitUntil: 'domcontentloaded' });
    const pdf = page.locator('#book-pdf');
    await page.waitForFunction(url => document.querySelector('#book-pdf')?.getAttribute('src')?.startsWith(url + '#page=35'), officialPdf);
    const picker = page.locator('#book-page');
    assert.equal(await picker.inputValue(), '21');
    const lab = page.frameLocator('#book-lab');
    await lab.locator('#startButton:enabled').waitFor();
    assert.equal(await lab.locator('#currentAlgorithm').innerText(), 'collision_point');
    if (process.env.EOP_NATIVE_SCREENSHOT) await page.screenshot({ path: process.env.EOP_NATIVE_SCREENSHOT });

    const initialFrame = await pdf.elementHandle();
    await page.getByRole('button', { name: 'Página siguiente' }).click();
    assert.equal(await picker.inputValue(), '22');
    assert.match(await pdf.getAttribute('src'), /#page=36&/);
    assert.equal(await initialFrame.evaluate(frame => frame.isConnected), false);
    await page.getByRole('button', { name: 'terminating', exact: true }).click();
    await lab.locator('#currentAlgorithm').filter({ hasText: /^terminating$/ }).waitFor({ state: 'attached' });
    await lab.locator('#startButton:enabled').waitFor();
    await lab.locator('#startButton').click();
    await lab.locator('#stepButton').waitFor({ state: 'visible' });

    await picker.selectOption('23');
    assert.equal(await lab.locator('#currentAlgorithm').innerText(), 'terminating');
    assert.equal(await lab.locator('#stepButton').isVisible(), true);

    await picker.selectOption('17');
    const page17Frame = await pdf.elementHandle();
    await page.getByRole('button', { name: 'Página anterior' }).click();
    assert.equal(await picker.inputValue(), '16');
    assert.match(await pdf.getAttribute('src'), /#page=30&/);
    assert.equal(await page17Frame.evaluate(frame => frame.isConnected), false);
    await picker.selectOption('17');
    assert.equal(await page.getByRole('button', { name: /Suma de 32 bits/ }).count(), 1);
    assert.match(await page.locator('#book-notice').innerText(), /todavía no está disponible/);
    assert.equal(await page.locator('#book-lab').isVisible(), false);

    await picker.selectOption('24');
    assert.equal(await page.locator('input[type=file]').count(), 0);
    assert.equal(await pdf.isVisible(), true);
    await page.getByRole('button', { name: 'circular', exact: true }).click();
    await lab.locator('#currentAlgorithm').filter({ hasText: /^circular$/ }).waitFor({ state: 'attached' });
    await lab.locator('#startButton:enabled').waitFor();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(new URL('/interactive-eop/?page=26', base).href, { waitUntil: 'domcontentloaded' });
    assert.equal(await page.getByRole('heading', { name: 'Algorithms on this page' }).count(), 1);
    await page.getByRole('button', { name: '2.3 · convergent_point_guarded' }).waitFor();
    assert.equal(await picker.inputValue(), '26');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    const bookRect = await page.locator('.book').boundingBox();
    const labRect = await page.locator('.analyzer').boundingBox();
    assert.ok(bookRect && labRect && labRect.y >= bookRect.y + bookRect.height);
  } finally {
    await browser.close();
  }
});
