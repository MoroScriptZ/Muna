"use client";

import { useState } from "react";
import { useToast } from "@/components/ToastContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: conectar a un servicio real (ej. Resend Audiences, Mailchimp free tier)
    showToast("¡Gracias por suscribirte! 💌");
    setEmail("");
  }

  return (
    <section className="bg-brand-cream py-16">
      <div className="container-page flex flex-col items-center gap-4 text-center">
        <h2 className="font-display text-2xl text-brand-black md:text-3xl">
          Recibe ofertas y novedades
        </h2>
        <p className="max-w-md text-sm text-brand-black/65">
          Suscríbete y sé la primera en enterarte de nuevos productos y descuentos.
        </p>
        <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            className="flex-1 rounded-full border border-brand-black/15 bg-white px-4 py-3 text-sm outline-none placeholder:text-brand-black/40 focus:border-brand-wine"
          />
          <button type="submit" className="btn-primary">Suscribirme</button>
        </form>
      </div>
    </section>
  );
}
