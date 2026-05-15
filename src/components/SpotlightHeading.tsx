"use client";

import { useRef, useState, useEffect } from "react";

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
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth <= 768);
        }
    }, []);
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
                ...(hovering && !isMobile ? {
                    backgroundImage: `radial-gradient(circle 120px at ${spotlight.x}px ${spotlight.y}px, ${color} 70%, var(--foreground) 100%)`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                } : {})
            }}
        >
            {children}
        </h1>
    );
}
