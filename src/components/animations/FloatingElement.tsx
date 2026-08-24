"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FloatingElementProps {
  children?: React.ReactNode;
  className?: string;
  depth?: number;
}

export function FloatingElement({
  children,
  className,
  depth = 20,
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse coordinates from -1 to 1
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  const xOffset = mousePosition.x * depth;
  const yOffset = mousePosition.y * depth;
  const rotateX = mousePosition.y * -10; // Max 10deg rotation
  const rotateY = mousePosition.x * 10;

  return (
    <motion.div
      ref={ref}
      animate={
        prefersReducedMotion
          ? {}
          : {
              x: xOffset,
              y: yOffset,
              rotateX,
              rotateY,
            }
      }
      transition={{ type: "spring", stiffness: 75, damping: 20 }}
      className={cn("animate-float", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}
