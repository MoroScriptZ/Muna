"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { categoriesOfGroup, groups, products } from "@/data/products";

const sinTildes = (texto) => texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const chip = (activo) =>
  `rounded-md border px-4 py-2 text-[13px] font-medium transition ${
    activo
      ? "border-brand-wine bg-brand-wine text-white"
      : "border-brand-line bg-white text-brand-black hover:border-brand-wine hover:text-brand-wine"
  }`;

export default function Catalogo({ grupoInicial, categoriaInicial }) {
  const [grupo, setGrupo] = useState(grupoInicial);
  const [categoria, setCategoria] = useState(categoriaInicial);
  const [busqueda, setBusqueda] = useState("");
  const categorias = grupo === "Todos" ? [] : categoriesOfGroup(grupo);

  const filtrados = useMemo(() => {
    const q = sinTildes(busqueda.trim());
    return products.filter(
      (p) =>
        (grupo === "Todos" || p.group === grupo) &&
        (categoria === "Todas" || p.category === categoria) &&
        (!q || sinTildes(`${p.title} ${p.reference} ${p.group} ${p.category ?? ""}`).includes(q))
    );
  }, [grupo, categoria, busqueda]);

  function elegirGrupo(nombre) {
    setGrupo(nombre);
    setCategoria("Todas");
  }

  return (
    <>
      <section className="border-b border-brand-line bg-brand-cream">
        <div className="container-page py-14">
          <p className="eyebrow">Catálogo</p>
          <h1 className="section-title">Tienda</h1>
          <p className="mt-3 max-w-xl text-brand-black/65">Maquillaje, skincare y accesorios.</p>
        </div>
      </section>

      <div className="container-page pb-24 pt-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por grupo">
            {["Todos", ...groups.map((g) => g.name)].map((nombre) => (
              <button key={nombre} onClick={() => elegirGrupo(nombre)} aria-pressed={grupo === nombre} className={chip(grupo === nombre)}>
                {nombre}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Buscar producto"
            aria-label="Buscar producto"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="field lg:w-72"
          />
        </div>

        {categorias.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-brand-line pt-3" role="group" aria-label="Filtrar por categoría">
            {["Todas", ...categorias].map((nombre) => (
              <button key={nombre} onClick={() => setCategoria(nombre)} aria-pressed={categoria === nombre} className={chip(categoria === nombre)}>
                {nombre}
              </button>
            ))}
          </div>
        )}

        <p className="mt-8 text-xs uppercase tracking-[0.16em] text-brand-black/50" aria-live="polite">
          {filtrados.length} de {products.length} productos
        </p>

        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filtrados.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {filtrados.length === 0 && (
            <p className="col-span-full py-16 text-center text-brand-black/50">
              No encontramos productos con ese filtro. Prueba con otro grupo o borra la búsqueda.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
