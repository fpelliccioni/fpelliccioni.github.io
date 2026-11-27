import { copyFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { build } from 'esbuild';

const output = (process.argv.includes('--dev') ? 'public' : 'dist') + '/assets/js/algorithms';
const require = createRequire(import.meta.url);

await build({
  entryPoints: ['src/lab/quickjs.js'],
  outfile: output + '/quickjs.js',
  bundle: true,
  format: 'iife',
  globalName: 'LabQuickJS',
  platform: 'browser',
  target: 'es2020',
  loader: { '.wasm': 'binary' },
  minify: true,
});

await copyFile(require.resolve('acorn'), output + '/acorn-modern.js');

const tsDirectory = dirname(require.resolve('typescript'));
const libraries = {};
async function includeLibrary(name) {
  if (Object.hasOwn(libraries, '/' + name)) return;
  const source = await readFile(join(tsDirectory, name), 'utf8');
  libraries['/' + name] = source;
  for (const match of source.matchAll(/<reference lib="([^"]+)"/g)) {
    await includeLibrary('lib.' + match[1] + '.d.ts');
  }
}
await includeLibrary('lib.es2020.d.ts');

await build({
  entryPoints: ['src/lab/typecheck-worker.js'],
  outfile: output + '/typecheck-worker.js',
  bundle: true,
  platform: 'browser',
  target: 'es2020',
  external: ['fs', 'path', 'os', 'crypto', 'perf_hooks', 'inspector', 'module', 'source-map-support'],
  define: { __LAB_TYPESCRIPT_LIBRARIES__: JSON.stringify(libraries) },
  minify: true,
});
