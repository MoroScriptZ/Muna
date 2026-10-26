# MUNA — Pendientes

## Por decidir (necesito tu respuesta)

- **Tienda real o demo**: ¿los productos actuales son de prueba o ya tienes catálogo real (nombres, precios, stock, fotos)?
- **Supabase**: ¿lo conectamos para que productos y pedidos vivan en una base de datos real, o seguimos con los datos en código?
- **Pagos (Wompi)**: ¿activamos pagos reales o la tienda queda sin cobro por ahora?
- **Asistente con IA (Groq)**: ¿lo activamos con llave gratuita o lo dejamos en respuestas por reglas?
- **Envíos**: ¿qué ciudades y tarifas aplicas? (hoy el texto dice "todo Colombia" sin costo definido)
- **Devoluciones**: ¿confirmas el plazo de 5 días y las condiciones?
- **Número de WhatsApp de la tienda**: ¿cuál es el número oficial para atención?
- **Correo de contacto**: el sitio muestra `contacto@muna.co`; ¿es ese el correo real?
- **Newsletter**: ¿a qué servicio enviamos los correos (Mailchimp, Resend, otro) o lo dejamos sin guardar?
- **Textos "Sobre nosotros"**: ¿quieres escribir la historia y misión tú o te preparo un borrador?
- **Equipo**: ¿mostramos integrantes reales y sus fotos, o quitamos esa sección?
- **Testimonios**: ¿usamos reseñas reales de clientas o los quitamos mientras tanto?

## Por hacer a mano (tú)

- [ ] Conseguir y subir el **logo oficial** (PNG o SVG) — hoy el logo es texto "MUNA".
- [ ] Generar **íconos PWA**: `public/icon-192.png` y `public/icon-512.png` (a partir del logo).
- [ ] Crear la **imagen Open Graph** de 1200×630 y avisarme para agregarla a `app/layout.js`.
- [ ] Subir **fotos de productos** a `public/images/products/` con el mismo nombre que el campo `image` de cada producto en `data/products.js`.
- [ ] Subir **fotos del hero** y de las **categorías** (hoy dicen "Foto próximamente").
- [ ] Cambiar el **número de WhatsApp** en `components/WhatsAppButton.js` (hoy es `573000000000`).
- [ ] Crear cuenta en **Supabase** (si decides conectarlo) y pasarme URL y llave anónima.
- [ ] Crear cuenta de comercio en **Wompi** (si decides cobrar) y pasarme llaves.
- [ ] Crear llave gratuita en **console.groq.com/keys** (si decides activar el asistente) y ponerla en `.env.local`.
- [ ] Definir el **dominio** y configurar `NEXT_PUBLIC_SITE_URL` (sitemap y SEO dependen de él).
- [ ] Publicar en **Vercel** o **Netlify** y configurar las variables de `.env.local` en el panel del hosting (nunca subir `.env.local` a git).
- [ ] Revisar en el celular que todo se vea bien antes de publicar.

## Ya resuelto (para referencia)

- Servicio a domicilio, agendamiento, mapa de cobertura y bot de WhatsApp de citas: eliminados.
- Paleta, tipografía y estilo MUNA aplicados en todo el sitio.
- Asistente, newsletter, testimonios, FAQ, favoritos y notificaciones: integrados.
- SEO (sitemap, robots) y manifest PWA: listos (faltan solo los íconos).
- Build de producción compila sin errores.
