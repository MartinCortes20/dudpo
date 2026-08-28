"use client";

import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/content/experience";
import { GradientText } from "../ui/GradientText";
import { CircularGallery, type GalleryItem } from "../ui/circular-gallery";

const PLACEHOLDER = "/assets/socialMedia/hotel.png";

// Portadas disponibles en /public/assets/socialMedia (el resto usa el placeholder)
const COVERS: Record<string, string> = {
  "edgenet": "/assets/socialMedia/PORTADA%20EDGENET.jpg",
  "flai": "/assets/socialMedia/PORTADA%20FLAI.jpg",
  "mayia": "/assets/socialMedia/PORTADA%20MAYIA.jpg",
  "west-music-studio": "/assets/socialMedia/PORTADA%20WEST.jpg",
  "hotel-lomas-inn": "/assets/socialMedia/PORTADA%20LOM.jpg",
  "hr-graduaciones": "/assets/socialMedia/PORTADA%20HR.png",
  "laboratorio-clinico": "/assets/socialMedia/PORTADA%20LCJ.jpg",
  "power-union": "/assets/socialMedia/PORTADA%20POWER.jpg",
};

// Map experience data to GalleryItem shape
const galleryItems: GalleryItem[] = experience.map((exp) => {
  const photo = COVERS[exp.id] ?? PLACEHOLDER;
  return {
    id: exp.id,
    company: exp.company,
    role: exp.role,
    // Short summary: first sentence or first 90 chars
    summary: exp.description.split(".")[0] + ".",
    description: exp.description,
    photo,
    photos: [photo],
  };
});

export function Experience() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  // Con el detalle abierto la pagina no se desplaza: el usuario solo sale por
  // los botones de regresar, y vuelve a la galeria en vez de a otra seccion.
  useLayoutEffect(() => {
    if (!selected) return;
    // body fixed + top negativo: congela la pagina SIN que el reflow (la
    // galeria se desmonta) mueva el scroll. Al cerrar se restaura exacto.
    const y = window.scrollY;
    const body = document.body;
    const prev = { position: body.style.position, top: body.style.top, width: body.style.width };
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    // el navbar es fixed z-50 fuera de este contexto de apilamiento: se oculta
    // por clase para que no tape la barra ni ofrezca escapes
    body.classList.add("detail-open");
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.classList.remove("detail-open");
      window.scrollTo(0, y);
    };
  }, [selected]);

  const close = () => setSelected(null);

  return (
    <section id="experience" className="relative z-10 bg-black/50 border-y border-white/5">

      {/* ── Gallery view ── */}
      <AnimatePresence mode="wait">
        {!selected && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Title */}
            <div className="pt-16 sm:pt-24 pb-6 px-4 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-bold">
                SOCIAL <GradientText variant="chrome">MEDIA</GradientText>
              </h2>
              <p className="text-chrome-400 mt-3 text-xs sm:text-sm tracking-widest uppercase">
                Experiencias &amp; Colaboraciones
              </p>
            </div>

            {/* Carousel */}
            <div className="w-full h-[480px] sm:h-[560px] md:h-[620px]">
              <CircularGallery items={galleryItems} onSelect={setSelected} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Expanded detail view ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-black overflow-y-auto overscroll-contain"
          >
            {/* Barra fija: unica salida del detalle */}
            <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-black/85 backdrop-blur border-b border-white/10">
              <button
                onClick={close}
                className="shrink-0 flex items-center gap-2 px-4 py-2 text-xs sm:text-sm rounded-full border border-electric-violet/50 bg-black/70 text-white font-semibold hover:bg-electric-violet/30 hover:border-electric-violet transition-all duration-200"
              >
                ← Regresar
              </button>
              <p className="text-chrome-400 text-[11px] sm:text-xs leading-tight">
                Regresa para seguir viendo las demás experiencias de Social Media
              </p>
            </div>

            {/* Hero image */}
            <div className="relative w-full h-56 sm:h-72 md:h-96 overflow-hidden">
              <Image
                src={selected.photo}
                alt={selected.company}
                fill
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />

              {/* Floating badge */}
              <div className="absolute bottom-5 left-4 sm:bottom-8 sm:left-8 z-20">
                <span className="inline-block px-3 py-1 rounded-full bg-electric-violet/80 text-white text-xs font-semibold tracking-widest uppercase shadow-[0_0_20px_rgba(139,92,246,0.6)]">
                  {selected.role}
                </span>
              </div>
            </div>

            {/* Detail content */}
            <div className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
              <div className="max-w-3xl mx-auto">

                {/* Company name */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="font-outfit font-black text-2xl sm:text-3xl md:text-4xl text-white mt-8 mb-4"
                >
                  {selected.company}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-chrome-300 text-base md:text-lg leading-relaxed"
                >
                  {selected.description}
                </motion.p>

                {/* Extra photos grid (when available) */}
                {selected.photos && selected.photos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    {selected.photos.map((src, i) => (
                      <div
                        key={i}
                        className="relative aspect-video rounded-xl overflow-hidden ring-1 ring-electric-violet/30 hover:ring-electric-violet/60 transition-all duration-200"
                      >
                        <Image src={src} alt={`${selected.company} ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Back button at bottom */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12"
                >
                  <button
                    onClick={close}
                    className="flex items-center gap-2 px-6 py-3 rounded-full border border-electric-violet/50 bg-black/60 text-white text-sm font-semibold hover:bg-electric-violet/20 hover:border-electric-violet transition-all duration-200"
                  >
                    ← Ver todas las experiencias
                  </button>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
