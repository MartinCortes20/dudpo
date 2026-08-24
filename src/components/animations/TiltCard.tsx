"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: "violet" | "magenta";
  scale?: number;
}

export function TiltCard({
  children,
  className,
  maxTilt = 15,
  glowColor = "violet",
  scale = 1.02,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    setRotation({
      x: yPct * maxTilt * -1,
      y: xPct * maxTilt,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const glowClass = glowColor === "violet" ? "hover:glow-violet" : "hover:glow-magenta";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered && !prefersReducedMotion ? rotation.x : 0,
        rotateY: isHovered && !prefersReducedMotion ? rotation.y : 0,
        scale: isHovered && !prefersReducedMotion ? scale : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-xl border border-chrome-800 bg-chrome-900/50 p-6 backdrop-blur-sm transition-all duration-300",
        glowClass,
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Subtle Inner Glow on Hover */}
      <motion.div
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        className={cn(
          "pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300",
          glowColor === "violet" ? "bg-electric-violet" : "bg-electric-magenta"
        )}
      />
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
}
