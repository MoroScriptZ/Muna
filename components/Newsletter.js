"use client";

import { useState } from "react";
import { useToast } from "@/components/ToastContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: conectar a un servicio real (ej. Resend Audiences, Mailchimp free tier)
    showToast("Gracias por suscribirte");
    setEmail("");
  }

  return (
    <section className="bg-brand-wine py-20 text-white">
      <div className="container-page flex flex-col items-center gap-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Boletín</p>
        <h2 className="font-display text-3xl md:text-4xl">Recibe ofertas y novedades</h2>
        <p className="max-w-md text-sm leading-relaxed text-white/75">
          Suscríbete y sé la primera en enterarte de nuevos productos y descuentos.
        </p>
        <form onSubmit={handleSubmit} className="mt-4 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            aria-label="Correo electrónico"
            className="flex-1 rounded-md border border-transparent bg-white px-4 py-3.5 text-sm text-brand-black outline-none placeholder:text-brand-black/40 focus:border-brand-gold"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-brand-black px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-black"
          >
            Suscribirme
          </button>
        </form>
      </div>
    </section>
  );
}
