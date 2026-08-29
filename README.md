# 📰 TRIBUNA MOCHICA — Semanario Digital e Impreso
### *La Voz del Valle La Leche*
**Director Fundador:** Juan César Cabrejos Becerra  
**Dirección Digital:** Juan César Cabrejos Purizaca  
**Ámbito:** Íllimo, Túcume, Mochumí, Pacora, Jayanca, Pítipo y Ferreñafe (Lambayeque, Perú).

---

## 🌟 Descripción del Proyecto
Sitio web oficial desarrollado en **Astro**, diseñado especialmente con enfoque **Mobile-First**, estética clásica de periódico (fondo tono papel de imprenta, tipografías elegantes, paleta mochica vino y ocre dorado, sin azules) y máxima facilidad de uso para periodistas y lectores de todas las edades.

### ✨ Características Principales
1. **Edición Actual en PDF Destacada:** Visor en línea, descarga directa de alta velocidad y botón para compartir por WhatsApp.
2. **Hemeroteca de Ediciones Pasadas:** Archivo histórico con buscador para consultar y descargar cualquier semanario anterior.
3. **Sección de Últimas Noticias:** Publicación de notas de prensa, crónicas y opiniones con autor, categoría, fecha, tiempo de lectura y fotos.
4. **Buscador y Filtros en Vivo:** Los lectores pueden buscar noticias por título o categoría (Agricultura, Valle La Leche, Cultura, Opinión) al instante.
5. **Cero Complicaciones de Programación:** Todo el contenido se gestiona de forma sencilla mediante archivos JSON o Markdown editables directamente desde el navegador en GitHub.
6. **Despliegue Automático en Vercel:** Cada vez que subes una nueva edición o noticia en GitHub, la web se actualiza sola en menos de 30 segundos.

---

## 📁 Estructura del Proyecto

```text
tribuna-mochica/
├── public/                     # Archivos estáticos públicos
│   ├── ediciones/              # PDFs y fotos de portadas de las ediciones semanales
│   │   ├── edicion-124.pdf
│   │   ├── edicion-124.jpg
│   │   └── ...
│   ├── noticias/               # Fotografías de las noticias publicadas
│   ├── images/
│   │   └── logo.jpg            # Logotipo oficial de Tribuna Mochica
│   └── favicon.svg             # Ícono de la pestaña del navegador
├── src/
│   ├── components/             # Componentes modulares
│   │   ├── Header.astro        # Cabecera con logo, director y menú
│   │   ├── Footer.astro        # Pie de página con créditos y contacto
│   │   ├── NewsCard.astro      # Tarjetas de noticias
│   │   ├── EditionCard.astro   # Tarjetas de ediciones en PDF
│   │   └── ShareButtons.astro  # Botones de WhatsApp, Facebook y Copiar
│   ├── data/                   # ¡AQUÍ SE EDITA EL CONTENIDO!
│   │   ├── config.json         # Datos del periódico (Director, teléfonos, email)
│   │   ├── ediciones.json      # Listado de ediciones semanales en PDF
│   │   └── noticias.json       # Listado de noticias redactadas
│   ├── layouts/
│   │   └── BaseLayout.astro    # Plantilla base con fuentes y estilos
│   ├── pages/                  # Páginas y rutas de la web
│   │   ├── index.astro         # Portada principal
│   │   ├── contacto.astro      # Página de contacto editorial
│   │   ├── noticias/           # Sección de noticias
│   │   │   ├── index.astro     # Catálogo con buscador
│   │   │   └── [slug].astro    # Detalle de cada noticia individual
│   │   └── ediciones/          # Sección de PDFs
│   │       ├── index.astro     # Hemeroteca
│   │       └── [numero].astro  # Visor PDF individual
│   └── styles/
│       └── global.css          # Estilos globales y paleta de colores
├── astro.config.mjs            # Configuración de Astro
├── package.json                # Dependencias del proyecto
├── vercel.json                 # Configuración para Vercel
├── GUIA_PASO_A_PASO.md         # 📘 Guía completa sin programación
└── README.md
```

---

## 🚀 Guías de Inicio Rápido
Consulta el archivo **`GUIA_PASO_A_PASO.md`** para ver el tutorial detallado paso a paso con capturas explicativas para subir la web a GitHub, conectarla con Vercel y subir nuevos PDFs semanales.
