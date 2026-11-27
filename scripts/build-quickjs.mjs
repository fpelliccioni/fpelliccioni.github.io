import { build } from 'esbuild';

await build({
  entryPoints: ['src/lab/quickjs.js'],
  outfile:
    (process.argv.includes('--dev') ? 'public' : 'dist') + '/assets/js/algorithms/quickjs.js',
  bundle: true,
  format: 'iife',
  globalName: 'LabQuickJS',
  platform: 'browser',
  target: 'es2020',
  loader: { '.wasm': 'binary' },
  minify: true,
});
