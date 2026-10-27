"use client";

import { useState } from "react";
import { IconChat, IconInstagram, IconMail } from "@/components/Icons";
import { CORREO, INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/contacto";

export default function ContactoPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: conectar este formulario a un endpoint real (ej. /api/contacto + Resend)
    setSent(true);
  }

  return (
    <>
      <section className="border-b border-brand-line bg-brand-cream">
        <div className="container-page py-14">
          <p className="eyebrow">Escríbenos</p>
          <h1 className="section-title">Contacto</h1>
          <p className="mt-3 max-w-xl text-brand-black/65">
            Si tienes dudas sobre un pedido o nuestros productos, estamos para ayudarte.
          </p>
        </div>
      </section>

      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
        <div>
          {sent ? (
            <div className="rounded-lg border border-brand-wine/30 bg-brand-pink-light p-6">
              Gracias. Te responderemos pronto.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Nombre" aria-label="Nombre" className="field" />
              <input required type="email" placeholder="Correo" aria-label="Correo" className="field" />
              <textarea required placeholder="Mensaje" aria-label="Mensaje" rows={5} className="field" />
              <button type="submit" className="btn-primary w-full sm:w-auto">Enviar mensaje</button>
            </form>
          )}
        </div>

        <aside className="space-y-6 rounded-lg border border-brand-line bg-white p-6 text-sm">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-wine">
              <IconMail />
            </span>
            <span>
              <span className="block font-semibold text-brand-black">Correo</span>
              <span className="text-brand-black/65">{CORREO}</span>
            </span>
          </div>
          {WHATSAPP_NUMBER && <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-wine">
              <IconChat />
            </span>
            <span>
              <span className="block font-semibold text-brand-black">WhatsApp</span>
              <span className="text-brand-black/65">Escríbenos por el botón del chat.</span>
            </span>
          </div>}
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-wine">
              <IconInstagram />
            </span>
            <span>
              <span className="block font-semibold text-brand-black">Instagram</span>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-brand-wine hover:underline">
                Síguenos en Instagram
              </a>
            </span>
          </div>
        </aside>
      </div>
    </>
  );
}
