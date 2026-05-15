"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
];

export default function Navigation() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const isHome = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(!isHome);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (isHome) {
            setIsScrolled(latest > 1);
        }
    });

    // Reset or force state on path change
    useEffect(() => {
        if (!isHome) {
            setIsScrolled(true);
        } else {
            setIsScrolled(scrollY.get() > 1);
        }
    }, [pathname, isHome, scrollY]);

    const [displayText, setDisplayText] = useState("Hello.");
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const scramble = (finalText: string) => {
        let iterations = 0;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

        if (intervalRef.current) clearInterval(intervalRef.current);

        const id = setInterval(() => {
            setDisplayText(prev =>
                finalText.split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return finalText[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iterations >= finalText.length) {
                clearInterval(id);
            }

            iterations += 1 / 2; // Speed of decoding
        }, 30);
        intervalRef.current = id;
    };

    const { width } = useWindowSize();
    const isMobile = width < 768;

    // Calculate exact pixel sizes to prevent Framer Motion unit-mixing snaps
    const compactSize = 16; // 1rem

    // Unhovered (Giant) state: Cap at sizes that fit on the screen
    const mobileUnhoveredSize = Math.min(width * 0.28, 150); // 22vw max 70px (to fit "Singh." on 375px screens)
    const desktopUnhoveredSize = Math.min(width * 0.11, 200); // 11vw max 200px
    const enlargedUnhoveredSize = isMobile ? mobileUnhoveredSize : desktopUnhoveredSize;

    // Hovered (Shrunk) state: 
    const mobileHoveredSize = Math.min(width * 0.15, 60); // 15vw max 60px
    const desktopHoveredSize = Math.min(width * 0.08, 120); // 8vw max 120px
    const enlargedHoveredSize = isMobile ? mobileHoveredSize : desktopHoveredSize;

    const targetFontSize = isScrolled ? compactSize : (isHovered ? enlargedHoveredSize : enlargedUnhoveredSize);

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
        <motion.nav
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                paddingBottom: isScrolled ? 16 : 0
            }}
            transition={{
                paddingBottom: { type: "spring", stiffness: 100, damping: 20 },
                default: { duration: 0.2, ease: "easeOut" }
            }}
            className={`flex flex-col w-full max-w-screen-xl mx-auto items-center pt-10 md:pt-8 bg-background px-8 md:px-6 border-b-2 border-muted`}
        >
            <div className="flex w-full items-start justify-between">
                <motion.div
                    className="flex gap-3 md:gap-6 -translate-y-2"
                    transition={{ duration: 0 }}
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`hover:text-foreground transition-colors text-sm font-semibold ${pathname === link.href ? "text-foreground" : "text-muted"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </motion.div>

                {/* Placeholder to keep layout stable when Singh moves */}
                {isScrolled && <div className="w-[45px]" />}
            </div>

            <motion.div
                animate={{
                    marginTop: isScrolled ? -24 : 24,
                    marginBottom: isScrolled ? 0 : 32
                }}
                className={`flex w-full justify-end cursor-pointer`}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                onMouseEnter={() => {
                    if (!isHovered) {
                        setIsHovered(true);
                        scramble("Sokimevi");
                    }
                }}
                onMouseLeave={() => {
                    if (isHovered) {
                        setIsHovered(false);
                        scramble("Hello.");
                    }
                }}
            >
                <Link href="/" className={`block ${!isScrolled ? "no-cursor-interaction" : ""}`}>
                    <motion.span
                        animate={{
                            fontSize: targetFontSize,
                            fontWeight: isScrolled ? 600 : 700,
                            letterSpacing: isScrolled ? "0em" : (isHovered ? (isMobile ? "0.15em" : "0.35em") : "-0.05em"),
                            color: isHovered ? "var(--accent-blue)" : "var(--foreground)"
                        }}
                        transition={{
                            type: "spring", stiffness: 60, damping: 14, mass: 1
                        }}
                        className={`leading-none block text-right font-sans pb-2`}
                    >
                        {displayText}
                    </motion.span>
                </Link>
            </motion.div>
        </motion.nav>
        </div>
    );
}
