"use client";

import { motion, useInView, UseInViewOptions } from "framer-motion";
import { useRef } from "react";

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
    duration = 0.5,
    threshold = 0.2, // Trigger when 20% of element is in view
    once = true,
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        amount: threshold,
        once: once
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
                duration: duration,
                delay: delay,
                ease: "easeOut"
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
