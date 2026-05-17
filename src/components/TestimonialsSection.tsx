"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import SectionLabel from "@/components/SectionLabel";

const testimonials = [
    {
        text: "Anirudh was instrumental in building the visual universe for Tales Are Real over two years. From designing character cards for multiple races to developing weapon and support props, his ability to deliver high-quality assets across complex project cycles made him an invaluable asset to our team.",
        author: "Richard Heinrich",
        image: "/images/testimonials/richard.webp",
    },
    {
        text: "Anirudh is exceptionally hardworking and consistently delivered great results across diverse projects—from corporate ads to unique creative themes. He is a versatile collaborator who handles complex deliveries with ease and successfully adapts to any team or challenge.",
        author: "Shikhant Sablania",
        image: "/images/testimonials/shikhant.webp",
    },
    {
        text: "Collaborating with Anirudh on medtech projects was highly productive. He combines strong problem-solving and design thinking skills with a solid understanding of technical architecture, making interdisciplinary work seamless. He is a reliable and highly effective team member.",
        author: "Umme Abiha",
        image: "/images/testimonials/umme.webp",
    },
];



import { useWindowSize } from "@/hooks/useWindowSize";

function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current!.getBoundingClientRect();
        setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
    };

    const handleMouseLeave = () => {
        setSpotlight((s) => ({ ...s, visible: false }));
    };

    return (
        <div
            ref={cardRef}
            className={`relative overflow-hidden ${className ?? ""}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="pointer-events-none absolute inset-0 z-10 rounded-sm transition-opacity duration-300"
                style={{
                    opacity: spotlight.visible ? 1 : 0,
                    background: `radial-gradient(circle 320px at ${spotlight.x}px ${spotlight.y}px, color-mix(in srgb, var(--accent-blue) 14%, transparent), transparent 70%)`,
                }}
            />
            {children}
        </div>
    );
}

export default function TestimonialsSection() {
    const { width } = useWindowSize();
    const isMobile = width < 768;
    
    return (
        <section className="flex flex-col gap-8 overflow-hidden">
            <SectionLabel as="h3">Testimonials</SectionLabel>

            <div className="relative w-full overflow-hidden mask-fade">
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10" />

                <motion.div
                    className="flex w-max"
                    initial={{ x: "0%" }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: isMobile ? 80 : 40,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                >
                    {[...Array(2)].map((_, groupIndex) => (
                        <div key={groupIndex} className="flex gap-8 pr-8 w-max">
                            {[...testimonials, ...testimonials].map((item, index) => (
                                <SpotlightCard
                                    key={index}
                                    className="flex flex-col gap-6 w-[400px] md:w-[500px] flex-shrink-0 p-6 border border-border rounded-sm bg-background"
                                >
                                    <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-full border border-border">
                                        <Image
                                            src={item.image}
                                            alt={item.author}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <p className="text-base leading-relaxed text-foreground">
                                            &ldquo;{item.text}&rdquo;
                                        </p>
                                        <footer className="text-sm font-sans font-medium text-muted">
                                            {item.author}
                                        </footer>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
