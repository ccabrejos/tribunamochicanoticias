# 📰 Tribuna Mochica - Noticias

Sitio web oficial para el periódico digital **Tribuna Mochica** (*"La Voz del Valle La Leche"*), dirigido por **Juan César Cabrejos Becerra**.

Este proyecto está desarrollado con **Astro**, diseñado para ser ultra rápido, ligero, 100% responsivo en teléfonos celulares y completamente dinámico para visualizar y descargar las ediciones semanales en PDF.

---

## 🎨 Paleta de Colores Oficial (Sin color azul)
* **Color Principal / Cabecera (Borgoña / Vino Tinto):** `#7A0C16`
* **Color de Acento (Dorado / Oro Mochica):** `#C29B38`
* **Fondo de Página (Crema Cálido Suave):** `#F6F4EE`
* **Fondo de Tarjetas:** `#FFFFFF`
* **Neutros Oscuros (Negro Carbón Ébano):** `#1A1615` *(Reemplaza todo tono azul)*

---

## 🚀 Guía Paso a Paso para Subir a GitHub y Vercel (Sin saber programación)

### Paso 1: Crear tu repositorio en GitHub
1. Entra a [GitHub.com](https://github.com/) e inicia sesión con tu cuenta.
2. Haz clic en el botón verde **"New"** (Nuevo repositorio).
3. Escribe como nombre: `tribuna-mochica`.
4. Elige **"Public"** (Público) y haz clic en **"Create repository"**.
5. Descomprime este archivo ZIP en tu computadora.
6. Sube los archivos a GitHub (puedes arrastrar la carpeta o usar GitHub Desktop).

---

### Paso 2: Conectar y Publicar en Vercel (Gratis en 1 minuto)
1. Entra a [Vercel.com](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..."** ➔ **"Project"**.
3. Verás tu repositorio `tribuna-mochica`. Haz clic en **"Import"**.
4. Vercel detectará automáticamente **Astro**. No necesitas cambiar ninguna configuración.
5. Haz clic en **"Deploy"**.
6. ¡Listo! En 30 segundos tu web estará en vivo con un enlace como `https://tribuna-mochica.vercel.app` (y podrás asignarle tu propio dominio `.pe` o `.com` cuando desees).

---

## 📝 Cómo Publicar una Nueva Edición Semanal (En 3 simples pasos)

Cada vez que tu padre finalice una nueva edición semanal, solo haces lo siguiente:

1. **Guarda el PDF de la edición:**
   Copia el archivo PDF dentro de la carpeta `public/ediciones/` (por ejemplo: `edicion-12.pdf`).

2. **Guarda la imagen de portada:**
   Guarda una captura o imagen de la primera página en `public/ediciones/` (por ejemplo: `portada-12.jpg` o `portada-12.svg`).

3. **Agrega los datos en `src/data/ediciones.json`:**
   Abre el archivo `src/data/ediciones.json` y agrega al inicio la nueva edición:
   ```json
   {
     "id": "12",
     "numero": "Edición N.° 12",
     "fecha": "Lunes 31 de agosto de 2026",
     "fechaCorta": "31 Ago 2026",
     "destacada": true,
     "titularPrincipal": "Aquí escribes el gran titular de la semana",
     "descripcion": "Resumen de las noticias principales del Valle La Leche.",
     "portadaImg": "/ediciones/portada-12.jpg",
     "pdfUrl": "/ediciones/edicion-12.pdf",
     "tamano": "2.5 MB",
     "paginas": 8,
     "titulares": [
       "Titular destacado 1",
       "Titular destacado 2",
       "Titular destacado 3"
     ]
   }
   ```
   *(Recuerda cambiar `"destacada": false` en la edición anterior).*

4. Haces `git push` o subes el cambio a GitHub y **Vercel actualizará la web automáticamente en segundos**.

---

## 📱 Características Incluidas
* **Visor PDF Interactivo:** Los lectores pueden hojear el periódico directamente en la web sin salir de ella.
* **Descarga Inmediata:** Botón de descarga en un clic para cada edición.
* **Buscador en Tiempo Real:** Filtra instantáneamente por titular, número de edición o fecha.
* **Sección "Envíanos tu Noticia":** Formulario rápido y botón directo para enviar reportes al WhatsApp del Director.
* **100% Adaptado a Celulares:** Botones grandes, texto nítido y carga instantánea.
