"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectMeta from "@/components/ProjectMeta";
import SectionLabel from "@/components/SectionLabel";

import { useState } from "react";

const images = [
    "/projects/chabad-house/01.webp",
    "/projects/chabad-house/02.webp",
    "/projects/chabad-house/03.webp",
    "/projects/chabad-house/04.webp",
    "/projects/chabad-house/05.webp",
    "/projects/chabad-house/06.webp",
    "/projects/chabad-house/07.webp",
];

export default function ChabadHousePage() {
    const [showFlipBook, setShowFlipBook] = useState(false);

    return (
        <main className="min-h-screen pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-6">
                {/* ── HEADER ── */}
                <header className="flex flex-col gap-8 mb-20">
                    <div className="flex flex-col gap-4 max-w-4xl">
                        <SectionLabel>Graphic Novel</SectionLabel>
                        <h1 className="text-6xl md:text-8xl font-semibold tracking-tight leading-[0.9]">
                            The Chabad House
                        </h1>
                        <p className="text-xl md:text-2xl text-muted leading-relaxed mt-4">
                            A visual documentation of the 26/11 attacks, reimagined through the lens of a graphic novel to preserve memory and honor human resilience.
                        </p>
                    </div>

                    <ProjectMeta
                        meta={[
                            { label: "Role", value: "Illustrator & Designer" },
                            { label: "Timeline", value: "3 Months" },
                            { label: "Medium", value: "Digital Illustration" },
                            { label: "Year", value: "2023" }
                        ]}
                    />
                </header>

                {/* ── GALLERY ── */}
                <div className="flex flex-col gap-12 md:gap-24">
                    {/* Image 01 */}
                    <ScrollReveal>
                        <div className="relative w-full rounded-2xl overflow-hidden bg-muted/20">
                            <img
                                src={images[0]}
                                alt="Chabad House 01"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </ScrollReveal>

                    {/* INTERACTIVE COMIC SECTION */}
                    <ScrollReveal>
                        <section className="flex flex-col gap-8">
                            <div className="flex flex-col gap-3 max-w-2xl">
                                <SectionLabel>Interactive Experience</SectionLabel>
                                <h2 className="text-4xl font-semibold tracking-tight">Flip through the novel</h2>
                                <p className="text-muted leading-relaxed">
                                    Experience the narrative flow as it was intended. Use the viewer below to interact with the full comic.
                                </p>
                            </div>
                            
                            <div className="w-full rounded-2xl overflow-hidden border border-border shadow-2xl bg-black/5 aspect-[16/10] relative group">
                                {!showFlipBook ? (
                                    <div 
                                        className="w-full h-full cursor-pointer relative"
                                        onClick={() => setShowFlipBook(true)}
                                    >
                                        <img 
                                            src={images[1]} 
                                            className="w-full h-full object-cover opacity-60 grayscale-[0.5] blur-[1px] transition-all duration-700 group-hover:opacity-80 group-hover:grayscale-0 group-hover:blur-0" 
                                            alt="Flip book preview"
                                        />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/20">
                                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                </svg>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-xs font-bold tracking-[0.2em] uppercase text-white drop-shadow-md">Launch Interactive Version</span>
                                                <span className="text-[10px] text-white/60 uppercase tracking-widest">Click to load reader</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <iframe 
                                        allowFullScreen
                                        scrolling="no" 
                                        className="fp-iframe w-full h-full"
                                        src="https://heyzine.com/flip-book/45d1896210.html" 
                                        style={{ border: "none" }}
                                        sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
                                    />
                                )}
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Remaining Images 02 - 07 */}
                    {images.slice(1).map((src, index) => (
                        <ScrollReveal key={src} delay={0.1}>
                            <div className="relative w-full rounded-2xl overflow-hidden bg-muted/20">
                                <img
                                    src={src}
                                    alt={`Chabad House ${index + 2}`}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* ── FOOTER QUOTE ── */}
                <footer className="mt-32 pt-20 border-t border-border flex flex-col items-center text-center">
                    <p className="quote-text text-3xl md:text-5xl text-muted/80 max-w-4xl leading-tight italic">
                        &ldquo;Complexity doesn&apos;t disappear. Good design just refuses to let it land on the user.&rdquo;
                    </p>
                </footer>
            </div>
        </main>
    );
}
