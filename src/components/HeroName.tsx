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
                    fontSize: isScrolled ? "8vw" : "2.25rem",
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
                style={isScrolled && hovering ? {
                    backgroundImage: `radial-gradient(circle 120px at ${spotlight.x}px ${spotlight.y}px, #FFD600 100%, var(--foreground) 100%)`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                } : undefined}
            >
                Anirudh
            </motion.h1>
        </div>
    );
}
