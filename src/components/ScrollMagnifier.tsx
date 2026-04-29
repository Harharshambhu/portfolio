"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ScrollMagnifier({ children, inline = false }: { children: React.ReactNode; inline?: boolean }) {
    const ref = useRef(null);


    /*
    // INACTIVATED: Scroll magnification effect is currently disabled.
    // To reactivate, uncomment this block and remove the fallback return.

    // The offset defines the "margins" above and below.
    // "start 85%" -> begins animating when the top of the element is 15% from the bottom of the screen.
    // "end 15%" -> finishes animating out when the bottom of the element is 15% from the top.
    // At exactly 0.5 (center of this region), the influence is at maximum.
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 70%", "end 43%"]
    });

    // Apply a physics spring to the scroll progress to smooth out the jitter
    // This allows the layout to "catch up" fluidly instead of snapping rigidly to the scroll wheel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map the continuous scroll progress [0 -> 0.5 -> 1] to our target values
    const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.3, 1]);
    const fontWeight = useTransform(smoothProgress, [0, 0.5, 1], [400, 500, 400]);

    // Smoothly adjust width downwards to constrain the scaled text inside bounds.
    // By calculating (100 / scale), the element's layout footprint remains exactly 100%, 
    // guaranteeing it never overflows the left/right margins regardless of the scale factor!
    const widthPercentage = useTransform(scale, (s) => 100 / s);
    const width = useTransform(widthPercentage, (val) => `${val}%`);

    const MotionComponent = inline ? motion.span : motion.div;

    return (
        <MotionComponent
            ref={ref}
            style={{
                scale,
                fontWeight,
                width: inline ? "auto" : width,
                display: inline ? "inline-block" : "block",
                originX: 0,
                originY: 0.5
            }}
        >
            {children}
        </MotionComponent>
    );
    */

    return <>{children}</>;
}
