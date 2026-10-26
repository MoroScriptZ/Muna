"use client";

import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { IconBag, IconHeart } from "@/components/Icons";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastContext";
import { useWishlist } from "@/components/WishlistContext";
import { formatCOP } from "@/lib/format";

// `product` solo necesita: id, title, group, category, image y priceCOP.
export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggle, isSaved } = useWishlist();
  const { showToast } = useToast();
  const guardado = isSaved(product.id);

  function handleAgregar() {
    addItem(product.id);
    showToast(`${product.title} agregado al carrito`);
  }

  function handleFavorito(e) {
    e.preventDefault();
    toggle(product.id);
    showToast(guardado ? "Quitado de favoritos" : "Guardado en favoritos");
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-brand-line bg-white transition hover:shadow-md">
      <Link href={`/tienda/${product.id}`} className="relative block aspect-square w-full bg-brand-cream/60">
        <button
          type="button"
          aria-label={guardado ? "Quitar de favoritos" : "Guardar en favoritos"}
          aria-pressed={guardado}
          onClick={handleFavorito}
          className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition ${
            guardado ? "text-brand-wine" : "text-brand-black/45 hover:text-brand-wine"
          }`}
        >
          <IconHeart width={18} height={18} filled={guardado} />
        </button>
        <ProductImage product={product} />
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-black/50">
          {product.category || product.group}
        </p>
        <Link href={`/tienda/${product.id}`} className="font-display text-[17px] leading-snug text-brand-black transition hover:text-brand-wine">
          {product.title}
        </Link>

        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="text-base font-semibold text-brand-wine">{formatCOP(product.priceCOP)}</p>
          <button
            onClick={handleAgregar}
            aria-label={`Agregar ${product.title} al carrito`}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-wine text-white transition hover:bg-brand-wine-dark"
          >
            <IconBag width={18} height={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
