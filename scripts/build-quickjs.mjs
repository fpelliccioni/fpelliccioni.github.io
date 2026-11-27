import { copyFile } from 'node:fs/promises';
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
