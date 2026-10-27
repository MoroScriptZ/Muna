import { IconWhatsApp } from "@/components/Icons";
import { WHATSAPP_NUMBER } from "@/lib/contacto";

// Boton flotante de WhatsApp para consultas de productos.
// bottom-20: queda por encima del sello de Netlify (esquina inferior derecha) para que no se tapen.
export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero saber más sobre sus productos.")}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1FA855] text-white shadow-[0_3px_0_#0f6b33,0_10px_18px_-8px_rgba(0,0,0,0.5)] transition hover:-translate-y-px hover:bg-[#188a45] active:translate-y-[3px] active:shadow-none"
      aria-label="Escríbenos por WhatsApp"
    >
      <IconWhatsApp />
    </a>
  );
}
