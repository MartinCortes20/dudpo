"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site.config";
import { ScrollExpandMedia } from "../animations/ScrollExpandMedia";
import { ChromeButton } from "../ui/ChromeButton";
import { GradientText } from "../ui/GradientText";
import { Phone, Mail } from "lucide-react";

const softwareLogos = [
  { name: "Photoshop",     src: "/assets/logos/adobe-photoshop-seeklogo.png" },
  { name: "Illustrator",   src: "/assets/logos/adobeIlustrator copia.png" },
  { name: "After Effects", src: "/assets/logos/adobeffects.webp" },
  { name: "Lightroom",     src: "/assets/logos/lr.png" },
  { name: "Premiere Pro",  src: "/assets/logos/pr.png" },
  { name: "ChatGPT",       src: "/assets/logos/chatgpt.png" },
  { name: "Canva",         src: "/assets/logos/canva.webp" },
  { name: "CapCut",        src: "/assets/logos/capcut.png" },
];

export function HeroExpand() {
  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="/assets/background.mp4"
      bgImageSrc="/assets/fondo.png"
      title="DULCE MEZA"
      scrollToExpand="Scroll para conocerme"
    >
      {/* ════════════════════════════════════════
          ABOUT content — Premium Liquid Chrome / Y2K
      ════════════════════════════════════════ */}
      <section id="about" className="relative py-20 lg:py-32 overflow-hidden">

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[80vh]">

            {/* ── LEFT: Premium Photo Showcase ── */}
            <div className="w-full lg:w-[45%] flex-shrink-0 relative flex justify-center">
              
              {/* Animated Backdrop Rings (Cybernetic effect) */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-[120%] aspect-square rounded-full border border-white/5 border-dashed" />
                <div className="absolute w-[90%] aspect-square rounded-full border border-electric-violet/20" />
                <div className="absolute w-[60%] aspect-square rounded-full border border-electric-magenta/10" />
              </motion.div>

              {/* Core Glow behind photo */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-tr from-electric-violet/40 to-electric-magenta/40 rounded-full blur-[80px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Photo Container */}
              <div className="relative z-10 w-full max-w-md">
                {/* Liquid Chrome floating blobs around photo */}
                <motion.div 
                  className="absolute -top-10 -right-4 w-20 h-20 bg-gradient-to-br from-white via-chrome-300 to-electric-violet rounded-full blur-[2px] shadow-[0_0_30px_rgba(255,255,255,0.8)] opacity-70 mix-blend-screen"
                  animate={{ y: [0, 20, 0], x: [0, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute bottom-10 -left-8 w-16 h-16 bg-gradient-to-br from-electric-magenta via-white to-electric-violet rounded-[40%_60%_70%_30%] blur-[2px] shadow-[0_0_20px_rgba(217,70,239,0.8)] opacity-60 mix-blend-screen"
                  animate={{ y: [0, -25, 0], x: [0, 15, 0], rotate: [0, 90, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                <Image
                  src="/assets/dudu.PNG"
                  alt="Dulce Meza"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain object-bottom drop-shadow-[0_0_25px_rgba(139,92,246,0.2)]"
                  priority
                />
              </div>
            </div>

            {/* ── RIGHT: Bio & Info Glassmorphism Cards ── */}
            <div className="w-full lg:w-[55%] flex items-center">
              <div className="space-y-8 w-full max-w-2xl py-8">

                {/* Header / Bio */}
                <div className="space-y-6">
                  {/* Glossy Pill Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-chrome-200 via-white to-chrome-300 shadow-[0_0_20px_rgba(255,255,255,0.3),inset_0_2px_5px_rgba(255,255,255,0.8)]"
                  >
                    <div className="w-2 h-2 rounded-full bg-electric-violet animate-pulse shadow-[0_0_8px_rgba(139,92,246,1)]" />
                    <span className="font-outfit font-black text-sm text-black tracking-[0.2em] uppercase">
                      Sobre Mí
                    </span>
                  </motion.div>

                  {/* Bio Text */}
                  <div className="space-y-4">
                    <h3 className="font-outfit font-medium text-3xl md:text-4xl leading-tight text-white">
                      Soy <GradientText variant="chrome" className="font-black tracking-tight">Dulce Meza</GradientText>,
                      <br className="hidden md:block" /> Comunicóloga apasionada por la <span className="text-electric-magenta italic font-semibold">creatividad</span>, el diseño y la comunicación.
                    </h3>
                    <p className="text-chrome-300 text-lg leading-relaxed font-light">
                      Me encanta crear, experimentar y contar historias a través de la cámara, el diseño y los recursos audiovisuales. También encuentro en la música y el canto otra forma de expresar emociones y conectar con los demás.
                    </p>
                  </div>
                </div>

                {/* Info Grid (Glassmorphism) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <PremiumCard sparkColor="violet" title="Educación">
                    <p className="text-chrome-400 text-sm tracking-widest">{siteConfig.education[0].year}</p>
                    <p className="font-bold text-white text-lg mt-1">{siteConfig.education[0].degree}</p>
                    <p className="text-chrome-300 text-sm mt-1">{siteConfig.education[0].school}</p>
                  </PremiumCard>
                  
                  <PremiumCard sparkColor="magenta" title="Habilidades">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {siteConfig.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-chrome-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </PremiumCard>
                </div>

                {/* Bottom Wide Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <PremiumCard sparkColor="violet" title="Softwares">
                    <div className="flex flex-wrap gap-3 mt-3">
                      {softwareLogos.map((logo) => (
                        <div
                          key={logo.name}
                          title={logo.name}
                          className="w-11 h-11 rounded-[14px] overflow-hidden flex items-center justify-center bg-white shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300"
                        >
                          <Image src={logo.src} alt={logo.name} width={44} height={44} className="object-contain w-full h-full p-1" />
                        </div>
                      ))}
                    </div>
                  </PremiumCard>

                  <PremiumCard sparkColor="magenta" title="Contacto">
                    <div className="space-y-3 text-base mt-2">
                      <div className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-electric-violet/20 group-hover:border-electric-violet/50 transition-colors">
                          <Phone size={14} className="text-white" />
                        </div>
                        <a href={`tel:${siteConfig.contact.phone}`} className="text-chrome-200 font-medium group-hover:text-white transition-colors">
                          {siteConfig.contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-electric-magenta/20 group-hover:border-electric-magenta/50 transition-colors">
                          <Mail size={14} className="text-white" />
                        </div>
                        <a href={`mailto:${siteConfig.contact.email}`} className="text-chrome-200 font-medium group-hover:text-white transition-colors text-sm break-all">
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </div>
                  </PremiumCard>
                </div>

                {/* CTAs */}
                <div className="flex gap-4 flex-wrap pt-4">
                  <ChromeButton variant="primary" size="md" onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}>
                    Ver portafolio
                  </ChromeButton>
                  <ChromeButton variant="secondary" size="md" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
                    Trabajemos juntos
                  </ChromeButton>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollExpandMedia>
  );
}

/* ── Premium Glassmorphism Card ── */
function PremiumCard({ children, sparkColor, title }: { children: React.ReactNode; sparkColor: "violet" | "magenta"; title: string }) {
  const glow = sparkColor === "violet"
    ? "shadow-[0_0_15px_rgba(139,92,246,0.6)] bg-electric-violet"
    : "shadow-[0_0_15px_rgba(217,70,239,0.6)] bg-electric-magenta";
    
  const borderHover = sparkColor === "violet" 
    ? "hover:border-electric-violet/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
    : "hover:border-electric-magenta/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]";

  return (
    <div className={`relative group rounded-3xl p-6 bg-black/40 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-500 overflow-hidden ${borderHover}`}>
      {/* Animated Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Decorative Spark */}
      <div className={`absolute top-6 right-6 w-1.5 h-1.5 rounded-full ${glow}`} />
      
      <div className="relative z-10">
        <h4 className="font-outfit font-black text-white/50 uppercase tracking-widest text-xs mb-3">{title}</h4>
        {children}
      </div>
    </div>
  );
}
