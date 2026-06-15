"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

interface Props {
    project: Project;
    delay?: number;
    variant?: "square" | "tall" | "wide";
    className?: string;
}

export default function ProjectCard({ project, delay = 0, variant = "square", className = "" }: Props) {
    const isTall = variant === "tall";
    const isWide = variant === "wide";

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            className={`group ${isTall ? "md:h-full" : ""} ${className}`}
        >
            <Link
                href={project.href || "#"}
                className={`block overflow-hidden rounded-[3px] ${isTall ? "md:h-full md:flex md:flex-col" : ""}`}
                style={{
                    background: "var(--background)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.06)",
                    transition: "box-shadow 0.35s ease",
                }}
                onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                        "0 4px 20px rgba(0,0,0,0.10), 0 16px 52px rgba(0,0,0,0.10)";
                }}
                onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                        "0 2px 12px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.06)";
                }}
            >
                {/* Image */}
                <div
                    className={`relative overflow-hidden ${
                        isTall
                            ? "aspect-square md:aspect-auto md:flex-1 md:min-h-0"
                            : isWide
                            ? "aspect-video"
                            : "aspect-square"
                    }`}
                    style={{ background: "var(--hover)" }}
                >
                    {project.thumbnail ? (
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                            sizes={
                                isWide
                                    ? "(max-width: 1280px) 100vw, 1280px"
                                    : "(max-width: 768px) 100vw, 50vw"
                            }
                        />
                    ) : (
                        <div className="w-full h-full" style={{ background: "var(--hover)" }} />
                    )}
                </div>

                {/* Text */}
                <div className="px-4 pt-4 pb-5 flex flex-col gap-1">
                    <p
                        className="uppercase tracking-widest font-sans"
                        style={{ fontSize: "var(--fs-body-sm)", color: "var(--muted)" }}
                    >
                        {project.category}&nbsp;·&nbsp;{project.year}
                    </p>
                    <div className="flex items-start justify-between gap-2">
                        <h3
                            className="font-semibold leading-snug"
                            style={{ fontSize: "var(--fs-h3)", color: "var(--foreground)" }}
                        >
                            {project.title}
                        </h3>
                        <ArrowUpRight
                            size={16}
                            className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ color: "var(--muted)" }}
                        />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
