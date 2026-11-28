// Run with node scripts/update-eop-examples.mjs to refresh from published tao-js.
import { writeFile } from 'node:fs/promises';
import { parse } from 'acorn';

const base = 'https://raw.githubusercontent.com/fpelliccioni/tao-js/master/build/';
async function readDeclarations(file) {
  const response = await fetch(base + file);
  if (!response.ok) throw new Error(`Cannot download ${file} (${response.status})`);
  const tree = parse(await response.text(), { ecmaVersion: 'latest' });
  return tree.body.filter(node => node.type === 'FunctionDeclaration');
}

const [algorithms, extra] = await Promise.all([
  readDeclarations('algorithms.js'),
  readDeclarations('algorithms_extra.js'),
]);
const definitions = new Set(algorithms.map(node => node.id.name));
const usages = new Set(extra.map(node => node.id.name));
const pages = {};
for (const node of extra) {
  const name = /^__(.+)_references$/.exec(node.id.name)?.[1];
  if (!name || !definitions.has(name) || !usages.has(`__${name}_usage`)) continue;
  for (const reference of node.body.body[0].argument.elements) {
    const citedPages = /^Elements of Programming, ch\. \d+, (?:§[\d.]+, )?pp?\. (\d+(?:–\d+)?(?:,\s*\d+(?:–\d+)?)*)/.exec(reference.value)?.[1];
    if (!citedPages) continue;
    for (const span of citedPages.trim().split(/,\s*/)) {
      const [first, last = first] = span.split('–').map(Number);
      for (let page = first; page <= last; ++page) {
        (pages[page] ??= new Set()).add(name);
      }
    }
  }
}
const index = Object.fromEntries(Object.entries(pages).map(([page, names]) => [page, [...names].sort()]));
if (!Object.keys(index).length) throw new Error('Published catalog contains no EoP page references');
await writeFile(new URL('../src/lab/eop-examples.json', import.meta.url),
  '{\n' + Object.entries(index).map(([page, names]) => `  "${page}": ${JSON.stringify(names)}`).join(',\n') + '\n}\n');
