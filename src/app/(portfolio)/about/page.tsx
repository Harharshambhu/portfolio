"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import SpotlightHeading from "@/components/SpotlightHeading";
import { prefix } from "@/utils/prefix";
import { experiences, education } from "@/data/experience";

function RippleRow({ year, role, company, delay }: { year: string; role: string; company: string; delay: number }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [origin, setOrigin] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = (e: React.MouseEvent) => {
        const rect = rowRef.current!.getBoundingClientRect();
        setOrigin({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setHovered(true);
    };

    return (
        <motion.div
            ref={rowRef}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="relative flex flex-col md:flex-row py-4 border-b border-border px-3 -mx-3 rounded-sm overflow-hidden cursor-default"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setHovered(false)}
            style={{
                borderBottomColor: hovered ? "transparent" : undefined,
                transition: "border-color 0.2s ease",
            }}
        >
            {/* Ripple fill */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundColor: "var(--accent-blue)",
                    clipPath: hovered
                        ? `circle(150% at ${origin.x}px ${origin.y}px)`
                        : `circle(0% at ${origin.x}px ${origin.y}px)`,
                    transition: hovered
                        ? "clip-path 0.55s cubic-bezier(0.4,0,0.2,1)"
                        : "clip-path 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
            />
            <div className="relative md:w-1/4">
                <span
                    className="font-sans font-medium text-sm"
                    style={{ color: hovered ? "var(--text-hover-muted)" : "var(--muted)", transition: "color 0.25s ease" }}
                >
                    {year}
                </span>
            </div>
            <div className="relative md:w-1/4">
                <span
                    className="font-medium text-lg leading-tight"
                    style={{ color: hovered ? "var(--text-hover)" : "var(--foreground)", transition: "color 0.25s ease" }}
                >
                    {role}
                </span>
            </div>
            <div className="relative md:w-1/2">
                <span
                    className="font-sans font-medium text-sm"
                    style={{ color: hovered ? "var(--text-hover-muted)" : "var(--muted)", transition: "color 0.25s ease" }}
                >
                    {company}
                </span>
            </div>
        </motion.div>
    );
}

export default function About() {
    return (
        <div className="flex flex-col gap-16">
            <section className="flex flex-col gap-12">
                <SpotlightHeading className="font-medium tracking-tighter leading-none" color="var(--accent-blue)" style={{ fontSize: "var(--fs-page-title)" }}>About</SpotlightHeading>

                <div className="flex flex-col md:flex-row gap-12 items-start justify-between w-full">
                    <p className="text-lg leading-relaxed text-muted md:w-1/2">
                        I am a Product and XR Designer currently pursuing my M.Des at IIT
                        Jodhpur. With a background in Fashion Design (FDDI) and experience
                        in immersive media, I bridge the gap between physical and digital
                        experiences.
                    </p>
                    <ScrollReveal className="w-full md:w-1/2 flex justify-end -mt-24 md:-mt-60">
                        <Image
                            src={prefix("/images/profile.webp")}
                            alt="Anirudh Singh"
                            width={600}
                            height={400}
                            className="w-full max-w-lg h-auto rounded-xl grayscale-0 hover:grayscale transition-all duration-500 object-cover max-h-[600px] object-top"
                        />
                    </ScrollReveal>
                </div>
            </section>

            <section className="flex flex-col gap-8">
                <SectionLabel>Experience</SectionLabel>
                <div className="flex flex-col border-t border-border">
                    {experiences.map((exp, index) => (
                        <RippleRow
                            key={index}
                            year={exp.year}
                            role={exp.role}
                            company={exp.company}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-8">
                <SectionLabel>Education</SectionLabel>
                <div className="flex flex-col border-t border-border">
                    {education.map((edu, index) => (
                        <RippleRow
                            key={index}
                            year={edu.year}
                            role={edu.role}
                            company={edu.company}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
