import { NextRequest, NextResponse } from "next/server";

const TO = "xdudumf@gmail.com";
// Sin dominio verificado en Resend usa onboarding@resend.dev (sólo llega al
// dueño de la cuenta). Con dominio propio: CONTACT_FROM="Web <hola@dominio.com>"
const FROM = process.env.CONTACT_FROM ?? "Portafolio <onboarding@resend.dev>";

// ponytail: rate limit en memoria. Se reinicia en cada cold start; suficiente
// para frenar spam de formulario. Si crece el tráfico, mover a Upstash Redis.
const hits = new Map<string, number[]>();
const WINDOW = 60 * 60 * 1000; // 1h
const MAX = 3;

const EMAIL_RE = /^[^\s@<>",;]{1,64}@[a-z0-9.-]{1,190}\.[a-z]{2,}$/i;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

// Colapsa saltos de línea y caracteres de control: evita header injection
// (CRLF) en subject / reply_to.
const oneLine = (s: string) => s.replace(/[\s\u0000-\u001f\u007f]+/g, " ").trim();
const stripCtl = (s: string) =>
  s.replace(/[\u0000-\u0009\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const prev = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (prev.length >= MAX) {
    return NextResponse.json({ error: "Demasiados mensajes. Intenta más tarde." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const name = oneLine(str(body.name)).slice(0, 80);
  const email = oneLine(str(body.email)).slice(0, 254);
  const message = stripCtl(str(body.message)).slice(0, 3000);

  // Honeypot: campo oculto que sólo los bots rellenan -> fingimos éxito
  if (str(body.website)) return NextResponse.json({ ok: true });

  // Envío demasiado rápido = bot
  const elapsed = now - Number(body.t ?? 0);
  if (!Number.isFinite(elapsed) || elapsed < 3000) {
    return NextResponse.json({ error: "Envío demasiado rápido, inténtalo de nuevo." }, { status: 400 });
  }

  if (name.length < 2) return NextResponse.json({ error: "Nombre inválido." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  if (message.length < 10) return NextResponse.json({ error: "El mensaje es muy corto." }, { status: 400 });

  // Spam obvio: muros de links
  if ((message.match(/https?:\/\//gi) ?? []).length > 2) {
    return NextResponse.json({ error: "Demasiados enlaces en el mensaje." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("Falta RESEND_API_KEY");
    return NextResponse.json({ error: "El envío no está configurado." }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Nuevo mensaje del portafolio - ${name}`,
      html: `<p><strong>Nombre:</strong> ${esc(name)}</p>
<p><strong>Email:</strong> ${esc(email)}</p>
<p><strong>Mensaje:</strong></p>
<p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend:", res.status, await res.text());
    return NextResponse.json({ error: "No se pudo enviar el mensaje." }, { status: 502 });
  }

  hits.set(ip, [...prev, now]);
  return NextResponse.json({ ok: true });
}
