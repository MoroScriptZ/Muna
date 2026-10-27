"use client";

import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastContext";

export default function AddToCartButton({ id, title, className = "btn-primary" }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        addItem(id);
        showToast(`${title} agregado a tu bolsita`);
      }}
    >
      Agregar a tu bolsita
    </button>
  );
}
