"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import { prefix } from "@/utils/prefix";
import { experiences, education } from "@/data/experience";

export default function About() {
    return (
        <div className="flex flex-col gap-16">
            <section className="flex flex-col gap-12">
                <h1 className="text-6xl md:text-[150px] font-medium tracking-tighter leading-none">About</h1>

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
                <SectionLabel>
                    Experience
                </SectionLabel>
                <div className="flex flex-col border-t border-border">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex flex-col md:flex-row py-4 border-b border-border hover:bg-hover transition-colors px-2 -mx-2 rounded-sm"
                        >
                            <div className="md:w-1/4">
                                <span className="font-mono text-sm text-muted">{exp.year}</span>
                            </div>
                            <div className="md:w-1/4">
                                <span className="font-medium">{exp.role}</span>
                            </div>
                            <div className="md:w-1/2">
                                <span className="text-muted">{exp.company}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-8">
                <SectionLabel>
                    Education
                </SectionLabel>
                <div className="flex flex-col border-t border-border">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex flex-col md:flex-row py-4 border-b border-border hover:bg-hover transition-colors px-2 -mx-2 rounded-sm"
                        >
                            <div className="md:w-1/4">
                                <span className="font-mono text-sm text-muted">{edu.year}</span>
                            </div>
                            <div className="md:w-1/4">
                                <span className="font-medium">{edu.role}</span>
                            </div>
                            <div className="md:w-1/2">
                                <span className="text-muted">{edu.company}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
