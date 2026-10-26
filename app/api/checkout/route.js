import { NextResponse } from "next/server";
import { getProduct } from "@/data/products";
import { supabase } from "@/lib/supabaseClient";

// Endpoint de checkout — actualmente en modo simulado (mock).
//
// El total se calcula AQUI con los precios del catalogo; el navegador solo manda ids y cantidades,
// porque cualquier precio o total que venga del cliente se puede manipular.
//
// Cuando conectes Wompi de verdad:
// 1) Crea las llaves en https://comercios.wompi.co
// 2) Completa NEXT_PUBLIC_WOMPI_PUBLIC_KEY y WOMPI_PRIVATE_KEY en .env.local
// 3) Reemplaza este handler para generar una transacción real
//    (widget de Wompi en el frontend, o "Payment Link" desde el backend)
// 4) Configura un webhook de Wompi que confirme el pago y actualice la orden.

const MAX_POR_PRODUCTO = 99;

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const lineas = Array.isArray(body?.items) ? body.items : [];

  if (lineas.length === 0) {
    return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
  }

  let total = 0;
  const items = [];
  for (const linea of lineas) {
    const product = getProduct(linea?.id);
    const qty = linea?.qty;
    if (!product || !Number.isInteger(qty) || qty < 1 || qty > MAX_POR_PRODUCTO) {
      return NextResponse.json({ error: "Hay un producto o una cantidad no válidos en el carrito" }, { status: 400 });
    }
    total += product.priceCOP * qty;
    items.push({ id: product.id, title: product.title, qty, priceCOP: product.priceCOP });
  }

  const orderId = crypto.randomUUID();

  // Guarda el pedido (estado "pendiente") si Supabase esta configurado.
  if (supabase) {
    const { error } = await supabase.from("orders").insert({ id: orderId, items, total_cop: total });
    if (error) {
      console.error("No se pudo guardar el pedido:", error.message);
      return NextResponse.json({ error: "No pudimos registrar tu pedido. Intenta de nuevo." }, { status: 502 });
    }
  }

  // Simulación: en producción aquí se crea la referencia de pago con Wompi
  // y se retorna la URL real de la pasarela para redirigir al cliente.
  return NextResponse.json({
    message: "Checkout de prueba (modo mock). Conecta Wompi en app/api/checkout/route.js.",
    orderId,
    total,
    items
  });
}
