import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

// Standalone public HTML bypasses Vite's normal asset fingerprinting.
// Keep legacy asset URLs available, but give the evolving lab immutable URLs.
const root = path.resolve('dist');
const versioned = new Map();
for (const route of ['algorithms', 'algoritmos', 'algorithms-catalog']) {
  const file = path.join(root, route, 'index.html');
  const html = fs
    .readFileSync(file, 'utf8')
    .replace(/\b(src|href)="(\/[^"?#]+\.(?:js|css|svg))"/g, (attribute, name, url) => {
      if (!versioned.has(url)) {
        const source = path.join(root, url);
        const bytes = fs.readFileSync(source);
        const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 12);
        const ext = path.extname(url);
        const target = url.slice(0, -ext.length) + '.' + hash + ext;
        fs.writeFileSync(path.join(root, target), bytes);
        versioned.set(url, target);
      }
      return `${name}="${versioned.get(url)}"`;
    });
  fs.writeFileSync(file, html);
}
console.log(`Versioned ${versioned.size} lab assets across three entry pages.`);
