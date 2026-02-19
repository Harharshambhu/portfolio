"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundGrid from "./BackgroundGrid";

const MotionLink = motion.create(Link);

// Constants
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
const INTERVAL_DELAY = 30; // ms
const ANIMATION_DURATION = 0.15; // seconds (layout + scramble)

const PHRASE_DEFAULT = "Let's Talk";
const PHRASE_HOVER = "START A PROJECT — GET IN TOUCH — ANIRUDH@SINGH";

export default function LetsTalkSection() {
    const [isHovered, setIsHovered] = useState(false);
    const [displayText, setDisplayText] = useState(PHRASE_DEFAULT);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Scramble effect
    const scramble = useCallback(
        (targetText: string) => {
            if (intervalRef.current) clearInterval(intervalRef.current);

            const totalSteps = Math.ceil((ANIMATION_DURATION * 6500) / INTERVAL_DELAY);
            let step = 0;

            intervalRef.current = setInterval(() => {
                step++;
                const charsToReveal = Math.min(
                    targetText.length,
                    Math.floor((step / totalSteps) * targetText.length)
                );

                const newText = targetText
                    .split("")
                    .map((char, index) => {
                        if (index < charsToReveal) return targetText[index];
                        // Preserve spaces and em-dash
                        if (char === " " || char === "—") return char;
                        return SCRAMBLE_CHARS[
                            Math.floor(Math.random() * SCRAMBLE_CHARS.length)
                        ];
                    })
                    .join("");

                setDisplayText(newText);

                if (step >= totalSteps) {
                    clearInterval(intervalRef.current!);
                    intervalRef.current = null;
                }
            }, INTERVAL_DELAY);
        },
        [] // No dependencies – uses constants only
    );

    // Trigger scramble when hover state changes
    useEffect(() => {
        scramble(isHovered ? PHRASE_HOVER : PHRASE_DEFAULT);
    }, [isHovered, scramble]);

    // Handle keyboard focus for accessibility
    const handleFocus = () => setIsHovered(true);
    const handleBlur = () => setIsHovered(false);

    return (
        <section id="main-footer" className="relative z-0 w-screen ml-[calc(50%-50vw)] mb-[-3rem] md:mb-[-5rem] pt-12 pb-44 border-t border-border mt-12 bg-black text-white overflow-hidden">
            <BackgroundGrid fixed={false} color="transparent" spotlight={true} interaction={false} />

            <div className="max-w-screen-xl mx-auto w-full px-6 flex flex-col gap-28 z-10 relative">
                <div className="flex flex-col gap-4">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
                        Let’s build something immersive.
                    </h2>
                    <a
                        href="mailto:anirudhsingh1441@gmail.com"
                        className="text-xl text-gray-400 hover:text-white transition-colors w-fit"
                    >
                        anirudhsingh1441@gmail.com
                    </a>
                </div>

                {/* Parent container is flex so the button can grow */}
                <div className="flex justify-center w-full z-10">
                    <MotionLink
                        href="/contact"
                        layout
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
                        className="relative inline-flex items-center justify-center px-9 py-4 text-2xl font-mono overflow-hidden"
                        style={{ minWidth: "260px" }}
                        variants={{
                            initial: {
                                flexGrow: 0,
                                borderRadius: "4px",
                                backgroundColor: "#ffffff",
                                color: "#000000",
                            },
                            hover: {
                                flexGrow: 1,
                                borderRadius: "1px",
                                backgroundColor: "#39FF14",
                                color: "#000000",
                            },
                        }}
                        initial="initial"
                        animate={isHovered ? "hover" : "initial"}
                        aria-label="Contact page"
                    >
                        <motion.div
                            layout
                            className={`flex items-center w-full z-10 whitespace-nowrap px-4 ${isHovered ? "justify-between" : "justify-center gap-4"
                                }`}
                        >
                            {/* Text container – also uses layout to animate width */}
                            <div
                                className={`flex w-full ${isHovered ? "justify-between" : "justify-center"
                                    }`}
                            >
                                {displayText.split("").map((char, i) => (
                                    <span
                                        key={`${char}-${i}`} // stable key (char + index) – fine for static text
                                        className="uppercase tracking-tighter font-bold"
                                        // Hide scrambled characters from screen readers while animating
                                        aria-hidden={char !== PHRASE_DEFAULT[i] && char !== PHRASE_HOVER[i]}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </span>
                                ))}
                            </div>

                            {/* Arrow – hidden on hover to give more space */}
                            <AnimatePresence>
                                {!isHovered && (
                                    <motion.span
                                        layout
                                        initial={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0, transition: { duration: 0.1 } }}
                                        className="ml-4"
                                        aria-hidden="true"
                                    >
                                        <ArrowRight className="w-6 h-6 shrink-0" />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </MotionLink>
                </div>
            </div>
        </section>
    );
}