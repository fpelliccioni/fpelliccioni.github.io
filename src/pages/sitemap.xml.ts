import type { APIRoute } from 'astro';
import { publicEntries, absolute } from '../lib/site';
import { analyzerRoutes } from '../lib/analyzer';
export const GET: APIRoute = async () =>
  new Response(
    `<?xml version="1.0" encoding="utf-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[
      ...(await publicEntries()).map((p) => p.data.url),
      ...analyzerRoutes,
    ]
      .sort()
      .map((url) => `<url><loc>${absolute(url)}</loc></url>`)
      .join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
