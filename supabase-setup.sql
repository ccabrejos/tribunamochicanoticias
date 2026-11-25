-- =============================================================================
-- TRIBUNA MOCHICA - CONFIGURACIÓN COMPLETA DE BASE DE DATOS Y STORAGE (SUPABASE)
-- Copia y pega todo este archivo en: Supabase -> SQL Editor -> New query -> Run
-- =============================================================================

-- 1. TABLA DE NOTICIAS
create table if not exists public.noticias (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  titular text not null,
  bajada text not null,
  contenido text not null,
  categoria text not null default 'Valle La Leche',
  autor text not null default 'Juan César Cabrejos Becerra',
  fecha_texto text not null,
  fecha_iso date not null default current_date,
  imagen_url text default '/noticias/ultima-noticia.jpg',
  alt_imagen text default '',
  destacada boolean not null default false,
  created_at timestamptz not null default now()
);

-- 2. TABLA DE EDICIONES PDF (SEMANARIO / QUINCENARIO)
create table if not exists public.ediciones (
  id uuid default gen_random_uuid() primary key,
  numero integer unique not null,
  fecha_texto text not null,
  fecha_iso date not null default current_date,
  titular text not null,
  bajada text not null default '',
  titulares_secundarios text[] not null default '{}',
  paginas integer default 12,
  peso text default '',
  archivo_pdf_url text not null,
  portada_img_url text default '/ediciones/portada-placeholder.svg',
  destacada boolean not null default false,
  created_at timestamptz not null default now()
);

-- 3. SEGURIDAD (ROW LEVEL SECURITY)
-- Lectura pública para los lectores del diario; escritura solo para usuarios autenticados (tu papá / tú)
alter table public.noticias enable row level security;
alter table public.ediciones enable row level security;

drop policy if exists "Lectura pública de noticias" on public.noticias;
create policy "Lectura pública de noticias"
  on public.noticias for select
  using (true);

drop policy if exists "Escritura autenticada de noticias" on public.noticias;
create policy "Escritura autenticada de noticias"
  on public.noticias for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Lectura pública de ediciones" on public.ediciones;
create policy "Lectura pública de ediciones"
  on public.ediciones for select
  using (true);

drop policy if exists "Escritura autenticada de ediciones" on public.ediciones;
create policy "Escritura autenticada de ediciones"
  on public.ediciones for all
  to authenticated
  using (true)
  with check (true);

-- 4. BUCKET DE ALMACENAMIENTO PARA FOTOS Y PDFS (hasta 50 MB por archivo)
insert into storage.buckets (id, name, public)
values ('tribuna-media', 'tribuna-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Lectura pública de tribuna-media" on storage.objects;
create policy "Lectura pública de tribuna-media"
  on storage.objects for select
  using (bucket_id = 'tribuna-media');

drop policy if exists "Subida autenticada a tribuna-media" on storage.objects;
create policy "Subida autenticada a tribuna-media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'tribuna-media');

drop policy if exists "Actualización autenticada en tribuna-media" on storage.objects;
create policy "Actualización autenticada en tribuna-media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'tribuna-media')
  with check (bucket_id = 'tribuna-media');

drop policy if exists "Eliminación autenticada en tribuna-media" on storage.objects;
create policy "Eliminación autenticada en tribuna-media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'tribuna-media');

-- 5. CARGA INICIAL DE TUS CONTENIDOS EXISTENTES (Ediciones 8 a 12 y Noticia 1)
insert into public.noticias (slug, titular, bajada, contenido, categoria, autor, fecha_texto, fecha_iso, imagen_url, alt_imagen, destacada)
values (
  'torres-iluminacion-pimentel',
  'Instalarán 40 torres de iluminación led en Pampas de Pimentel',
  'El gobernador de Lambayeque anunció que se habilitarán cuatro rutas hacia la zona de 300 hectáreas.',
  E'El gobernador de Lambayeque anunció que se habilitarán cuatro rutas hacia la zona de 300 hectáreas, como parte de las acciones para mejorar el acceso y la seguridad en Pampas de Pimentel.\n\nLa instalación de las torres de iluminación led permitirá reforzar la transitabilidad y brindar mejores condiciones para las familias y actividades que se desarrollan en esta zona.',
  'Lambayeque',
  'Redacción Tribuna Mochica',
  '4 de septiembre de 2026',
  '2026-09-04',
  '/noticias/ultima-noticia.jpg',
  'Torres de iluminación en Pampas de Pimentel',
  true
)
on conflict (slug) do nothing;

insert into public.ediciones (numero, fecha_texto, fecha_iso, titular, bajada, titulares_secundarios, paginas, peso, archivo_pdf_url, portada_img_url, destacada)
values
(
  12,
  'Jueves 04 de setiembre de 2026',
  '2026-09-04',
  'Instalarán 40 torres de iluminación led en Pampas de Pimentel',
  'Gobernador de Lambayeque anunció que se habilitarán 4 rutas hacia la zona de 300 hectáreas.',
  array['En HNAAA 100 operaciones urológicas', 'Refuerzan Huaca de la Cruz - Illimo'],
  21,
  '7.14 MB',
  '/ediciones/edicion-12.pdf',
  '/ediciones/edicion-12.jpg',
  true
),
(
  11,
  'Viernes 28 de agosto de 2026',
  '2026-08-28',
  'Decomisan 40KG de PBC en Mocce',
  'La comisión de avanzada del Vaticano evalúa espacios para la visita del Papa León XIV, decomiso de 40 kilos de PBC, apertura de Carsa en Lambayeque y más actualidad regional.',
  array['Juan Aurich ganó 2 - 1 al Carlos Stein y se puso tercero en la liga 3', 'Nuevas alternativas para visita del Papa'],
  14,
  '3.55 MB',
  '/ediciones/edicion-11.pdf',
  '/ediciones/edicion-11.jpg',
  false
),
(
  10,
  'Martes 11 de agosto de 2026',
  '2026-08-11',
  'Bares funcionan con licencias de otros rubros',
  'Nueva edición con información local, sociedad, salud, medio ambiente e internacional: operativos en bares de JLO, inteligencia artificial y periodismo, aniversario de EsSalud Lambayeque, incendio forestal en Cañaris y otras noticias de interés.',
  array['Operativos de fiscalización en bares de José Leonardo Ortiz', 'Inteligencia Artificial y su impacto en el periodismo regional', 'Aniversario de EsSalud Lambayeque y balance asistencial'],
  12,
  '3.10 MB',
  '/ediciones/edicion-10.pdf',
  '/ediciones/edicion-10.jpg',
  false
),
(
  9,
  'Viernes 7 de agosto de 2026',
  '2026-08-07',
  'Preparativos para la visita del Papa León XIV',
  'Alerta por altas temperaturas, actualidad regional, economía, cultura, ecología y deportes.',
  array['Noticia regional destacada', 'Avances de obras en el Valle La Leche'],
  14,
  '4.73 MB',
  '/ediciones/edicion-09.pdf',
  '/ediciones/edicion-09.jpg',
  false
),
(
  8,
  'Miércoles 29 de julio de 2026',
  '2026-07-29',
  'Prevención frente al fenómeno El Niño',
  'Información nacional, política, prevención frente al fenómeno El Niño y actualidad cultural de la región Lambayeque.',
  array['Información nacional', 'Fiestas Patrias'],
  4,
  '2.08 MB',
  '/ediciones/edicion-08.pdf',
  '/ediciones/edicion-08.jpg',
  false
)
on conflict (numero) do nothing;
