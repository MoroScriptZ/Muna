"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { IconBag } from "@/components/Icons";

// Acceso rapido a la bolsita, encima del boton de WhatsApp. Se oculta en la propia bolsita.
export default function FloatingCart() {
  const { count } = useCart();
  const pathname = usePathname();
  if (pathname === "/carrito") return null;

  return (
    <Link
      href="/carrito"
      aria-label={`Ver tu bolsita, ${count} productos`}
      className="depth fixed bottom-[9.5rem] right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-wine text-white hover:bg-brand-wine-dark"
    >
      <IconBag width={24} height={24} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-6 min-w-[24px] items-center justify-center rounded-full border-2 border-white bg-brand-gold px-1 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
