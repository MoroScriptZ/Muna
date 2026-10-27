import Link from "next/link";
import VaciarBolsita from "@/components/VaciarBolsita";
import { supabaseServer } from "@/lib/supabaseServer";

export const metadata = { title: "Estado de tu pago | MUNA", robots: { index: false } };

// Wompi devuelve al cliente aqui con ?id=<transaccion>. El estado se consulta a Wompi en el servidor
// (no se confia en nada que venga en la URL mas alla del id).
async function consultarPago(id) {
  if (!id || !/^[\w-]{5,80}$/.test(id)) return null;
  try {
    const res = await fetch(`https://production.wompi.co/v1/transactions/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const tx = (await res.json()).data;
    let numero = null;
    if (supabaseServer && tx?.reference) {
      const { data } = await supabaseServer.from("orders").select("numero").eq("id", tx.reference).maybeSingle();
      numero = data?.numero ?? null;
    }
    return { estado: tx?.status, numero };
  } catch {
    return null;
  }
}

const MENSAJES = {
  APPROVED: { titulo: "Gracias por tu compra", texto: "Tu pago fue aprobado. Te contactaremos para coordinar la entrega de tu pedido." },
  PENDING: { titulo: "Estamos confirmando tu pago", texto: "Tu banco aún no confirma la transacción. Apenas lo haga, tu pedido quedará registrado." },
  DECLINED: { titulo: "Tu pago no fue aprobado", texto: "No se realizó ningún cobro. Puedes intentarlo de nuevo con otro medio de pago." },
  VOIDED: { titulo: "Tu pago fue anulado", texto: "No se realizó ningún cobro." },
  ERROR: { titulo: "Hubo un problema con tu pago", texto: "No se realizó ningún cobro. Intenta de nuevo en unos minutos." }
};

export default async function GraciasPage({ searchParams }) {
  const pago = await consultarPago(searchParams.id);
  const mensaje = MENSAJES[pago?.estado] ?? { titulo: "Recibimos tu solicitud", texto: "Si ya completaste el pago, te contactaremos para coordinar la entrega." };

  return (
    <div className="container-page py-24 text-center">
      {pago?.estado === "APPROVED" && <VaciarBolsita />}
      <p className="eyebrow">{pago?.numero ? `Pedido #${pago.numero}` : "Tu pedido"}</p>
      <h1 className="section-title">{mensaje.titulo}</h1>
      <p className="mx-auto mt-4 max-w-md text-brand-black/70">{mensaje.texto}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {pago?.estado === "DECLINED" || pago?.estado === "ERROR" || pago?.estado === "VOIDED" ? (
          <Link href="/checkout" className="btn-primary">Intentar de nuevo</Link>
        ) : null}
        <Link href="/tienda" className="btn-outline">Seguir comprando</Link>
      </div>
    </div>
  );
}
