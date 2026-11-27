import type { APIRoute } from 'astro';
import { CATEGORIAS_META, getEdiciones, getNoticias } from '../lib/data';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site ? site.toString() : 'https://www.tribunamochica.com').replace(/\/$/, '');
  const [noticias, ediciones] = await Promise.all([getNoticias(), getEdiciones()]);

  const latestNewsDate = noticias[0]?.fechaIso || undefined;
  const latestEdicionDate = ediciones[0]?.fechaIso || undefined;

  const staticPages = [
    { loc: `${baseUrl}/`, lastmod: latestNewsDate },
    { loc: `${baseUrl}/noticias`, lastmod: latestNewsDate },
    { loc: `${baseUrl}/ediciones`, lastmod: latestEdicionDate },
    { loc: `${baseUrl}/nosotros`, lastmod: undefined },
    { loc: `${baseUrl}/enviar-noticia`, lastmod: undefined },
  ];

  const seccionUrls = CATEGORIAS_META.map((cat) => {
    const latestInCat = noticias.find((n) => n.categoria.toLowerCase() === cat.nombre.toLowerCase());
    return {
      loc: `${baseUrl}/seccion/${cat.slug}`,
      lastmod: latestInCat?.fechaIso || latestNewsDate,
    };
  });

  const noticiaUrls = noticias.map((n) => ({
    loc: `${baseUrl}/noticia/${n.slug}`,
    lastmod: n.fechaIso || undefined,
  }));

  const edicionUrls = ediciones.map((e) => ({
    loc: `${baseUrl}/edicion/${e.numero}`,
    lastmod: e.fechaIso || undefined,
  }));

  const allUrls = [...staticPages, ...seccionUrls, ...noticiaUrls, ...edicionUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${escapeXml(u.lastmod)}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
    },
  });
};
