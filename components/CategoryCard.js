import Link from "next/link";
import { IconArrow } from "@/components/Icons";

// Tarjeta de un grupo del catalogo (Piel, Ojos, Labios...). `group` viene de `groups` en data/products.js.
export default function CategoryCard({ group }) {
  return (
    <Link
      href={`/tienda?grupo=${group.slug}`}
      className="group flex items-center justify-between gap-4 rounded-lg border border-brand-line bg-white p-6 transition hover:border-brand-wine hover:shadow-md"
    >
      <span>
        <span className="block font-display text-xl text-brand-black">{group.name}</span>
        <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-brand-black/50">
          {group.count} {group.count === 1 ? "producto" : "productos"}
        </span>
      </span>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-wine transition group-hover:bg-brand-wine group-hover:text-white">
        <IconArrow width={18} height={18} />
      </span>
    </Link>
  );
}
