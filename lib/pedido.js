// Datos del cliente para un pedido a domicilio. Se valida igual en el navegador (avisos al escribir)
// y en el servidor (/api/checkout), que es el que manda: nada del cliente se acepta sin pasar por aqui.

export const DEPARTAMENTOS = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar", "Boyacá", "Caldas",
  "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía",
  "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander",
  "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre",
  "Tolima", "Valle del Cauca", "Vaupés", "Vichada"
];

const texto = (valor, max) => String(valor ?? "").replace(/\s+/g, " ").trim().slice(0, max);

/** Devuelve { limpio, errores }. Sin errores (objeto vacio) el pedido se puede registrar. */
export function validarCliente(datos = {}) {
  const limpio = {
    nombre: texto(datos.nombre, 80),
    telefono: String(datos.telefono ?? "").replace(/\D/g, "").replace(/^57(?=3\d{9}$)/, ""),
    email: texto(datos.email, 120).toLowerCase(),
    departamento: texto(datos.departamento, 40),
    ciudad: texto(datos.ciudad, 60),
    direccion: texto(datos.direccion, 160),
    indicaciones: texto(datos.indicaciones, 200),
    notas: texto(datos.notas, 300)
  };

  const errores = {};
  if (limpio.nombre.length < 3 || !limpio.nombre.includes(" ")) errores.nombre = "Escribe tu nombre y apellido.";
  if (!/^3\d{9}$/.test(limpio.telefono)) errores.telefono = "Ingresa un celular colombiano de 10 dígitos (ej. 3001234567).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(limpio.email)) errores.email = "Ingresa un correo válido.";
  if (!DEPARTAMENTOS.includes(limpio.departamento)) errores.departamento = "Elige tu departamento.";
  if (limpio.ciudad.length < 2) errores.ciudad = "Escribe tu ciudad o municipio.";
  if (limpio.direccion.length < 6) errores.direccion = "Escribe tu dirección completa (calle, número, torre o casa).";
  if (datos.acepta !== true) errores.acepta = "Debes aceptar el tratamiento de tus datos para continuar.";

  return { limpio, errores };
}

// Despacho desde Mosquera: envio a Bogota 10.000, al resto del pais 15.000. Se usa en navegador y servidor.
export const ENVIO_BOGOTA = 10000;
export const ENVIO_NACIONAL = 15000;
const sinTildes = (t = "") => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
export function calcularEnvio({ departamento, ciudad } = {}) {
  if (!departamento) return null;
  return sinTildes(departamento).startsWith("bogota") || sinTildes(ciudad).startsWith("bogota") ? ENVIO_BOGOTA : ENVIO_NACIONAL;
}
