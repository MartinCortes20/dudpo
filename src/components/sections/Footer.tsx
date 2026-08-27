"use client";

import { siteConfig } from "@/content/site.config";
import { GradientText } from "../ui/GradientText";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-chrome-800 bg-black relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <div className="text-xl font-bold font-outfit tracking-widest">
            <GradientText variant="chrome-violet">{siteConfig.name.toUpperCase()}</GradientText>
          </div>
          
          <div className="text-chrome-500 text-xs sm:text-sm">
            © {currentYear} {siteConfig.name}. Todos los derechos reservados.
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm font-medium">
            <a href="#about" className="text-chrome-400 hover:text-white transition-colors">Sobre mí</a>
            <a href="#portfolio" className="text-chrome-400 hover:text-white transition-colors">Portafolio</a>
            <a href="#contact" className="text-chrome-400 hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
