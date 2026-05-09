"use client";
import Image from "next/image";
import { prefix } from "@/utils/prefix";

export default function HeroImage() {
    // === BASIC CONTROLS ===
    // Edit these Tailwind classes to adjust the size, position, and padding of the profile photo
    const framePadding = "p-2 md:p-1"; // Padding between the image and the border
    const imageWidth = "w-48 md:w-56"; // Width of the image
    const imageHeight = "h-56 md:h-64"; // Height of the image
    const positionX = "translate-x-4"; // Horizontal offset (e.g. translate-x-4, -translate-x-8)
    const positionY = "translate-y-1"; // Vertical offset (e.g. -translate-y-4, translate-y-8)
    const frameRadius = "rounded-[4px]"; // Outer frame border radius (e.g. rounded-[5px], rounded-[24px])
    const imageRadius = "rounded-[2px]"; // Inner image border radius (e.g. rounded-[5px], rounded-[16px])
    // ======================

    return (
        <div className={`relative flex items-center justify-center ${positionX} ${positionY}`}>
            <div
                className={`relative z-10 ${framePadding} ${frameRadius} border border-border bg-background/50 backdrop-blur-sm shadow-sm`}
            >
                <div className={`relative ${imageWidth} ${imageHeight} ${imageRadius} overflow-hidden`}>
                    <Image
                        src={prefix("/images/HeroProfile.webp")}
                        alt="Anirudh Singh"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
