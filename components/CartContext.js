"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/data/products";

const CartContext = createContext(null);
const CLAVE = "muna-cart";

// El carrito guarda solo { id, qty }: nombre y precio se leen siempre del catalogo,
// asi un precio corregido en el catalogo se refleja tambien en carritos ya armados.
export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(CLAVE) || "[]");
      // Se descartan productos que ya no existen (el catalogo anterior usaba otros ids).
      setLines(
        saved
          .filter((l) => l && getProduct(l.id) && l.qty > 0)
          .map((l) => ({ id: l.id, qty: Math.floor(l.qty) }))
      );
    } catch {
      setLines([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CLAVE, JSON.stringify(lines));
  }, [lines, hydrated]);

  const items = useMemo(() => lines.map((l) => ({ ...getProduct(l.id), qty: l.qty })), [lines]);

  function addItem(id) {
    setLines((prev) =>
      prev.some((l) => l.id === id)
        ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
        : [...prev, { id, qty: 1 }]
    );
  }

  function removeItem(id) {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }

  function updateQty(id, qty) {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l)));
  }

  function clearCart() {
    setLines([]);
  }

  const total = items.reduce((sum, i) => sum + i.priceCOP * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
