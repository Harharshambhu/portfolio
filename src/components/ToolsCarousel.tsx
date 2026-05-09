"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { prefix } from "@/utils/prefix";

const tools = [
    "/Tools/Monado_logo.svg",
    "/Tools/adobe-illustrator-icon.svg",
    "/Tools/adobe-photoshop-icon.svg",
    "/Tools/adobe-substance-3d-designer-icon.svg",
    "/Tools/adobe-substance-3d-painter-icon.svg",
    "/Tools/antigravity-color.svg",
    "/Tools/blender-icon.svg",
    "/Tools/claude-ai-icon.svg",
    "/Tools/figma-icon.svg",
    "/Tools/milanote.svg",
    "/Tools/notion-icon.svg",
    "/Tools/unity-game-engine-icon.svg",
    "/Tools/zbrush-icon.svg"
];



export default function ToolsCarousel() {
    const marqueeAnimation = {
        initial: { x: "-50%" },
        animate: { x: "0%" },
        transition: {
            duration: 40,
            ease: "linear" as const,
            repeat: Infinity,
            repeatType: "loop" as const,
        }
    };

    const renderIconGroup = () => (
        <div className="flex gap-16 md:gap-24 pr-16 md:pr-24 w-max items-center">
            {[...tools, ...tools].map((src, index) => (
                <div key={index} className="flex-shrink-0">
                    <Image
                        src={prefix(src)}
                        alt="Tool Icon"
                        width={64}
                        height={64}
                        className="object-contain w-auto h-12 md:h-16"
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div className="relative w-full overflow-hidden py-8 border-y border-border pointer-events-none">
            <div className="relative flex items-center">
                {/* Base Layer: Grayscale and low opacity on the sides */}
                <div className="w-full opacity-30 grayscale">
                    <motion.div
                        className="flex w-max"
                        {...marqueeAnimation}
                    >
                        {renderIconGroup()}
                        {renderIconGroup()}
                    </motion.div>
                </div>

                {/* Top Layer: Colorful and full opacity, smoothly masked to only show in the center */}
                <div
                    className="absolute inset-0"
                    style={{
                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 10%, black 25%, black 75%, transparent 90%, transparent 100%)",
                        maskImage: "linear-gradient(to right, transparent 0%, transparent 10%, black 25%, black 75%, transparent 90%, transparent 100%)",
                    }}
                >
                    <motion.div
                        className="flex w-max"
                        {...marqueeAnimation}
                    >
                        {renderIconGroup()}
                        {renderIconGroup()}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
