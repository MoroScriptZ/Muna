// Foto del producto. El Excel no trae imagenes: mientras `image` este vacio se muestra un espacio
// reservado (sin URLs inventadas). Cuando tengas la foto, ponla en public/images/products/ y escribe
// su nombre de archivo en el campo `image` del producto.
export const TEXTO_SIN_FOTO = "Imagen próximamente";

export default function ProductImage({ product }) {
  if (product.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/images/products/${product.image}`}
        alt={product.title}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
      <span className="font-display text-3xl tracking-[0.2em] text-brand-wine/35">MUNA</span>
      <span className="text-[11px] uppercase tracking-[0.18em] text-brand-black/40">{TEXTO_SIN_FOTO}</span>
    </div>
  );
}
