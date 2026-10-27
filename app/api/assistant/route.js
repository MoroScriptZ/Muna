import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { formatCOP } from "@/lib/format";

// Asistente de compra de MUNA. Usa Groq (nivel gratuito, sin tarjeta) si hay
// GROQ_API_KEY en .env.local; si no, responde con reglas simples para que el
// chat nunca se vea roto.

const CATALOGO = products
  .map((p) => `- ${p.title} (ref. ${p.reference}) · ${p.group}${p.category ? ` / ${p.category}` : ""} · ${formatCOP(p.priceCOP)} · /tienda/${p.id}`)
  .join("\n");

const SYSTEM_PROMPT = `Eres el asistente virtual de MUNA, una tienda en línea de maquillaje,
skincare y accesorios en Colombia. Ayudas a los visitantes a:
1) Encontrar el producto correcto según lo que necesitan.
2) Resolver dudas sobre envíos, pagos y devoluciones.
3) Guiarlos a la tienda: "/tienda" para ver el catálogo completo.

Responde siempre en español, de forma cálida, profesional, breve y concreta, sin emojis (máximo 3-4
frases). Solo puedes recomendar productos de la lista de abajo y con sus precios
exactos; no inventes productos, precios, ingredientes ni disponibilidad. Para
ingredientes, modo de uso, contenido o registro INVIMA, indica la página del
producto (/tienda/...). Si no sabes algo, sugiere escribir por el formulario de contacto.

Catálogo:
${CATALOGO}`;

function fallbackReply(userMessage) {
  const msg = userMessage.toLowerCase();
  if (msg.includes("precio") || msg.includes("cuesta") || msg.includes("vale")) {
    return "Los precios aparecen en cada producto. Puedes verlos todos en /tienda. ¿Buscas algo en particular?";
  }
  if (msg.includes("envío") || msg.includes("envio") || msg.includes("entrega")) {
    return "Enviamos a todo Colombia. El tiempo de entrega depende de tu ciudad y lo verás antes de pagar.";
  }
  if (msg.includes("pago") || msg.includes("pagar")) {
    return "Aceptamos tarjeta de crédito o débito, PSE y Nequi. Los pagos se procesan con una pasarela certificada.";
  }
  if (msg.includes("devol") || msg.includes("cambio")) {
    return "Si un producto llega dañado o no corresponde a tu pedido, escríbenos dentro de los primeros 5 días y lo resolvemos.";
  }
  return "Hola, soy el asistente de MUNA. Puedo ayudarte a elegir un producto o resolver dudas sobre envíos y pagos. ¿Qué necesitas?";
}

export async function POST(request) {
  const { message, history } = await request.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Falta el mensaje" }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ reply: fallbackReply(message), mode: "fallback" });
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...(Array.isArray(history) ? history.slice(-6) : []),
          { role: "user", content: message }
        ],
        temperature: 0.4,
        max_tokens: 800,
        reasoning_effort: "low"
      })
    });

    if (!res.ok) {
      return NextResponse.json({ reply: fallbackReply(message), mode: "fallback" });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || fallbackReply(message);
    return NextResponse.json({ reply, mode: "ai" });
  } catch (err) {
    return NextResponse.json({ reply: fallbackReply(message), mode: "fallback" });
  }
}
