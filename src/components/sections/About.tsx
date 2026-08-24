"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site.config";
import { RevealOnScroll } from "../animations/RevealOnScroll";

const softwareLogos = [
  { name: "Photoshop",    src: "/assets/logos/adobe-photoshop-seeklogo.png" },
  { name: "Illustrator",  src: "/assets/logos/adobeIlustrator.webp" },
  { name: "After Effects",src: "/assets/logos/adobeffects.webp" },
  { name: "Lightroom",    src: "/assets/logos/lr.png" },
  { name: "Premiere Pro", src: "/assets/logos/pr.png" },
  { name: "ChatGPT",      src: "/assets/logos/chatgpt.png" },
  { name: "Canva",        src: "/assets/logos/canva.webp" },
  { name: "CapCut",       src: "/assets/logos/capcut.png" },
];

/* Light ray angles emanating from her */
const rays = [
  { rotate: -40, delay: 0,    width: 180, opacity: 0.18 },
  { rotate: -20, delay: 0.3,  width: 140, opacity: 0.12 },
  { rotate:   0, delay: 0.6,  width: 200, opacity: 0.20 },
  { rotate:  20, delay: 0.9,  width: 140, opacity: 0.12 },
  { rotate:  40, delay: 1.2,  width: 160, opacity: 0.15 },
];

/* Floating sparkle particles */
const sparks = [
  { top: "15%", left: "62%", size: 5,  delay: 0   },
  { top: "28%", left: "70%", size: 3,  delay: 0.7 },
  { top: "50%", left: "67%", size: 6,  delay: 1.1 },
  { top: "70%", left: "64%", size: 4,  delay: 0.4 },
  { top: "82%", left: "72%", size: 3,  delay: 1.5 },
  { top: "38%", left: "55%", size: 4,  delay: 0.9 },
  { top: "60%", left: "75%", size: 3,  delay: 0.2 },
];

export function About() {
  return (
    <section id="about" className="relative min-h-screen overflow-hidden">

      {/* ════════════════════════════════════════
          LEFT COLUMN — Photo pinned to full height
      ════════════════════════════════════════ */}
      <div className="absolute inset-y-0 left-0 w-[45%] hidden lg:block pointer-events-none select-none">

        {/* Deep violet radial behind her body */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_40%_85%,rgba(109,40,217,0.55),transparent_70%)]" />

        {/* Magenta rim highlight (left edge) */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-electric-magenta/20 to-transparent" />

        {/* Light-beam rays emanating from her torso */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-full origin-bottom">
          {rays.map((r, i) => (
            <motion.div
              key={i}
              className="absolute bottom-[30%] left-1/2 origin-bottom"
              style={{ rotate: r.rotate, translateX: "-50%" }}
              animate={{ opacity: [0, r.opacity, 0] }}
              transition={{
                duration: 4,
                delay: r.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Ray shape: tall thin gradient */}
              <div
                className="rounded-full"
                style={{
                  width: r.width,
                  height: 500,
                  background:
                    "linear-gradient(to top, rgba(167,139,250,0.6), rgba(217,70,239,0.2), transparent)",
                  transformOrigin: "bottom center",
                  filter: "blur(18px)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Floor glow pool */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-electric-violet/40 to-transparent blur-2xl"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating sparkle dots around her silhouette */}
        {sparks.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
            animate={{
              opacity: [0, 1, 0],
              scale:   [0.5, 1.5, 0.5],
              y:       [0, -12, 0],
            }}
            transition={{
              duration: 3.5,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Her photo — full height, object-contain bottom-aligned */}
        <div className="absolute inset-0 flex items-end justify-center">
          <Image
            src="/assets/dudu.PNG"
            alt="Dulce Meza"
            width={700}
            height={900}
            className="h-full w-auto max-w-none object-contain object-bottom"
            priority
          />
        </div>
      </div>

      {/* ════════════════════════════════════════
          RIGHT COLUMN — Info cards
      ════════════════════════════════════════ */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full lg:pl-[48%]">
          <div className="px-6 lg:px-12 py-24">
            <RevealOnScroll direction="right">
              <div className="space-y-6 max-w-xl">

                {/* ¡HOLA! badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="px-8 py-2 rounded-full bg-electric-violet font-outfit font-black text-2xl text-white tracking-widest shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                    ¡HOLA!
                  </span>
                </motion.div>

                {/* Description */}
                <div className="text-chrome-200 text-base md:text-lg leading-relaxed space-y-3">
                  <p>
                    Soy <span className="font-bold text-white">Dulce Meza</span>, Comunicóloga
                    apasionada por la creatividad, el diseño y la comunicación. Me encanta crear,
                    experimentar y contar historias a través de la cámara, el diseño y los recursos
                    audiovisuales.
                  </p>
                  <p>
                    También encuentro en la música y el canto otra forma de expresar emociones
                    y conectar con los demás.
                  </p>
                </div>

                {/* Cards row 1: Educación + Habilidades */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card sparkColor="violet">
                    <CardTitle>Educación</CardTitle>
                    <p className="text-chrome-400 text-sm">{siteConfig.education[0].year}</p>
                    <p className="font-bold text-white mt-1 text-sm">{siteConfig.education[0].degree}</p>
                    <p className="text-chrome-400 text-sm">{siteConfig.education[0].school}</p>
                  </Card>
                  <Card sparkColor="violet">
                    <CardTitle>Habilidades</CardTitle>
                    <p className="text-chrome-300 text-sm leading-relaxed text-center">
                      {siteConfig.skills.join(" ⋆ ")}
                    </p>
                  </Card>
                </div>

                {/* Cards row 2: Softwares + Contacto */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card sparkColor="magenta">
                    <CardTitle>Softwares</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {softwareLogos.map((logo) => (
                        <div
                          key={logo.name}
                          title={logo.name}
                          className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 hover:border-electric-violet/60 hover:scale-110 transition-all duration-200"
                        >
                          <Image
                            src={logo.src}
                            alt={logo.name}
                            width={32}
                            height={32}
                            className="object-contain w-7 h-7"
                          />
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card sparkColor="violet">
                    <CardTitle>Contacto</CardTitle>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-chrome-400">Celular: </span>
                        <a href={`tel:${siteConfig.contact.phone}`} className="text-white hover:text-electric-violet transition-colors underline decoration-dotted">
                          {siteConfig.contact.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-chrome-400">Correo: </span>
                        <a href={`mailto:${siteConfig.contact.email}`} className="text-white hover:text-electric-violet transition-colors underline decoration-dotted break-all">
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </div>
                  </Card>
                </div>

              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* Mobile: show a smaller centered photo on top */}
      <div className="lg:hidden relative w-full flex justify-center pt-28 pb-4 pointer-events-none">
        <div className="relative w-72 h-80">
          <div className="absolute inset-0 bg-electric-violet/30 blur-3xl rounded-full" />
          <Image
            src="/assets/dudu.PNG"
            alt="Dulce Meza"
            fill
            className="object-contain object-bottom"
          />
        </div>
      </div>

    </section>
  );
}

/* ── Small local sub-components ── */
function Card({
  children,
  sparkColor,
}: {
  children: React.ReactNode;
  sparkColor: "violet" | "magenta";
}) {
  const dot = sparkColor === "violet"
    ? "bg-electric-violet shadow-[0_0_8px_rgba(139,92,246,1)]"
    : "bg-electric-magenta shadow-[0_0_8px_rgba(217,70,239,1)]";

  return (
    <div className="rounded-2xl border border-electric-violet/35 bg-black/60 backdrop-blur-md p-5 relative overflow-hidden group hover:border-electric-violet/60 transition-colors duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]">
      <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${dot}`} />
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-outfit font-bold text-base text-white mb-3 italic">{children}</h3>
  );
}
