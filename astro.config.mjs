import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
export default defineConfig({
  site: 'https://componentsprogramming.com',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: {
    processor: satteri(),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
