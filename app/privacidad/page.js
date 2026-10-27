import { CORREO } from "@/lib/contacto";

export const metadata = { title: "Política de tratamiento de datos | MUNA", description: "Cómo MUNA recolecta, usa y protege tus datos personales." };

const secciones = [
  ["Responsable", `MUNA (Trendy by Muna), tienda en línea con venta a domicilio en Colombia. Para cualquier asunto sobre tus datos escribe a ${CORREO}.`],
  ["Datos que recolectamos", "Nombre y apellido, celular, correo electrónico, departamento, ciudad, dirección de entrega, indicaciones y notas del pedido, y los productos que compras. No almacenamos datos de tarjetas ni de cuentas bancarias: el pago lo procesa Wompi."],
  ["Para qué los usamos", "Gestionar y entregar tu pedido, contactarte sobre su estado o la entrega, confirmar tu pago, atender solicitudes y reclamos, y cumplir obligaciones legales y contables. No vendemos tus datos ni los usamos para publicidad de terceros."],
  ["Con quién los compartimos", "Solo con proveedores necesarios para operar: Wompi (procesamiento de pagos), Supabase (almacenamiento de pedidos), Netlify (alojamiento del sitio) y empresas de mensajería o transporte para entregar tu pedido. También podemos entregarlos a autoridades cuando la ley lo exija."],
  ["Tus derechos", "Según la Ley 1581 de 2012 puedes conocer, actualizar y rectificar tus datos, solicitar prueba de la autorización, saber el uso que se les ha dado, presentar quejas ante la Superintendencia de Industria y Comercio, revocar la autorización y pedir la supresión de tus datos cuando no exista un deber legal de conservarlos."],
  ["Cómo ejercerlos", `Envía tu solicitud a ${CORREO} indicando tu nombre y el número de tu pedido. Respondemos las consultas en máximo 10 días hábiles y los reclamos en máximo 15 días hábiles.`],
  ["Conservación", "Guardamos tus datos mientras sean necesarios para la entrega, la atención posterior y las obligaciones legales y contables. Después se eliminan o se anonimizan."],
  ["Cambios", "Si esta política cambia, publicaremos la nueva versión en esta página."]
];

export default function PrivacidadPage() {
  return (
    <div className="container-page max-w-3xl py-16">
      <p className="eyebrow">Legal</p>
      <h1 className="section-title">Política de tratamiento de datos personales</h1>
      <p className="mt-4 text-sm text-brand-black/60">Ley 1581 de 2012 y Decreto 1377 de 2013.</p>
      <div className="mt-10 space-y-8">
        {secciones.map(([titulo, texto]) => (
          <section key={titulo}>
            <h2 className="font-display text-xl text-brand-black">{titulo}</h2>
            <p className="mt-2 leading-relaxed text-brand-black/75">{texto}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
