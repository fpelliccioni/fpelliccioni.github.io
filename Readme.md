# Components Programming

Personal bilingual blog by Fernando Pelliccioni, published at
https://componentsprogramming.com through GitHub Pages. Built with Jekyll and a
customized Balzac theme. The algorithm analyzer lives in this same repository,
with independent layouts and assets.

## Local development

Use Ruby 3.3 (see `.ruby-version`) and Bundler 4.0.23. On macOS with Homebrew:

```sh
brew install ruby@3.3
export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"
gem install bundler -v 4.0.23
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

Open http://127.0.0.1:4000. Blog assets use relative URLs so local previews do not
load production styles or scripts. Canonical and Open Graph URLs use the public
`url` from `_config.yml`. GitHub Pages 232 pins Jekyll 3.10; keep the dependency
versions aligned with https://pages.github.com/versions/.

## Validation

```sh
bundle exec jekyll build
bundle exec ruby scripts/check_site.rb
```

The regression check verifies generated blog pages, draft exclusion, local
resources, HTTPS dependencies, canonical URLs, reciprocal translation links,
Spanish dates, sitemap coverage, the custom 404, and all Atom/RSS feeds.
Optionally pass a previous build directory to compare the analyzer's generated
HTML byte for byte:

```sh
bundle exec ruby scripts/check_site.rb /path/to/previous-build
```

## Content and translations

- English articles: `_posts/en/posts/`; Spanish articles: `_posts/es/posts/`.
- Institutional pages: `_posts/en/pages/` and `_posts/es/pages/`. They are stored
  as Jekyll posts for historical reasons; preserve their existing URLs.
- An article uses `type: post`; an unpublished draft also **must** have
  `published: false`. `type: draft` alone does not prevent publication.
- Give translations the same stable `translation_key`, independent of their
  filenames and publication dates. Use a unique key for each article/page pair.
  Only actual translations should share a key. Navigation and `hreflang` links
  are generated from this field.
- Use `description` for a hand-written summary. Metadata falls back to plain
  content and then the site's localized description.
- `future: false` prevents early publication of future-dated content.
- Global navigation: `_data/navigation.yml`; labels/months:
  `_data/translations.yml`.

## Templates and assets

`_layouts/default.html` owns the HTML document, header and footer. Blog layouts
inherit it. `_includes/head.html` contains metadata and head resources only.
The blog's `assets/js/scripts.js` is plain JavaScript; it does not require jQuery,
Modernizr or Retina.js. The analyzer's separate scripts are unchanged.

MathJax 3.2.2 loads over HTTPS for post layouts (or `math: true`) and supports
existing TeX delimiters, including formulas in inline code, while excluding code
blocks. Disqus loads only on pages with `comments: true`. Sharing uses a plain
link and does not load the Twitter widget script.

Analytics is disabled by default: the previous `UA-` identifier belongs to the
retired Universal Analytics service. To enable GA4, set `analytics.provider` to
`google` and configure your own `analytics.google.measurement_id` (`G-…`).

## Discovery and URLs

- `/feed.xml`: English Atom; `/feed-es.xml`: Spanish Atom.
- `/feed-rss.xml`: English RSS; `/feed-rss-es.xml`: Spanish RSS.
- Legacy `/feed.links.xml` and `/feed_original_atom.xml` remain English Atom
  endpoints using the same template.
- `/sitemap.xml` includes all published documents in both languages, including
  institutional/analyzer pages. Drafts are excluded.
- `/404.html` is the bilingual GitHub Pages error page.

Changes pushed to the configured Pages branch are published by GitHub Pages.
Work on a feature branch and review the generated output before merging.

## Theme attribution

Based on Balzac by Cole Townsend, originally forked from Minimal Mistakes by
Michael Rose. See `LICENSE` for the repository license. The original Balzac
README prohibited resale of the theme design without the author's permission.
