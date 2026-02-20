"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
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

    const [displayText, setDisplayText] = useState("Singh.");
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

    return (
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
            className={`flex flex-col w-full max-w-screen-xl items-center pt-8 mb-12 bg-background z-50 fixed top-0 left-1/2 -translate-x-1/2 px-6 border-b-2 border-[#525252]`}
        >
            <div className="flex w-full items-start justify-between">
                <motion.div
                    className="flex gap-6 -translate-y-2"
                    transition={{ duration: 0 }}
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`hover:text-foreground transition-colors text-sm font-medium ${pathname === link.href ? "text-foreground" : "text-muted"
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
                        scramble("Singh.");
                    }
                }}
            >
                <Link href="/" className={`block ${!isScrolled ? "no-cursor-interaction" : ""}`}>
                    <motion.span
                        animate={{
                            fontSize: isScrolled ? "0.875rem" : (isHovered ? "8vw" : "12vw"),
                            fontWeight: isScrolled ? 600 : (isHovered ? 700 : 700),
                            letterSpacing: isScrolled ? "0em" : (isHovered ? "0.35em" : "-0.05em"),
                            color: isHovered ? "#1F51FF" : "var(--foreground)"
                        }}
                        className={`leading-none block text-right transition-all duration-300`}
                    >
                        {displayText}
                    </motion.span>
                </Link>
            </motion.div>
        </motion.nav>
    );
}
