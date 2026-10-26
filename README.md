# MUNA — Tienda de maquillaje en línea

Proyecto Next.js (React) con tienda en línea de maquillaje, carrito y checkout,
y espacios listos para conectar Supabase y Wompi.

Todo el contenido (productos, precios, textos de "Sobre nosotros", equipo) es
**de prueba**. Está señalado con comentarios `TODO` o `[Texto de ejemplo]` en
el código para que lo reemplaces fácilmente.

---

## 1. Cómo abrir el proyecto en VS Code

1. Ábrelo en VS Code (`Archivo > Abrir carpeta`).
2. Abre una terminal integrada (`Ctrl + ñ` o `Terminal > Nueva terminal`).

## 2. Instalación

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## 3. Estructura del proyecto

```
muna-web/
├── app/                    → Páginas (App Router de Next.js)
│   ├── page.js             → Inicio
│   ├── tienda/              → Catálogo + detalle de producto
│   ├── sobre-nosotros/      → Historia, misión, visión, equipo
│   ├── contacto/            → Formulario de contacto
│   ├── carrito/              → Carrito de compras
│   └── api/                 → Endpoints (checkout)
├── components/               → Navbar, Footer, tarjetas, botón de WhatsApp...
├── data/                      → products.js (DATOS DE PRUEBA)
├── public/images/             → Carpetas para tus fotos reales (ver README.txt en cada una)
└── .env.local.example           → Variables de entorno a completar
```

## 4. Qué es "de prueba" y dónde reemplazarlo

| Qué | Dónde | Cómo reemplazarlo |
|---|---|---|
| Fotos de productos | `public/images/products/` | Sube el archivo con el mismo nombre que el campo `image` en `data/products.js` |
| Catálogo de productos | `data/products.js` | Edita el arreglo con tus productos reales, o conéctalo a Supabase |
| Textos "Sobre nosotros" | `app/sobre-nosotros/page.js` | Reemplaza los párrafos `[Texto de ejemplo]` |
| Fotos del equipo | `public/images/team/` + `app/sobre-nosotros/page.js` | Sube fotos y actualiza el arreglo `equipo` |
| Número de WhatsApp del botón flotante | `components/WhatsAppButton.js` | Cambia `WHATSAPP_NUMBER` |

## 5. Integraciones pendientes (ya dejadas listas para conectar)

### Supabase (base de datos real)
- Crea un proyecto en [supabase.com](https://supabase.com) (plan gratuito).
- Completa `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en `.env.local`.
- Instala el paquete: `npm install @supabase/supabase-js`.
- Descomenta el cliente en `lib/supabaseClient.js`.

### Pagos (Wompi)
- Crea una cuenta de comercio en [comercios.wompi.co](https://comercios.wompi.co).
- Completa `NEXT_PUBLIC_WOMPI_PUBLIC_KEY` y `WOMPI_PRIVATE_KEY` en `.env.local`.
- Reemplaza la lógica simulada en `app/api/checkout/route.js` por la
  generación real de una transacción/widget de Wompi.

### Correo transaccional (Resend, opcional)
- Crea cuenta en [resend.com](https://resend.com) (3.000 correos/mes gratis).
- Completa `RESEND_API_KEY` en `.env.local`.

## 6. Despliegue en la nube (cuando esté listo)

- **Sitio web**: [Vercel](https://vercel.com) — conecta el repositorio de
  GitHub y despliega automáticamente (plan gratuito para empezar).
