# Tribuna Mochica - Periódico Digital Semanal

Sitio web oficial y hemeroteca digital de **Tribuna Mochica** (*"La Voz del Valle La Leche"*), desarrollado con **Astro**, diseñado bajo filosofía **Mobile-First** y optimizado para despliegue continuo en **Vercel** vía **GitHub**.

---

## 🌟 Características Principales

- 📱 **Mobile-First & Ultra Rápido**: Carga instantánea, adaptado a celulares, tablets y computadoras.
- 📰 **Lector PDF Integrado & Descargas**: Visor modal universal interactivo para leer las ediciones en pantalla completa o descargarlas en un clic.
- 🔍 **Buscador en Tiempo Real**: Filtro instantáneo de ediciones pasadas por titular, número de edición, fecha o palabras clave.
- 📲 **Periodismo Ciudadano con WhatsApp**: Botón directo para que los lectores envíen denuncias y noticias a la redacción.
- 🌐 **Páginas Dedicadas para cada Edición**: Rutas estáticas (`/edicion/11`, etc.) con tarjetas Open Graph optimizadas para compartir en WhatsApp y Facebook.
- 🚀 **Subida Semanal Sencilla**: Añade una nueva edición en menos de 2 minutos editando un único archivo JSON.

---

## 📁 Estructura del Proyecto

```text
tribuna-mochica-web/
├── public/
│   ├── favicon.png                  # Icono del sitio
│   ├── logo.jpg                     # Logo del periódico
│   └── ediciones/                   # Archivos PDF y portadas
│       ├── edicion-11.pdf
│       ├── edicion-11.jpg
│       ├── edicion-10.pdf
│       └── edicion-10.jpg
├── src/
│   ├── data/
│   │   └── ediciones.json           # Base de datos de las ediciones semanales
│   ├── components/
│   │   ├── Header.astro             # Cabecera editorial y membrete
│   │   ├── NavButtons.astro         # Menú de accesos rápidos
│   │   ├── HeroBanner.astro         # Tarjeta de bienvenida
│   │   ├── PortadaSemana.astro      # Edición destacada actual
│   │   ├── Hemeroteca.astro         # Archivo histórico con buscador
│   │   ├── EnviarNoticia.astro      # Sección de contacto WhatsApp
│   │   ├── Footer.astro             # Pie de página editorial y créditos
│   │   └── PdfModal.astro           # Lector interactivo de PDFs
│   ├── layouts/
│   │   └── Layout.astro             # Plantilla base y metadatos SEO
│   ├── pages/
│   │   ├── index.astro              # Página principal
│   │   └── edicion/
│   │       └── [id].astro           # Páginas individuales de cada edición
│   └── styles/
│       └── global.css               # Estilos globales y diseño editorial
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## 📝 ¿Cómo subir una nueva edición cada semana? (En 2 simples pasos)

Cada vez que tengas lista la edición de la semana (por ejemplo, la **Edición N.° 12**):

### Paso 1: Guarda los archivos en `public/ediciones/`
1. Coloca tu archivo PDF: `public/ediciones/edicion-12.pdf`
2. Coloca la imagen de la portada (exportada en JPG o PNG): `public/ediciones/edicion-12.jpg`

### Paso 2: Agrega la información en `src/data/ediciones.json`
Abre el archivo `src/data/ediciones.json` y añade el nuevo bloque **al inicio** de la lista (arriba de todos):

```json
[
  {
    "id": "12",
    "numero": 12,
    "fecha": "Viernes 04 de septiembre de 2026",
    "fechaIso": "2026-09-04",
    "titular": "Titular principal de la semana",
    "bajada": "Resumen o bajada de la noticia más importante de la edición.",
    "titularesSecundarios": [
      "Noticia secundaria 1",
      "Noticia secundaria 2"
    ],
    "paginas": 14,
    "peso": "3.80 MB",
    "archivoPdf": "/ediciones/edicion-12.pdf",
    "portadaImg": "/ediciones/edicion-12.jpg",
    "destacada": true
  },
  ...
]
```

¡Listo! Al hacer `git push` a tu repositorio de GitHub, **Vercel compilará y publicará la nueva edición automáticamente en segundos**.

---

## 🚀 Despliegue en GitHub y Vercel

### 1. Subir el proyecto a GitHub

Si usas la terminal con Git:
```bash
git init
git add .
git commit -m "feat: lanzamiento web Tribuna Mochica en Astro"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/tribuna-mochica.git
git push -u origin main
```

*(O si prefieres, puedes crear el repositorio en github.com y subir la carpeta descomprimida directamente).*

### 2. Sincronizar y publicar en Vercel
1. Ingresa a [Vercel](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..."** > **"Project"**.
3. Selecciona el repositorio `tribuna-mochica` y pulsa en **"Import"**.
4. Vercel detectará automáticamente que es un proyecto **Astro**.
5. Haz clic en **"Deploy"**.
6. ¡Tu sitio web estará en línea y se actualizará automáticamente con cada nueva edición que subas!

---

## 💻 Desarrollo Local

Para probar o hacer modificaciones en tu computadora:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```
