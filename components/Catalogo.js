"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { categoriesOfGroup, groups, products } from "@/data/products";

const sinTildes = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const chip = (activo) =>
  `rounded-full border px-4 py-2 text-sm font-medium transition ${
    activo ? "border-brand-wine bg-brand-wine text-white" : "border-brand-black/15 text-brand-black hover:border-brand-wine"
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
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-brand-black">Tienda</h1>
      <p className="mt-2 text-brand-black/60">Maquillaje, skincare y accesorios.</p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por grupo">
          {["Todos", ...groups.map((g) => g.name)].map((nombre) => (
            <button key={nombre} onClick={() => elegirGrupo(nombre)} aria-pressed={grupo === nombre} className={chip(grupo === nombre)}>
              {nombre}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Buscar producto..."
          aria-label="Buscar producto"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full rounded-full border border-brand-black/15 px-4 py-2 sm:w-64"
        />
      </div>

      {categorias.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          {["Todas", ...categorias].map((nombre) => (
            <button key={nombre} onClick={() => setCategoria(nombre)} aria-pressed={categoria === nombre} className={chip(categoria === nombre)}>
              {nombre}
            </button>
          ))}
        </div>
      )}

      <p className="mt-6 text-sm text-brand-black/55" aria-live="polite">
        {filtrados.length} de {products.length} productos
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {filtrados.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
        {filtrados.length === 0 && (
          <p className="col-span-full py-10 text-center text-brand-black/50">
            No encontramos productos con ese filtro. Prueba con otro grupo o borra la búsqueda.
          </p>
        )}
      </div>
    </div>
  );
}
