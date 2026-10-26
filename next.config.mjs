/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Mientras no haya un dominio real de imágenes, permitimos imágenes locales de /public.
    // Cuando tengas fotos reales alojadas afuera (ej. Supabase Storage o Cloudinary),
    // agrega el dominio aquí en "remotePatterns".
    remotePatterns: []
  }
};

export default nextConfig;
