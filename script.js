// ===== Año en footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Catálogo de diseños (edita esta lista para tus propios diseños) =====
const designs = [
  { name: "Cordillera", tag: "DTF · Espalda", img: "https://api.iconify.design/ph/mountains-fill.svg?color=%23FF2EC4" },
  { name: "Tormenta", tag: "Serigrafía · Pecho", img: "https://api.iconify.design/ph/lightning-fill.svg?color=%231AFCEA" },
  { name: "Loto", tag: "DTF · Pecho", img: "https://api.iconify.design/ph/flower-lotus-fill.svg?color=%23D9FF1E" },
  { name: "Sol Cenital", tag: "Serigrafía · Espalda", img: "https://api.iconify.design/ph/sun-fill.svg?color=%23FF2EC4" },
  { name: "Onda", tag: "DTF · Pecho", img: "https://api.iconify.design/ph/wave-sine-bold.svg?color=%231AFCEA" },
  { name: "Estrella Guía", tag: "Serigrafía · Pecho", img: "https://api.iconify.design/ph/star-four-bold.svg?color=%23D9FF1E" },
];

const galleryGrid = document.getElementById('galleryGrid');
designs.forEach(d => {
  const card = document.createElement('div');
  card.className = 'design-card';
  card.innerHTML = `
    <div class="design-card-art"><img src="${d.img}" alt="Diseño ${d.name}"></div>
    <div class="design-card-info">
      <span class="design-card-name">${d.name}</span>
      <span class="design-card-tag">${d.tag}</span>
    </div>`;
  card.addEventListener('click', () => {
    setPrint(d.img, card.querySelector('img'));
    document.getElementById('personalizar').scrollIntoView({ behavior: 'smooth' });
  });
  galleryGrid.appendChild(card);
});

// ===== Personalizador =====
const garmentSvg = document.getElementById('garmentSvg');
const printImage = document.getElementById('printImage');
const printZoneOutline = document.getElementById('printZoneOutline');
const printSizeSlider = document.getElementById('printSize');

function setGarment(type) {
  document.querySelectorAll('.garment-shape').forEach(g => g.style.display = 'none');
  document.getElementById(`garment-${type}`).style.display = '';
}

function setColor(hex) {
  document.querySelectorAll('.garment-shape:not([style*="display: none"]) .garment-fill, .garment-fill').forEach(f => {
    f.style.fill = hex;
  });
}

function setPrint(url, sourceEl) {
  if (!url) {
    printImage.setAttribute('opacity', '0');
  } else {
    printImage.setAttribute('href', url);
    printImage.setAttribute('opacity', '1');
  }
  document.querySelectorAll('.print-thumb').forEach(b => b.classList.remove('active'));
  if (sourceEl) {
    const btn = sourceEl.closest('.print-thumb');
    if (btn) btn.classList.add('active');
  }
}

function resizePrint(size) {
  const cx = 180, cy = 190;
  printImage.setAttribute('x', cx - size / 2);
  printImage.setAttribute('y', cy - size / 2);
  printImage.setAttribute('width', size);
  printImage.setAttribute('height', size);
  printZoneOutline.setAttribute('x', cx - size / 2);
  printZoneOutline.setAttribute('y', cy - size / 2);
  printZoneOutline.setAttribute('width', size);
  printZoneOutline.setAttribute('height', size);
}

// Tipo de prenda
document.getElementById('garmentControl').addEventListener('click', e => {
  const btn = e.target.closest('.seg-btn');
  if (!btn) return;
  document.querySelectorAll('#garmentControl .seg-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  setGarment(btn.dataset.garment);
  // re-aplicar color activo
  const activeColor = document.querySelector('.color-dot.active');
  if (activeColor) setColor(activeColor.dataset.color);
  garmentSvg.style.transform = 'scale(0.96)';
  setTimeout(() => garmentSvg.style.transform = 'scale(1)', 180);
});

// Color de tela
document.getElementById('colorControl').addEventListener('click', e => {
  const btn = e.target.closest('.color-dot');
  if (!btn) return;
  document.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  setColor(btn.dataset.color);
});

// Estampado predefinido
document.getElementById('printControl').addEventListener('click', e => {
  const btn = e.target.closest('.print-thumb');
  if (!btn || btn.classList.contains('print-upload')) return;
  setPrint(btn.dataset.print, btn);
});

// Subir estampado propio
document.getElementById('printUpload').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    printImage.setAttribute('href', ev.target.result);
    printImage.setAttribute('opacity', '1');
    document.querySelectorAll('.print-thumb').forEach(b => b.classList.remove('active'));
  };
  reader.readAsDataURL(file);
});

// Tamaño del estampado
printSizeSlider.addEventListener('input', e => resizePrint(Number(e.target.value)));

// Inicialización
setColor('#0B0A12');
resizePrint(100);
setPrint("https://api.iconify.design/ph/mountains-fill.svg?color=%23FF2EC4", document.querySelector('.print-thumb.active'));

// Número de pedido pseudoaleatorio para la "ficha"
document.getElementById('orderId').textContent = String(Math.floor(Math.random() * 900) + 100).padStart(4, '0');

// Botón agregar al pedido -> WhatsApp con resumen
document.getElementById('addToOrder').addEventListener('click', () => {
  const garment = document.querySelector('#garmentControl .seg-btn.active').textContent.trim();
  const color = document.querySelector('.color-dot.active').title;
  const printBtn = document.querySelector('.print-thumb.active');
  const print = printBtn ? (printBtn.title || 'diseño personalizado subido') : 'sin estampado';
  const msg = encodeURIComponent(`Hola, quiero pedir: ${garment} color ${color}, estampado: ${print}.`);
  window.open(`https://wa.me/573000000000?text=${msg}`, '_blank');
});
