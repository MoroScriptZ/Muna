import Link from "next/link";
import { IconArrow } from "@/components/Icons";

// Tarjeta de un grupo del catalogo (Piel, Ojos, Labios...). `group` viene de `groups` en data/products.js.
export default function CategoryCard({ group }) {
  return (
    <Link
      href={`/tienda?grupo=${group.slug}`}
      className="depth group flex items-center justify-between gap-4 rounded-lg bg-brand-wine p-6 text-white hover:bg-brand-wine-dark"
    >
      <span>
        <span className="block font-display text-xl">{group.name}</span>
        <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-white/70">
          {group.count} {group.count === 1 ? "producto" : "productos"}
        </span>
      </span>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition group-hover:bg-white group-hover:text-brand-wine">
        <IconArrow width={18} height={18} />
      </span>
    </Link>
  );
}
