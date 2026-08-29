# Tribuna Mochica — Periódico Digital

Sitio web editorial de Tribuna Mochica desarrollado con Astro y preparado para despliegue automático en Vercel.

## 🚀 Inicio Rápido

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Compilar para producción:
   ```bash
   npm run build
   ```

## 📰 ¿Cómo publicar cada semana?

### 1. Subir la edición impresa completa en PDF
- Guarda el archivo PDF en `public/ediciones/` (ej. `edicion-12.pdf`).
- Guarda la imagen de la portada en `public/ediciones/` (ej. `edicion-12.jpg`).
- Agrega la entrada al inicio de `src/data/ediciones.json`.

### 2. Publicar una noticia individual
- Abre `src/data/noticias.json`.
- Agrega un nuevo objeto al inicio de la lista con su título, autor, fecha, categoría, foto y contenido.
