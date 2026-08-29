# 📘 GUÍA PASO A PASO: DE GITHUB A VERCEL
### *Tribuna Mochica — Periódico Digital e Impreso*

Esta guía está pensada para que cualquier persona, **sin saber nada de programación**, pueda poner la página web en internet en menos de 5 minutos y gestionarla semanalmente con total comodidad.

---

## 🚀 PARTE 1: Cómo subir el proyecto a GitHub

GitHub es el lugar seguro en la nube donde guardaremos todos los archivos de la web.

1. Entra a [github.com](https://github.com) e inicia sesión con tu cuenta (o créate una gratis).
2. Haz clic en el botón verde **"New"** (Nuevo repositorio) en la esquina superior izquierda.
3. Ponle como nombre: `tribuna-mochica`.
4. Déjalo en **Public** (Público) y **no marques** ninguna otra casilla (no marques README ni .gitignore).
5. Haz clic en el botón verde **"Create repository"**.
6. En la pantalla que aparece, verás una opción que dice **"uploading an existing file"** (subir archivos existentes). Haz clic en ella.
7. Descomprime el archivo `tribuna-mochica.zip` en tu computadora.
8. Arrastra **todas las carpetas y archivos** que estaban dentro del zip (`public`, `src`, `package.json`, etc.) a la ventana de GitHub.
9. Espera que carguen los archivos, escribe abajo *"Primera versión de Tribuna Mochica"* y haz clic en el botón verde **"Commit changes"**.

¡Listo! Ya tienes todo el código en GitHub.

---

## 🌐 PARTE 2: Cómo publicar la web en Vercel (Gratis y Automático)

Vercel es el servidor que pondrá la web en internet de forma ultra rápida y sin pagar mensualidades.

1. Entra a [vercel.com](https://vercel.com) y haz clic en **"Sign Up"** o **"Log In"**.
2. Elige la opción **"Continue with GitHub"** para conectarlo directamente con tu cuenta de GitHub.
3. En el panel principal de Vercel, haz clic en **"Add New..."** -> **"Project"**.
4. Verás una lista de tus repositorios. Busca `tribuna-mochica` y haz clic en **"Import"**.
5. Vercel detectará automáticamente que es un proyecto de **Astro**.
6. No necesitas cambiar ninguna configuración. Simplemente haz clic en el botón azul **"Deploy"**.
7. En unos 30 a 45 segundos, verás una lluvia de confeti 🎉 y te dará el enlace de tu web en vivo (ejemplo: `tribuna-mochica.vercel.app`).

*Nota:* Más adelante puedes conectar tu propio dominio personalizado (como `tribunamochica.pe` o `.com`) desde la sección *Settings -> Domains* en Vercel.

---

## 📑 PARTE 3: Cómo subir una nueva edición semanal en PDF (En 1 minuto)

Cada semana que tu padre termine la edición impresa en PDF, sigue estos sencillos pasos directamente desde la página web de GitHub:

### Paso 1: Subir el PDF y su imagen de portada
1. En tu repositorio de GitHub, entra a la carpeta `public` -> `ediciones`.
2. Haz clic en **"Add file"** -> **"Upload files"**.
3. Arrastra el archivo PDF (ejemplo: `edicion-125.pdf`) y la foto de su portada (ejemplo: `edicion-125.jpg`).
4. Haz clic en **"Commit changes"**.

### Paso 2: Registrar la edición en la lista
1. Entra a la carpeta `src` -> `data` -> y haz clic en el archivo `ediciones.json`.
2. Haz clic en el ícono del lápiz ✏️ (*Edit this file*) en la esquina superior derecha.
3. Copia el siguiente bloque y pégalo justo al inicio de la lista (después del corchete `[`):

```json
  {
    "numero": 125,
    "slug": "edicion-125",
    "titulo": "Edición N° 125 — Título principal de la semana",
    "fecha": "2026-09-01",
    "fechaLegible": "Semana del 1 al 7 de Septiembre de 2026",
    "pdfUrl": "/ediciones/edicion-125.pdf",
    "portadaUrl": "/ediciones/edicion-125.jpg",
    "destacado": true,
    "paginas": 8,
    "resumen": "Escribe un breve resumen de las noticias incluidas en este número.",
    "titulares": [
      "Primer titular importante",
      "Segundo titular importante",
      "Tercer titular importante"
    ]
  },
```

4. En la edición anterior que tenía `"destacado": true`, cámbialo a `"destacado": false`.
5. Haz clic en el botón verde **"Commit changes"**.

✨ **¡Magia!** En 30 segundos, Vercel detectará el cambio y la nueva edición aparecerá automáticamente como la principal en la portada de la web.

---

## ✍️ PARTE 4: Cómo redactar y publicar una nueva noticia

1. Si tienes una foto para la noticia, súbela a `public/noticias/` (ejemplo: `mi-foto.jpg`).
2. Entra a `src/data/noticias.json` en GitHub y haz clic en el lápiz ✏️ para editar.
3. Agrega la nueva noticia al inicio del archivo:

```json
  {
    "slug": "titulo-corto-sin-espacios",
    "titulo": "Título completo y llamativo de la noticia",
    "bajada": "Resumen breve o bajada periodística de la noticia.",
    "autor": "Juan César Cabrejos Becerra",
    "categoria": "Valle La Leche",
    "fecha": "2026-09-02",
    "fechaFormateada": "2 de Septiembre de 2026",
    "imagen": "/noticias/mi-foto.jpg",
    "pieFoto": "Descripción de lo que se ve en la fotografía.",
    "tiempoLectura": "3 min",
    "destacado": true,
    "parrafos": [
      "Primer párrafo de la redacción con la información principal...",
      "Segundo párrafo con declaraciones de los involucrados...",
      "Tercer párrafo con conclusiones y llamado a la acción..."
    ]
  },
```

4. Haz clic en **"Commit changes"** y la noticia estará publicada al instante.

---

## ⚙️ PARTE 5: Cómo modificar datos generales (Director, WhatsApp, etc.)

Si deseas cambiar el teléfono de contacto, email o nombre del director:
1. Abre `src/data/config.json` en GitHub.
2. Edita los textos que desees y haz clic en **"Commit changes"**.

---

### 📞 Soporte y Ayuda
Si tienes cualquier duda al momento de subirlo a GitHub o Vercel, avísame y te guiaré en cada pantalla. ¡Muchos éxitos con este hermoso proyecto periodístico familiar!
