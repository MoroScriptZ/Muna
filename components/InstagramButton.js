import { IconInstagram } from "@/components/Icons";
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/contacto";

// Boton flotante de Instagram, encima del de WhatsApp (bottom-20 + 56px de alto + separacion).
export default function InstagramButton() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Síguenos en Instagram"
      className={`fixed ${WHATSAPP_NUMBER ? "bottom-[9.5rem]" : "bottom-20"} right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-[0_3px_0_#5b1f78,0_10px_18px_-8px_rgba(0,0,0,0.5)] transition hover:-translate-y-px active:translate-y-[3px] active:shadow-none`}
    >
      <IconInstagram width={26} height={26} />
    </a>
  );
}
