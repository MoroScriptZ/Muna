// Contenido de ejemplo — reemplaza los textos e integrantes reales cuando los tengas.
const equipo = [
  { name: "Nombre Apellido", role: "Fundadora", photo: null },
  { name: "Nombre Apellido", role: "Maquilladora profesional", photo: null },
  { name: "Nombre Apellido", role: "Atención al cliente", photo: null }
];

export default function SobreNosotrosPage() {
  return (
    <div className="container-page py-12">
      <p className="font-display text-2xl tracking-[0.08em] text-brand-wine">MUNA</p>
      <h1 className="mt-4 font-display text-3xl text-brand-black">Sobre nosotros</h1>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl text-brand-wine">Nuestra historia</h2>
          <p className="mt-3 text-brand-black/70">
            [Texto de ejemplo] MUNA nació con la idea de ofrecer productos de maquillaje de
            calidad, accesibles y con una experiencia de compra simple y 100% en línea.
            Reemplaza este texto con la historia real del negocio.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-brand-wine">Misión</h2>
          <p className="mt-3 text-brand-black/70">
            [Texto de ejemplo] Ofrecer productos de maquillaje de alta calidad, accesibles y
            confiables, con una experiencia de compra cercana.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-brand-wine">Visión</h2>
          <p className="mt-3 text-brand-black/70">
            [Texto de ejemplo] Ser la tienda de maquillaje en línea de referencia en Colombia,
            reconocida por la calidad de sus productos y la calidez de su servicio.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-brand-wine">Nuestros valores</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-brand-black/70">
            <li>Confianza y profesionalismo</li>
            <li>Calidad garantizada en cada producto</li>
            <li>Atención cercana y personalizada</li>
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-xl text-brand-black">Nuestro equipo</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {equipo.map((m) => (
            <div key={m.name} className="rounded-2xl border border-brand-black/10 bg-white p-6 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-pink-light text-2xl">
                🙂
              </div>
              <p className="mt-3 font-semibold">{m.name}</p>
              <p className="text-sm text-brand-black/60">{m.role}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-brand-black/40">
          Reemplaza las fotos del equipo en /public/images/team/ y actualiza este arreglo en el código.
        </p>
      </div>
    </div>
  );
}
