import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import Galeria from "@/components/Galeria";
import { getProduct, products, slugOf, variantsOf } from "@/data/products";
import { formatCOP } from "@/lib/format";
import { bloquesDeDescripcion, especificaciones, primeraFrase, valorDe } from "@/lib/texto";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.id);
  if (!product) return {};
  return {
    title: `${product.title} | MUNA`,
    description: primeraFrase(product.description) || `${product.title} — ${formatCOP(product.priceCOP)}`,
  };
}

export default function ProductoPage({ params }) {
  const product = getProduct(params.id);
  if (!product) notFound();

  const variantes = variantsOf(product);
  const descripcion = bloquesDeDescripcion(product.description);
  const specs = especificaciones(product.specifications);
  // Datos que el cliente necesita ver sin abrir el acordeon.
  const contenido = valorDe(specs.items, "Contenido");
  const invima = valorDe(specs.items, "Registro Invima");
  const grupoHref = `/tienda?grupo=${slugOf(product.group)}`;

  return (
    <div className="container-page pb-24 pt-12">
      <nav aria-label="Ruta de navegación" className="text-sm text-brand-black/60">
        <Link href="/tienda" className="hover:text-brand-wine">Tienda</Link>
        <span aria-hidden="true"> / </span>
        <Link href={grupoHref} className="hover:text-brand-wine">{product.group}</Link>
        {product.category && (
          <>
            <span aria-hidden="true"> / </span>
            <Link href={`${grupoHref}&categoria=${encodeURIComponent(product.category)}`} className="hover:text-brand-wine">
              {product.category}
            </Link>
          </>
        )}
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <Galeria key={product.id} title={product.title} images={product.images} />

        <div>
          <p className="eyebrow">{product.category || product.group}</p>
          <h1 className="mt-3 font-display text-3xl leading-tight text-brand-black md:text-4xl">{product.title}</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-brand-black/50">Ref. {product.reference}</p>
          <p className="mt-5 border-b border-brand-line pb-6 text-3xl font-semibold text-brand-wine">{formatCOP(product.priceCOP)}</p>

          {variantes.length > 1 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-brand-black">Tonos y presentaciones</p>
              <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Tonos y presentaciones">
                {variantes.map((v) => (
                  <Link
                    key={v.id}
                    href={`/tienda/${v.id}`}
                    aria-current={v.id === product.id ? "true" : undefined}
                    className={`rounded-md border px-4 py-2 text-[13px] font-medium transition ${
                      v.id === product.id
                        ? "border-brand-wine bg-brand-wine text-white"
                        : "border-brand-line bg-white text-brand-black hover:border-brand-wine hover:text-brand-wine"
                    }`}
                  >
                    {v.variant}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {(contenido || invima) && (
            <dl className="mt-6 space-y-1 text-sm">
              {contenido && (
                <div className="flex gap-2">
                  <dt className="text-brand-black/55">Contenido:</dt>
                  <dd className="text-brand-black">{contenido}</dd>
                </div>
              )}
              {invima && (
                <div className="flex gap-2">
                  <dt className="text-brand-black/55">Registro INVIMA:</dt>
                  <dd className="text-brand-black">{invima}</dd>
                </div>
              )}
            </dl>
          )}

          <AddToCartButton id={product.id} title={product.title} className="btn-primary mt-8 w-full sm:w-auto sm:px-10" />
        </div>
      </div>

      {descripcion.length > 0 && (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl text-brand-black">Descripción</h2>
          <div className="mt-3 space-y-3 text-brand-black/75">
            {descripcion.map((bloque, i) =>
              bloque.tipo === "lista" ? (
                <ul key={i} className="list-disc space-y-1 pl-5">
                  {bloque.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : (
                <p key={i}>{bloque.texto}</p>
              )
            )}
          </div>
        </section>
      )}

      {(specs.items.length > 0 || specs.notas.length > 0) && (
        <details className="mt-8 max-w-3xl rounded-lg border border-brand-line bg-white p-6">
          <summary className="cursor-pointer font-display text-lg text-brand-black">Especificaciones del producto</summary>
          <dl className="mt-4 space-y-3 text-sm">
            {specs.items.map((item, i) => (
              <div key={`${item.clave}-${i}`} className="grid gap-1 sm:grid-cols-[11rem_1fr]">
                <dt className="font-medium text-brand-black">{item.clave}</dt>
                <dd className="text-brand-black/75">
                  {item.valores.length > 1 ? (
                    <ul className="list-disc space-y-1 pl-5">
                      {item.valores.map((v) => <li key={v}>{v}</li>)}
                    </ul>
                  ) : (
                    item.valores[0]
                  )}
                </dd>
              </div>
            ))}
          </dl>
          {specs.notas.map((nota) => (
            <p key={nota} className="mt-4 text-xs text-brand-black/60">{nota}</p>
          ))}
        </details>
      )}
    </div>
  );
}
