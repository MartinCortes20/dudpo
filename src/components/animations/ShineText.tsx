"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ShineTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function ShineText({ text, className, as: Component = "span" }: ShineTextProps) {
  return (
    <Component
      className={cn(
        "relative inline-block overflow-hidden bg-clip-text text-transparent",
        "bg-[linear-gradient(110deg,#a855f7,45%,#ffffff,55%,#a855f7)]",
        "bg-[length:200%_100%] animate-shine-sweep",
        className
      )}
    >
      {text}
    </Component>
  );
}
