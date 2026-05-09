"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";

export default function HeroName() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const ref = useRef<HTMLHeadingElement>(null);
    const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 1);
    });

    return (
        <div className="relative inline-block">
            <motion.h1
                ref={ref}
                animate={{
                    fontSize: isScrolled ? "8vw" : "2.125rem", // 34px (H1 size)
                    fontWeight: isScrolled ? 700 : 500,
                    letterSpacing: isScrolled ? "-0.01em" : "-0.025em",
                }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
                className="leading-none relative"
                onMouseMove={isScrolled ? (e) => {
                    const rect = ref.current!.getBoundingClientRect();
                    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                } : undefined}
                onMouseEnter={isScrolled ? () => setHovering(true) : undefined}
                onMouseLeave={isScrolled ? () => setHovering(false) : undefined}
                style={{
                    paddingBottom: "0.2em",
                    marginBottom: "-0.2em",
                    ...(isScrolled && hovering ? {
                        backgroundImage: `
                            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='10' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.95'/%3E%3C/svg%3E"),
                            radial-gradient(circle 120px at ${spotlight.x}px ${spotlight.y}px, var(--spotlight-primary) 70%, var(--foreground) 100%)
                        `,
                        backgroundSize: "150px 150px, 100% 100%",
                        backgroundRepeat: "repeat, no-repeat",
                        backgroundBlendMode: "overlay, normal",
                        WebkitBackgroundClip: "text, text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text, text",
                    } : {})
                }}
            >
                Anirudh
            </motion.h1>
        </div>
    );
}
