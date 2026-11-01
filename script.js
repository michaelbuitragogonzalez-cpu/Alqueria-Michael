// Número de WhatsApp que recibe los pedidos (código de país + número, sin + ni espacios).
const WHATSAPP_NUMERO = "573000000000";

const $ = (id) => document.getElementById(id);
const moneda = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
const sinMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Cada vez que se entra a la página todo empieza desde cero: el carrito no se guarda.
let carrito = {};
try { localStorage.removeItem("carritoAlqueria"); } catch {}
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
scrollTo(0, 0);
// Si el navegador restaura la página desde memoria (botón "atrás"), se recarga limpia.
addEventListener("pageshow", (e) => { if (e.persisted) location.reload(); });
const buscar = (id) => PRODUCTOS.find((p) => p.id === Number(id));
const lineas = () => Object.entries(carrito).map(([id, cant]) => ({ p: buscar(id), cant })).filter((l) => l.p);
const total = () => lineas().reduce((s, l) => s + l.p.precio * l.cant, 0);

function pintarCatalogo() {
  $("catalogo").innerHTML = PRODUCTOS.map((p, i) => `
    <article class="tarjeta" style="--d:${(i % 4) * 90}ms">
      <div class="marco"><img src="${p.imagen}" alt="${p.nombre} ${p.presentacion}" loading="lazy"></div>
      <div class="cuerpo">
        <h3>${p.nombre}</h3>
        <span class="presentacion">${p.presentacion}</span>
        <p class="desc">${p.descripcion}</p>
        <div class="precio">${moneda.format(p.precio)}</div>
        <button class="btn btn-primario" data-agregar="${p.id}">Agregar al carrito</button>
      </div>
    </article>`).join("");
  // Las tarjetas aparecen al hacer scroll
  const obs = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".tarjeta").forEach((t) => obs.observe(t));
}

// El total sube o baja contando, en vez de saltar
let mostrado = 0;
function animarTotal(destino) {
  const el = $("total"), desde = mostrado, ini = performance.now();
  if (sinMovimiento) { el.textContent = moneda.format(destino); mostrado = destino; return; }
  (function paso(ahora) {
    const k = Math.min((ahora - ini) / 450, 1), e = 1 - Math.pow(1 - k, 3);
    mostrado = Math.round(desde + (destino - desde) * e);
    el.textContent = moneda.format(mostrado);
    if (k < 1) requestAnimationFrame(paso);
  })(ini);
}

function pintarCarrito({ nuevo, cambiado } = {}) {
  const ls = lineas();
  const cuenta = ls.reduce((s, l) => s + l.cant, 0);
  const badge = $("contador");
  if (Number(badge.textContent) !== cuenta) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
  badge.textContent = cuenta;
  animarTotal(total());
  $("lista").innerHTML = ls.length ? ls.map(({ p, cant }) => `
    <div class="item ${String(nuevo) === String(p.id) ? "nuevo" : ""}" data-item="${p.id}">
      <img src="${p.imagen}" alt="">
      <div>
        <h4>${p.nombre}</h4>
        <small>${p.presentacion} · ${moneda.format(p.precio)} c/u</small>
        <div class="cantidad">
          <button data-menos="${p.id}" aria-label="Quitar una unidad">−</button>
          <b class="${String(cambiado) === String(p.id) ? "bump" : ""}">${cant}</b>
          <button data-mas="${p.id}" aria-label="Agregar una unidad">+</button>
        </div>
      </div>
      <div class="der">
        <div class="sub">${moneda.format(p.precio * cant)}</div>
        <button class="quitar" data-quitar="${p.id}">Eliminar</button>
      </div>
    </div>`).join("") : '<p class="vacio">Tu carrito está vacío. Agrega productos del catálogo.</p>';
}

function abrir(estado) {
  $("carrito").classList.toggle("abierto", estado);
  $("fondo").classList.toggle("abierto", estado);
}

// Efecto: la imagen del producto vuela hasta el carrito
function volarAlCarrito(boton) {
  const img = boton.closest(".tarjeta").querySelector("img"), destino = $("abrirCarrito");
  if (sinMovimiento) return;
  const a = img.getBoundingClientRect(), b = destino.getBoundingClientRect();
  const clon = img.cloneNode();
  clon.className = "volador";
  Object.assign(clon.style, { left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px" });
  document.body.appendChild(clon);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
  clon.animate([
    { transform: "translate(0,0) scale(1)", opacity: 1 },
    { transform: `translate(${dx * .5}px,${dy * .5 - 80}px) scale(.5) rotate(10deg)`, opacity: .9, offset: .5 },
    { transform: `translate(${dx}px,${dy}px) scale(.05) rotate(25deg)`, opacity: .2 }
  ], { duration: 800, easing: "cubic-bezier(.5,0,.75,0)" }).onfinish = () => {
    clon.remove();
    destino.classList.remove("sacude"); void destino.offsetWidth; destino.classList.add("sacude");
  };
}

function mensajeWhatsApp() {
  const detalle = lineas().map(({ p, cant }) =>
    `• ${cant} x ${p.nombre} (${p.presentacion}) = ${moneda.format(p.precio * cant)}`).join("\n");
  return `Hola, quiero hacer este pedido de Alquería:\n\n${detalle}\n\nTOTAL: ${moneda.format(total())}`;
}

function finalizar() {
  const ls = lineas();
  if (!ls.length) { alert("Agrega al menos un producto para finalizar tu pedido."); return; }
  $("filas").innerHTML = ls.map(({ p, cant }, i) => `
    <tr style="--d:${150 + i * 70}ms"><td>${p.nombre}<br><small>${p.presentacion}</small></td><td>${cant}</td>
    <td>${moneda.format(p.precio)}</td><td>${moneda.format(p.precio * cant)}</td></tr>`).join("");
  $("totalResumen").textContent = moneda.format(total());
  $("avisoWa").hidden = true;
  facturaActual = crearFactura(); // se prepara de una vez para descargar o compartir
  $("resumen").showModal();
}


// ===== Factura en imagen (PNG) =====
let facturaActual = null;

async function crearFactura() {
  try { await document.fonts.ready; } catch {}
  const ls = lineas(), W = 800, FILA = 58, ESC = 2;
  const alto = 234 + ls.length * FILA + 250;
  const num = String(Date.now()).slice(-6);
  const fecha = new Date().toLocaleString("es-CO", { dateStyle: "long", timeStyle: "short" });
  const c = document.createElement("canvas");
  c.width = W * ESC; c.height = alto * ESC;
  const x = c.getContext("2d");
  x.scale(ESC, ESC);
  const F = (peso, tam) => `${peso} ${tam}px Nunito, system-ui, sans-serif`;
  const ROJO = "#d71920", CLARO = "#fdecee", TXT = "#3b0a0e", GRIS = "#8a4b50", BORDE = "#f3c9cd";
  const caja = (px, py, w, h, r, color) => {
    x.fillStyle = color; x.beginPath();
    if (x.roundRect) x.roundRect(px, py, w, h, r); else x.rect(px, py, w, h);
    x.fill();
  };
  const recortar = (t, max) => { while (x.measureText(t).width > max && t.length > 1) t = t.slice(0, -1); return t; };

  x.fillStyle = "#fff"; x.fillRect(0, 0, W, alto);

  // Encabezado rojo
  x.fillStyle = ROJO; x.fillRect(0, 0, W, 150);
  x.fillStyle = "#fff"; x.textAlign = "left";
  x.font = F(900, 52); x.fillText("ALQUERÍA", 40, 85);
  x.font = F(700, 18); x.fillText("Pedido de productos lácteos", 40, 118);
  x.textAlign = "right";
  x.font = F(900, 24); x.fillText("COMPROBANTE DE PEDIDO", W - 40, 66);
  x.font = F(700, 17); x.fillText("N.º " + num, W - 40, 96); x.fillText(fecha, W - 40, 122);

  // Encabezado de la tabla
  caja(40, 178, W - 80, 44, 10, CLARO);
  x.fillStyle = ROJO; x.font = F(800, 16);
  x.textAlign = "left"; x.fillText("Producto", 56, 206);
  x.textAlign = "right";
  x.fillText("Cant.", 440, 206); x.fillText("Precio", 590, 206); x.fillText("Subtotal", W - 56, 206);

  // Filas
  let y = 234;
  ls.forEach(({ p, cant }) => {
    x.textAlign = "left"; x.fillStyle = TXT; x.font = F(800, 18);
    x.fillText(recortar(p.nombre, 300), 56, y + 26);
    x.fillStyle = GRIS; x.font = F(600, 14);
    x.fillText(recortar(p.presentacion, 300), 56, y + 46);
    x.textAlign = "right"; x.fillStyle = TXT; x.font = F(700, 17);
    x.fillText(String(cant), 440, y + 34);
    x.fillText(moneda.format(p.precio), 590, y + 34);
    x.font = F(900, 17); x.fillText(moneda.format(p.precio * cant), W - 56, y + 34);
    x.fillStyle = BORDE; x.fillRect(40, y + FILA - 1, W - 80, 1);
    y += FILA;
  });

  // Total
  const unidades = ls.reduce((s, l) => s + l.cant, 0);
  y += 26;
  x.textAlign = "left"; x.fillStyle = GRIS; x.font = F(700, 16);
  x.fillText(`${ls.length} producto${ls.length === 1 ? "" : "s"} · ${unidades} unidad${unidades === 1 ? "" : "es"}`, 56, y);
  y += 20;
  caja(40, y, W - 80, 86, 16, ROJO);
  x.fillStyle = "#fff"; x.font = F(800, 22); x.fillText("TOTAL DEL PEDIDO", 66, y + 52);
  x.textAlign = "right"; x.font = F(900, 38); x.fillText(moneda.format(total()), W - 66, y + 56);

  // Pie
  y += 86 + 48;
  x.textAlign = "center"; x.fillStyle = ROJO; x.font = F(900, 22);
  x.fillText("¡Gracias por tu pedido!", W / 2, y);
  x.fillStyle = GRIS; x.font = F(600, 13);
  x.fillText("Documento informativo del pedido. No es una factura electrónica.", W / 2, y + 26);

  const blob = await new Promise((ok) => c.toBlob(ok, "image/png"));
  return { blob, nombre: `factura-alqueria-${num}.png` };
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  if (btn && !sinMovimiento) { // efecto onda al tocar un botón
    const r = btn.getBoundingClientRect(), o = document.createElement("span");
    o.className = "onda"; o.style.left = e.clientX - r.left + "px"; o.style.top = e.clientY - r.top + "px";
    btn.appendChild(o); setTimeout(() => o.remove(), 600);
  }
  const t = e.target.closest("button");
  if (!t) return;
  const d = t.dataset;
  if (d.agregar) {
    const eraNuevo = !carrito[d.agregar];
    carrito[d.agregar] = (carrito[d.agregar] || 0) + 1;
    volarAlCarrito(t);
    pintarCarrito(eraNuevo ? { nuevo: d.agregar } : { cambiado: d.agregar });
  }
  else if (d.mas) { carrito[d.mas]++; pintarCarrito({ cambiado: d.mas }); }
  else if (d.menos) {
    if (carrito[d.menos] <= 1) quitarConAnimacion(d.menos);
    else { carrito[d.menos]--; pintarCarrito({ cambiado: d.menos }); }
  }
  else if (d.quitar) quitarConAnimacion(d.quitar);
});

function quitarConAnimacion(id) {
  const el = document.querySelector(`[data-item="${id}"]`);
  if (el && !sinMovimiento) el.classList.add("saliendo");
  setTimeout(() => { delete carrito[id]; pintarCarrito(); }, el && !sinMovimiento ? 300 : 0);
}

$("abrirCarrito").onclick = () => abrir(true);
$("cerrarCarrito").onclick = $("fondo").onclick = () => abrir(false);
$("vaciar").onclick = () => { carrito = {}; pintarCarrito(); };
$("finalizar").onclick = finalizar;
$("cerrarResumen").onclick = () => $("resumen").close();
addEventListener("scroll", () => document.querySelector(".encabezado").classList.toggle("sombra", scrollY > 10), { passive: true });

const puedeCompartir = !!(navigator.canShare && navigator.canShare({ files: [new File([""], "a.png", { type: "image/png" })] }));

function descargar(f) {
  const url = URL.createObjectURL(f.blob), a = document.createElement("a");
  a.href = url; a.download = f.nombre; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

$("descargarFactura").onclick = async () => { const f = await facturaActual; if (f) descargar(f); };

// Envía siempre al número de WHATSAPP_NUMERO (el usuario no elige el contacto)
$("whatsapp").onclick = async () => {
  if (!lineas().length) return;
  // Se inician al hacer clic, antes de cualquier espera, para que el navegador los permita
  const copia = (window.ClipboardItem && navigator.clipboard)
    ? navigator.clipboard.write([new ClipboardItem({ "image/png": facturaActual.then((f) => f.blob) })]).then(() => true, () => false)
    : Promise.resolve(false);
  const ventana = window.open("about:blank", "_blank");

  const f = await facturaActual;
  descargar(f);
  const copiado = await copia;
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensajeWhatsApp())}`;
  if (ventana) ventana.location.href = url; else window.open(url, "_blank");
  $("avisoWa").textContent = copiado
    ? "Se abrió el chat con el pedido. La imagen de la factura quedó copiada: pégala con Ctrl+V y envíala."
    : "Se abrió el chat con el pedido. La imagen de la factura se descargó: adjúntala y envíala.";
  $("avisoWa").hidden = false;
};
pintarCatalogo();
pintarCarrito();