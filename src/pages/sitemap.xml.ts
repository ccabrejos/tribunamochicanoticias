import type { APIRoute } from 'astro';
import { getNoticias, getEdiciones } from '../lib/data';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site ? site.toString() : 'https://tribunamochica.vercel.app').replace(/\/$/, '');
  const [noticias, ediciones] = await Promise.all([getNoticias(), getEdiciones()]);

  const staticPages = [
    { loc: `${baseUrl}/`, changefreq: 'daily', priority: '1.0' },
    { loc: `${baseUrl}/noticias`, changefreq: 'daily', priority: '0.9' },
    { loc: `${baseUrl}/ediciones`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/enviar-noticia`, changefreq: 'monthly', priority: '0.5' },
  ];

  const noticiaUrls = noticias.map((n) => ({
    loc: `${baseUrl}/noticia/${n.slug}`,
    lastmod: n.fechaIso || undefined,
    changefreq: 'weekly',
    priority: '0.8',
  }));

  const edicionUrls = ediciones.map((e) => ({
    loc: `${baseUrl}/edicion/${e.numero}`,
    lastmod: e.fechaIso || undefined,
    changefreq: 'monthly',
    priority: '0.7',
  }));

  const allUrls = [...staticPages, ...noticiaUrls, ...edicionUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${escapeXml(u.lastmod)}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800',
    },
  });
};
