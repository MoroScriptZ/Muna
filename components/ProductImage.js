// Foto del producto. El Excel no trae imagenes: mientras `image` este vacio se muestra un espacio
// reservado (sin URLs inventadas). Cuando tengas la foto, ponla en public/images/products/ y escribe
// su nombre de archivo en el campo `image` del producto.
export const TEXTO_SIN_FOTO = "Foto próximamente";

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
    <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-brand-wine-dark/60">
      {TEXTO_SIN_FOTO}
    </div>
  );
}
