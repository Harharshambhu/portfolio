"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import SpotlightHeading from "@/components/SpotlightHeading";
import { prefix } from "@/utils/prefix";
import { experiences, education } from "@/data/experience";

function RippleRow({ year, role, company, desc, delay, globalMouse, showBubble = true, isMobile = false }: { year: string; role: string; company: string; desc: string; delay: number; globalMouse: { x: number; y: number }; showBubble?: boolean; isMobile?: boolean }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [origin, setOrigin] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const updateHoverState = (mouseX: number, mouseY: number) => {
        if (!rowRef.current) return;
        const rect = rowRef.current.getBoundingClientRect();
        const isOver =
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom;

        if (isOver && !hovered) {
            setHovered(true);
            setOrigin({ x: mouseX - rect.left, y: mouseY - rect.top });
        } else if (!isOver && hovered) {
            setHovered(false);
        } else if (isOver && hovered) {
            // Update origin for ripple center while moving
            setOrigin({ x: mouseX - rect.left, y: mouseY - rect.top });
        }
    };

    useEffect(() => {
        const handleScroll = () => updateHoverState(globalMouse.x, globalMouse.y);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hovered, globalMouse]);

    return (
        <>
            <div
                ref={rowRef}
                className="relative flex flex-col md:flex-row py-4 border-b border-border px-3 -mx-3 rounded-sm overflow-hidden cursor-none"
                onMouseEnter={() => updateHoverState(globalMouse.x, globalMouse.y)}
                onMouseMove={(e) => updateHoverState(e.clientX, e.clientY)}
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
            </div>

            {/* Floating Green Bubble */}
            <AnimatePresence>
                {hovered && showBubble && (
                    <motion.div
                        key="bubble"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed pointer-events-none z-[10000] flex items-center justify-center"
                        style={{
                            left: isMobile ? "50%" : globalMouse.x + 10,
                            top: globalMouse.y < window.innerHeight / 2
                                ? globalMouse.y + 120
                                : globalMouse.y - 210,
                            x: isMobile ? "-50%" : "0%",
                            y: "-50%",
                        }}
                    >
                        <div
                            className="w-90 h-90 rounded-full backdrop-blur-md border border-white/20 shadow-2xl flex flex-col items-center justify-center p-10 text-center"
                            style={{ background: "rgba(45, 236, 11, 1)" }}
                        >
                            <p className="text-white font-semibold text-lg leading-relaxed max-w-[280px] whitespace-pre-line">
                                {desc}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default function About() {
    const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setGlobalMouse({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const [isExpanded, setIsExpanded] = useState(false);

    const introText = `I learned design in fashion studios, but I learned product thinking backstage, where every event runs on chaos that nobody has built proper tools for.`;
    const expandedText1 = ` During my 4 years of bachelors, I participated in fashion shows and corporate events across FDDI and NIFT, which showed me that the most interesting design problems aren’t visual. They’re operational. Working as a freelancer on 3D and AR experiences for event stalls pulled me further toward spatial design.`;
    const expandedText2 = ` That’s why I went to IIT Jodhpur to do my M.Des in XR Design, to go deeper on both fronts. My thesis research was on why users drop out of standalone VR experiences. And rather than looking it as a hardware limitation, we built a solution around it, respecting the constraints. And that's one of my major believes about good design. Good Design solution is one that is built within the constraints of the system. The event industry taught me to see those broken systems. The M.Des gave me the research rigour and design methodology to fix them.`;
    const closingText = `For career opportunities and project collaborations, feel free to reach out to me at anirudhsingh1441@gmail.com.`;

    return (
        <div className="flex flex-col gap-16">
            <section className="flex flex-col gap-12">
                <SpotlightHeading className="font-medium tracking-tighter leading-none" color="var(--accent-blue)" style={{ fontSize: "var(--fs-page-title)" }}>About</SpotlightHeading>

                <div className="flex flex-col md:flex-row gap-12 items-start justify-between w-full">
                    <div className="text-lg leading-relaxed text-muted md:w-1/2 flex flex-col items-start gap-5">
                        <div className="relative">
                            <p className="block">
                                {introText}
                                {isExpanded && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                    >
                                        {expandedText1}
                                        <span className="block mt-3" />
                                        {expandedText2}
                                        <span className="block mt-4 text-foreground font-medium">
                                            {closingText}
                                        </span>
                                    </motion.span>
                                )}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-foreground font-medium hover:text-[var(--accent-blue)] transition-colors inline-flex items-center gap-1 group whitespace-nowrap border-b border-foreground/30 hover:border-[var(--accent-blue)] leading-none pb-0.5"
                        >
                            {isExpanded ? "Read less" : "Read more"}
                            <motion.span
                                animate={{ x: isExpanded ? 0 : [0, 3, 0] }}
                                transition={{ repeat: isExpanded ? 0 : Infinity, duration: 1.5 }}
                                className={isExpanded ? "rotate-180" : ""}
                            >
                                →
                            </motion.span>
                        </button>
                    </div>
                    <ScrollReveal className="w-full md:w-1/2 flex justify-end order-first md:order-none -mt-0 md:-mt-60">
                        <Image
                            src={prefix("/images/profile.webp")}
                            alt="Anirudh Singh"
                            width={600}
                            height={400}
                            className="w-full max-w-lg h-auto rounded-xl object-cover max-h-[600px] object-top"
                        />
                    </ScrollReveal>
                </div>
            </section>

            <p className="quote-text !text-2xl text-muted/60 text-center py-8">"By the way, Sokimevi is an acronym of me and my sisters."</p>

            <section className="flex flex-col gap-8">
                <div className="flex items-center justify-between w-full">
                    <SectionLabel>Experience</SectionLabel>
                    <span className="font-semibold text-muted/30 uppercase tracking-wider font-sans" style={{ fontSize: "var(--fs-label)" }}>
                        Hover to Learn More
                    </span>
                </div>
                <div className="flex flex-col border-t border-border">
                    {experiences.map((exp, index) => (
                        <RippleRow
                            key={index}
                            year={exp.year}
                            role={exp.role}
                            company={exp.company}
                            desc={exp.desc}
                            delay={index * 0.001}
                            globalMouse={globalMouse}
                            isMobile={isMobile}
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
                            desc={edu.desc}
                            delay={index * 0.001}
                            globalMouse={globalMouse}
                            showBubble={false}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
