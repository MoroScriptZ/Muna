"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatCOP } from "@/lib/format";

export default function CarritoPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();

  async function handleCheckout() {
    // TODO: reemplazar por la integración real de Wompi (widget o link de pago).
    // Solo se envian ids y cantidades: el servidor calcula el total con los precios del catalogo.
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: items.map(({ id, qty }) => ({ id, qty })) })
    });
    const data = await res.json();
    alert(data.error || data.message || "Checkout de prueba: aquí se abriría la pasarela de pago.");
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-16 text-center">
        <p className="text-brand-black/60">Tu carrito está vacío.</p>
        <Link href="/tienda" className="btn-primary mt-6 inline-flex">Ir a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-brand-black">Tu carrito</h1>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 rounded-xl border border-brand-black/10 p-4">
            <div>
              <Link href={`/tienda/${item.id}`} className="font-semibold hover:text-brand-wine">{item.title}</Link>
              <p className="text-sm text-brand-black/60">
                Ref. {item.reference} · {formatCOP(item.priceCOP)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={item.qty}
                aria-label={`Cantidad de ${item.title}`}
                onChange={(e) => updateQty(item.id, parseInt(e.target.value, 10) || 1)}
                className="w-16 rounded-lg border border-brand-black/15 px-2 py-1 text-center"
              />
              <button onClick={() => removeItem(item.id)} className="text-sm text-red-600 hover:underline">
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-brand-black/10 pt-6">
        <p className="font-display text-xl text-brand-black">Total: {formatCOP(total)}</p>
        <div className="flex gap-3">
          <button onClick={clearCart} className="btn-outline">Vaciar</button>
          <button onClick={handleCheckout} className="btn-primary">Pagar ahora</button>
        </div>
      </div>
    </div>
  );
}
