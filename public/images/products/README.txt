Coloca aquí las fotos reales de los productos.

El nombre del archivo debe coincidir EXACTAMENTE con el campo "image" de
cada producto en /data/products.js. Por ejemplo:

  base-velvet-matte.jpg
  paleta-sunset.jpg
  labial-matte-kiss.jpg
  ...

Mientras no subas la foto, la tienda muestra un marcador "📷 Foto próximamente"
automáticamente (ver components/ProductCard.js), así que no rompe nada dejar
esta carpeta vacía por ahora.

Una vez tengas las fotos reales, en ProductCard.js y en tienda/[id]/page.js
reemplaza el bloque del marcador de posición por:

  <img src={`/images/products/${product.image}`} alt={product.name} className="h-full w-full object-cover" />
