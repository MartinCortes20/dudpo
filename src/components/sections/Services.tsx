"use client";

import { services } from "@/content/services";
import { RevealOnScroll } from "../animations/RevealOnScroll";
import { TiltCard } from "../animations/TiltCard";
import { GradientText } from "../ui/GradientText";

export function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6">
        <RevealOnScroll className="mb-16">
          <h2 className="text-4xl md:text-5xl font-outfit font-bold mb-4 text-center md:text-left">
            LO QUE <GradientText variant="chrome">HAGO</GradientText>
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <RevealOnScroll key={service.id} delay={idx * 0.1}>
                <TiltCard 
                  className="h-full flex flex-col items-start p-8"
                  glowColor={idx % 2 === 0 ? "violet" : "magenta"}
                >
                  <div className="mb-8 p-4 rounded-full bg-chrome-800/50 border border-chrome-700 text-electric-violet">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-outfit font-bold mb-4">{service.title}</h3>
                  <p className="text-chrome-400 leading-relaxed">
                    {service.description}
                  </p>
                </TiltCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
