"use client";

import { useRef, useState } from "react";

interface Props {
    children: string;
    className?: string;
    color?: string;
    style?: React.CSSProperties;
}

export default function SpotlightHeading({ children, className, color = "var(--spotlight-primary)", style }: Props) {
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
            style={{
                paddingBottom: "0.2em",
                marginBottom: "-0.2em",
                ...style,
                ...(hovering ? {
                    backgroundImage: `
                        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='10' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.95'/%3E%3C/svg%3E"),
                        radial-gradient(circle 120px at ${spotlight.x}px ${spotlight.y}px, ${color} 70%, var(--foreground) 100%)
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
            {children}
        </h1>
    );
}
