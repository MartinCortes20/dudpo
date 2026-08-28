"use client";

import { useEffect, useState } from "react";
import { ImageStreamHero } from "../ui/image-stream-hero";
import { GradientText } from "../ui/GradientText";

const workImages = [
  { src: "/assets/trabajo/bolsaHarry.PNG",   alt: "Bolsa Harry" },
  { src: "/assets/trabajo/gorra1.png",       alt: "Gorra 1" },
  { src: "/assets/trabajo/gorra2.png",       alt: "Gorra 2" },
  { src: "/assets/trabajo/harry1.png",       alt: "Harry 1" },
  { src: "/assets/trabajo/harry2.png",       alt: "Harry 2" },
  { src: "/assets/trabajo/mayiaplayera.png", alt: "Mayia Playera" },
  { src: "/assets/trabajo/stcikers.png",     alt: "Stickers" },
  { src: "/assets/trabajo/3.jpg",            alt: "Trabajo 3" },
  { src: "/assets/trabajo/7.jpg",            alt: "Trabajo 7" },
  { src: "/assets/trabajo/9.jpg",            alt: "Trabajo 9" },
  { src: "/assets/trabajo/10.jpg",           alt: "Trabajo 10" },
  { src: "/assets/trabajo/15.jpg",           alt: "Trabajo 15" },
  { src: "/assets/trabajo/18.jpg",           alt: "Trabajo 18" },
  { src: "/assets/trabajo/IMG_0174.PNG",     alt: "Trabajo 0174" },
  { src: "/assets/trabajo/IMG_0175.PNG",     alt: "Trabajo 0175" },
  { src: "/assets/trabajo/IMG_0176.PNG",     alt: "Trabajo 0176" },
  { src: "/assets/trabajo/IMG_0177.PNG",     alt: "Trabajo 0177" },
  { src: "/assets/trabajo/IMG_0178.PNG",     alt: "Trabajo 0178" },
  { src: "/assets/trabajo/IMG_0179.PNG",     alt: "Trabajo 0179" },
  { src: "/assets/trabajo/IMG_9908.PNG",     alt: "Trabajo 9908" },
  { src: "/assets/trabajo/IMG_9909.PNG",     alt: "Trabajo 9909" },
  { src: "/assets/trabajo/IMG_9910.PNG",     alt: "Trabajo 9910" },
];

export function Portfolio() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const title = (
    <>
      {/* Radial glow behind text */}
      <div className="absolute w-[280px] sm:w-[400px] md:w-[500px] h-[160px] md:h-[200px] bg-electric-violet/20 blur-3xl rounded-full" />

      <p className="text-electric-violet font-semibold tracking-[0.3em] uppercase text-xs sm:text-xs mb-3 sm:mb-4 relative">
        Creaciones
      </p>
      <h2 className="font-outfit font-black text-6xl sm:text-5xl md:text-7xl text-center leading-none relative px-4">
        MI <GradientText variant="chrome">TRABAJO</GradientText>
      </h2>
      <p className="mt-4 px-4 text-center text-chrome-400 text-sm sm:text-sm tracking-widest relative">
        Diseño · Fotografía · Video · Contenido
      </p>
    </>
  );

  return (
    <section id="portfolio" className="relative z-10 bg-black">
      {/* Titulo arriba, fotos debajo: encimado no se leia */}
      <div className="relative flex flex-col items-center justify-center pt-20 md:pt-28 pb-10 md:pb-14 px-4">
        {title}
      </div>

      <ImageStreamHero
        images={workImages}
        cards={isMobile ? 6 : Math.ceil(workImages.length / 2)}
        speed={62}
        axis={isMobile ? 52 : 58}
        // cqw-based corridor: on a narrow container the cards need a bigger
        // slice of the width (and less lateral spread) to read the same way
        path={
          isMobile
            ? { railBirth: -8, railExit: 40, fan: 2.4, turnExit: 26, birthHeight: 4, exitHeight: 95 }
            : { railBirth: -14, railExit: 62, fan: 2.4, turnExit: 34 }
        }
        className="w-full h-[70svh] md:h-[80vh]"
      >
        {/* Overlay: gradient top + bottom so the section edges blend with black */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
      </ImageStreamHero>
    </section>
  );
}
