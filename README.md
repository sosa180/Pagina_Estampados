# Taller / Estampa — Sitio web

Sitio estático listo para publicar gratis en **GitHub Pages**. Incluye:

- Galería de diseños (`script.js`, arreglo `designs`)
- Personalizador en vivo: tipo de prenda (camiseta/buzo), color de tela y estampado (catálogo o imagen propia subida por el usuario)
- Sección "Empresas" para pedidos corporativos (logos, volumen, facturación)
- Botón de pedido que abre WhatsApp con el resumen de la prenda armada

Estilo visual: neón sobre fondo oscuro, tipografía urbana en los títulos (estilo grafiti/cartel) combinada con tipografía limpia en el cuerpo de texto, para que el sitio se vea llamativo sin perder seriedad ante clientes corporativos.

## Archivos

```
index.html   → estructura de la página
styles.css   → estilos (paleta, tipografía, layout)
script.js    → galería + lógica del personalizador
```

## Cómo publicarlo en GitHub Pages (gratis)

1. Crea un repositorio nuevo en GitHub, por ejemplo `taller-estampa`.
2. Sube estos 3 archivos a la raíz del repositorio (puedes arrastrarlos desde la web de GitHub, sección "Add file → Upload files").
3. Ve a **Settings → Pages**.
4. En "Source" elige la rama `main` y la carpeta `/ (root)`. Guarda.
5. Espera 1-2 minutos. GitHub te dará una URL tipo `https://tu-usuario.github.io/taller-estampa/`.

## Qué personalizar antes de publicar

- **Número de WhatsApp**: busca `573000000000` en `index.html` y `script.js`, y cámbialo por tu número con código de país (sin +, sin espacios).
- **Diseños del catálogo**: edita el arreglo `designs` al inicio de `script.js`. Cada diseño tiene `name`, `tag` (ej. "Serigrafía · Pecho") e `img` (URL de la imagen, puede ser de tu propio Drive/Imgur o cualquier link público).
- **Nombre de marca**: busca "TALLER / ESTAMPA" en `index.html` (clase `.brand-text`) y en el `<title>`.
- **Colores de tela disponibles**: en `index.html`, dentro de `#colorControl`, cada `<button class="color-dot">` tiene un `data-color` (hex) y un `title` (nombre del color visible al pasar el mouse).
- **Estampados predefinidos**: en `#printControl`, cada `<button class="print-thumb">` tiene `data-print` (URL de imagen) y `title` (nombre).

## Notas técnicas

- No requiere backend ni build: es HTML/CSS/JS puro, compatible 100% con GitHub Pages.
- El personalizador dibuja la prenda en SVG y superpone la imagen del estampado (`<image>` dentro del SVG), así que cualquier imagen PNG/JPG/SVG con fondo transparente funciona mejor.
- Cuando el cliente sube su propio diseño, se usa `FileReader` para mostrarlo localmente (no se sube a ningún servidor); para recibir pedidos reales tendrías que pedirle que adjunte la imagen también por WhatsApp o un formulario con backend.
- Las imágenes de ejemplo del catálogo usan el servicio gratuito Iconify (`api.iconify.design`) solo como placeholder — reemplázalas por fotos/artes reales de tus diseños.
