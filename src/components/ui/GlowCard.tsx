"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: "violet" | "magenta";
  glowIntensity?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function GlowCard({
  glowColor = "violet",
  glowIntensity = "md",
  className,
  children,
  ...props
}: GlowCardProps) {
  const glowClasses = {
    violet: {
      sm: "hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]",
      md: "hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]",
      lg: "hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]",
    },
    magenta: {
      sm: "hover:shadow-[0_0_15px_rgba(217,70,239,0.3)]",
      md: "hover:shadow-[0_0_25px_rgba(217,70,239,0.5)]",
      lg: "hover:shadow-[0_0_40px_rgba(217,70,239,0.6)]",
    }
  };

  const borderGlowClasses = {
    violet: "hover:border-electric-violet/50",
    magenta: "hover:border-electric-magenta/50",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-chrome-900/40 backdrop-blur-md",
        "border border-chrome-800 transition-all duration-500",
        glowClasses[glowColor][glowIntensity],
        borderGlowClasses[glowColor],
        className
      )}
      {...props}
    >
      {/* Top subtle highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  );
}
