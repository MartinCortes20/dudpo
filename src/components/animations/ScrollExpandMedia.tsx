"use client";

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

export function ScrollExpandMedia({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  scrollToExpand = "Scroll para conocerme",
  children,
}: ScrollExpandMediaProps) {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Reset on mediaType change
  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  // Scroll / touch logic
  useEffect(() => {
    const handleWheel = (e: Event) => {
      const we = e as unknown as WheelEvent;
      if (mediaFullyExpanded && we.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        we.preventDefault();
      } else if (!mediaFullyExpanded) {
        we.preventDefault();
        const delta = we.deltaY * 0.0009;
        const next = Math.min(Math.max(scrollProgress + delta, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) setShowContent(false);
      }
    };

    const handleTouchStart = (e: Event) => {
      const te = e as unknown as TouchEvent;
      setTouchStartY(te.touches[0].clientY);
    };

    const handleTouchMove = (e: Event) => {
      const te = e as unknown as TouchEvent;
      if (!touchStartY) return;
      const touchY = te.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        te.preventDefault();
      } else if (!mediaFullyExpanded) {
        te.preventDefault();
        // ponytail: ~75px de swipe para expandir (antes 200px, se sentia eterno)
        const factor = deltaY < 0 ? 0.018 : 0.013;
        const next = Math.min(Math.max(scrollProgress + deltaY * factor, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) setShowContent(false);
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);

    const handleScroll = () => {
      if (!mediaFullyExpanded) window.scrollTo(0, 0);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  // Responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const mediaWidth  = 300 + scrollProgress * (isMobile ? 650  : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobile ? 200  : 400);
  const textShift   = scrollProgress * (isMobile ? 180 : 150);
  const glowOpacity = 1 - scrollProgress;

  const words = title ? title.split(" ") : [];
  const firstWord = words[0] ?? "";
  const restWords = words.slice(1).join(" ");

  return (
    <div ref={sectionRef} className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* ── Background image fades out as video expands ── */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            {/* Natural-size background — no zoom, no crop */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-contain md:bg-top"
              style={{ backgroundImage: "url('/assets/fondo.png')" }}
            />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* ── Expanding media card — no borders so it blends with bg ── */}
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: isMobile ? "90vw" : "95vw",
                  maxHeight: isMobile ? "58dvh" : "85vh",
                }}
              >
                {mediaType === "video" ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image src={mediaSrc} alt={title ?? "Media"} fill className="object-cover" />
                    <motion.div
                      className="absolute inset-0 bg-black/50"
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}
              </div>

              {/* ── Scroll hint + animated arrow ── */}
              {scrollToExpand && (
                <div className="flex flex-col items-center text-center relative z-10 mt-4 pointer-events-none">
                  <motion.p
                    className="text-chrome-300 font-medium tracking-widest uppercase text-[11px] sm:text-sm px-4 text-center"
                    animate={{ opacity: 1 - scrollProgress * 3 }}
                  >
                    {scrollToExpand}
                  </motion.p>
                  <motion.div
                    className="mt-3 w-px h-8 bg-gradient-to-b from-electric-violet to-transparent mx-auto"
                    animate={{ y: [0, 8, 0], opacity: 1 - scrollProgress * 3 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              )}

              {/* ── Title words slide apart as user scrolls ── */}
              {title && (
                <div className="flex flex-col items-center justify-center text-center gap-2 w-full relative z-10 pointer-events-none mix-blend-difference">
                  <motion.h1
                    className="font-outfit font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter"
                    style={{ transform: `translateX(-${textShift}vw)` }}
                  >
                    {firstWord}
                  </motion.h1>
                  {restWords && (
                    <motion.h1
                      className="font-outfit font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter"
                      style={{ transform: `translateX(${textShift}vw)` }}
                    >
                      {restWords}
                    </motion.h1>
                  )}
                </div>
              )}
            </div>

            {/* ── Children revealed after full expansion ── */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.9 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
