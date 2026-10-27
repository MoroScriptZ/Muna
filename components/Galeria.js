"use client";

import { useState } from "react";
import ProductImage from "@/components/ProductImage";

// Foto principal + miniaturas. `key` en la pagina reinicia la seleccion al cambiar de tono.
export default function Galeria({ title, images }) {
  const [actual, setActual] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square overflow-hidden rounded-lg border border-brand-line bg-white">
        <ProductImage product={{ title, image: "" }} />
      </div>
    );
  }

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-lg border border-brand-line bg-white">
        <ProductImage product={{ title, image: images[actual] }} priority />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActual(i)}
              aria-label={`Ver foto ${i + 1} de ${title}`}
              aria-pressed={i === actual}
              className={`aspect-square overflow-hidden rounded-md border bg-white transition ${
                i === actual ? "border-brand-wine" : "border-brand-line opacity-70 hover:opacity-100"
              }`}
            >
              <ProductImage product={{ title: `${title}, foto ${i + 1}`, image: img }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
