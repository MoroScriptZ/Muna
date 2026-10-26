// Contenido de ejemplo: reemplaza estos textos por los reales del negocio.
// La seccion de equipo se retiro hasta tener nombres y fotos reales.
const bloques = [
  {
    titulo: "Nuestra historia",
    texto:
      "[Texto de ejemplo] MUNA nació con la idea de ofrecer productos de maquillaje de calidad, accesibles y con una experiencia de compra simple y 100% en línea."
  },
  {
    titulo: "Misión",
    texto:
      "[Texto de ejemplo] Ofrecer productos de maquillaje de alta calidad, accesibles y confiables, con una experiencia de compra cercana."
  },
  {
    titulo: "Visión",
    texto:
      "[Texto de ejemplo] Ser la tienda de maquillaje en línea de referencia en Colombia, reconocida por la calidad de sus productos y la calidez de su servicio."
  }
];

const valores = ["Confianza y profesionalismo", "Calidad garantizada en cada producto", "Atención cercana y personalizada"];

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="border-b border-brand-line bg-brand-cream">
        <div className="container-page py-14">
          <p className="eyebrow">MUNA</p>
          <h1 className="section-title">Sobre nosotros</h1>
        </div>
      </section>

      <div className="container-page grid gap-6 py-14 md:grid-cols-2">
        {bloques.map((b) => (
          <section key={b.titulo} className="rounded-lg border border-brand-line bg-white p-8">
            <h2 className="font-display text-2xl text-brand-wine">{b.titulo}</h2>
            <p className="mt-3 leading-relaxed text-brand-black/70">{b.texto}</p>
          </section>
        ))}
        <section className="rounded-lg border border-brand-line bg-white p-8">
          <h2 className="font-display text-2xl text-brand-wine">Nuestros valores</h2>
          <ul className="mt-3 space-y-2 text-brand-black/70">
            {valores.map((v) => (
              <li key={v} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                {v}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
