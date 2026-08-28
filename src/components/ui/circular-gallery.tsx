"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Image from "next/image";

export interface GalleryItem {
  id: string;
  company: string;
  role: string;
  summary: string;        // short blurb shown on card
  description: string;   // full text shown on expand
  photo: string;
  photos?: string[];     // optional extra photos for expanded view
}

interface CircularGalleryProps {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
}

export function CircularGallery({ items, onSelect }: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  // ponytail: uniform scale keeps the 3D ring intact on narrow screens
  const [scale, setScale] = useState(1);
  const rotationRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef<number>(0);
  const touchActive = useRef(false);

  const ITEM_COUNT = items.length;
  const ANGLE_STEP = 360 / ITEM_COUNT;
  // Radius scales with number of items
  const RADIUS = Math.max(340, ITEM_COUNT * 58);

  /* ── Fit the ring to the viewport ───────────────────────────────── */
  useEffect(() => {
    const fit = () => setScale(Math.min(1, window.innerWidth / 560));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  /* ── Painting ──────────────────────────────────────────────────── */
  // ponytail: el drag escribe el transform directo al DOM. Pasar por estado de
  // React en cada touchmove re-renderiza 8 cards con <Image> y se traba.
  const draw = useCallback(() => {
    if (ringRef.current) {
      ringRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
    }
  }, []);

  const schedule = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(draw);
  }, [draw]);

  /* ── Inertia scroll ────────────────────────────────────────────── */
  const applyInertia = useCallback(() => {
    if (Math.abs(velocity.current) < 0.05) {
      velocity.current = 0;
      setRotation(rotationRef.current); // sincroniza el estado "front" de los botones
      return;
    }
    velocity.current *= 0.94;
    rotationRef.current += velocity.current;
    draw();
    rafId.current = requestAnimationFrame(applyInertia);
  }, [draw]);

  /* ── Mouse events ──────────────────────────────────────────────── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastX.current = e.clientX;
      velocity.current = 0;
      cancelAnimationFrame(rafId.current);
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastX.current;
      velocity.current = dx * 0.25;
      rotationRef.current += dx * 0.25;
      schedule();
      lastX.current = e.clientX;
    };

    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      rafId.current = requestAnimationFrame(applyInertia);
    };

    const onWheel = (e: WheelEvent) => {
      e.stopPropagation();
      velocity.current = 0;
      cancelAnimationFrame(rafId.current);
      rotationRef.current -= e.deltaY * 0.15;
      schedule();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchActive.current = true;
      lastX.current = e.touches[0].clientX;
      velocity.current = 0;
      cancelAnimationFrame(rafId.current);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchActive.current) return;
      e.preventDefault();
      const dx = e.touches[0].clientX - lastX.current;
      // ponytail: cap para que un swipe rapido no dispare un giro absurdo
      const delta = Math.max(-40, Math.min(40, dx * 0.25));
      velocity.current = delta;
      rotationRef.current += delta;
      draw();
      lastX.current = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
      touchActive.current = false;
      rafId.current = requestAnimationFrame(applyInertia);
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(rafId.current);
    };
  }, [applyInertia, draw, schedule]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-pan-y"
    >
      <div style={{ perspective: "1200px", transform: `scale(${scale})` }}>
      <div
        ref={ringRef}
        className="relative"
        style={{
          width: "260px",
          height: "360px",
          transformStyle: "preserve-3d",
          transform: `rotateY(${rotation}deg)`,
          willChange: "transform",
        }}
      >
        {items.map((item, i) => {
          const angle = ANGLE_STEP * i;
          // Compute how "front-facing" this card is (0 = front, 180 = back)
          const normalizedAngle = ((angle + rotation) % 360 + 360) % 360;
          const isFront = normalizedAngle < 40 || normalizedAngle > 320;

          return (
            <div
              key={item.id}
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              {/* Photo */}
              <div className="absolute inset-0">
                <Image
                  src={item.photo}
                  alt={item.company}
                  fill
                  sizes="260px"
                  className="object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                {/* Violet glow border */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-electric-violet/40" />
              </div>

              {/* Card content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <p className="text-electric-violet text-xs font-semibold tracking-widest uppercase mb-1">
                  {item.role}
                </p>
                <h3 className="text-white font-outfit font-bold text-base leading-tight mb-2">
                  {item.company}
                </h3>
                <p className="text-chrome-300 text-xs leading-relaxed line-clamp-2">
                  {item.summary}
                </p>

                {/* CTA button — only visible when front-facing */}
                <button
                  onClick={() => onSelect(item)}
                  className={`mt-3 px-4 py-1.5 rounded-full text-xs font-semibold border border-electric-violet/60 text-white bg-electric-violet/20 hover:bg-electric-violet/40 transition-all duration-300 ${isFront ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                  Ver más →
                </button>
              </div>
            </div>
          );
        })}
      </div>
      </div>

      {/* Hint */}
      <p className="absolute bottom-2 sm:bottom-6 left-1/2 -translate-x-1/2 w-full px-4 text-center text-chrome-600 text-[10px] sm:text-xs tracking-widest uppercase pointer-events-none">
        Arrastra o scroll para girar
      </p>
    </div>
  );
}
