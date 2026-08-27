"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site.config";
import { ChromeButton } from "./ChromeButton";

const navLinks = [
  { href: "#about", label: "Sobre mí" },
  { href: "#experience", label: "Experiencia" },
  { href: "#services", label: "Servicios" },
  { href: "#portfolio", label: "Portafolio" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        <button
          onClick={() => scrollTo("#hero")}
          className="text-base sm:text-xl font-bold font-outfit tracking-wider text-chrome-violet"
        >
          {siteConfig.name.toUpperCase()}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-chrome-300 hover:text-white hover:glow-violet transition-all duration-300"
            >
              {link.label}
            </button>
          ))}
          <ChromeButton
            variant="primary"
            size="sm"
            onClick={() => scrollTo("#contact")}
          >
            Contacto
          </ChromeButton>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="text-electric-magenta drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]" /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 md:top-20 left-0 w-full max-h-[calc(100dvh-4rem)] overflow-y-auto bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-5 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-lg font-medium text-chrome-300 hover:text-electric-violet transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10">
              <ChromeButton
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => scrollTo("#contact")}
              >
                Contacto
              </ChromeButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
