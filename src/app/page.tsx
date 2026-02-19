import Link from "next/link";
import Image from "next/image"; // Kept if used elsewhere, otherwise remove? It's not used in this file anymore for hero, but maybe for nothing else?
// Wait, projects table might use it? No, it's a component.
// Let's check if Image is used elsewhere. Explicitly removing motion import.

import ProjectsTable from "@/components/ProjectsTable";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import HeroImage from "@/components/HeroImage";
import { projects } from "@/data/projects";

export default function Home() {
  const selectedProjects = projects.slice(0, 3);

  return (
    <div className="flex flex-col gap-16 pt-0">
      <section className="flex flex-col md:flex-row items-end gap-6 md:gap-12">
        <ScrollReveal delay={0.3} className="relative w-full md:w-[40%] flex justify-center md:justify-center translate-y-8">
          <HeroImage />
        </ScrollReveal>

        <div className="flex flex-col gap-6 w-full md:w-[60%] mb-8 md:mb-10">
          <ScrollReveal>
            <h1 className="text-4xl font-medium tracking-tight">Anirudh</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-xl text-muted">
              Product & XR Designer | M.Des at IIT Jodhpur
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              Designing immersive interventions and digital trust architectures.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <ServicesSection />

      <section className="flex flex-col gap-8">
        <ScrollReveal>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono text-muted uppercase tracking-wider">
              Selected Work
            </h3>
            <Link href="/projects" className="text-sm font-mono text-muted hover:text-foreground transition-colors">
              View All →
            </Link>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ProjectsTable projects={selectedProjects} />
        </ScrollReveal>
      </section>

      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>

      <ScrollReveal>
        <FAQSection />
      </ScrollReveal>
    </div>
  );
}
