// Catalogo de la tienda. Fuente: Excel "01.TRENDY BY MUNA" (hoja "Para PÁG WEB"),
// convertido en data/catalogo.json con `node scripts/generar-catalogo.mjs <catalogo.md>`.
// No edites catalogo.json a mano: se sobrescribe cuando se vuelve a generar.
import catalogo from "./catalogo.json";
// Fotos por producto (id -> archivos en public/images/products/), generado con scripts/importar-imagenes.py.
import imagenes from "./imagenes.json";

/**
 * @typedef {Object} Product
 * @property {string} id              identificador estable, unico por producto/variante
 * @property {string} title
 * @property {string} reference       referencia del Excel (varias variantes pueden compartirla)
 * @property {string} group
 * @property {string} [category]      solo si el Excel la trae
 * @property {string} image           portada: primer archivo de `images` ("" si el producto no tiene fotos)
 * @property {string[]} images        archivos en public/images/products/
 * @property {string} description     texto del Excel; "" si no existe
 * @property {string} specifications  texto del Excel; "" si no existe
 * @property {number} priceCOP
 * @property {string} [variant]       tono o presentacion
 * @property {boolean} active
 */

const slug = (texto) =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** @type {Product[]} */
export const products = catalogo
  .filter((p) => p.active)
  .map((p) => {
    const images = imagenes[p.id] ?? [];
    return { ...p, images, image: images[0] ?? "" };
  });

export const getProduct = (id) => products.find((p) => p.id === id);

/** Tonos o presentaciones que comparten referencia (cada uno es un producto aparte). */
export const variantsOf = (product) => products.filter((p) => p.reference === product.reference);

export const groups = [...new Set(products.map((p) => p.group))].map((name) => ({
  name,
  slug: slug(name),
  count: products.filter((p) => p.group === name).length,
}));

export const groupBySlug = (valor) => groups.find((g) => g.slug === valor);

/** Categorias definidas dentro de un grupo (los productos sin categoria no aparecen aqui). */
export const categoriesOfGroup = (groupName) => [
  ...new Set(products.filter((p) => p.group === groupName && p.category).map((p) => p.category)),
];

export const slugOf = slug;
