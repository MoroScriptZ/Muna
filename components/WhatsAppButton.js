import { IconWhatsApp } from "@/components/Icons";

// Boton flotante de WhatsApp para consultas de productos.
const WHATSAPP_NUMBER = "573000000000"; // TODO: reemplazar por el numero real (con indicativo, sin el signo mas)

// bottom-20: queda por encima del sello de Netlify (esquina inferior derecha) para que no se tapen.
export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero saber más sobre sus productos.")}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1FA855] text-white shadow-lg transition hover:scale-105 hover:bg-[#188a45]"
      aria-label="Escríbenos por WhatsApp"
    >
      <IconWhatsApp />
    </a>
  );
}
