import Link from "next/link";

// Tarjeta de un grupo del catalogo (Piel, Ojos, Labios...). `group` viene de `groups` en data/products.js.
export default function CategoryCard({ group }) {
  return (
    <Link
      href={`/tienda?grupo=${group.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[20px] bg-brand-beige"
    >
      <div className="absolute inset-0 flex items-center justify-center text-sm text-brand-wine-dark/50">
        Foto próximamente
      </div>

      <div className="relative flex items-center justify-between gap-3 bg-white/90 p-4 backdrop-blur">
        <span>
          <span className="block font-display text-base text-brand-black">{group.name}</span>
          <span className="block text-xs text-brand-black/55">
            {group.count} {group.count === 1 ? "producto" : "productos"}
          </span>
        </span>
        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-wine text-white transition group-hover:bg-brand-wine-dark">
          →
        </span>
      </div>
    </Link>
  );
}
