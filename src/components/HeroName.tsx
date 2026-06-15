"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function HeroName() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const ref = useRef<HTMLHeadingElement>(null);
    const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 1);
    });

    const { width } = useWindowSize();
    const isMobile = width < 768;

    // Calculate exact pixel sizes to prevent Framer Motion unit-mixing snaps
    const compactSize = 34; // 2.125rem

    const mobileEnlargedSize = Math.min(width * 0.24, 120); // 24vw max 120px
    const desktopEnlargedSize = Math.min(width * 0.08, 160); // 8vw max 160px
    const enlargedSize = isMobile ? mobileEnlargedSize : desktopEnlargedSize;

    const targetFontSize = isScrolled ? enlargedSize : compactSize;

    return (
        <div className="relative inline-block">
            <motion.h1
                ref={ref}
                initial={false}
                animate={{
                    fontSize: targetFontSize,
                    fontWeight: isScrolled ? 700 : 500,
                    letterSpacing: isScrolled ? "-0.01em" : "-0.025em",
                }}
                transition={{
                    type: "spring", stiffness: 60, damping: 14, mass: 1
                }}
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
                        backgroundImage: `radial-gradient(circle 120px at ${spotlight.x}px ${spotlight.y}px, var(--accent-blue) 70%, var(--foreground) 100%)`,
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    } : {})
                }}
            >
                Anirudh
            </motion.h1>
        </div>
    );
}
