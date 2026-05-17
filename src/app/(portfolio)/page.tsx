
import ProjectsGrid from "@/components/ProjectsGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import ScrollReveal from "@/components/ScrollReveal";
import HeroImage from "@/components/HeroImage";
import HeroName from "@/components/HeroName";
import SectionLabel from "@/components/SectionLabel";
import ToolsCarousel from "@/components/ToolsCarousel";
import CircularGrid from "@/components/CircularGrid";
import { projects, type Project } from "@/data/projects";

export default function Home() {
  const selectedProjects = projects.filter((p): p is Project => p !== null).slice(0, 3);
  const gridProjects = projects.filter((p): p is Project =>
    p !== null &&
    p.title !== "From Discovery to Transaction" &&
    p.title !== "3D Immersive Walkthroughs" &&
    p.title !== "Ad Campaigns" &&
    p.title !== "Artworks" &&
    p.title !== "Storyboard"
  );

  return (
    <div className="flex flex-col gap-16 pt-0">
      <section className="flex flex-col md:flex-row items-end gap-6 md:gap-12">
        <ScrollReveal delay={0.3} className="relative w-full md:w-[40%] flex justify-center">
          <HeroImage />
        </ScrollReveal>

        <div className="flex flex-col gap-4 w-full md:w-[60%]">
          <HeroName />
          <ScrollReveal delay={0.1}>
            <h2 className="text-xl text-muted">
              I am a Product & UX Designer
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              Let&apos;s Research, Iterate, and Deliver.
            </p>
          </ScrollReveal>
        </div>
      </section>


      <section className="flex flex-col gap-8">
        <CircularGrid projects={gridProjects} />
      </section>

      <section className="flex flex-col gap-8 mt-2 md:mt-0">
        <ScrollReveal delay={0.4}>
          <SectionLabel as="h3">Tools</SectionLabel>
        </ScrollReveal>
        <ScrollReveal delay={0.5}>
          <ToolsCarousel />
        </ScrollReveal>
      </section>

      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>
    </div>
  );
}
