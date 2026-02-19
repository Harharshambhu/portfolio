"use client";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";
import { prefix } from "@/utils/prefix";

export default function HeroImage() {
    const [isHovered, setIsHovered] = useState(false);

    const textRotation = useMotionValue(0);
    const imageRotation = useMotionValue(0);

    // Speeds in degrees per ms
    const textSpeedRef = useRef(360 / 10000); // 10s default
    const imageSpeedRef = useRef(360 / 3000); // 3s default

    useAnimationFrame((time, delta) => {
        const targetTextSpeed = isHovered ? (360 / 20000) : (360 / 10000);
        const targetImageSpeed = isHovered ? (360 / 15000) : (360 / 3000);

        // Lerp factor for smooth speed change
        const lerpFactor = 0.05;

        textSpeedRef.current += (targetTextSpeed - textSpeedRef.current) * lerpFactor;
        imageSpeedRef.current += (targetImageSpeed - imageSpeedRef.current) * lerpFactor;

        textRotation.set(textRotation.get() + textSpeedRef.current * delta);
        imageRotation.set(imageRotation.get() - imageSpeedRef.current * delta);
    });

    return (
        <div
            className="relative flex items-center justify-center w-[300px] h-[300px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="absolute inset-0 z-0"
                style={{ rotate: textRotation }}
            >
                <svg viewBox="0 0 300 300" className="w-full h-full">
                    <defs>
                        <path
                            id="circlePath"
                            d="M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
                        />
                    </defs>
                    <text className="fill-current text-foreground text-[19px] font-medium font-mono uppercase tracking-normal">
                        <textPath href="#circlePath">
                            Priorty dream create and breathe product * Live on Open source *
                        </textPath>
                    </text>
                </svg>
            </motion.div>

            <motion.div
                className="relative z-10"
                style={{ rotate: imageRotation }}
            >
                <Image
                    src={prefix("/images/hero.png")}
                    alt="Anirudh Singh"
                    width={120}
                    height={160}
                    className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 object-cover w-full h-auto max-w-[120px]"
                    priority
                />
            </motion.div>
        </div>
    );
}
