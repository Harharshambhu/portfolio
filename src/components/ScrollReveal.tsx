"use client";

import { motion } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
}

export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    duration = 0.6,
    threshold = 0.2,
    once = true,
}: ScrollRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1]
            }}
            style={{ willChange: "transform, opacity" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
