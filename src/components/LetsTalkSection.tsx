"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundGrid from "./BackgroundGrid";
import { useWindowSize } from "@/hooks/useWindowSize";

const MotionLink = motion.create(Link);

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
const INTERVAL_DELAY = 40;
const ANIMATION_DURATION = 0.1;

const PHRASE_DEFAULT = "Let's Talk";
const PHRASE_HOVER = "START A PROJECT — GET IN TOUCH — ANIRUDH@SINGH";

export default function LetsTalkSection() {
    const { width } = useWindowSize();
    const isMobile = width < 768;
    const router = useRouter();

    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [displayText, setDisplayText] = useState(PHRASE_DEFAULT);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const scramble = useCallback((targetText: string) => {
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
                    if (char === " " || char === "—") return char;
                    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                })
                .join("");

            setDisplayText(newText);

            if (step >= totalSteps) {
                clearInterval(intervalRef.current!);
                intervalRef.current = null;
            }
        }, INTERVAL_DELAY);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            scramble(isHovered ? PHRASE_HOVER : PHRASE_DEFAULT);
        } else {
            setDisplayText(PHRASE_DEFAULT);
        }
    }, [isHovered, scramble, isMobile]);

    const handleFocus = () => setIsHovered(true);
    const handleBlur = () => setIsHovered(false);

    const handleClick = (e: React.MouseEvent) => {
        if (isMobile) {
            e.preventDefault();
            setIsClicked(true);
            setTimeout(() => {
                router.push("/contact");
            }, 400);
        }
    };

    return (
        <section id="main-footer" className="relative w-screen ml-[calc(50%-50vw)] mb-[-3rem] md:mb-[-5rem] pt-12 pb-44 border-t border-border mt-12 bg-black text-white overflow-hidden z-10">
            <BackgroundGrid fixed={false} color="transparent" spotlight={true} interaction={false} />

            <div className="max-w-screen-xl mx-auto w-full px-6 flex flex-col gap-28 z-20 relative">
                <div className="flex flex-col gap-4">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
                        Let&apos;s build something immersive.
                    </h2>
                    <a
                        href="mailto:anirudhsingh1441@gmail.com"
                        className="text-xl text-gray-400 hover:text-white transition-colors w-fit"
                    >
                        anirudhsingh1441@gmail.com
                    </a>
                    <a
                        href="/resume"
                        className="text-lg underline underline-offset-4 text-gray-400 hover:text-white transition-colors w-fit"
                    >
                        View resume <span className="no-underline">-&gt;</span>
                    </a>
                </div>

                <div
                    className="flex justify-center w-full z-20"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <MotionLink
                        href="/contact"
                        onClick={handleClick}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
                        className={`relative inline-flex items-center justify-center px-9 py-4 text-2xl font-sans ${isClicked ? "overflow-visible max-w-none" : "overflow-hidden"}`}
                        variants={{
                            initial: {
                                width: "260px",
                                borderRadius: "4px",
                                backgroundColor: "var(--background)",
                                color: "var(--foreground)",
                            },
                            hover: {
                                width: "100%",
                                borderRadius: "1px",
                                backgroundColor: "var(--accent-neon)",
                                color: "rgba(10,10,10,1)",
                            },
                            clicked: {
                                width: ["260px", "100vw", "100vw"],
                                borderRadius: ["4px", "0px", "0px"],
                                backgroundColor: "var(--accent-neon)",
                                color: "var(--background)",
                                transition: { duration: 0.4, times: [0, 0.5, 1], ease: "easeInOut" }
                            }
                        }}
                        initial="initial"
                        animate={isClicked ? "clicked" : (isHovered && !isMobile ? "hover" : "initial")}
                        aria-label="Contact page"
                    >
                        {isClicked && (
                            <motion.div
                                className="absolute top-1/2 left-1/2 bg-accent-neon z-[-1]"
                                initial={{ width: "100%", height: "100%" }}
                                animate={{
                                    width: ["100%", "200vw", "200vw"],
                                    height: ["100%", "100%", "1500px"],
                                }}
                                transition={{ duration: 0.4, times: [0, 0.5, 1], ease: "easeInOut" }}
                                style={{ x: "-50%", y: "-50%" }}
                            />
                        )}

                        <div
                            className={`flex items-center w-full z-10 whitespace-nowrap px-4 ${isHovered && !isMobile || isClicked ? "justify-between" : "justify-center gap-4"}`}
                        >
                            <div className={`flex w-full ${isHovered && !isMobile || isClicked ? "justify-between" : "justify-center"}`}>
                                {displayText.split("").map((char, i) => (
                                    <span
                                        key={i}
                                        className="uppercase tracking-tighter font-bold"
                                        aria-hidden={char !== PHRASE_DEFAULT[i] && char !== PHRASE_HOVER[i]}
                                    >
                                        {char === " " ? " " : char}
                                    </span>
                                ))}
                            </div>

                            <AnimatePresence>
                                {(!isHovered || isMobile) && !isClicked && (
                                    <motion.span
                                        initial={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0, transition: { duration: 0.1 } }}
                                        className="ml-4"
                                        aria-hidden="true"
                                    >
                                        <ArrowRight className="w-6 h-6 shrink-0" />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </MotionLink>
                </div>
            </div>
        </section>
    );
}
