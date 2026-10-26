"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Hacen envíos a todo el país?",
    a: "Sí, enviamos a todo Colombia. El tiempo de entrega depende de tu ciudad y lo verás antes de pagar."
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Tarjeta de crédito o débito, PSE y Nequi. Los pagos se procesan con una pasarela certificada, y nunca almacenamos los datos de tu tarjeta."
  },
  {
    q: "¿Puedo devolver un producto?",
    a: "Si un producto llega dañado o no corresponde a tu pedido, escríbenos dentro de los primeros 5 días y lo resolvemos sin costo."
  },
  {
    q: "¿Cómo sé si un producto es original?",
    a: "Todos los productos se compran a distribuidores autorizados. Si tienes dudas sobre un lote o referencia, escríbenos por WhatsApp antes de comprar."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="container-page py-16">
      <h2 className="text-center font-display text-2xl text-brand-black md:text-3xl">
        Preguntas frecuentes
      </h2>
      <div className="mx-auto mt-8 max-w-2xl divide-y divide-brand-black/10 rounded-2xl border border-brand-black/10 bg-white">
        {faqs.map((item, i) => (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-brand-black"
            >
              {item.q}
              <span className="text-brand-wine">{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <p className="px-5 pb-4 text-sm text-brand-black/70">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
