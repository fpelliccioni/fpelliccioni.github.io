# Components Programming

Fernando Pelliccioni's bilingual programming blog, built with Astro 7 and hosted
on GitHub Pages at https://componentsprogramming.com.

## Develop and validate

Node.js 24 is required (`.nvmrc`). Ruby, Bundler and Jekyll are no longer needed.

```sh
npm ci
npm run dev
npm run check
npm run build
npm test
npm run preview
```

`dev` and `preview` print their local URLs. Production files are generated in
`dist/`. Only the contents of `public/` and Astro's generated pages are deployed;
source Markdown, drafts, tests and historical scratch files are not copied.

## Design and source

The editorial theme uses a warm paper background, terracotta accents, Manrope
for navigation and Newsreader for long-form reading. Fonts are self-hosted.
The default theme is light; the optional dark theme is saved locally. The blog
uses plain browser JavaScript for mobile navigation, archive search and theme
selection. There is no React runtime or third-party theme dependency.

- `src/layouts/Base.astro`: document, navigation, metadata and footer.
- `src/components/Home.astro`: front page and searchable archive.
- `src/components/Article.astro`: reading layout, contents and related articles.
- `src/styles/global.css`: responsive editorial design and code styles.
- `src/lib/site.ts`: localized copy, dates, URLs and content helpers.
- `src/content.config.ts`: validated Astro content collection schema.

## Write and translate

Articles and institutional pages live in `src/content/blog/en/` and
`src/content/blog/es/`. Frontmatter currently uses JSON (valid YAML), followed
by Markdown. Normal YAML frontmatter is also supported by Astro.

```yaml
---
title: An article title
url: /an-article-title/
lang: en
date: 2026-11-12T12:00:00+01:00
type: post
published: true
translationKey: an-article-title
description: A short summary.
topic: C++ / Algorithms
# Optional: cover: { src: /images/example.jpg, alt: A descriptive caption, caption: Photo credit }
comments: true
tags: [algorithms, cpp]
---
Article content, with standard Markdown code fences.
```

Use `type: page` for institutional pages and `type: home` for the two existing
front-page records. `url` explicitly preserves each published permalink,
independent of filename and date. Dates are displayed in the article's language
with the historical Buenos Aires publication timezone. Future-dated content is
not published. For drafts, set `published: false`.

Give actual translations the same `translationKey`. This generates reciprocal
`hreflang` links and the language switch. On an untranslated article, the
language switch goes to the other language's front page.

Local images and downloads belong in `public/images/`, referenced as
`/images/filename`. Use fenced code blocks instead of Liquid highlight tags.
Existing named anchors and technical examples were retained during migration.
MathJax 3.2.2 renders the existing TeX notation over HTTPS; inline code formulas
are supported, and fenced code blocks are excluded. Disqus loads only when a
reader presses the comments button, using the original canonical article URL.
Analytics is not enabled.

## Analyzer and archived experiments

The seven analyzer pages are preserved as standalone static HTML in
`public/algorithms*/` and `public/algoritmos/`. Their scripts and styles remain
in `public/assets/`. They intentionally retain their existing UI. Root-domain
asset references were made relative so the analyzer also works in local
previews. No algorithm implementation was rewritten.

`public/experiments/`, `public/chartex/`, historical images, downloadable files
and existing asset URLs are preserved. Historical unpublished source directories
outside `src/` and `public/` are kept in Git but do not become website content.

## Compatibility checks

`tests/fixtures/legacy-routes.json` records the 54 published routes and nine
drafts from the Jekyll version at commit `4553bc5`. `legacy-content.json` records
article code-block hashes, image references and fragment anchors. Tests verify:

- Published URLs, canonical metadata, languages, translation links and drafts.
- Every original article code block, image and fragment anchor.
- The seven analyzer HTML snapshots byte for byte, after localizing asset URLs.
- Complete bilingual sitemap and all six full-content Atom/RSS feeds.
- Local navigation and article media targets.

A missing book-cover image at `/images/fm2gp_portada.jpg` was restored from the
authors' book site, https://www.fm2gp.com/images/FM2GPCoverSmall.png. Its existing
URL is retained. Old links to `/about/` and Meetup URLs without a scheme were
corrected during migration.

## GitHub Pages deployment

`.github/workflows/astro.yml` runs install, Astro/TypeScript diagnostics, static
build and migration tests for pull requests. Only pushes to `master` or manual
workflow runs upload and deploy `dist/` to the `github-pages` environment.
The custom domain remains in `public/CNAME`; `astro.config.mjs` sets canonical
URLs to https://componentsprogramming.com. Existing Atom and RSS endpoints and
`/404.html` remain available.

**One-time cutover:** before merging this migration, change the repository's
Settings → Pages → Build and deployment → Source to **GitHub Actions** (or use
`gh api --method PUT repos/fpelliccioni/fpelliccioni.github.io/pages -f build_type=workflow`).
This keeps the currently published site live and prevents the former Jekyll
branch build from competing with Astro's deployment. Then merge the migration
PR and verify the `Astro checks and GitHub Pages` deployment succeeds.

The migration PR does not itself change the production Pages setting or publish
the new design. For rollback, revert the migration commit and restore the
previous Pages source (`master`, `/`).

## Attribution

Manrope and Newsreader are distributed with their bundled font licenses.
The analyzer and older repository content retain their existing licenses and
attribution. See `LICENSE` and the headers of the relevant source files.

## Comparing the editorial and technical designs

The editorial design remains the default. Add `?design=technical` to any blog
URL in a local preview to try the technical variant, or `?design=editorial` to
compare. The preview bar switches between them without changing the page or
content. The chosen design carries across blog navigation in that browser tab;
close the preview bar to return to the regular editorial site.

The technical design has its own light/dark preference, independent of the
editorial palette. Both preferences are local to the reader's browser. Preview
selection does not change the server, public default, canonical URLs, feeds,
content or the standalone analyzer. The selector is hidden on normal visits.

Technical design styles live in `src/styles/technical.css`; preview behavior is
in `src/scripts/design-preview.ts`. JetBrains Mono is self-hosted and its license
is distributed in `public/licenses/JetBrainsMono.txt`.
