import Link from "next/link";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import FAQSection from "@/components/FAQSection";
import Newsletter from "@/components/Newsletter";
import { groups, products } from "@/data/products";

// A las tarjetas solo viajan los campos que usan (no las descripciones largas).
const resumen = ({ id, title, group, category, image, priceCOP }) => ({ id, title, group, category, image, priceCOP });

export default function HomePage() {
  const destacados = products.slice(0, 6).map(resumen);

  return (
    <>
      <Hero />

      <section className="container-page py-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {groups.map((g) => (
            <CategoryCard key={g.slug} group={g} />
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mb-8 flex items-end justify-between border-b border-brand-black/10 pb-4">
          <h2 className="font-display text-2xl text-brand-black md:text-3xl">Nuestros productos</h2>
          <Link href="/tienda" className="text-sm font-medium text-brand-wine hover:underline">
            Ver todo →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {destacados.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <FAQSection />
      <Newsletter />
    </>
  );
}
