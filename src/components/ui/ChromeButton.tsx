"use client";

import { MagneticButton } from "../animations/MagneticButton";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChromeButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  glowColor?: "violet" | "magenta";
  children: React.ReactNode;
}

export function ChromeButton({
  variant = "primary",
  size = "md",
  glowColor = "violet",
  className,
  children,
  ...props
}: ChromeButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-chrome-900 text-chrome border border-chrome-600 hover:border-chrome-400 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]",
    secondary: "bg-transparent text-chrome-300 border border-chrome-700 hover:text-white hover:border-chrome-500",
    ghost: "bg-transparent text-chrome-400 hover:text-white hover:bg-chrome-800/50 border border-transparent",
  };

  if (variant === "primary") {
    // For primary, we use the MagneticButton which adds its own border and glow logic,
    // so we compose it carefully.
    return (
      <MagneticButton
        glowColor={glowColor}
        className={cn(baseClasses, sizeClasses[size], "bg-chrome-900 text-white shadow-lg backdrop-blur-sm", className)}
        {...props}
      >
        <span className="text-chrome font-semibold tracking-wide">{children}</span>
      </MagneticButton>
    );
  }

  return (
    <button
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        "rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
