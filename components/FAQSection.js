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
    a: "Todos los productos se compran a distribuidores autorizados. Si tienes dudas sobre un lote o referencia, escríbenos antes de comprar."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="container-page py-20">
      <div className="mb-10 text-center">
        <p className="eyebrow">Ayuda</p>
        <h2 className="section-title">Preguntas frecuentes</h2>
      </div>
      <div className="mx-auto max-w-2xl divide-y divide-brand-line rounded-lg border border-brand-line bg-white">
        {faqs.map((item, i) => {
          const abierta = openIndex === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpenIndex(abierta ? null : i)}
                aria-expanded={abierta}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium text-brand-black transition hover:text-brand-wine"
              >
                {item.q}
                <span aria-hidden="true" className="text-xl leading-none text-brand-wine">{abierta ? "−" : "+"}</span>
              </button>
              {abierta && <p className="px-6 pb-5 text-sm leading-relaxed text-brand-black/70">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
