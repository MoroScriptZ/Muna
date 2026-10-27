"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartContext";

// Vacia la bolsita una sola vez cuando el pago fue aprobado.
export default function VaciarBolsita() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
