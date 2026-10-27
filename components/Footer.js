import Link from "next/link";
import { IconInstagram } from "@/components/Icons";
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/contacto";

const col = "mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white";
const enlace = "transition hover:text-white";

export default function Footer() {
  return (
    <footer className="bg-brand-wine-dark text-white/70">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-blanco.png" alt="MUNA" width={428} height={131} className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Maquillaje, skincare y accesorios seleccionados para que elijas lo que realmente va contigo.
          </p>
        </div>

        <div>
          <p className={col}>Explora</p>
          <ul className="space-y-3 text-sm">
            <li><Link href="/tienda" className={enlace}>Tienda</Link></li>
            <li><Link href="/sobre-nosotros" className={enlace}>Nosotros</Link></li>
            <li><Link href="/carrito" className={enlace}>Mi bolsita</Link></li>
            <li><Link href="/favoritos" className={enlace}>Mis favoritos</Link></li>
          </ul>
        </div>

        <div>
          <p className={col}>Ayuda</p>
          <ul className="space-y-3 text-sm">
            <li><Link href="/contacto" className={enlace}>Contacto</Link></li>
            {WHATSAPP_NUMBER && <li>Atención por WhatsApp</li>}
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${enlace} inline-flex items-center gap-2`}>
                <IconInstagram width={18} height={18} /> Instagram
              </a>
            </li>
            <li><Link href="/privacidad" className={enlace}>Política de datos</Link></li>
            <li>Pagos seguros con Wompi</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs tracking-wide text-white/50">
        © {new Date().getFullYear()} MUNA. Todos los derechos reservados. · <Link href="/admin" className="hover:text-white">Administración</Link>
      </div>
    </footer>
  );
}
