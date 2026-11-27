import { supabase, isSupabaseConfigured } from './supabase';
import fallbackNoticias from '../data/noticias.json';
import fallbackEdiciones from '../data/ediciones.json';

export const CATEGORIAS = [
  'Lambayeque',
  'Regional',
  'Nacional',
  'Opinión',
  'Cultura',
  'Deportes',
] as const;

export interface CategoriaMeta {
  nombre: (typeof CATEGORIAS)[number];
  slug: string;
  descripcion: string;
}

export const CATEGORIAS_META: CategoriaMeta[] = [
  {
    nombre: 'Lambayeque',
    slug: 'lambayeque',
    descripcion: 'Noticias de última hora de Chiclayo, Lambayeque, Ferreñafe y los distritos del Valle La Leche en Tribuna Mochica.',
  },
  {
    nombre: 'Regional',
    slug: 'regional',
    descripcion: 'Actualidad regional, obras, clima, gestión pública y desarrollo del norte peruano en Tribuna Mochica.',
  },
  {
    nombre: 'Nacional',
    slug: 'nacional',
    descripcion: 'Cobertura nacional de política, economía, salud, educación y sociedad en el Perú desde Tribuna Mochica.',
  },
  {
    nombre: 'Opinión',
    slug: 'opinion',
    descripcion: 'Columnas editoriales, análisis y tribuna ciudadana sobre la realidad de Lambayeque y el Perú.',
  },
  {
    nombre: 'Cultura',
    slug: 'cultura',
    descripcion: 'Identidad mochica, historia, arte, educación y agenda cultural de Lambayeque y Chiclayo.',
  },
  {
    nombre: 'Deportes',
    slug: 'deportes',
    descripcion: 'Resultados, crónicas y actualidad del deporte en Lambayeque, Chiclayo y todo el Perú.',
  },
];

export function getCategoriaSlug(categoria: string): string {
  const norm = String(categoria || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
  const found = CATEGORIAS_META.find(
    (c) =>
      c.slug === norm ||
      c.nombre
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') === norm
  );
  return found ? found.slug : 'lambayeque';
}

export function getCategoriaBySlug(slug: string): CategoriaMeta | null {
  const norm = String(slug || '').toLowerCase().trim();
  return CATEGORIAS_META.find((c) => c.slug === norm) || null;
}

export function toPeruIsoDateTime(isoDate?: string, fallbackTimestamp?: string): string {
  if (fallbackTimestamp && fallbackTimestamp.includes('T')) {
    return fallbackTimestamp;
  }
  const clean = String(isoDate || '').trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    return `${clean}T12:00:00-05:00`;
  }
  if (clean.includes('T')) return clean;
  return new Date().toISOString();
}

export interface Noticia {
  id: string;
  slug: string;
  titular: string;
  bajada: string;
  contenido: string;
  categoria: string;
  autor: string;
  fecha: string;
  fechaIso: string;
  updatedAt?: string;
  imagen: string;
  altImagen: string;
  destacada: boolean;
}

export interface Edicion {
  id: string;
  numero: number;
  fecha: string;
  fechaIso: string;
  titular: string;
  bajada: string;
  titularesSecundarios: string[];
  paginas: number;
  peso: string;
  archivoPdf: string;
  portadaImg: string;
  destacada: boolean;
}

function mapFallbackNoticias(): Noticia[] {
  return fallbackNoticias.map((n: any, idx: number) => ({
    id: n.id,
    slug: n.id,
    titular: n.titular,
    bajada: n.bajada,
    contenido: n.contenido,
    categoria: n.categoria || 'Lambayeque',
    autor: n.autor || 'Redacción Tribuna Mochica',
    fecha: n.fecha,
    fechaIso: n.fechaIso || '2026-09-04',
    updatedAt: n.fechaIso || '2026-09-04',
    imagen: n.imagen || '/noticias/ultima-noticia.jpg',
    altImagen: n.altImagen || n.titular,
    destacada: idx === 0,
  }));
}

function mapFallbackEdiciones(): Edicion[] {
  return fallbackEdiciones.map((e: any) => ({
    id: String(e.numero),
    numero: Number(e.numero),
    fecha: e.fecha,
    fechaIso: e.fechaIso || '2026-09-04',
    titular: e.titular,
    bajada: e.bajada || '',
    titularesSecundarios: Array.isArray(e.titularesSecundarios) ? e.titularesSecundarios : [],
    paginas: Number(e.paginas) || 12,
    peso: e.peso || '',
    archivoPdf: e.archivoPdf,
    portadaImg: e.portadaImg || '/ediciones/portada-placeholder.svg',
    destacada: Boolean(e.destacada),
  }));
}

export async function getNoticias(categoria?: string): Promise<Noticia[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase
        .from('noticias')
        .select('*')
        .order('destacada', { ascending: false })
        .order('fecha_iso', { ascending: false })
        .order('created_at', { ascending: false });

      if (categoria && categoria !== 'Todas') {
        query = query.eq('categoria', categoria);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((row: any) => ({
          id: row.id,
          slug: row.slug,
          titular: row.titular,
          bajada: row.bajada,
          contenido: row.contenido,
          categoria: row.categoria || 'Lambayeque',
          autor: row.autor || 'Juan César Cabrejos Becerra',
          fecha: row.fecha_texto,
          fechaIso: row.fecha_iso,
          updatedAt: row.updated_at || row.created_at || row.fecha_iso,
          imagen: row.imagen_url || '/noticias/ultima-noticia.jpg',
          altImagen: row.alt_imagen || row.titular,
          destacada: Boolean(row.destacada),
        }));
      }
      if (!error && data && data.length === 0 && categoria && categoria !== 'Todas') {
        return [];
      }
    } catch (err) {
      console.error('Error leyendo noticias de Supabase:', err);
    }
  }

  const local = mapFallbackNoticias();
  if (categoria && categoria !== 'Todas') {
    return local.filter((n) => n.categoria.toLowerCase() === categoria.toLowerCase());
  }
  return local;
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!error && data) {
        return {
          id: data.id,
          slug: data.slug,
          titular: data.titular,
          bajada: data.bajada,
          contenido: data.contenido,
          categoria: data.categoria || 'Lambayeque',
          autor: data.autor || 'Juan César Cabrejos Becerra',
          fecha: data.fecha_texto,
          fechaIso: data.fecha_iso,
          updatedAt: data.updated_at || data.created_at || data.fecha_iso,
          imagen: data.imagen_url || '/noticias/ultima-noticia.jpg',
          altImagen: data.alt_imagen || data.titular,
          destacada: Boolean(data.destacada),
        };
      }
    } catch (err) {
      console.error('Error buscando noticia en Supabase:', err);
    }
  }

  const local = mapFallbackNoticias();
  return local.find((n) => n.slug === slug || n.id === slug) || null;
}

export async function getEdiciones(): Promise<Edicion[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('ediciones')
        .select('*')
        .order('numero', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row: any) => ({
          id: String(row.numero),
          numero: Number(row.numero),
          fecha: row.fecha_texto,
          fechaIso: row.fecha_iso,
          titular: row.titular,
          bajada: row.bajada || '',
          titularesSecundarios: Array.isArray(row.titulares_secundarios) ? row.titulares_secundarios : [],
          paginas: Number(row.paginas) || 12,
          peso: row.peso || '',
          archivoPdf: row.archivo_pdf_url,
          portadaImg: row.portada_img_url || '/ediciones/portada-placeholder.svg',
          destacada: Boolean(row.destacada),
        }));
      }
    } catch (err) {
      console.error('Error leyendo ediciones de Supabase:', err);
    }
  }

  return mapFallbackEdiciones().sort((a, b) => b.numero - a.numero);
}

export async function getEdicionById(id: string): Promise<Edicion | null> {
  const num = Number(id);
  if (isSupabaseConfigured && supabase && !Number.isNaN(num)) {
    try {
      const { data, error } = await supabase
        .from('ediciones')
        .select('*')
        .eq('numero', num)
        .maybeSingle();

      if (!error && data) {
        return {
          id: String(data.numero),
          numero: Number(data.numero),
          fecha: data.fecha_texto,
          fechaIso: data.fecha_iso,
          titular: data.titular,
          bajada: data.bajada || '',
          titularesSecundarios: Array.isArray(data.titulares_secundarios) ? data.titulares_secundarios : [],
          paginas: Number(data.paginas) || 12,
          peso: data.peso || '',
          archivoPdf: data.archivo_pdf_url,
          portadaImg: data.portada_img_url || '/ediciones/portada-placeholder.svg',
          destacada: Boolean(data.destacada),
        };
      }
    } catch (err) {
      console.error('Error buscando edición en Supabase:', err);
    }
  }

  const local = mapFallbackEdiciones();
  return local.find((e) => String(e.numero) === String(id) || e.id === id) || null;
}

export function formatFechaHoyEs(): string {
  try {
    const fecha = new Intl.DateTimeFormat('es-PE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'America/Lima',
    }).format(new Date());
    return fecha.charAt(0).toUpperCase() + fecha.slice(1);
  } catch {
    return 'Lambayeque, Perú';
  }
}
