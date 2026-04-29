"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export interface Project {
    title: string;
    category: string;
    year: string;
    href?: string;
    description?: string;
}

function ProjectRow({ project, delay }: { project: Project; delay: number }) {
    const rowRef = useRef<HTMLAnchorElement>(null);
    const [origin, setOrigin] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = (e: React.MouseEvent) => {
        const rect = rowRef.current!.getBoundingClientRect();
        setOrigin({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setHovered(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
        >
            <Link
                ref={rowRef}
                href={project.href || "#"}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-border px-3 -mx-3 rounded-sm cursor-pointer overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setHovered(false)}
                style={{
                    borderBottomColor: hovered ? "transparent" : undefined,
                    transition: "border-color 0.9s ease",
                }}
            >
                {/* Ripple fill from cursor */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundColor: "rgba(31,81,255,1)",
                        clipPath: hovered
                            ? `circle(150% at ${origin.x}px ${origin.y}px)`
                            : `circle(0% at ${origin.x}px ${origin.y}px)`,
                        transition: hovered
                            ? "clip-path 0.55s cubic-bezier(0.4,0,0.2,1)"
                            : "clip-path 0.4s cubic-bezier(0.4,0,0.2,1)",
                    }}
                />

                <div className="relative flex flex-col gap-1 md:w-1/3">
                    <h3
                        className="font-medium text-lg leading-tight"
                        style={{
                            color: hovered ? "#ffffff" : "var(--foreground)",
                            transition: "color 0.25s ease",
                        }}
                    >
                        {project.title}
                    </h3>
                </div>

                <div className="relative flex flex-col md:flex-row md:items-center justify-between flex-1 gap-4 md:gap-0 mt-2 md:mt-0">
                    <span
                        className="font-mono text-sm md:w-1/2"
                        style={{
                            color: hovered ? "rgba(255,255,255,0.75)" : "var(--muted)",
                            transition: "color 0.25s ease",
                        }}
                    >
                        {project.category}
                    </span>

                    <div className="flex items-center gap-12 md:w-1/2 justify-between md:justify-end">
                        <span
                            className="font-mono text-sm"
                            style={{
                                color: hovered ? "rgba(255,255,255,0.75)" : "var(--muted)",
                                transition: "color 0.25s ease",
                            }}
                        >
                            {project.year}
                        </span>

                        <div className="relative overflow-hidden w-5 h-5">
                            <div
                                className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
                                style={{
                                    transform: hovered ? "translateY(-100%) translateX(100%)" : undefined,
                                }}
                            >
                                <ArrowUpRight
                                    className="w-5 h-5"
                                    style={{ color: hovered ? "rgba(255,255,255,0.75)" : "var(--muted)" }}
                                />
                            </div>
                            <div
                                className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
                                style={{
                                    transform: hovered
                                        ? "translateX(0) translateY(0)"
                                        : "translateX(-100%) translateY(100%)",
                                }}
                            >
                                <ArrowUpRight className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function ProjectsTable({ projects }: { projects: Project[] }) {
    return (
        <div className="flex flex-col border-t border-border">
            {projects.map((project, index) => (
                <ProjectRow key={project.title} project={project} delay={index * 0.1} />
            ))}
        </div>
    );
}
