"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { formatCOP } from "@/lib/format";

// Panel de pedidos. La proteccion real esta en la base (RLS: solo usuarios de la tabla `admins` leen y
// actualizan pedidos); esta pantalla solo se ve util si el usuario es admin.

const ESTADOS = ["pendiente", "pagado", "enviado", "entregado", "cancelado", "rechazado", "anulado", "error"];
const COLOR = {
  pendiente: "bg-amber-100 text-amber-900",
  pagado: "bg-emerald-100 text-emerald-900",
  enviado: "bg-sky-100 text-sky-900",
  entregado: "bg-brand-cream text-brand-black",
  cancelado: "bg-red-100 text-red-900",
  rechazado: "bg-red-100 text-red-900",
  anulado: "bg-red-100 text-red-900",
  error: "bg-red-100 text-red-900"
};

const fecha = (iso) => new Date(iso).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });

function Login({ onEntrar }) {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function entrar(e) {
    e.preventDefault();
    setCargando(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email, password: clave });
    setCargando(false);
    if (err) setError("Correo o contraseña incorrectos.");
    else onEntrar();
  }

  return (
    <div className="container-page py-24">
      <form onSubmit={entrar} className="mx-auto max-w-sm space-y-4 rounded-lg border border-brand-line bg-white p-8">
        <h1 className="font-display text-2xl text-brand-black">Administración</h1>
        <input type="email" required placeholder="Correo" aria-label="Correo" value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
        <input type="password" required placeholder="Contraseña" aria-label="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} className="field" />
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={cargando} className="btn-primary w-full disabled:opacity-60">{cargando ? "Entrando..." : "Entrar"}</button>
      </form>
    </div>
  );
}

function Pedido({ pedido, onCambiar }) {
  const [abierto, setAbierto] = useState(pedido.status === "pendiente" || pedido.status === "pagado");
  const wa = `https://wa.me/57${pedido.telefono}?text=${encodeURIComponent(`Hola ${pedido.nombre?.split(" ")[0] ?? ""}, te escribimos de MUNA por tu pedido #${pedido.numero}.`)}`;

  return (
    <article className="rounded-lg border border-brand-line bg-white">
      <button onClick={() => setAbierto((a) => !a)} aria-expanded={abierto} className="flex w-full flex-wrap items-center justify-between gap-3 p-5 text-left">
        <span>
          <span className="font-display text-lg text-brand-black">Pedido #{pedido.numero}</span>
          <span className="ml-3 text-sm text-brand-black/55">{fecha(pedido.created_at)}</span>
          <span className="mt-1 block text-sm text-brand-black/70">{pedido.nombre} · {pedido.ciudad}</span>
        </span>
        <span className="flex items-center gap-3">
          <span className="font-semibold text-brand-wine">{formatCOP(pedido.total_cop)}</span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${COLOR[pedido.status] ?? "bg-brand-cream"}`}>{pedido.status}</span>
        </span>
      </button>

      {abierto && (
        <div className="grid gap-6 border-t border-brand-line p-5 text-sm md:grid-cols-2">
          <div className="space-y-1">
            <p className="font-semibold text-brand-black">Entrega</p>
            <p>{pedido.nombre}</p>
            <p>{pedido.direccion}</p>
            {pedido.indicaciones && <p className="text-brand-black/65">{pedido.indicaciones}</p>}
            <p>{pedido.ciudad}, {pedido.departamento}</p>
            <p className="pt-2">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-wine hover:underline">WhatsApp {pedido.telefono}</a>
              <span className="text-brand-black/40"> · </span>
              <a href={`mailto:${pedido.email}`} className="text-brand-wine hover:underline">{pedido.email}</a>
            </p>
            {pedido.notas && <p className="pt-2 text-brand-black/70">Notas: {pedido.notas}</p>}
          </div>

          <div>
            <p className="font-semibold text-brand-black">Productos</p>
            <ul className="mt-1 divide-y divide-brand-line">
              {pedido.items.map((it) => (
                <li key={it.id} className="flex justify-between gap-4 py-1.5">
                  <span>{it.title} <span className="text-brand-black/50">x {it.qty}</span></span>
                  <span>{formatCOP(it.priceCOP * it.qty)}</span>
                </li>
              ))}
            </ul>
            <label className="mt-4 block">
              <span className="mb-1 block font-semibold text-brand-black">Estado</span>
              <select value={pedido.status} onChange={(e) => onCambiar(pedido.id, e.target.value)} className="field">
                {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
          </div>
        </div>
      )}
    </article>
  );
}

export default function AdminPage() {
  const [estado, setEstado] = useState("cargando"); // cargando | login | no-admin | listo
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState("por-atender");
  const [mensaje, setMensaje] = useState("");

  const cargar = useCallback(async () => {
    const { data: sesion } = await supabase.auth.getSession();
    if (!sesion.session) return setEstado("login");
    const { data: admin } = await supabase.from("admins").select("user_id").maybeSingle();
    if (!admin) return setEstado("no-admin");
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(300);
    if (error) setMensaje("No se pudieron cargar los pedidos.");
    else {
      setPedidos(data);
      setMensaje("");
    }
    setEstado("listo");
  }, []);

  useEffect(() => {
    if (!supabase) return setEstado("sin-config");
    cargar();
    const t = setInterval(cargar, 60000);
    return () => clearInterval(t);
  }, [cargar]);

  async function cambiarEstado(id, status) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) return setMensaje("No se pudo actualizar el estado.");
    setPedidos((ps) => ps.map((p) => (p.id === id ? { ...p, status } : p)));
  }

  async function salir() {
    await supabase.auth.signOut();
    setPedidos([]);
    setEstado("login");
  }

  if (estado === "cargando") return <p className="container-page py-24 text-center text-brand-black/60">Cargando...</p>;
  if (estado === "sin-config") return <p className="container-page py-24 text-center">Supabase no está configurado.</p>;
  if (estado === "login") return <Login onEntrar={cargar} />;
  if (estado === "no-admin") {
    return (
      <div className="container-page py-24 text-center">
        <p>Esta cuenta no tiene permisos de administración.</p>
        <button onClick={salir} className="btn-outline mt-6">Cerrar sesión</button>
      </div>
    );
  }

  const porAtender = pedidos.filter((p) => p.status === "pendiente" || p.status === "pagado");
  const filtros = [
    ["por-atender", `Por atender (${porAtender.length})`],
    ["pagado", `Pagados (${pedidos.filter((p) => p.status === "pagado").length})`],
    ["enviado", `Enviados (${pedidos.filter((p) => p.status === "enviado").length})`],
    ["todos", `Todos (${pedidos.length})`]
  ];
  const visibles = filtro === "todos" ? pedidos : filtro === "por-atender" ? porAtender : pedidos.filter((p) => p.status === filtro);

  return (
    <div className="container-page pb-24 pt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="section-title !mt-0">Pedidos</h1>
        <div className="flex gap-3">
          <button onClick={cargar} className="btn-outline !px-5 !py-2.5">Actualizar</button>
          <button onClick={salir} className="btn-outline !px-5 !py-2.5">Salir</button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar pedidos">
        {filtros.map(([clave, etiqueta]) => (
          <button
            key={clave}
            onClick={() => setFiltro(clave)}
            aria-pressed={filtro === clave}
            className={`rounded-md border px-4 py-2 text-[13px] font-medium transition ${
              filtro === clave ? "border-brand-wine bg-brand-wine text-white" : "border-brand-line bg-white hover:border-brand-wine"
            }`}
          >
            {etiqueta}
          </button>
        ))}
      </div>

      {mensaje && <p role="alert" className="mt-4 text-sm text-red-700">{mensaje}</p>}

      <div className="mt-6 space-y-3">
        {visibles.map((p) => <Pedido key={p.id} pedido={p} onCambiar={cambiarEstado} />)}
        {visibles.length === 0 && <p className="py-12 text-center text-brand-black/50">No hay pedidos en esta vista.</p>}
      </div>
    </div>
  );
}
