"use client";

import { useRef, useState } from "react";

interface Props {
    children: string;
    className?: string;
    color?: string;
}

export default function SpotlightHeading({ children, className, color = "#FFD600" }: Props) {
    const ref = useRef<HTMLHeadingElement>(null);
    const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    return (
        <h1
            ref={ref}
            className={className}
            onMouseMove={(e) => {
                const rect = ref.current!.getBoundingClientRect();
                setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={hovering ? {
                backgroundImage: `radial-gradient(circle 120px at ${spotlight.x}px ${spotlight.y}px, ${color} 100%, var(--foreground) 100%)`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            } : undefined}
        >
            {children}
        </h1>
    );
}
