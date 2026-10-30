import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { getProduct } from "@/data/products";
import { validarCliente, calcularEnvio } from "@/lib/pedido";
import { supabaseServer } from "@/lib/supabaseServer";

// Checkout a domicilio.
//
// El navegador manda ids, cantidades y datos del cliente. El total se calcula AQUI con los precios del
// catalogo (cualquier precio o total que venga del cliente se puede manipular), el pedido se guarda como
// "pendiente" y se devuelve el link de pago de Wompi. El webhook (/api/wompi/webhook) lo marca "pagado".

const MAX_POR_PRODUCTO = 99;

const error = (mensaje, status = 400, extra = {}) => NextResponse.json({ error: mensaje, ...extra }, { status });

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const lineas = Array.isArray(body?.items) ? body.items : [];

  if (lineas.length === 0) return error("Tu bolsita está vacía");

  let total = 0;
  const items = [];
  for (const linea of lineas) {
    const product = getProduct(linea?.id);
    const qty = linea?.qty;
    if (!product || !Number.isInteger(qty) || qty < 1 || qty > MAX_POR_PRODUCTO) {
      return error("Hay un producto o una cantidad no válidos en tu bolsita");
    }
    total += product.priceCOP * qty;
    items.push({ id: product.id, title: product.title, reference: product.reference, qty, priceCOP: product.priceCOP });
  }

  const { limpio: cliente, errores } = validarCliente(body?.cliente);
  if (Object.keys(errores).length > 0) return error("Revisa los datos de entrega", 400, { errores });

  // El envio se cobra como una linea mas del pedido, asi el total de Wompi y el panel admin lo incluyen.
  const envio = calcularEnvio(cliente);
  items.push({ id: "envio", title: "Envío a domicilio", qty: 1, priceCOP: envio });
  total += envio;

  const orderId = crypto.randomUUID();

  // Sin Supabase configurado no se puede guardar el pedido: se responde en modo prueba, sin cobro.
  if (!supabaseServer) {
    return NextResponse.json({ message: "Modo prueba: la base de datos no está configurada.", orderId, total, items });
  }

  const { data: pedido, error: errorDb } = await supabaseServer
    .from("orders")
    .insert({ id: orderId, items, total_cop: total, ...cliente })
    .select("numero")
    .single();
  if (errorDb) {
    console.error("No se pudo guardar el pedido:", errorDb.message);
    return error("No pudimos registrar tu pedido. Intenta de nuevo.", 502);
  }

  const llave = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
  if (!llave) {
    return NextResponse.json({ message: "Modo prueba: Wompi no está configurado.", orderId, numero: pedido.numero, total, items });
  }

  // Link de pago de Wompi: el monto va en centavos y la referencia es el id del pedido.
  const centavos = total * 100;
  const params = new URLSearchParams({
    "public-key": llave,
    currency: "COP",
    "amount-in-cents": String(centavos),
    reference: orderId,
    "redirect-url": `${process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin}/gracias`,
    "customer-data:email": cliente.email,
    "customer-data:full-name": cliente.nombre,
    "customer-data:phone-number": cliente.telefono,
    "customer-data:phone-number-prefix": "+57"
  });
  // Firma de integridad (obligatoria si la activaste en el panel de Wompi).
  const secreto = process.env.WOMPI_INTEGRITY_SECRET;
  if (secreto) {
    params.set("signature:integrity", createHash("sha256").update(`${orderId}${centavos}COP${secreto}`).digest("hex"));
  }

  return NextResponse.json({ orderId, numero: pedido.numero, total, items, checkoutUrl: `https://checkout.wompi.co/p/?${params}` });
}
