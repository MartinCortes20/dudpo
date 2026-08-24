"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GradientTextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "chrome" | "violet" | "magenta" | "chrome-violet";
  as?: React.ElementType;
  children: React.ReactNode;
}

export function GradientText({
  variant = "chrome",
  as: Component = "span",
  className,
  children,
  ...props
}: GradientTextProps) {
  const variantClasses = {
    chrome: "text-chrome",
    violet: "bg-gradient-to-r from-electric-violet to-electric-indigo bg-clip-text text-transparent",
    magenta: "bg-gradient-to-r from-electric-magenta to-electric-violet bg-clip-text text-transparent",
    "chrome-violet": "text-chrome-violet",
  };

  return (
    <Component
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
