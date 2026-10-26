import Link from "next/link";

export const metadata = { title: "Gracias por tu compra | MUNA" };

export default function GraciasPage() {
  return (
    <div className="container-page py-16 text-center">
      <h1 className="font-display text-3xl text-brand-black">¡Gracias por tu compra!</h1>
      <p className="mt-4 text-brand-black/70">Estamos confirmando tu pago. Te contactaremos para coordinar el envío.</p>
      <Link href="/tienda" className="btn-primary mt-6 inline-flex">Seguir comprando</Link>
    </div>
  );
}
