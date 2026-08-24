import { Navbar } from "@/components/ui/Navbar";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { HeroExpand } from "@/components/sections/HeroExpand";
import { Experience } from "@/components/sections/Experience";
import { Portfolio } from "@/components/sections/Portfolio";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-electric-violet/30 selection:text-white">
      <ParticleBackground />
      <Navbar />

      <div className="relative z-10">
        {/* Intro scroll-expand + About */}
        <HeroExpand />

        {/* Social Media — circular gallery */}
        <Experience />

        {/* Mi Trabajo — flying image corridor */}
        <Portfolio />

        <Contact />
      </div>

      <Footer />
    </main>
  );
}
