import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-brand-cream">
      <div className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-wine">
            Tu belleza, tu esencia
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.15] text-brand-black md:text-5xl">
            Belleza que eliges
            <br />
            para ti
          </h1>
          <p className="mt-5 max-w-sm text-brand-black/70">
            Descubre maquillaje, skincare y accesorios en un solo lugar.
          </p>
          <div className="mt-8">
            <Link href="/tienda" className="btn-primary">
              Comprar ahora
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-10 flex gap-2" role="presentation">
            <span className="h-2 w-2 rounded-full bg-brand-wine" />
            <span className="h-2 w-2 rounded-full bg-brand-black/15" />
            <span className="h-2 w-2 rounded-full bg-brand-black/15" />
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-brand-pink-muted md:aspect-square">
          <div className="flex h-full w-full items-center justify-center text-center text-sm text-brand-wine-dark/60">
            Foto de producto
            <br />
            próximamente
          </div>
          <p className="absolute right-6 top-6 max-w-[10rem] text-right font-display text-lg italic text-brand-wine-dark/70">
            Belleza real para días reales
          </p>
        </div>
      </div>
    </section>
  );
}
