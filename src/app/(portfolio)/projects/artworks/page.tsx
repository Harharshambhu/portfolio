"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";

const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const artworks = [
    { src: "/projects/ArtWorks/beside-a-river0002.jpg",                        alt: "Beside a River — fantasy figure with glowing sword at sunset", w: 1600, h: 900 },
    { src: "/projects/ArtWorks/TimeTraveler-Charles2.jpg",                      alt: "Time Traveler Charles — full character portrait with mechanical hand and time device", w: 700, h: 1400 },
    { src: "/projects/ArtWorks/TimeTraveler-machine.jpg",                       alt: "Time Traveler's Machine — steampunk clockwork device with gyroscopic rings and futuristic city backdrop", w: 1920, h: 1080 },
    { src: "/projects/ArtWorks/priest-on-ship.jpg",                             alt: "Priest on Ship — screaming preacher at a pulpit, dark dramatic portrait", w: 600, h: 800 },
    { src: "/projects/ArtWorks/Niel-apocalyptic-character-scifi.jpg",           alt: "Niel — post-apocalyptic sci-fi warrior with glowing green armour in ruins", w: 1000, h: 1000 },
    { src: "/projects/ArtWorks/Art-Timetraveler-charles1.png",                  alt: "Time Traveler Charles — half-body cyberpunk portrait with clock goggle display", w: 1920, h: 1080 },
    { src: "/projects/ArtWorks/anirudh-singh-ishmael.jpg",                      alt: "Ishmael — figure clinging to a raft in crashing ocean storm", w: 1280, h: 900 },
    { src: "/projects/ArtWorks/gomory.png",                                     alt: "Gomory — spike-armoured figure with dragon helmet, detailed line art", w: 600, h: 900 },
    { src: "/projects/ArtWorks/anirudh-singh-final-legends-excalation02-1.jpg", alt: "Legends Escalation — detailed creature line art, beast body with elongated humanoid rider", w: 960, h: 960 },
    { src: "/projects/ArtWorks/guitarralexxx.png",                              alt: "Guitarralex — black and white illustration of a musician buried under an avalanche of guitars", w: 700, h: 900 },
    { src: "/projects/ArtWorks/stone fish.png",                                 alt: "Stone Fish — green humanoid fish creature character design", w: 600, h: 900 },
    { src: "/projects/ArtWorks/anirudh-singh-veteran3.jpg",                     alt: "Veteran — character study", w: 1200, h: 900 },
    { src: "/projects/ArtWorks/final-excalation-3column-layout.png",            alt: "Legends Escalation — three-stage sketch process: blue wireframe, orange sketch, final ink", w: 2400, h: 600 },
    { src: "/projects/ArtWorks/char-concept-2.png",                             alt: "Character concept sheet 2", w: 900, h: 1200 },
    { src: "/projects/ArtWorks/char-concept-3.png",                             alt: "Character concept sheet 3", w: 900, h: 1200 },
    { src: "/projects/ArtWorks/char-concept-4.png",                             alt: "Character concept sheet 4", w: 900, h: 1200 },
    { src: "/projects/ArtWorks/char-concept-5.png",                             alt: "Character concept sheet 5", w: 900, h: 1200 },
];

export default function ArtworksPage() {
    return (
        <div className="flex flex-col gap-16 pb-24">

            {/* ── COVER ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-6"
            >
                <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold text-accent-blue uppercase tracking-widest">Illustration · Character Design · Digital Painting</span>
                    <h1 className="text-6xl md:text-[90px] font-bold tracking-tighter leading-none">Artworks</h1>
                </div>
                <p className="max-w-2xl text-base leading-relaxed text-muted">
                    Personal illustration work — character concept, creature design, digital painting, and line art. No client, no brief. Each piece started from an idea that needed to exist somewhere.
                </p>
                <div className="grid grid-cols-3 gap-px border border-border rounded-xl overflow-hidden w-full max-w-lg">
                    {[
                        { label: "Medium", value: "Digital" },
                        { label: "Pieces", value: String(artworks.length) },
                        { label: "Range", value: "2020–2024" },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-1 p-5 bg-background">
                            <span className="text-xs font-sans text-muted uppercase tracking-wider">{item.label}</span>
                            <span className="text-sm font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── MASONRY GALLERY ── */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fade}
                className="columns-2 md:columns-3 gap-3"
            >
                {artworks.map((art, i) => (
                    <motion.div
                        key={art.src}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
                        className="break-inside-avoid mb-3 rounded-xl overflow-hidden border border-border"
                    >
                        <Image
                            src={art.src}
                            alt={art.alt}
                            width={art.w}
                            height={art.h}
                            className="w-full h-auto block"
                            sizes="(max-width: 768px) 50vw, 33vw"
                        />
                    </motion.div>
                ))}
            </motion.div>

        </div>
    );
}
