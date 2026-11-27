import type { APIRoute } from 'astro';
import { getNoticias } from '../lib/data';

function escapeXml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site ? site.toString() : 'https://www.tribunamochica.com').replace(/\/$/, '');
  const noticias = (await getNoticias()).slice(0, 50);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${noticias
  .map(
    (n) => `  <url>
    <loc>${escapeXml(`${baseUrl}/noticia/${n.slug}`)}</loc>
    <news:news>
      <news:publication>
        <news:name>Tribuna Mochica</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(n.fechaIso || new Date().toISOString().slice(0, 10))}</news:publication_date>
      <news:title>${escapeXml(n.titular)}</news:title>
      <news:keywords>${escapeXml(`${n.categoria}, Lambayeque, Chiclayo, Perú`)}</news:keywords>
    </news:news>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
    },
  });
};
