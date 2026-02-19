"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export interface Project {
    title: string;
    category: string;
    year: string;
    href?: string;
    description?: string;
}

interface ProjectsTableProps {
    projects: Project[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
    return (
        <div className="flex flex-col border-t border-border">
            {projects.map((project, index) => (
                <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <Link
                        href={project.href || "#"}
                        className="group flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-border hover:bg-hover transition-colors px-2 -mx-2 rounded-sm cursor-pointer"
                    >
                        <div className="flex flex-col gap-1 md:w-1/3">
                            <h3 className="text-foreground font-medium text-lg leading-tight">
                                {project.title}
                            </h3>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between flex-1 gap-4 md:gap-0 mt-2 md:mt-0">
                            <span className="text-muted font-mono text-sm md:w-1/2">
                                {project.category}
                            </span>

                            <div className="flex items-center gap-12 md:w-1/2 justify-between md:justify-end">
                                <span className="text-muted font-mono text-sm">
                                    {project.year}
                                </span>

                                <div className="relative overflow-hidden w-5 h-5">
                                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-full group-hover:translate-x-full">
                                        <ArrowUpRight className="w-5 h-5 text-muted" />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0">
                                        <ArrowUpRight className="w-5 h-5 text-foreground" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
