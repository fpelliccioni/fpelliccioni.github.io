import type { APIRoute } from 'astro';
import { publicEntries, SITE, NAME, absolute, author, labels, type Lang } from '../lib/site';
const names = ['feed', 'feed-es', 'feed-rss', 'feed-rss-es', 'feed.links', 'feed_original_atom'];
export function getStaticPaths() {
  return names.map((feed) => ({ params: { feed } }));
}
const xml = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!,
  );
export const GET: APIRoute = async ({ params }) => {
  const name = params.feed!;
  const lang: Lang = name.includes('-es') ? 'es' : 'en';
  const posts = (await publicEntries())
    .filter((p) => p.data.type === 'post' && p.data.lang === lang)
    .slice(0, 20);
  const self = absolute(`/${name}.xml`);
  const content = (p: (typeof posts)[number]) =>
    xml((p.rendered?.html || '').replace(/(href|src)="\/(?!\/)/g, `$1="${SITE}/`));
  const items = posts
    .map((p) =>
      name.startsWith('feed-rss')
        ? `<item><title>${xml(p.data.title)}</title><link>${absolute(p.data.url)}</link><guid isPermaLink="true">${absolute(p.data.url)}</guid><pubDate>${p.data.date.toUTCString()}</pubDate><description>${content(p)}</description></item>`
        : `<entry><title>${xml(p.data.title)}</title><link rel="alternate" href="${absolute(p.data.url)}"/><id>${absolute(p.data.url.replace(/\/$/, ''))}</id><published>${p.data.date.toISOString()}</published><updated>${p.data.date.toISOString()}</updated><content type="html">${content(p)}</content></entry>`,
    )
    .join('');
  const body = name.startsWith('feed-rss')
    ? `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${NAME}</title><description>${xml(labels[lang].description)}</description><link>${absolute(labels[lang].home)}</link><language>${lang}</language><atom:link rel="self" href="${self}" type="application/rss+xml"/>${items}</channel></rss>`
    : `<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${lang}" xml:base="${SITE}/"><title>${NAME}</title><subtitle>${xml(labels[lang].description)}</subtitle><link rel="self" href="${self}"/><link rel="alternate" href="${absolute(labels[lang].home)}"/><id>${self}</id><updated>${posts[0]?.data.date.toISOString() || new Date().toISOString()}</updated><author><name>${author}</name><uri>${SITE}/</uri></author>${items}</feed>`;
  return new Response(`<?xml version="1.0" encoding="utf-8"?>\n${body}`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
