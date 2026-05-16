"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const images = [
    "/projects/storyboarding-comic/1.webp",
    "/projects/storyboarding-comic/2.webp",
    "/projects/storyboarding-comic/3.webp",
    "/projects/storyboarding-comic/4.webp",
    "/projects/storyboarding-comic/5.webp",
    "/projects/storyboarding-comic/6.webp",
    "/projects/storyboarding-comic/8.webp",
    "/projects/storyboarding-comic/9.webp",
    "/projects/storyboarding-comic/10.webp",
    "/projects/storyboarding-comic/11.webp",
];

export default function StoryboardPage() {
    return (
        <div className="flex flex-col gap-24 pb-24">
            {/* ── HEADER ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-6 items-center text-center"
            >
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>Visual Storytelling</span>
                    <h1 className="text-6xl md:text-[100px] font-bold tracking-tighter leading-none">Storyboard</h1>
                </div>
            </motion.section>

            {/* ── IMAGES ── */}
            <section className="flex flex-col gap-12 items-center w-full max-w-screen-xl mx-auto px-6">
                {images.map((src, i) => (
                    <motion.div
                        key={src}
                        initial="hidden"
                        animate="visible"
                        variants={fade}
                        className="w-full max-w-5xl rounded-xl overflow-hidden border border-border bg-muted/5"
                    >
                        <Image
                            src={src}
                            alt={`Storyboard panel ${i + 1}`}
                            width={1600}
                            height={900}
                            className="w-full h-auto"
                            priority={i < 2}
                        />
                    </motion.div>
                ))}
            </section>
        </div>
    );
}
