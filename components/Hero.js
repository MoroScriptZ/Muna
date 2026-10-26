import Link from "next/link";
import { IconArrow, IconShield, IconTruck, IconChat } from "@/components/Icons";

const garantias = [
  { Icon: IconTruck, titulo: "Envíos a todo Colombia", texto: "Recibe tu pedido donde estés." },
  { Icon: IconShield, titulo: "Pago seguro", texto: "Procesado con la pasarela Wompi." },
  { Icon: IconChat, titulo: "Atención personalizada", texto: "Te asesoramos por WhatsApp." }
];

export default function Hero() {
  return (
    <>
      <section className="bg-brand-cream">
        <div className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="eyebrow">Tu belleza, tu esencia</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.12] text-brand-black md:text-6xl">
              Belleza que eliges para ti
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-brand-black/70">
              Maquillaje, skincare y accesorios seleccionados, en un solo lugar.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/tienda" className="btn-primary">
                Comprar ahora
                <IconArrow width={18} height={18} />
              </Link>
              <Link href="/sobre-nosotros" className="btn-outline">
                Conócenos
              </Link>
            </div>
          </div>

          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-lg bg-brand-wine md:aspect-square">
            <div className="absolute inset-4 rounded border border-white/25" aria-hidden="true" />
            <div className="text-center text-white">
              <p className="font-display text-5xl tracking-[0.25em] md:text-6xl">MUNA</p>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/70">Trendy by Muna</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-line bg-white">
        <ul className="container-page grid gap-6 py-8 md:grid-cols-3">
          {garantias.map(({ Icon, titulo, texto }) => (
            <li key={titulo} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-wine">
                <Icon />
              </span>
              <span>
                <span className="block text-sm font-semibold text-brand-black">{titulo}</span>
                <span className="block text-sm text-brand-black/60">{texto}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
