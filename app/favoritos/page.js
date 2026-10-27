"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/components/WishlistContext";
import { products } from "@/data/products";

const resumen = ({ id, title, group, category, image, priceCOP }) => ({ id, title, group, category, image, priceCOP });

export default function FavoritosPage() {
  const { items } = useWishlist();
  const guardados = products.filter((p) => items.includes(p.id)).map(resumen);

  return (
    <>
      <section className="border-b border-brand-line bg-brand-cream">
        <div className="container-page py-12">
          <p className="eyebrow">Lo que te gusta</p>
          <h1 className="section-title">Mis favoritos</h1>
        </div>
      </section>

      <div className="container-page pb-24 pt-10">
        {guardados.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-brand-black/60">Aún no has guardado favoritos. Toca el corazón de un producto para verlo aquí.</p>
            <Link href="/tienda" className="btn-primary mt-8">Ir a la tienda</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {guardados.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
