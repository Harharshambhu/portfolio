"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css"; // Include lenis basic CSS if needed, though mostly empty

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.07, // Heavy dampening/inertia (similar to weareyellow)
            wheelMultiplier: 1,
            smoothWheel: true,
            syncTouch: true,
            touchMultiplier: 1.2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
