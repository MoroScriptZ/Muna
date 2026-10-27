"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import { IconBag, IconClose, IconHeart, IconMenu } from "@/components/Icons";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { items: favoritos } = useWishlist();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-brand-ivory/95 backdrop-blur">
      <div className="bg-brand-wine py-2 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white">
        Envíos a todo Colombia
      </div>

      <div className="border-b border-brand-line">
        <div className="container-page flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="MUNA, ir al inicio" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="MUNA" width={428} height={131} className="h-9 w-auto" />
          </Link>

          <nav className="hidden items-center gap-10 md:flex" aria-label="Principal">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b pb-1 text-[13px] font-medium uppercase tracking-[0.14em] transition ${
                    active
                      ? "border-brand-wine text-brand-wine"
                      : "border-transparent text-brand-black/70 hover:text-brand-wine"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/favoritos"
              aria-label={`Mis favoritos, ${favoritos.length} guardados`}
              className="relative flex h-10 items-center gap-2 rounded-full px-3 text-brand-black/75 transition hover:bg-brand-cream hover:text-brand-wine"
            >
              <IconHeart width={22} height={22} filled={favoritos.length > 0} className={favoritos.length > 0 ? "text-brand-wine" : ""} />
              <span className="hidden text-[13px] font-medium uppercase tracking-[0.12em] lg:inline">Favoritos</span>
              {favoritos.length > 0 && (
                <span className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-wine px-1 text-[10px] font-semibold text-white lg:static">
                  {favoritos.length}
                </span>
              )}
            </Link>

            <Link
              href="/carrito"
              aria-label={`Tu bolsita, ${count} productos`}
              className="depth relative flex h-11 items-center gap-2 rounded-full bg-brand-wine px-4 text-white hover:bg-brand-wine-dark"
            >
              <IconBag width={20} height={20} />
              <span className="hidden text-[13px] font-semibold uppercase tracking-[0.12em] sm:inline">Mi bolsita</span>
              <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-brand-wine">
                {count}
              </span>
            </Link>

            <button
              className="flex h-10 w-10 items-center justify-center text-brand-black md:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav className="border-b border-brand-line bg-brand-ivory md:hidden" aria-label="Principal móvil">
          <div className="container-page flex flex-col py-2">
            {[...links, { href: "/favoritos", label: "Mis favoritos" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-brand-line py-3 text-sm font-medium uppercase tracking-[0.14em] text-brand-black/80 last:border-0 hover:text-brand-wine"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
