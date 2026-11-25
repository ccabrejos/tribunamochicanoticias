# Guía de configuración paso a paso (Supabase + Vercel)

Esta guía te toma unos **10 minutos** y se hace **una sola vez**. Después de esto, tu papá podrá publicar noticias y ediciones PDF desde `https://tribunamochica.vercel.app/redaccion` sin tocar GitHub ni código.

---

## Paso 1: Reemplazar los archivos en GitHub

1. Descomprime el archivo `tribuna-mochica-nuevo.zip` en tu computadora.
2. Reemplaza el contenido de tu repositorio en GitHub con los archivos de esa carpeta (respetando la carpeta `public/` que ya incluye tus logos y las ediciones 8 a 12).
3. Apenas subas los cambios, Vercel volverá a desplegar el sitio con el nuevo diseño minimalista de noticias (mientras configuras Supabase, el sitio igual mostrará tus ediciones 8 a 12 y tu noticia actual automáticamente).

---

## Paso 2: Crear el proyecto gratuito en Supabase

1. Entra a [https://supabase.com](https://supabase.com) e inicia sesión (puedes usar tu cuenta de GitHub).
2. Haz clic en **New project**.
3. Nombre sugerido: `tribuna-mochica`. Elige una contraseña para la base de datos y la región más cercana (por ejemplo, `South America (São Paulo)` o `US East`).
4. Espera 1–2 minutos a que termine de crearse.

---

## Paso 3: Crear las tablas y la carpeta de archivos (1 solo clic)

1. En el menú izquierdo de Supabase, entra a **SQL Editor**.
2. Haz clic en **New query**.
3. Abre el archivo `supabase-setup.sql` de este proyecto, copia **todo su contenido** y pégalo en el editor.
4. Presiona el botón verde **Run**.
5. Debe salirte `Success. No rows returned`. Eso ya creó:
   - La tabla `noticias` (con tu noticia actual precargada).
   - La tabla `ediciones` (con tus ediciones 8 a 12 precargadas).
   - El almacenamiento público `tribuna-media` para fotos y archivos PDF de hasta 50 MB.
   - La seguridad para que cualquiera pueda leer el diario, pero **solo usuarios con clave** puedan publicar, editar o borrar.

---

## Paso 4: Crear el usuario y contraseña de tu papá

1. En el menú izquierdo de Supabase, ve a **Authentication** → **Users**.
2. Haz clic en **Add user** → **Create new user**.
3. Ingresa el correo de tu papá (por ejemplo, `central.mochica.de.prensa@gmail.com`) y una contraseña fácil de recordar para él.
4. Marca la casilla **Auto Confirm User** (muy importante para que pueda entrar de inmediato sin confirmar por correo).
5. Haz clic en **Create user**.

---

## Paso 5: Conectar Supabase con Vercel

1. En Supabase, ve a **Project Settings** (ícono de engranaje abajo a la izquierda) → **API** (o **Data API**).
2. Copia dos datos:
   - **Project URL** (algo como `https://abcdefgh.supabase.co`)
   - **anon public** key (la clave pública larga que empieza por `eyJ...` o `sb_publishable_...`)
3. Entra a tu proyecto en [https://vercel.com](https://vercel.com) → **Settings** → **Environment Variables**.
4. Agrega estas 2 variables (marcando Production, Preview y Development):
   - Nombre: `PUBLIC_SUPABASE_URL` → Valor: tu Project URL
   - Nombre: `PUBLIC_SUPABASE_ANON_KEY` → Valor: tu clave `anon public`
5. Ve a la pestaña **Deployments** en Vercel, haz clic en los tres puntitos `...` del último despliegue y presiona **Redeploy**.

---

## Paso 6: Dejarle listo el acceso a tu papá

1. Abre `https://tribunamochica.vercel.app/redaccion` en la computadora de tu papá.
2. Inicia sesión con el correo y contraseña que creaste en el Paso 4 y guarda la contraseña en Chrome/Edge cuando el navegador lo pregunte.
3. Guárdale esa página en la **barra de favoritos** con el nombre **"Publicar en Tribuna Mochica"**.
4. ¡Listo! Cada vez que abra ese favorito verá solo dos botones grandes: **Publicar una noticia** y **Subir edición en PDF**.
