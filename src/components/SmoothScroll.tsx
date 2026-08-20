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

        // Self-pausing rAF: only run while scrolling is happening or settling.
        // A permanent loop wakes the main thread every frame even on a static
        // page; here it idles when nothing is moving and wakes on input.
        let rafId: number | null = null;
        let lastActivity = performance.now();
        const IDLE_MS = 200;

        const frame = (time: number) => {
            lenis.raf(time);
            // Keep interpolating while input was recent. While Lenis is easing
            // toward its target it changes scroll position every frame, which
            // fires the events below and keeps `lastActivity` fresh — so the
            // loop stays alive until the scroll fully settles, then stops.
            if (performance.now() - lastActivity < IDLE_MS) {
                rafId = requestAnimationFrame(frame);
            } else {
                rafId = null;
            }
        };

        const wake = () => {
            lastActivity = performance.now();
            if (rafId === null) rafId = requestAnimationFrame(frame);
        };

        window.addEventListener("wheel", wake, { passive: true });
        window.addEventListener("touchstart", wake, { passive: true });
        window.addEventListener("touchmove", wake, { passive: true });
        window.addEventListener("keydown", wake);
        window.addEventListener("scroll", wake, { passive: true });
        window.addEventListener("resize", wake);

        wake(); // run an initial frame to sync

        return () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            window.removeEventListener("wheel", wake);
            window.removeEventListener("touchstart", wake);
            window.removeEventListener("touchmove", wake);
            window.removeEventListener("keydown", wake);
            window.removeEventListener("scroll", wake);
            window.removeEventListener("resize", wake);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
