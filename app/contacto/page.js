"use client";

import { useState } from "react";

export default function ContactoPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: conectar este formulario a un endpoint real (ej. /api/contacto + Resend)
    setSent(true);
  }

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-brand-black">Contacto</h1>
      <p className="mt-2 text-brand-black/60">
        Escríbenos si tienes dudas sobre un pedido o nuestros productos.
      </p>

      <div className="mt-8 max-w-lg">
        {sent ? (
          <div className="rounded-2xl border border-brand-wine/30 bg-brand-pink-light p-6">
            ¡Gracias! Te responderemos pronto.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required type="text" placeholder="Nombre" className="w-full rounded-xl border border-brand-black/15 px-4 py-3" />
            <input required type="email" placeholder="Correo" className="w-full rounded-xl border border-brand-black/15 px-4 py-3" />
            <textarea required placeholder="Mensaje" rows={4} className="w-full rounded-xl border border-brand-black/15 px-4 py-3" />
            <button type="submit" className="btn-primary w-full">Enviar mensaje</button>
          </form>
        )}

        <div className="mt-8 space-y-1 text-sm text-brand-black/70">
          <p>📧 contacto@muna.co</p>
          <p>💬 WhatsApp: escríbenos por chat</p>
        </div>
      </div>
    </div>
  );
}
