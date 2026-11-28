import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';
const officialPdf = 'https://elementsofprogramming.com/eop.pdf';

async function navigate(page, picker, value) {
  await page.locator('#book-navigate').click();
  await picker.selectOption(value);
  await picker.locator('..').getByRole('button').click();
  await page.locator('#book-navigator').waitFor({ state: 'hidden' });
}

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
    const views = page.getByRole('group', { name: 'Vista del lector' });
    assert.deepEqual(await views.getByRole('button').allTextContents(), ['PDF', 'Partida', 'Lab']);
    assert.equal(await views.getByRole('button', { pressed: true }).innerText(), 'Partida');
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
    assert.equal(await page.locator('.reader-layout').getAttribute('data-view'), 'lab');
    const splitView = page.getByRole('button', { name: 'Partida', exact: true });
    await splitView.click();
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

    await splitView.click();
    await navigate(page, picker, '15');
    assert.equal(await examples.innerText(), 'Sin algoritmos asociados a esta página.');
    assert.equal(await page.locator('#book-lab').isVisible(), true);
    assert.equal(await lab.locator('#stepButton:enabled').isVisible(), true);
    assert.equal(await lab.locator('#currentAlgorithm').innerText(), 'terminating');
    await navigate(page, picker, '22');

    const stage = page.locator('#book-pdf-stage');
    const layout = page.locator('.reader-layout');
    await splitView.click();
    const splitBook = await page.locator('.book').boundingBox();
    const splitLab = await page.locator('.analyzer').boundingBox();
    assert.ok(splitBook && splitLab);

    await stage.click({ position: { x: 100, y: 100 } });
    assert.equal(await layout.getAttribute('data-view'), 'pdf');
    const focusedBook = await page.locator('.book').boundingBox();
    assert.ok(focusedBook && focusedBook.width > splitBook.width);
    assert.equal(await picker.inputValue(), '22');
    const labPeek = page.getByRole('button', { name: 'Dar foco al lab' });
    assert.equal(await labPeek.isVisible(), true);
    await labPeek.click();
    assert.equal(await layout.getAttribute('data-view'), 'lab');
    const focusedLab = await page.locator('.analyzer').boundingBox();
    const pdfPeek = page.getByRole('button', { name: 'Dar foco al PDF' });
    assert.ok(focusedLab && focusedLab.width > splitLab.width && await pdfPeek.isVisible());
    assert.equal(await lab.locator('#stepButton:enabled').isVisible(), true);
    assert.equal(await lab.locator('#currentAlgorithm').innerText(), 'terminating');
    if (process.env.EOP_FOCUS_SCREENSHOT) await page.screenshot({ path: process.env.EOP_FOCUS_SCREENSHOT });
    await pdfPeek.click();
    assert.equal(await layout.getAttribute('data-view'), 'pdf');
    await splitView.click();
    assert.equal(await layout.getAttribute('data-view'), 'split');
    assert.equal(await picker.inputValue(), '22');

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

    await navigate(page, picker, '15');
    await lab.locator('#editButton:enabled').click();
    await page.locator('#book-lab').waitFor({ state: 'hidden' });
    assert.equal(await page.locator('#book-lab').getAttribute('src'), null);

    await splitView.click();
    await navigate(page, picker, '17');
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
    await splitView.click();
    await page.mouse.move(stageBounds.x + stageBounds.width / 2, stageBounds.y + stageBounds.height / 2);
    await page.mouse.wheel(0, currentHeight + 8);
    await page.waitForFunction(() => document.querySelector('#book-page')?.value === '17');
    await page.getByRole('button', { name: '2.1 · Suma de 32 bits', pressed: true }).waitFor();
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

    await splitView.click();
    await navigate(page, picker, '15');
    assert.equal(await examples.innerText(), 'Sin algoritmos asociados a esta página.');
    assert.equal(await page.locator('#book-lab').isVisible(), false);
    assert.equal(await page.locator('#book-lab').getAttribute('src'), null);
    assert.equal(await page.locator('#book-notice').isVisible(), false);

    await navigate(page, picker, '17');
    await lab.locator('#currentAlgorithm').filter({ hasText: /^addition_defined_int32$/ }).waitFor({ state: 'attached' });
    await lab.locator('#startButton:enabled').waitFor();
    assert.doesNotMatch(await lab.locator('#hg-right-y').innerText(), /2147483646/);

    await navigate(page, picker, '19');
    await page.getByRole('button', { name: /distance \(transformación\)/ }).click();
    assert.match(await page.locator('#book-notice').innerText(), /todavía no está disponible/);
    assert.equal(await page.locator('#book-lab').isVisible(), false);

    await splitView.click();
    await navigate(page, picker, '24');
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
    await page.getByRole('button', { name: 'PDF', exact: true }).click();
    assert.equal(await layout.getAttribute('data-view'), 'pdf');
    assert.equal(await page.getByRole('button', { name: 'Focus the lab' }).isVisible(), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.equal(await picker.inputValue(), '26');
  } finally {
    await browser.close();
  }
});

test('the blog home and lab link to the reader in their own language', async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage();
    for (const [path, reader, label] of [
      ['/', '/interactive-eop/', 'Interactive Elements of Programming'],
      ['/inicio/', '/eop-interactivo/', 'Elements of Programming interactivo'],
      ['/algorithms/', '/interactive-eop/', 'Interactive EoP'],
      ['/algoritmos/', '/eop-interactivo/', 'EoP interactivo'],
    ]) {
      await page.goto(new URL(path, base).href, { waitUntil: 'domcontentloaded' });
      const link = page.locator(`a[href="${reader}"]`).filter({ hasText: label });
      await link.waitFor({ state: 'visible' });
    }
  } finally {
    await browser.close();
  }
});

test('the reader navigates all twelve chapters and the complete PDF', async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(new URL('/interactive-eop/?page=95', base).href, { waitUntil: 'domcontentloaded' });
    const section = page.locator('#book-section');
    const picker = page.locator('#book-page');
    const pdf = page.locator('.book-pdf-page[aria-current=page] iframe');
    const lab = page.frameLocator('#book-lab');
    await page.getByRole('button', { name: 'all', pressed: true, exact: true }).waitFor();
    await lab.locator('#startButton:enabled').waitFor();
    assert.equal(await section.inputValue(), '87');
    assert.equal(await picker.inputValue(), '95');
    assert.equal(await section.locator('option').count(), 18);
    assert.equal(await picker.locator('option').count(), 279);

    for (const start of [1, 15, 29, 47, 63, 87, 113, 131, 147, 167, 189, 207]) {
      await navigate(page, section, String(start));
      assert.equal(await picker.inputValue(), String(start));
      assert.match(await pdf.getAttribute('src'), new RegExp(`#page=${start + 14}&`));
    }
    assert.equal(await page.locator('#book-lab').isVisible(), false);
    await navigate(page, picker, '208');
    await page.getByRole('button', { name: /12\.1.*Pending/ }).waitFor();
    assert.equal(await page.locator('#book-notice').innerText(), 'This algorithm is not available in the lab yet.');

    await navigate(page, section, '189');
    await page.getByRole('button', { name: 'partitioned_at_point', pressed: true }).waitFor();
    await lab.locator('#startButton:enabled').waitFor();

    await navigate(page, section, '-13');
    assert.equal(await picker.locator('option:checked').textContent(), 'i');
    assert.match(await pdf.getAttribute('src'), /#page=1&/);
    assert.equal(await page.getByRole('button', { name: 'Previous page' }).isDisabled(), true);
    await navigate(page, picker, '265');
    assert.equal(await section.inputValue(), '247');
    assert.match(await pdf.getAttribute('src'), /#page=279&/);
    assert.equal(await page.getByRole('button', { name: 'Next page' }).isDisabled(), true);
    assert.ok(await page.locator('#book-pdf-stage iframe').count() <= 3);
    await page.reload({ waitUntil: 'domcontentloaded' });
    assert.equal(await picker.inputValue(), '265');
  } finally {
    await browser.close();
  }
});

test('the navigator finds algorithms by name and selects them on their page', async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(new URL('/eop-interactivo/', base).href, { waitUntil: 'domcontentloaded' });
    page.setDefaultTimeout(5000);
    const open = page.getByRole('button', { name: 'Navegar', exact: true });
    const dialog = page.getByRole('dialog', { name: 'Navegar por el libro' });
    await open.click();
    const search = dialog.getByRole('searchbox', { name: 'Nombre del algoritmo' });
    assert.equal(await search.evaluate(input => input === document.activeElement), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await search.fill('missing-algorithm-123');
    await dialog.getByText('No se encontraron algoritmos.').waitFor();
    await search.fill('upper bound n');
    await search.press('Enter');
    await dialog.waitFor({ state: 'hidden' });
    await page.getByRole('button', { name: 'upper_bound_n', pressed: true, exact: true }).waitFor();
    const lab = page.frameLocator('#book-lab');
    await lab.locator('#startButton:enabled').waitFor();
    assert.equal(await lab.locator('#currentAlgorithm').innerText(), 'upper_bound_n');
    assert.equal(await page.locator('#book-page-status').innerText(), 'Página 106');

    await open.click();
    await search.fill('bifurcate_compare_nonempty');
    await dialog.getByRole('button', { name: /bifurcate_compare_nonempty.*Pendiente/ }).click();
    await page.locator('#book-notice').waitFor();
    assert.equal(await page.locator('#book-page-status').innerText(), 'Página 128');
    await open.click();
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    assert.equal(await open.evaluate(button => button === document.activeElement), true);
  } finally {
    await browser.close();
  }
});

test('lab references link to the corresponding edition and printed page', async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage();
    for (const [path, expected] of [
      ['/algorithms/?snippet=for_each', '/interactive-eop/?page=94'],
      ['/algoritmos/?snippet=lower_bound_n', '/eop-interactivo/?page=105'],
      ['/algorithms/?snippet=for_each&embed=book', officialPdf + '#page=108'],
      ['/algorithms/?snippet=polynomial_value', 'https://www.fm2gp.com/code/ch08.h'],
    ]) {
      await page.goto(new URL(path, base).href, { waitUntil: 'domcontentloaded' });
      const link = page.locator('.editor-references a').first();
      assert.equal(await link.getAttribute('href', { timeout: 10000 }), expected);
    }
    await page.goto(new URL('/algorithms/?snippet=for_each', base).href, { waitUntil: 'domcontentloaded' });
    await page.locator('.editor-references a').click();
    assert.equal(new URL(page.url()).searchParams.get('page'), '94');
    await page.getByRole('button', { name: 'for_each', exact: true }).waitFor();
  } finally {
    await browser.close();
  }
});
