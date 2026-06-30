# Taller / Estampa — Sitio web

Sitio estático multipágina, listo para publicar gratis en **GitHub Pages**.

Estilo visual: neón sobre fondo oscuro, tipografía urbana en los títulos (estilo grafiti/cartel) combinada con tipografía limpia en el cuerpo de texto, para verse llamativo sin perder seriedad ante clientes corporativos.

## Estructura de páginas

```
index.html         → presentación: hero + 3 categorías que enlazan a las otras páginas
personalizar.html   → personalizador en vivo (tipo de prenda, color, estampado)
galeria.html        → catálogo de diseños (clic en uno te lleva al personalizador con ese estampado puesto)
empresas.html        → estampado corporativo (logos, volumen, facturación) + proceso
styles.css           → estilos compartidos por todas las páginas
script.js            → lógica compartida (detecta en qué página está y activa solo lo necesario)
```

Cada página tiene el mismo menú arriba (Galería / Personalizar / Empresas) para moverse entre ellas, así que puedes agregar más páginas de categoría siguiendo el mismo patrón si más adelante quieres, por ejemplo, una página separada solo para buzos.

## Cómo publicarlo en GitHub Pages (gratis)

1. Crea un repositorio nuevo en GitHub.
2. Sube los 5 archivos (`index.html`, `personalizar.html`, `galeria.html`, `empresas.html`, `styles.css`, `script.js`) a la raíz del repositorio ("Add file → Upload files").
3. Ve a **Settings → Pages**.
4. En "Source" elige la rama `main` y la carpeta `/ (root)`. Guarda.
5. Espera 1-2 minutos. GitHub te dará una URL tipo `https://tu-usuario.github.io/tu-repo/`. La página de presentación (`index.html`) será la que se vea por defecto.

## Qué personalizar antes de publicar

- **Número de WhatsApp**: busca `573000000000` en `personalizar.html`, `empresas.html` y `script.js`, y cámbialo por tu número con código de país (sin +, sin espacios).
- **Diseños del catálogo**: edita el arreglo `designs` al inicio de `script.js`. Cada diseño tiene `name`, `tag` (ej. "Serigrafía · Pecho") e `img` (URL de la imagen).
- **Nombre de marca**: busca "TALLER/ESTAMPA" en cada página (clase `.brand-text`) y en cada `<title>`.
- **Categorías de la portada**: en `index.html`, dentro de `.category-grid`, cada `<a class="category-card">` tiene su título, texto y el `href` a donde lleva — puedes agregar una cuarta categoría copiando ese bloque.
- **Colores de tela disponibles**: en `personalizar.html`, dentro de `#colorControl`, cada `<button class="color-dot">` tiene un `data-color` (hex) y un `title` (nombre del color).
- **Estampados predefinidos**: en `#printControl` (mismo archivo), cada `<button class="print-thumb">` tiene `data-print` (URL de imagen) y `title` (nombre).

## Notas técnicas

- No requiere backend ni build: es HTML/CSS/JS puro, compatible 100% con GitHub Pages.
- La navegación entre páginas es por links normales (`<a href="...">`), igual que cualquier sitio multipágina.
- Cuando se elige un diseño en `galeria.html`, su URL se guarda temporalmente en `sessionStorage` y `personalizar.html` lo recoge al cargar para aplicarlo automáticamente.
- El personalizador dibuja la prenda en SVG y superpone la imagen del estampado, así que cualquier imagen PNG/JPG/SVG con fondo transparente funciona mejor.
- Cuando el cliente sube su propio diseño, se usa `FileReader` para mostrarlo localmente (no se sube a ningún servidor); para recibir pedidos reales tendrías que pedirle que adjunte la imagen también por WhatsApp o un formulario con backend.
- Las imágenes de ejemplo del catálogo usan el servicio gratuito Iconify (`api.iconify.design`) solo como placeholder — reemplázalas por fotos/artes reales de tus diseños.
