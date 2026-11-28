import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? process.env.LAB_BROWSER_URL ?? 'https://componentsprogramming.com';

test('orbit predicates, structure and exercises run in the lab', { timeout: 120000 }, async () => {
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

    async function run(url) {
      await page.goto(url.href);
      await page.locator('#startButton').click();
      const step = page.locator('#stepButton');
      await step.waitFor();
      for (let i = 0; i < 1200 && await step.isEnabled(); ++i) await step.click();
      assert.equal(await step.isEnabled(), false, 'the program did not finish');
      return page.locator('#hg-right-y').innerText();
    }

    for (const [name, expected] of [
      ['terminating', /Terminating: true/],
      ['circular', /Circular: true/],
      ['circular_nonterminating_orbit', /Circular: false/],
      ['orbit_structure', /Orbit: 3, 0, 3/],
      ['orbit_structure_nonterminating_orbit', /Orbit: 1, 2, 1/],
      ['orbit_reachable', /Reachable: true/],
      ['orbit_reachable_nonempty', /Reachable after a step: false/],
      ['orbits_intersect', /Orbits intersect: true/],
      ['convergent_point_guarded', /Guarded convergence: 2/],
      ['power_unary', /State after 3 steps: 3/],
    ]) {
      const url = new URL('/algoritmos/', base);
      url.searchParams.set('snippet', name);
      assert.match(await run(url), expected, name);
    }

    const url = new URL('/algoritmos/', base);
    url.searchParams.set('lang', 'ts');
    url.searchParams.set('code', [
      'const next = (x: number) => [1, 1, 3, 3][x];',
      'const defined = predicate(x => x < 4);',
      'const disjoint = orbits_intersect(0, 2, next, defined);',
      'const fixed = orbit_reachable_nonempty(1, 1, next, defined);',
      'const unchanged = power_unary(4, 0, next, defined);',
      'print("Disjoint intersection: " + disjoint);',
      'print("Fixed point reachable: " + fixed);',
      'print("Zero steps: " + unchanged);',
      'convergent_point_guarded(0, 2, 3, next, defined);',
    ].join('\n'));
    const output = await run(url);
    assert.match(output, /Disjoint intersection: false/);
    assert.match(output, /Fixed point reachable: true/);
    assert.match(output, /Zero steps: 4/);
    assert.match(await page.locator('#loadErrorMessage').innerText(), /Precondition failed[^]*reachable from both/i);
  } finally {
    await browser.close();
  }
});
