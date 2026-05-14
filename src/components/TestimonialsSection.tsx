"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import SectionLabel from "@/components/SectionLabel";

const testimonials = [
    {
        text: "Anirudh was instrumental in building the visual universe for Takes Are Real over two years. From designing character cards for multiple races to developing weapon and support props, his ability to deliver high-quality assets across complex project cycles made him an invaluable asset to our team.",
        author: "Richard Heinrich",
        image: "/images/testimonials/richard.png",
    },
    {
        text: "Anirudh is exceptionally hardworking and consistently delivered great results across diverse projects—from corporate ads to unique creative themes. He is a versatile collaborator who handles complex deliveries with ease and successfully adapts to any team or challenge.",
        author: "Shikhant Sablania",
        image: "/images/testimonials/shikhant.jpg",
    },
    {
        text: "It was great working with Anirudh — he picks up context fast, asks the right questions, and delivers without needing his hand held. Would work with him again without hesitation.",
        author: "William",
        image: "/images/testimonials/william.jpg",
    },
];



function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current!.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        setSpotlight({ x: px, y: py, visible: true });
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        setTilt({
            x: ((py - cy) / cy) * -6,
            y: ((px - cx) / cx) * 6,
        });
    };

    const handleMouseLeave = () => {
        setSpotlight((s) => ({ ...s, visible: false }));
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div
            ref={cardRef}
            className={`relative overflow-hidden ${className ?? ""}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: tilt.x === 0 ? "transform 0.5s ease" : "transform 0.1s ease",
            }}
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
                        duration: 40,
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
                                    className="flex flex-col gap-6 w-[400px] md:w-[500px] flex-shrink-0 p-6 border border-border rounded-sm bg-background/50 backdrop-blur-sm"
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
                                            — {item.author}
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
