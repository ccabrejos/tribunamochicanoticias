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

function toRfc2822(isoDate: string): string {
  try {
    const d = new Date(`${isoDate}T12:00:00-05:00`);
    if (!Number.isNaN(d.getTime())) return d.toUTCString();
  } catch {
    // fallback
  }
  return new Date().toUTCString();
}

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site ? site.toString() : 'https://www.tribunamochica.com').replace(/\/$/, '');
  const noticias = (await getNoticias()).slice(0, 30);

  const itemsXml = noticias
    .map((n) => {
      const link = `${baseUrl}/noticia/${n.slug}`;
      const imageUrl = n.imagen.startsWith('http') ? n.imagen : `${baseUrl}${n.imagen}`;
      return `    <item>
      <title>${escapeXml(n.titular)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(n.bajada)}</description>
      <category>${escapeXml(n.categoria)}</category>
      <author>central.mochica.de.prensa@gmail.com (${escapeXml(n.autor)})</author>
      <pubDate>${toRfc2822(n.fechaIso)}</pubDate>
      <media:content url="${escapeXml(imageUrl)}" medium="image" />
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Tribuna Mochica — Noticias de Lambayeque, Chiclayo y Perú</title>
    <link>${baseUrl}/</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Periódico digital y semanario informativo de Lambayeque, Chiclayo y el Valle La Leche, Perú.</description>
    <language>es-pe</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
    },
  });
};
