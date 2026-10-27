"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { DEPARTAMENTOS, validarCliente } from "@/lib/pedido";
import { formatCOP } from "@/lib/format";

const VACIO = {
  nombre: "", telefono: "", email: "", departamento: "", ciudad: "", direccion: "", indicaciones: "", notas: "", acepta: false
};

function Campo({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-black">{label}</label>
      {children}
      {error && <p role="alert" className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [fallo, setFallo] = useState("");

  const cambiar = (campo) => (e) => setDatos((d) => ({ ...d, [campo]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function pagar(e) {
    e.preventDefault();
    setFallo("");
    const { errores: nuevos } = validarCliente(datos);
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    setEnviando(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map(({ id, qty }) => ({ id, qty })), cliente: datos })
      });
      const data = await res.json();
      if (data.errores) setErrores(data.errores);
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setFallo(data.error || data.message || "No pudimos iniciar el pago. Intenta de nuevo.");
    } catch {
      setFallo("No pudimos conectarnos. Revisa tu internet e intenta de nuevo.");
    }
    setEnviando(false);
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <p className="eyebrow">Finalizar compra</p>
        <h1 className="section-title">Tu bolsita está vacía</h1>
        <Link href="/tienda" className="btn-primary mt-8">Ir a la tienda</Link>
      </div>
    );
  }

  const clase = (campo) => `field ${errores[campo] ? "border-red-600" : ""}`;

  return (
    <>
      <section className="border-b border-brand-line bg-brand-cream">
        <div className="container-page py-12">
          <p className="eyebrow">Envío a domicilio</p>
          <h1 className="section-title">Finalizar compra</h1>
        </div>
      </section>

      <form onSubmit={pagar} noValidate className="container-page grid gap-10 pb-24 pt-12 lg:grid-cols-[1fr_24rem]">
        <div className="space-y-10">
          <fieldset className="space-y-4">
            <legend className="font-display text-2xl text-brand-black">Tus datos</legend>
            <Campo id="nombre" label="Nombre y apellido" error={errores.nombre}>
              <input id="nombre" autoComplete="name" value={datos.nombre} onChange={cambiar("nombre")} className={clase("nombre")} />
            </Campo>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="telefono" label="Celular" error={errores.telefono}>
                <input id="telefono" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="3001234567" value={datos.telefono} onChange={cambiar("telefono")} className={clase("telefono")} />
              </Campo>
              <Campo id="email" label="Correo electrónico" error={errores.email}>
                <input id="email" type="email" autoComplete="email" value={datos.email} onChange={cambiar("email")} className={clase("email")} />
              </Campo>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-display text-2xl text-brand-black">Dirección de entrega</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="departamento" label="Departamento" error={errores.departamento}>
                <select id="departamento" autoComplete="address-level1" value={datos.departamento} onChange={cambiar("departamento")} className={clase("departamento")}>
                  <option value="">Selecciona</option>
                  {DEPARTAMENTOS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </Campo>
              <Campo id="ciudad" label="Ciudad o municipio" error={errores.ciudad}>
                <input id="ciudad" autoComplete="address-level2" value={datos.ciudad} onChange={cambiar("ciudad")} className={clase("ciudad")} />
              </Campo>
            </div>
            <Campo id="direccion" label="Dirección" error={errores.direccion}>
              <input id="direccion" autoComplete="street-address" placeholder="Calle 10 # 5-20, Torre 2 Apto 301" value={datos.direccion} onChange={cambiar("direccion")} className={clase("direccion")} />
            </Campo>
            <Campo id="indicaciones" label="Barrio e indicaciones para el domiciliario (opcional)">
              <input id="indicaciones" placeholder="Barrio, conjunto, punto de referencia" value={datos.indicaciones} onChange={cambiar("indicaciones")} className="field" />
            </Campo>
            <Campo id="notas" label="Notas del pedido (opcional)">
              <textarea id="notas" rows={3} value={datos.notas} onChange={cambiar("notas")} className="field" />
            </Campo>
          </fieldset>

          <div>
            <label className="flex items-start gap-3 text-sm text-brand-black/75">
              <input type="checkbox" checked={datos.acepta} onChange={cambiar("acepta")} className="mt-1 h-4 w-4 accent-brand-wine" />
              <span>
                Autorizo a MUNA para tratar mis datos personales con el fin de gestionar y entregar mi pedido, según la Ley 1581 de 2012.
              </span>
            </label>
            {errores.acepta && <p role="alert" className="mt-1 text-xs text-red-700">{errores.acepta}</p>}
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-brand-line bg-white p-6">
          <h2 className="font-display text-xl text-brand-black">Resumen del pedido</h2>
          <ul className="mt-5 divide-y divide-brand-line text-sm">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-4 py-3">
                <span>{item.title} <span className="text-brand-black/50">x {item.qty}</span></span>
                <span className="shrink-0 font-medium">{formatCOP(item.priceCOP * item.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t border-brand-line pt-5">
            <span className="text-sm uppercase tracking-[0.14em] text-brand-black/60">Total productos</span>
            <span className="font-display text-2xl text-brand-wine">{formatCOP(total)}</span>
          </div>
          <p className="mt-2 text-xs text-brand-black/55">El valor del envío se confirma contigo antes del despacho.</p>

          {fallo && <p role="alert" className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800">{fallo}</p>}

          <button type="submit" disabled={enviando} className="btn-primary mt-6 w-full disabled:opacity-60">
            {enviando ? "Procesando..." : "Continuar al pago"}
          </button>
          <Link href="/carrito" className="mt-3 block text-center text-sm text-brand-black/60 hover:text-brand-wine">Volver a mi bolsita</Link>
          <p className="mt-4 text-center text-xs text-brand-black/50">Pago seguro con Wompi</p>
        </aside>
      </form>
    </>
  );
}
