// Botón flotante de WhatsApp para consultas de productos.
const WHATSAPP_NUMBER = "573000000000"; // TODO: reemplazar por el número real (con indicativo, sin '+')

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "¡Hola! Quiero saber más sobre sus productos 💄"
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-wine text-2xl text-white shadow-lg transition hover:scale-105"
      aria-label="Escríbenos por WhatsApp"
    >
      💬
    </a>
  );
}
