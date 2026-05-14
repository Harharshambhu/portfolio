"use client";

import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

const QUOTES = [
    "Designing for privacy means designing against your own product's incentives. Most teams never get that far.",
    "The most important design question isn't 'can we collect this?' It's 'should we?' Most rooms never ask it.",
    "Dark patterns aren't a design failure. They're what happens when nobody in the room is actually representing the user.",
    "Data doesn't lie. But the design built around it often does.",
    "A system that doesn't account for people doesn't stay neutral. It starts breaking them.",
    "I'm a researcher who builds. The making only starts once I understand what's actually being asked.",
    "Trends are a brief. I design for what remains after the trend that created the project has moved on.",
    "Design is infrastructure. The best of it is invisible — you only notice it when it's gone.",
];

export default function CircularGrid({ projects }: { projects: Project[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [isCenterHovered, setIsCenterHovered] = useState(false);
    const [quoteIdx, setQuoteIdx] = useState(0);

    // High-damping spring for "immediate" feel
    const rotationValue = useMotionValue(0);
    const smoothRotation = useSpring(rotationValue, { stiffness: 60, damping: 30, mass: 1 });

    const points = projects.length || 5;
    const outerRadius = 320;
    const innerRadius = 150;
    const centerX = 500;
    const centerY = 500;
    const gapAngle = 4;

    useEffect(() => {
        let lastTime = performance.now();
        let currentRotation = 0;
        let currentVelocity = 0.4; // Slow base speed
        let lastMouseAngle = 0;
        let mouseAngularVelocity = 0;
        let isInside = false;

        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            // Spin much slower on scroll
            currentVelocity += Math.abs(e.deltaY) * 0.05;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;

            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            mouseAngularVelocity = angle - lastMouseAngle;
            if (mouseAngularVelocity > 180) mouseAngularVelocity -= 360;
            if (mouseAngularVelocity < -180) mouseAngularVelocity += 360;
            lastMouseAngle = angle;
        };

        const handleMouseEnter = () => {
            isInside = true;
        };

        const handleMouseLeave = () => {
            // Apply snap-away velocity
            currentVelocity += mouseAngularVelocity * 1.5;
            isInside = false;
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        const animate = (time: number) => {
            const dt = (time - lastTime) / 1000;
            lastTime = time;

            if (isInside) {
                // Immediate slowdown to a very slow drift
                const targetSlowSpeed = 0.01;
                currentVelocity += (targetSlowSpeed - currentVelocity) * 0.15; // Aggressive braking
            } else {
                // Natural decay back to atmospheric drift
                const ambientSpeed = 0.9;
                currentVelocity += (ambientSpeed - currentVelocity) * 0.02;
            }

            // Safety cap
            currentVelocity = Math.min(Math.max(currentVelocity, -200), 200);

            currentRotation += currentVelocity * dt * 10;
            rotationValue.set(currentRotation);

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener('wheel', handleWheel);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animId);
        };
    }, [rotationValue]);

    useEffect(() => {
        const id = setInterval(() => {
            setQuoteIdx(i => (i + 1) % QUOTES.length);
        }, 5000);
        return () => clearInterval(id);
    }, []);

    const polarToCartesian = (radius: number, angleInDegrees: number) => {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        };
    };

    const describeArc = (radius: number, startAngle: number, endAngle: number) => {
        const start = polarToCartesian(radius, endAngle);
        const end = polarToCartesian(radius, startAngle);
        const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ");
    };

    const expansionAngle = 25;
    const totalGap = points * gapAngle;
    const availableAngle = 360 - totalGap;
    const baseAngle = availableAngle / points;

    const getSegmentMetrics = () => {
        const angles: { start: number; end: number; mid: number }[] = [];
        let currentStart = 0;

        for (let i = 0; i < points; i++) {
            let angle;
            if (hoveredIdx === null) {
                angle = baseAngle;
            } else if (hoveredIdx === i) {
                angle = baseAngle + expansionAngle;
            } else {
                angle = (availableAngle - (baseAngle + expansionAngle)) / (points - 1);
            }

            const start = currentStart + gapAngle / 2;
            const end = start + angle;
            const mid = start + angle / 2;

            angles.push({ start, end, mid });
            currentStart += angle + gapAngle;
        }
        return angles;
    };

    const segments = getSegmentMetrics();

    return (
        <div
            ref={containerRef}
            className="flex justify-center items-center py-0 overflow-visible relative group"
        >
            <motion.svg
                width="1000" height="840" viewBox="0 80 1000 840"
                className="overflow-visible relative z-10 -translate-x-50"
                style={{ rotate: smoothRotation }}
            >
                {/* Central Hit Area */}
                <circle
                    cx={centerX} cy={centerY} r={innerRadius}
                    fill="transparent"
                    className="cursor-pointer pointer-events-auto"
                    onMouseEnter={() => setIsCenterHovered(true)}
                    onMouseLeave={() => setIsCenterHovered(false)}
                />

                <defs>
                    {segments.map((metric, i) => {
                        const isHovered = hoveredIdx === i;
                        const effectiveOuterRadius = isHovered ? outerRadius + 50 : outerRadius;
                        const p1Inner = polarToCartesian(innerRadius, metric.start);
                        const p2Inner = polarToCartesian(innerRadius, metric.end);
                        const p1Outer = polarToCartesian(effectiveOuterRadius, metric.start);
                        const p2Outer = polarToCartesian(effectiveOuterRadius, metric.end);

                        const sectorPath = [
                            "M", p1Inner.x, p1Inner.y,
                            "A", innerRadius, innerRadius, 0, 0, 1, p2Inner.x, p2Inner.y,
                            "L", p2Outer.x, p2Outer.y,
                            "A", effectiveOuterRadius, effectiveOuterRadius, 0, 0, 0, p1Outer.x, p1Outer.y,
                            "Z"
                        ].join(" ");

                        return (
                            <clipPath id={`clip-${i}`} key={i}>
                                <motion.path
                                    animate={{ d: sectorPath }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                />
                            </clipPath>
                        );
                    })}
                </defs>

                {segments.map((metric, i) => {
                    const project = projects[i];
                    const isHovered = hoveredIdx === i;
                    const effectiveOuterRadius = isHovered ? outerRadius + 50 : outerRadius;

                    const outerArc = describeArc(effectiveOuterRadius, metric.start, metric.end);
                    const innerArc = describeArc(innerRadius, metric.start, metric.end);

                    const p1Inner = polarToCartesian(innerRadius, metric.start);
                    const p1Outer = polarToCartesian(effectiveOuterRadius, metric.start);
                    const p2Inner = polarToCartesian(innerRadius, metric.end);
                    const p2Outer = polarToCartesian(effectiveOuterRadius, metric.end);
                    const pNode = polarToCartesian(effectiveOuterRadius, metric.mid);

                    const contentRadius = (innerRadius + effectiveOuterRadius) / 2;
                    const pContent = polarToCartesian(contentRadius, metric.mid);

                    const hitAreaRadius = outerRadius + 20;
                    const hitAreaPath = [
                        "M", polarToCartesian(innerRadius - 40, metric.start).x, polarToCartesian(innerRadius - 40, metric.start).y,
                        "A", innerRadius - 40, innerRadius - 40, 0, 0, 1, polarToCartesian(innerRadius - 40, metric.end).x, polarToCartesian(innerRadius - 40, metric.end).y,
                        "L", polarToCartesian(hitAreaRadius, metric.end).x, polarToCartesian(hitAreaRadius, metric.end).y,
                        "A", hitAreaRadius, hitAreaRadius, 0, 0, 0, polarToCartesian(hitAreaRadius, metric.start).x, polarToCartesian(hitAreaRadius, metric.start).y,
                        "Z"
                    ].join(" ");

                    return (
                        <Link key={i} href={project?.href || "#"} className="no-cursor-interaction">
                            <motion.g
                                onMouseEnter={() => setHoveredIdx(i)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                className="cursor-pointer"
                            >
                                <path d={hitAreaPath} fill="transparent" />

                                <g clipPath={`url(#clip-${i})`}>
                                    <foreignObject
                                        x={0} y={0} width="1000" height="1000"
                                        className="pointer-events-none"
                                    >
                                        <div className="w-full h-full relative">
                                            {project?.circularThumbnail && (
                                                <motion.div
                                                    className="absolute w-[800px] h-[800px]"
                                                    initial={false}
                                                    animate={{
                                                        left: pContent.x - 400,
                                                        top: pContent.y - 400,
                                                        rotate: metric.mid,
                                                        scale: isHovered ? 1.2 : 1,
                                                        opacity: isHovered ? 1 : 0.95
                                                    }}
                                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                                >
                                                    <Image
                                                        src={project.circularThumbnail}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover"
                                                        priority
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    </foreignObject>
                                </g>

                                <motion.path
                                    animate={{ d: outerArc }}
                                    fill="none"
                                    stroke="var(--foreground)"
                                    strokeWidth="2"
                                    opacity={0.4}
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                />
                                <motion.path
                                    animate={{ d: innerArc }}
                                    fill="none"
                                    stroke="var(--foreground)"
                                    strokeWidth="1.5"
                                    opacity={0.3}
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                />
                                <motion.line
                                    animate={{
                                        x1: p1Inner.x, y1: p1Inner.y,
                                        x2: p1Outer.x, y2: p1Outer.y
                                    }}
                                    stroke="var(--foreground)" strokeWidth="1.5"
                                    opacity={0.2}
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                />
                                <motion.line
                                    animate={{
                                        x1: p2Inner.x, y1: p2Inner.y,
                                        x2: p2Outer.x, y2: p2Outer.y
                                    }}
                                    stroke="var(--foreground)" strokeWidth="1.5"
                                    opacity={0.2}
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                />

                                <motion.circle
                                    animate={{ cx: pNode.x, cy: pNode.y }}
                                    r={3}
                                    fill="var(--accent-blue)"
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                />
                            </motion.g>
                        </Link>
                    );
                })}

                <motion.circle
                    cx={centerX}
                    cy={centerY}
                    r={3}
                    fill="var(--foreground)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.1 }}
                    viewport={{ once: true }}
                />
            </motion.svg>

            {/* Central Title Display */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 -translate-x-50">
                <div
                    className="flex flex-col items-center justify-center text-center p-4 relative"
                    style={{
                        width: innerRadius * 1.8,
                        height: innerRadius * 1.8
                    }}
                >
                    <motion.div
                        initial={false}
                        animate={{
                            scale: isCenterHovered ? 1 : 0.8,
                            opacity: isCenterHovered ? 0.15 : 0
                        }}
                        className="absolute inset-0 rounded-full bg-blue-500 blur-3xl"
                    />

                    <AnimatePresence mode="wait">
                        {hoveredIdx !== null ? (
                            <motion.div
                                key={`project-${hoveredIdx}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.1 }}
                                className="flex flex-col items-center z-10"
                            >
                                <span className="text-[12px] font-bold tracking-widest uppercase text-muted/60 mb-3">
                                    {projects[hoveredIdx]?.category}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold uppercase leading-none tracking-tighter text-foreground">
                                    {projects[hoveredIdx]?.title}
                                </h2>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="default"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isCenterHovered ? 1 : 0.5 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.1 }}
                                className="flex flex-col items-center z-10"
                            >
                                <h2 className="text-3xl md:text-5xl font-black tracking-[0.05em] uppercase text-foreground">
                                    MY PROJECTS
                                </h2>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Quotes — top right */}
            <div className="absolute right-0 top-[8%] flex flex-col items-end text-right w-[400px] pointer-events-none z-20 gap-4">
                <div className="w-10 h-px bg-foreground/70" />
                <AnimatePresence mode="wait">
                    <motion.p
                        key={quoteIdx}
                        className="quote-text !text-2xl text-muted/60"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        &ldquo;{QUOTES[quoteIdx]}&rdquo;
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Hint label — independently pinned */}
            <p className="quote-text absolute right-0 top-[45%] !text-[1.5rem] tracking-widest text-muted/40 flex items-center gap-2 pointer-events-none z-70">
                <span>&#8592;</span> Hover to see Project Details
            </p>

            {/* Project summary — independently pinned below hint */}
            <div className="absolute right-0 top-[57%] w-[400px] flex flex-col items-end text-right pointer-events-none z-20">
                <AnimatePresence mode="wait">
                    {hoveredIdx !== null && (
                        <motion.p
                            key={hoveredIdx}
                            className="project-summary-text text-muted/90"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            {projects[hoveredIdx]?.description}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
