"use client";

import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastContext";
import { useWishlist } from "@/components/WishlistContext";
import { formatCOP } from "@/lib/format";

const PASTEL_BACKGROUNDS = ["bg-brand-pink-muted", "bg-brand-beige", "bg-brand-pink-light"];

// `product` solo necesita: id, title, group, category, image y priceCOP.
export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const { toggle, isSaved } = useWishlist();
  const { showToast } = useToast();
  const pastel = PASTEL_BACKGROUNDS[index % PASTEL_BACKGROUNDS.length];
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
    <div className="group flex flex-col overflow-hidden rounded-[20px] border border-brand-black/5 bg-white">
      <Link href={`/tienda/${product.id}`} className={`relative block aspect-square w-full ${pastel}`}>
        <button
          type="button"
          aria-label={guardado ? "Quitar de favoritos" : "Guardar en favoritos"}
          aria-pressed={guardado}
          onClick={handleFavorito}
          className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 transition ${
            guardado ? "text-brand-wine" : "text-brand-black/40 hover:text-brand-wine"
          }`}
        >
          {guardado ? "♥" : "♡"}
        </button>
        <ProductImage product={product} />
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs text-brand-black/55">
          {product.group}
          {product.category ? ` · ${product.category}` : ""}
        </p>
        <Link href={`/tienda/${product.id}`} className="font-display text-base leading-snug text-brand-black hover:text-brand-wine">
          {product.title}
        </Link>

        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="font-display text-lg text-brand-wine">{formatCOP(product.priceCOP)}</p>
          <button
            onClick={handleAgregar}
            aria-label={`Agregar ${product.title} al carrito`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-wine text-white transition hover:bg-brand-wine-dark"
          >
            🛍
          </button>
        </div>
      </div>
    </div>
  );
}
