import Link from "next/link";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import FAQSection from "@/components/FAQSection";
import Newsletter from "@/components/Newsletter";
import { IconArrow } from "@/components/Icons";
import { groups, products } from "@/data/products";

// A las tarjetas solo viajan los campos que usan (no las descripciones largas).
const resumen = ({ id, title, group, category, image, priceCOP }) => ({ id, title, group, category, image, priceCOP });

export default function HomePage() {
  const destacados = products.slice(0, 8).map(resumen);

  return (
    <>
      <Hero />

      <section className="container-page py-20">
        <div className="mb-10 text-center">
          <p className="eyebrow">Colección</p>
          <h2 className="section-title">Compra por categoría</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <CategoryCard key={g.slug} group={g} />
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Selección</p>
              <h2 className="section-title">Productos destacados</h2>
            </div>
            <Link href="/tienda" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-brand-wine hover:underline">
              Ver todo
              <IconArrow width={16} height={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {destacados.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      <Newsletter />
    </>
  );
}
