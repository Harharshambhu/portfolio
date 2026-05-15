"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

const FLEX_EASE = "flex 0.55s cubic-bezier(0.4, 0, 0.2, 1)";
const ROW_HEIGHT = 480;

function ExpandRow({ items }: { items: (Project | null)[] }) {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    const flex = (i: number) =>
        hoveredIdx === null ? 1 : i === hoveredIdx ? 2.2 : 0.7;

    return (
        <div className="flex gap-[2px]" style={{ height: ROW_HEIGHT }}>
            {items.map((project, i) => {
                if (!project) {
                    return (
                        <div
                            key={`empty-${i}`}
                            style={{ flex: flex(i), transition: FLEX_EASE, minWidth: 0 }}
                            className="border border-border/30 rounded-[3px]"
                        />
                    );
                }

                const isHovered = hoveredIdx === i;

                return (
                    <div
                        key={project.href}
                        style={{ flex: flex(i), transition: FLEX_EASE, minWidth: 0 }}
                        className="relative overflow-hidden rounded-[3px] cursor-pointer"
                        onMouseEnter={() => setHoveredIdx(i)}
                        onMouseLeave={() => setHoveredIdx(null)}
                    >
                        <Link href={project.href || "#"} className="block w-full h-full relative">
                            {project.thumbnail ? (
                                <Image
                                    src={project.thumbnail}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    style={{
                                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                                        transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                                    }}
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                />
                            ) : (
                                <div className="w-full h-full bg-hover" />
                            )}

                            {/* Gradient */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)",
                                    opacity: isHovered ? 1 : 0.82,
                                    transition: "opacity 0.4s ease",
                                }}
                            />

                            {/* Text */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1.5">
                                <span
                                    className="uppercase tracking-[0.14em]"
                                    style={{ fontSize: "var(--fs-body-sm)", color: "rgba(255,255,255,0.45)" }}
                                >
                                    {project.category}&nbsp;·&nbsp;{project.year}
                                </span>
                                <div className="flex items-end justify-between gap-2">
                                    <h3
                                        className="font-semibold leading-snug text-white"
                                        style={{ fontSize: "var(--fs-h3)" }}
                                    >
                                        {project.title}
                                    </h3>
                                    <ArrowUpRight
                                        size={15}
                                        className="shrink-0 text-white mb-0.5"
                                        style={{
                                            opacity: isHovered ? 1 : 0,
                                            transition: "opacity 0.35s ease",
                                        }}
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default function ProjectsExpandGrid({ projects }: { projects: Project[] }) {
    const row1: (Project | null)[] = [projects[0] ?? null, projects[1] ?? null, projects[2] ?? null];
    const row2: (Project | null)[] = [projects[3] ?? null, projects[4] ?? null, projects[5] ?? null];
    const row3: (Project | null)[] = [null, null, null];

    return (
        <>
            {/* ── Mobile: single column stack ── */}
            <div className="md:hidden flex flex-col gap-4">
                {projects.filter(Boolean).map((project) => (
                    <Link
                        key={project.href}
                        href={project.href || "#"}
                        className="block rounded-[3px] overflow-hidden relative"
                        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                    >
                        <div className="relative aspect-video w-full overflow-hidden" style={{ background: "var(--hover)" }}>
                            {project.thumbnail && (
                                <Image
                                    src={project.thumbnail}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <span
                                    className="uppercase tracking-[0.14em] block mb-1"
                                    style={{ fontSize: "var(--fs-body-sm)", color: "rgba(255,255,255,0.45)" }}
                                >
                                    {project.category}&nbsp;·&nbsp;{project.year}
                                </span>
                                <div className="flex items-end justify-between">
                                    <h3 className="font-semibold text-white leading-snug" style={{ fontSize: "var(--fs-h3)" }}>
                                        {project.title}
                                    </h3>
                                    <ArrowUpRight size={15} className="shrink-0 text-white mb-0.5 opacity-70" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* ── Desktop: expand-on-hover grid ── */}
            <div className="hidden md:flex flex-col gap-[2px]">
                <ExpandRow items={row1} />
                <ExpandRow items={row2} />
                <ExpandRow items={row3} />
            </div>
        </>
    );
}
