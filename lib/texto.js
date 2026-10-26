// Los textos del Excel (descripcion y especificaciones) llegan como lineas sueltas.
// Estas funciones solo deciden como mostrarlos (parrafo, lista, par "Clave: valor");
// no cambian ninguna palabra.

/** Descripcion -> [{ tipo: "parrafo", texto } | { tipo: "lista", items }] */
export function bloquesDeDescripcion(texto = "") {
  const bloques = [];
  for (const linea of texto.split("\n").map((l) => l.trim()).filter(Boolean)) {
    const vineta = linea.match(/^[-•]\s*(.+)$/);
    const ultimo = bloques[bloques.length - 1];
    if (!vineta) bloques.push({ tipo: "parrafo", texto: linea });
    else if (ultimo?.tipo === "lista") ultimo.items.push(vineta[1]);
    else bloques.push({ tipo: "lista", items: [vineta[1]] });
  }
  return bloques;
}

// Un valor puede traer varias ideas pegadas con "•" o con " - ": se separan solo para mostrarlas en lista.
function partirVinetas(valor) {
  const limpio = valor.replace(/^"|"$/g, "").trim(); // comillas sobrantes del Excel
  if (limpio.includes("•")) return limpio.split("•").map((s) => s.trim()).filter(Boolean);
  if (limpio.startsWith("- ")) return limpio.slice(2).split(/\s+-\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/).map((s) => s.trim());
  return [limpio];
}

/** Especificaciones -> { items: [{ clave, valores }], notas: [texto] } */
export function especificaciones(texto = "") {
  const items = [];
  const notas = [];
  for (const linea of texto.split("\n").map((l) => l.trim()).filter(Boolean)) {
    const m = linea.match(/^([^:.]{2,40}):\s*(.+)$/);
    if (m) items.push({ clave: m[1].trim(), valores: partirVinetas(m[2]) });
    else notas.push(linea);
  }
  return { items, notas };
}

export function valorDe(items, clave) {
  return items.find((i) => i.clave.toLowerCase() === clave.toLowerCase())?.valores.join(" ");
}

export function primeraFrase(texto = "", max = 160) {
  const limpio = texto.replace(/\s+/g, " ").trim();
  return limpio.length > max ? `${limpio.slice(0, max - 1).trimEnd()}…` : limpio;
}
