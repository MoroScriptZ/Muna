import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Webhook de Wompi: confirma el pago y actualiza el estado del pedido.
// En el panel de Wompi (Desarrolladores > Eventos) apunta la URL de produccion a:
//   https://<tu-sitio>/api/wompi/webhook
// Necesita WOMPI_EVENTS_SECRET y SUPABASE_SERVICE_ROLE_KEY (solo servidor, nunca NEXT_PUBLIC_).

const ESTADOS = { APPROVED: "pagado", DECLINED: "rechazado", VOIDED: "anulado", ERROR: "error" };

const valor = (obj, ruta) => ruta.split(".").reduce((o, k) => o?.[k], obj);

export async function POST(request) {
  const secreto = process.env.WOMPI_EVENTS_SECRET;
  const servicio = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secreto || !servicio) return NextResponse.json({ error: "No configurado" }, { status: 503 });

  const evento = await request.json().catch(() => null);
  const props = evento?.signature?.properties;
  if (!Array.isArray(props) || !evento?.signature?.checksum || !evento.timestamp) {
    return NextResponse.json({ error: "Evento inválido" }, { status: 400 });
  }

  // Wompi firma: sha256(valores de las propiedades + timestamp + secreto de eventos).
  const esperado = createHash("sha256")
    .update(props.map((p) => valor(evento.data, p)).join("") + evento.timestamp + secreto)
    .digest("hex");
  const recibido = String(evento.signature.checksum).toLowerCase();
  if (recibido.length !== esperado.length || !timingSafeEqual(Buffer.from(recibido), Buffer.from(esperado))) {
    return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
  }

  const tx = evento.data?.transaction;
  const estado = ESTADOS[tx?.status];
  if (evento.event !== "transaction.updated" || !estado) return NextResponse.json({ ok: true });

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, servicio);
  // Solo actualiza si el monto pagado coincide con el total del pedido.
  const { error } = await supabase
    .from("orders")
    .update({ status: estado })
    .eq("id", tx.reference)
    .in("status", ["pendiente", "rechazado", "error"]) // no pisa pedidos ya enviados o entregados
    .eq("total_cop", tx.amount_in_cents / 100);
  if (error) {
    console.error("Webhook Wompi: no se pudo actualizar el pedido:", error.message);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
