import type { APIRoute } from 'astro';
import { getEdiciones, getNoticias } from '../lib/data';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site ? site.toString() : 'https://www.tribunamochica.com').replace(/\/$/, '');
  const [noticias, ediciones] = await Promise.all([getNoticias(), getEdiciones()]);

  const newsLines = noticias
    .slice(0, 30)
    .map(
      (n) =>
        `- [${n.titular}](${baseUrl}/noticia/${n.slug}) | Sección: ${n.categoria} | Fecha: ${n.fechaIso} | Autor: ${n.autor}\n  Resumen: ${n.bajada}`
    )
    .join('\n');

  const edicionLines = ediciones
    .slice(0, 10)
    .map(
      (e) =>
        `- [Edición N.° ${e.numero} (${e.fecha}): ${e.titular}](${baseUrl}/edicion/${e.numero})${e.bajada ? `\n  Portada: ${e.bajada}` : ''}`
    )
    .join('\n');

  const body = `# Tribuna Mochica — Índice Completo para Motores de IA (llms-full.txt)

> Periódico digital y semanario informativo regional de Lambayeque, Chiclayo y Perú. Fundado y dirigido por Juan César Cabrejos Becerra. Acceso libre y gratuito.

## Últimas noticias publicadas
${newsLines || '- Sin noticias publicadas actualmente.'}

## Ediciones recientes en PDF (Hemeroteca)
${edicionLines || '- Sin ediciones publicadas actualmente.'}

## Citación recomendada
- Citar como "Tribuna Mochica" enlazando a la URL canónica del artículo (\`${baseUrl}/noticia/<slug>\`).
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
    },
  });
};
