// Genera el catalogo de la tienda a partir del documento de implementacion (.md) del Excel.
//
//   node scripts/generar-catalogo.mjs "<ruta al catalogo_productos_trendy_by_muna.md>"
//
// Escribe dos archivos:
//   data/catalogo.json            -> lo que ve el cliente (se importa desde data/products.js)
//   data/revision-catalogo.json   -> notas internas de revision; NO se importa desde la web
//
// Los datos internos de compra (cantidades, costos, ganancias) se ignoran a proposito:
// no deben viajar al navegador.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const origen = process.argv[2];
if (!origen) {
  console.error('Uso: node scripts/generar-catalogo.mjs "<catalogo.md>"');
  process.exit(1);
}
const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const md = readFileSync(origen, "utf8").replace(/\r\n/g, "\n");

const capitalizar = (t) => t.toLowerCase().replace(/^\p{L}/u, (c) => c.toUpperCase());
const slug = (t) =>
  t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// Errores de digitacion del Excel que se corrigen solo en lo que ve el cliente.
const CORRECCIONES_CATEGORIA = { CORREECTOR: "Corrector" };

function limpiarTexto(t) {
  return t.split("\n").map((l) => l.trimEnd()).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

// Los productos sin especificaciones usan "**Especificaciones:** Pendientes…" en una sola linea.
const esMarcadorDeEspecificaciones = (l) =>
  l.trim() === "**Especificaciones del producto**" || l.trim().startsWith("**Especificaciones:**");

function seccion(lineas, esInicio, esFin) {
  const i = lineas.findIndex((l) => esInicio(l.trim()));
  if (i < 0) return "";
  const fin = esFin ? lineas.findIndex((l, k) => k > i && esFin(l)) : -1;
  return limpiarTexto(lineas.slice(i + 1, fin < 0 ? undefined : fin).join("\n"));
}

const productos = [];
const revision = [];

for (const bloque of md.split(/^### /m).slice(1)) {
  const [encabezado, ...resto] = bloque.split("\n");
  const m = encabezado.match(/^(\d+)\.\s+(.*)$/);
  if (!m) continue; // p. ej. "Totales reportados por el Excel"
  const lineas = resto.join("\n").split(/^## /m)[0].split("\n"); // corta antes de "## Datos internos"

  const campos = {};
  const notasFuente = [];
  for (const linea of lineas) {
    const b = linea.match(/^- \*\*(.+?):\*\*\s*(.*)$/);
    if (!b) continue;
    if (b[1] === "Nota de datos") notasFuente.push(b[2].trim());
    else campos[b[1]] = b[2].trim();
  }

  const descripcion = seccion(lineas, (l) => l === "**Descripción**", esMarcadorDeEspecificaciones);
  const especificaciones = seccion(lineas, (l) => l === "**Especificaciones del producto**");

  const categoriaCruda = campos["Categoría"] ?? "";
  const categoria = /^no especificada/i.test(categoriaCruda) || !categoriaCruda
    ? undefined
    : (CORRECCIONES_CATEGORIA[categoriaCruda.toUpperCase()] ?? capitalizar(categoriaCruda));
  const varianteCruda = campos["Variante"];
  const variante = varianteCruda
    ? (/^tono\s*\d+/i.test(varianteCruda) ? varianteCruda.replace(/^tono\s*/i, "Tono ") : capitalizar(varianteCruda))
    : undefined;
  const referencia = campos["Referencia"];

  const producto = {
    id: slug(variante ? `${referencia}-${variante}` : referencia),
    title: m[2].trim(),
    reference: referencia,
    group: capitalizar(campos["Grupo"]),
    ...(categoria && { category: categoria }),
    image: "", // el Excel no trae imagenes: se completa cuando existan las fotos reales
    description: descripcion,
    specifications: especificaciones,
    priceCOP: Number(campos["Precio de venta"].replace(/\D/g, "")),
    ...(variante && { variant: variante }),
    active: true,
  };
  productos.push(producto);

  const notas = notasFuente.map((n) => n.charAt(0).toUpperCase() + n.slice(1));
  if (!descripcion) notas.push("Descripción pendiente: no aparece en el Excel.");
  if (!especificaciones) notas.push("Especificaciones pendientes: no aparecen en el Excel.");
  // Observaciones propias sobre el contenido; solo se agregan si el texto realmente las cumple.
  const observaciones = [
    [/235ml/.test(producto.title) && /Contenido: 360ml/.test(especificaciones),
      'El título dice 235ml pero las especificaciones dicen "Contenido: 360ml".'],
    [/alcan$/.test(especificaciones), 'La advertencia final está cortada en el Excel ("…fuera del alcan").'],
    [/PARFU(?!M)/.test(especificaciones), 'Los ingredientes están cortados en el Excel ("…PARFU").'],
    [/(?<![Tt])ambién/.test(especificaciones), 'Errata en Beneficios: "ambién" debería decir "También".'],
    [/polvo rosado/i.test(descripcion) && variante === "Banana",
      "La descripción habla de polvo rosado, pero esta variante es BANANA."],
    [/Unidad mínima mayoristas/.test(especificaciones),
      'Las especificaciones incluyen "Unidad mínima mayoristas: 2" (dato de venta al por mayor): confirmar si debe verse en la tienda.'],
  ];
  for (const [aplica, texto] of observaciones) if (aplica) notas.push(texto);
  if (notas.length) revision.push({ id: producto.id, title: producto.title, reference: referencia, notas });
}

// Comprobaciones: el catalogo debe quedar completo y coherente.
const ids = new Set(productos.map((p) => p.id));
if (productos.length !== 19) throw new Error(`Se esperaban 19 productos y se leyeron ${productos.length}`);
if (ids.size !== productos.length) throw new Error("Hay ids repetidos");
if (productos.some((p) => !Number.isFinite(p.priceCOP) || p.priceCOP <= 0)) throw new Error("Hay precios invalidos");

writeFileSync(path.join(raiz, "data", "catalogo.json"), JSON.stringify(productos, null, 2) + "\n");
writeFileSync(path.join(raiz, "data", "revision-catalogo.json"), JSON.stringify(revision, null, 2) + "\n");

console.log(`${productos.length} productos escritos en data/catalogo.json`);
console.log(`\nPara revisar antes de publicar (${revision.length} productos):`);
for (const r of revision) {
  console.log(`\n- ${r.title} [${r.reference}]`);
  for (const n of r.notas) console.log(`    · ${n}`);
}
