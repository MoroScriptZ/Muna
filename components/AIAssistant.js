"use client";

import { useEffect, useRef, useState } from "react";
import { IconChat, IconClose, IconSend } from "@/components/Icons";

const SUGGESTIONS = [
  "¿Qué correctores tienen y en qué tonos?",
  "¿Qué productos tienen para los labios?",
  "¿Qué métodos de pago aceptan?"
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hola, soy el asistente de MUNA. Puedo ayudarte a elegir un producto o resolver dudas sobre envíos y pagos. ¿En qué te ayudo?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function sendMessage(text) {
    const userMsg = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: nextMessages
            .slice(-6)
            .map((m) => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Tuve un problema respondiendo. Intenta de nuevo en un momento." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-wine text-white shadow-lg transition hover:bg-brand-wine-dark"
        aria-label={open ? "Cerrar asistente de MUNA" : "Abrir asistente de MUNA"}
      >
        {open ? <IconClose width={22} height={22} /> : <IconChat width={24} height={24} />}
      </button>

      {open && (
        <div className="fixed bottom-24 left-5 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-lg border border-brand-line bg-white shadow-2xl">
          <div className="bg-brand-wine px-4 py-3 text-white">
            <p className="font-display text-sm">Asistente MUNA</p>
            <p className="text-xs text-white/70">Te ayudo a elegir tu producto</p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-brand-wine text-white"
                    : "bg-brand-pink-muted text-brand-black"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[60%] rounded-2xl bg-brand-pink-muted px-3 py-2 text-sm text-brand-black/50">
                Escribiendo...
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-brand-wine/40 px-3 py-1 text-xs text-brand-wine hover:bg-brand-pink-muted"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-brand-black/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 rounded-full border border-brand-black/15 px-4 py-2 text-sm outline-none focus:border-brand-wine"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center rounded-full bg-brand-wine px-4 py-2 text-white disabled:opacity-40"
              aria-label="Enviar"
            >
              <IconSend width={18} height={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
