"use client";

import { siteConfig } from "@/content/site.config";
import { RevealOnScroll } from "../animations/RevealOnScroll";
import { ChromeButton } from "../ui/ChromeButton";
import { GradientText } from "../ui/GradientText";
import { Mail, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-chrome-900/20">
      <div className="container mx-auto px-6">
        <RevealOnScroll className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-outfit font-black mb-8 tracking-tight">
            ¿LISTOS PARA <GradientText variant="chrome">CREAR?</GradientText>
          </h2>
          <p className="text-xl text-chrome-300 mb-12 max-w-2xl mx-auto font-light">
            Ya sea que necesites una campaña digital, contenido audiovisual o una estrategia de marca, estoy aquí para ayudarte a conectar con tu audiencia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <a 
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center justify-center gap-4 p-8 rounded-2xl border border-chrome-800 bg-chrome-900/50 hover:bg-chrome-800 hover:border-electric-violet/50 transition-all duration-300 group"
            >
              <div className="p-4 rounded-full bg-black/50 text-electric-violet group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div className="text-left">
                <div className="text-sm text-chrome-400 mb-1">Email</div>
                <div className="font-medium text-white group-hover:text-electric-violet transition-colors">
                  {siteConfig.contact.email}
                </div>
              </div>
            </a>

            <a 
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center justify-center gap-4 p-8 rounded-2xl border border-chrome-800 bg-chrome-900/50 hover:bg-chrome-800 hover:border-electric-magenta/50 transition-all duration-300 group"
            >
              <div className="p-4 rounded-full bg-black/50 text-electric-magenta group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div className="text-left">
                <div className="text-sm text-chrome-400 mb-1">Teléfono</div>
                <div className="font-medium text-white group-hover:text-electric-magenta transition-colors">
                  {siteConfig.contact.phone}
                </div>
              </div>
            </a>
          </div>

          <form className="max-w-2xl mx-auto space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-chrome-300 ml-2">Nombre</label>
                <input 
                  type="text" 
                  className="w-full bg-chrome-900/50 border border-chrome-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-chrome-300 ml-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-chrome-900/50 border border-chrome-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-chrome-300 ml-2">Mensaje</label>
              <textarea 
                rows={4}
                className="w-full bg-chrome-900/50 border border-chrome-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition-colors resize-none"
                placeholder="¿En qué te puedo ayudar?"
              />
            </div>
            <div className="flex justify-center pt-4">
              <ChromeButton variant="primary" size="lg" className="w-full md:w-auto">
                Enviar Mensaje
              </ChromeButton>
            </div>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
}
