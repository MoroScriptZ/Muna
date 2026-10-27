"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatCOP } from "@/lib/format";

export default function CarritoPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <p className="eyebrow">Bolsita</p>
        <h1 className="section-title">Tu bolsita está vacía</h1>
        <p className="mt-3 text-brand-black/60">Explora la tienda y agrega los productos que te gusten.</p>
        <Link href="/tienda" className="btn-primary mt-8">Ir a la tienda</Link>
      </div>
    );
  }

  return (
    <>
      <section className="border-b border-brand-line bg-brand-cream">
        <div className="container-page py-12">
          <p className="eyebrow">Compra</p>
          <h1 className="section-title">Tu bolsita</h1>
        </div>
      </section>

      <div className="container-page grid gap-10 pb-24 pt-12 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-brand-line bg-white p-5">
              <div>
                <Link href={`/tienda/${item.id}`} className="font-display text-lg text-brand-black hover:text-brand-wine">
                  {item.title}
                </Link>
                <p className="mt-1 text-sm text-brand-black/60">
                  Ref. {item.reference} · {formatCOP(item.priceCOP)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  aria-label={`Cantidad de ${item.title}`}
                  onChange={(e) => updateQty(item.id, parseInt(e.target.value, 10) || 1)}
                  className="w-16 rounded-md border border-brand-line px-2 py-2 text-center text-sm"
                />
                <button onClick={() => removeItem(item.id)} className="text-sm text-brand-black/55 underline-offset-2 hover:text-red-700 hover:underline">
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-brand-line bg-white p-6">
          <h2 className="font-display text-xl text-brand-black">Resumen</h2>
          <div className="mt-5 flex items-center justify-between border-t border-brand-line pt-5">
            <span className="text-sm uppercase tracking-[0.14em] text-brand-black/60">Total</span>
            <span className="font-display text-2xl text-brand-wine">{formatCOP(total)}</span>
          </div>
          <Link href="/checkout" className="btn-primary mt-6 w-full">Continuar con la compra</Link>
          <button onClick={clearCart} className="btn-outline mt-3 w-full">Vaciar bolsita</button>
          <p className="mt-4 text-center text-xs text-brand-black/50">Pago seguro con Wompi · Envío a domicilio</p>
        </aside>
      </div>
    </>
  );
}
