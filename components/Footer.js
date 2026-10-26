import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-brand-black text-white/70">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-xl tracking-[0.08em] text-white">MUNA</p>
          <p className="mt-3 text-sm">Maquillaje y belleza, tienda en línea.</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-white">Explora</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/tienda" className="hover:text-brand-wine">Tienda</Link></li>
            <li><Link href="/sobre-nosotros" className="hover:text-brand-wine">Sobre nosotros</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-white">Ayuda</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contacto" className="hover:text-brand-wine">Contacto</Link></li>
            <li><span>WhatsApp: escríbenos por chat</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs">
        © {new Date().getFullYear()} MUNA. Todos los derechos reservados.
      </div>
    </footer>
  );
}
