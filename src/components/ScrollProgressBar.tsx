"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
    const fillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const update = () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const progress = total > 0 ? scrolled / total : 0;
            if (fillRef.current) {
                fillRef.current.style.transform = `scaleY(${progress})`;
            }
        };

        window.addEventListener("scroll", update, { passive: true });
        update();
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <div
            className="fixed right-6 top-0 h-full z-50 hidden md:flex items-center"
            aria-hidden="true"
        >
            <div className="relative h-[60vh] w-px bg-border">
                <div
                    ref={fillRef}
                    className="absolute top-0 left-0 w-full h-full bg-foreground origin-top"
                    style={{ transform: "scaleY(0)" }}
                />
            </div>
        </div>
    );
}
