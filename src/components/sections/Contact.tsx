"use client";

import { useRef, useState } from "react";
import { siteConfig } from "@/content/site.config";
import { RevealOnScroll } from "../animations/RevealOnScroll";
import { ChromeButton } from "../ui/ChromeButton";
import { GradientText } from "../ui/GradientText";
import { Mail, Phone } from "lucide-react";

export function Contact() {
  const loadedAt = useRef(Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setStatus("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        message: fd.get("message"),
        website: fd.get("website"),
        t: loadedAt.current,
      }),
    }).catch(() => null);

    const data = await res?.json().catch(() => null);
    if (res?.ok && data?.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("idle");
      setError(data?.error ?? "No se pudo enviar. Intenta de nuevo.");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 md:py-32 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-chrome-900/20">
      <div className="container mx-auto px-4 sm:px-6">
        <RevealOnScroll className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-outfit font-black mb-6 sm:mb-8 tracking-tight">
            ¿LISTOS PARA <GradientText variant="chrome">CREAR?</GradientText>
          </h2>
          <p className="text-base sm:text-xl text-chrome-300 mb-10 sm:mb-12 max-w-2xl mx-auto font-light">
            Ya sea que necesites una campaña digital, contenido audiovisual o una estrategia de marca, estoy aquí para ayudarte a conectar con tu audiencia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-16">
            <a 
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center justify-center gap-3 sm:gap-4 p-5 sm:p-8 rounded-2xl border border-chrome-800 bg-chrome-900/50 hover:bg-chrome-800 hover:border-electric-violet/50 transition-all duration-300 group"
            >
              <div className="p-3 sm:p-4 shrink-0 rounded-full bg-black/50 text-electric-violet group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div className="text-left min-w-0">
                <div className="text-sm text-chrome-400 mb-1">Email</div>
                <div className="font-medium text-sm sm:text-base break-all text-white group-hover:text-electric-violet transition-colors">
                  {siteConfig.contact.email}
                </div>
              </div>
            </a>

            <a 
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center justify-center gap-3 sm:gap-4 p-5 sm:p-8 rounded-2xl border border-chrome-800 bg-chrome-900/50 hover:bg-chrome-800 hover:border-electric-magenta/50 transition-all duration-300 group"
            >
              <div className="p-3 sm:p-4 shrink-0 rounded-full bg-black/50 text-electric-magenta group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div className="text-left min-w-0">
                <div className="text-sm text-chrome-400 mb-1">Teléfono</div>
                <div className="font-medium text-sm sm:text-base break-all text-white group-hover:text-electric-magenta transition-colors">
                  {siteConfig.contact.phone}
                </div>
              </div>
            </a>
          </div>

          <form className="max-w-2xl mx-auto space-y-6 text-left" onSubmit={onSubmit}>
            {/* Honeypot: invisible para humanos, irresistible para bots */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] w-px h-px opacity-0"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-chrome-300 ml-2">Nombre</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  className="w-full bg-chrome-900/50 border border-chrome-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-chrome-300 ml-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  maxLength={254}
                  className="w-full bg-chrome-900/50 border border-chrome-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-chrome-300 ml-2">Mensaje</label>
              <textarea 
                rows={4}
                name="message"
                required
                minLength={10}
                maxLength={3000}
                className="w-full bg-chrome-900/50 border border-chrome-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition-colors resize-none"
                placeholder="¿En qué te puedo ayudar?"
              />
            </div>
            <div className="flex flex-col items-center gap-3 pt-4">
              <ChromeButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full md:w-auto disabled:opacity-50"
                disabled={status !== "idle"}
              >
                {status === "sending" ? "Enviando..." : status === "sent" ? "¡Enviado!" : "Enviar Mensaje"}
              </ChromeButton>
              {error && <p className="text-sm text-red-400">{error}</p>}
              {status === "sent" && (
                <p className="text-sm text-electric-violet">Gracias, te responderé pronto.</p>
              )}
            </div>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
}
