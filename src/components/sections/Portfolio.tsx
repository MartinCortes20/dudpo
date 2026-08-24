"use client";

import { ImageStreamHero } from "../ui/image-stream-hero";
import { GradientText } from "../ui/GradientText";

const workImages = [
  { src: "/assets/trabajo/bolsaHarry.PNG",    alt: "Bolsa Harry" },
  { src: "/assets/trabajo/gorra1.png",         alt: "Gorra 1" },
  { src: "/assets/trabajo/gorra2.png",         alt: "Gorra 2" },
  { src: "/assets/trabajo/harry1.png",         alt: "Harry 1" },
  { src: "/assets/trabajo/harry2.png",         alt: "Harry 2" },
  { src: "/assets/trabajo/mayiaplayera.png",   alt: "Mayia Playera" },
  { src: "/assets/trabajo/stcikers.png",       alt: "Stickers" },
  // Loop to fill the corridor
  { src: "/assets/trabajo/bolsaHarry.PNG",    alt: "Bolsa Harry 2" },
  { src: "/assets/trabajo/gorra1.png",         alt: "Gorra 1 v2" },
  { src: "/assets/trabajo/harry1.png",         alt: "Harry 1 v2" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="relative z-10">
      <ImageStreamHero
        images={workImages}
        cards={5}
        speed={38}
        axis={58}
        className="w-full h-screen"
      >
        {/* Overlay: gradient top + bottom so the section edges blend with black */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* Centered title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          {/* Radial glow behind text */}
          <div className="absolute w-[500px] h-[200px] bg-electric-violet/20 blur-3xl rounded-full" />

          <p className="text-electric-violet font-semibold tracking-[0.3em] uppercase text-xs mb-4 relative">
            Creaciones
          </p>
          <h2 className="font-outfit font-black text-5xl md:text-7xl text-center leading-none relative">
            MI <GradientText variant="chrome">TRABAJO</GradientText>
          </h2>
          <p className="mt-4 text-chrome-400 text-sm tracking-widest relative">
            Diseño · Fotografía · Video · Contenido
          </p>
        </div>
      </ImageStreamHero>
    </section>
  );
}
