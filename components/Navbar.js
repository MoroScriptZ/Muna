"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartContext";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-black/10 bg-brand-cream/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-8">
        <Link
          href="/"
          className="font-display text-2xl tracking-[0.08em] text-brand-wine"
        >
          MUNA
        </Link>

        <nav className="hidden gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`pb-1 text-sm transition ${
                  active
                    ? "border-b-2 border-brand-wine font-medium text-brand-wine"
                    : "text-brand-black/70 hover:text-brand-wine"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden flex-1 max-w-xs md:block">
          <input
            type="search"
            placeholder="Buscar productos..."
            className="w-full rounded-full border border-brand-black/15 bg-white px-4 py-2 text-sm outline-none transition focus:border-brand-wine"
          />
        </div>

        <div className="flex items-center gap-5">
          <Link href="/carrito" className="relative text-brand-black/80 hover:text-brand-wine" aria-label={`Carrito, ${count} productos`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-wine text-[11px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>

          <button
            className="text-brand-black md:hidden"
            aria-label="Abrir menú"
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-brand-black/10 md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-2 text-brand-black/80 hover:bg-brand-pink-muted hover:text-brand-wine"
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
