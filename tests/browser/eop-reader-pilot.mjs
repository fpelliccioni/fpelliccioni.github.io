import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';
const officialPdf = 'https://elementsofprogramming.com/eop.pdf';

test('the chapter 2 reader links printed pages to runnable examples', async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const fixtures = process.env.TAO_LOCAL_BUILD;
    if (fixtures) {
      await page.route('https://raw.githubusercontent.com/fpelliccioni/tao-js/master/build/*', async route => {
        const name = new URL(route.request().url()).pathname.split('/').at(-1);
        await route.fulfill({
          contentType: 'application/javascript',
          headers: { 'access-control-allow-origin': '*' },
          body: await readFile(join(fixtures, name)),
        });
      });
    }
    await page.goto(new URL('/eop-interactivo/', base).href, { waitUntil: 'domcontentloaded' });
    const pdf = page.locator('.book-pdf-page[aria-current=page] iframe');
    await page.waitForFunction(url => document.querySelector('.book-pdf-page[aria-current=page] iframe')?.getAttribute('src')?.startsWith(url + '#page=35'), officialPdf);
    const picker = page.locator('#book-page');
    assert.equal(await picker.inputValue(), '21');
    const lab = page.frameLocator('#book-lab');
    await lab.locator('#startButton:enabled').waitFor();
    assert.equal(await lab.locator('#currentAlgorithm').innerText(), 'collision_point');
    const examples = page.getByRole('group', { name: 'Algoritmos de la página' });
    assert.equal(await examples.getByRole('button').count(), 1);
    assert.equal(await examples.getByRole('button', { name: 'collision_point', pressed: true }).count(), 1);
    assert.equal(await page.locator('.analyzer').getByRole('heading').count(), 0);
    assert.equal(await page.locator('.analyzer').getByRole('link').count(), 0);
    const toolbar = lab.locator('.lab-toolbar');
    const start = await lab.locator('#startButton').boundingBox();
    const help = lab.locator('.lab-help');
    const helpButton = await help.locator('summary').boundingBox();
    assert.ok((await toolbar.boundingBox()).height <= 45, 'the embedded execution toolbar fits on one compact row');
    assert.ok(Math.abs(start.y - helpButton.y) <= 6, 'help shares the execution row');
    await help.locator('summary').click();
    assert.equal(await help.locator('div').isVisible(), true);
    await help.locator('summary').click();
    if (process.env.EOP_NATIVE_SCREENSHOT) await page.screenshot({ path: process.env.EOP_NATIVE_SCREENSHOT });

    await page.getByRole('button', { name: 'Página siguiente' }).click();
    assert.equal(await picker.inputValue(), '22');
    assert.match(await pdf.getAttribute('src'), /#page=36&/);
    assert.equal(await examples.getByRole('button').count(), 2);
    await examples.getByRole('button', { name: 'terminating', exact: true }).click();
    assert.equal(await examples.getByRole('button', { name: 'terminating', pressed: true }).count(), 1);
    assert.equal(await examples.getByRole('button', { name: 'collision_point', pressed: false }).count(), 1);
    await lab.locator('#currentAlgorithm').filter({ hasText: /^terminating$/ }).waitFor({ state: 'attached' });
    await lab.locator('#startButton:enabled').waitFor();
    await lab.locator('#startButton').click();
    await lab.locator('#stepButton').waitFor({ state: 'visible' });
    assert.ok((await toolbar.boundingBox()).height <= 45, 'the toolbar stays compact while stepping');

    const stage = page.locator('#book-pdf-stage');
    const stageBounds = await stage.boundingBox();
    assert.ok(stageBounds);
    const currentHeight = (await page.locator('.book-pdf-page[aria-current=page]').boundingBox()).height;
    await page.mouse.move(stageBounds.x + stageBounds.width / 2, stageBounds.y + stageBounds.height / 2);
    await page.mouse.wheel(0, currentHeight + 8);
    await page.waitForFunction(() => document.querySelector('#book-page')?.value === '23');
    assert.match(await pdf.getAttribute('src'), /#page=37&/);
    await page.getByRole('button', { name: 'collision_point_nonterminating_orbit', exact: true }).waitFor();
    assert.equal(new URL(page.url()).searchParams.get('page'), '23');
    assert.equal(await lab.locator('#currentAlgorithm').innerText(), 'terminating');
    assert.equal(await lab.locator('#stepButton').isVisible(), true);

    await picker.selectOption('17');
    await page.getByRole('button', { name: 'Página anterior' }).click();
    assert.equal(await picker.inputValue(), '16');
    assert.match(await pdf.getAttribute('src'), /#page=30&/);
    for (const [label, name, output] of [
      ['abs(x)', 'abs', /Absolute value: 7/],
      ['euclidean_norm(x, y)', 'euclidean_norm', /Euclidean norm: 5/],
      ['euclidean_norm(x, y, z)', 'euclidean_norm_3', /Euclidean norm: 7/],
    ]) {
      await page.getByRole('button', { name: label, exact: true }).click();
      await lab.locator('#currentAlgorithm').filter({ hasText: new RegExp('^' + name + '$') }).waitFor({ state: 'attached' });
      await lab.locator('#startButton:enabled').click();
      const step = lab.locator('#stepButton');
      await step.waitFor({ state: 'visible' });
      for (let i = 0; i < 30 && await step.isEnabled(); ++i) await step.click();
      assert.match(await lab.locator('#hg-right-y').innerText(), output);
    }
    await picker.selectOption('17');
    await page.getByRole('button', { name: '2.1 · Suma de 32 bits', exact: true }).click();
    await lab.locator('#currentAlgorithm').filter({ hasText: /^addition_defined_int32$/ }).waitFor({ state: 'attached' });
    await lab.locator('#startButton:enabled').click();
    const additionStep = lab.locator('#stepButton');
    await additionStep.waitFor({ state: 'visible' });
    for (let i = 0; i < 100 && await additionStep.isEnabled(); ++i) await additionStep.click();
    const additionOutput = await lab.locator('#hg-right-y').innerText();
    assert.ok(additionOutput.includes('2147483646 + (1): true'), additionOutput);
    assert.ok(additionOutput.includes('2147483647 + (1): false'), additionOutput);
    assert.ok(additionOutput.includes('-2147483647 + (-1): true'), additionOutput);
    assert.ok(additionOutput.includes('-2147483648 + (-1): false'), additionOutput);
    assert.ok(additionOutput.includes('2147483648 + (-1): false'), additionOutput);

    await picker.selectOption('19');
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
    assert.equal(await page.getByRole('group', { name: 'Algorithms on this page' }).count(), 1);
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
