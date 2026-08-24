"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site.config";
import { ChromeButton } from "../ui/ChromeButton";
import { GradientText } from "../ui/GradientText";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPortfolio = () => {
    document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  // Removed complex manual ping-pong loop to prevent video stuttering.
  // Standard HTML5 loop provides smoother performance.

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Video Background (Ping-pong boomerang loop) ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="/assets/background.mp4"
      />

      {/* ── Dark overlay so text stays readable ── */}
      <div className="absolute inset-0 z-[1] bg-black/55" />

      {/* ── Violet glow tint on top of overlay ── */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(109,40,217,0.30),transparent_70%)]" />

      {/* ── Bottom fade to black so next section blends in ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[3] bg-gradient-to-t from-black to-transparent" />

      {/* ── Decorative sparkle dots ── */}
      <div className="absolute inset-0 z-[4] pointer-events-none">
        {[
          { top: "12%", left: "8%",  size: 4, delay: 0   },
          { top: "25%", left: "85%", size: 3, delay: 0.5 },
          { top: "65%", left: "90%", size: 5, delay: 1   },
          { top: "78%", left: "5%",  size: 3, delay: 0.8 },
          { top: "45%", left: "92%", size: 2, delay: 0.3 },
          { top: "88%", left: "70%", size: 4, delay: 1.2 },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 3, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-[5] container mx-auto px-6 pt-28 pb-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">

          {/* Tag line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-electric-violet font-semibold tracking-[0.3em] uppercase text-sm drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]"
          >
            Portafolio Profesional
          </motion.p>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-outfit font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none"
          >
            <GradientText
              variant="chrome"
              className="block drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              DULCE
            </GradientText>
            <span className="block bg-gradient-to-r from-electric-magenta via-electric-violet to-electric-indigo bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(217,70,239,0.7)]">
              MEZA
            </span>
          </motion.h1>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            {["Comunicóloga", "·", "Diseñadora", "·", "Creadora de Contenido"].map((word, i) => (
              <span
                key={i}
                className={
                  word === "·"
                    ? "text-electric-violet text-xl"
                    : "text-chrome-200 font-medium tracking-wider text-lg"
                }
              >
                {word}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-chrome-300 text-lg max-w-xl mx-auto font-light leading-relaxed"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <ChromeButton variant="primary" size="lg" onClick={scrollToContact}>
              Trabajemos juntos
            </ChromeButton>
            <ChromeButton variant="secondary" size="lg" onClick={scrollToPortfolio}>
              Ver portafolio
            </ChromeButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center gap-2 pt-8 text-chrome-500"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-electric-violet to-transparent"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
