"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Menu, X } from "lucide-react";

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (isHome) {
            setIsScrolled(latest > 1);
        }
    });

    // Force scroll to top when navigating to a new page
    useEffect(() => {
        window.scrollTo(0, 0);
        setIsSidebarOpen(false); // Close sidebar on navigation
    }, [pathname]);

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
        <>
        <div className="fixed top-0 left-0 right-0 z-50">
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    paddingTop: isScrolled ? (isMobile ? 24 : 32) : (isMobile ? 40 : 32),
                    paddingBottom: isScrolled ? (isMobile ? 16 : 16) : 0
                }}
                transition={{
                    paddingTop: { type: "spring", stiffness: 100, damping: 20 },
                    paddingBottom: { type: "spring", stiffness: 100, damping: 20 },
                    default: { duration: 0.2, ease: "easeOut" }
                }}
                className={`flex flex-col w-full max-w-screen-xl mx-auto items-center bg-background px-6 md:px-6 border-b-2 border-muted`}
            >
                <div className="flex w-full items-start justify-between">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {(!isMobile || !isScrolled) ? (
                            <motion.div
                                key="links"
                                initial={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                                animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
                                exit={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="flex flex-nowrap gap-3 md:gap-10 -translate-y-2 overflow-hidden items-center"
                            >
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`hover:text-foreground transition-colors text-sm font-semibold whitespace-nowrap ${pathname === link.href ? "text-foreground" : "text-muted"}`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.button
                                key="hamburger"
                                initial={{ opacity: 0, width: 0, scale: 0.8 }}
                                animate={{ opacity: 1, width: "auto", scale: 1 }}
                                exit={{ opacity: 0, width: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 -mt-3 -ml-3 text-foreground hover:bg-muted/20 rounded-md transition-colors overflow-hidden flex items-center justify-center"
                            >
                                <Menu size={24} className="shrink-0" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Placeholder to keep layout stable when Singh moves */}
                    {isScrolled && <div className="w-[45px]" />}
                </div>

                <motion.div
                    animate={{
                        marginTop: isScrolled ? (isMobile ? -28 : -24) : 24,
                        marginBottom: isScrolled ? 0 : 32
                    }}
                    className={`flex w-full justify-end pointer-events-none`}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                    <Link 
                        href="/" 
                        className={`block pointer-events-auto cursor-pointer ${!isScrolled ? "no-cursor-interaction" : ""}`}
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

        {/* Mobile Sidebar */}
        <AnimatePresence>
            {isMobile && isSidebarOpen && (
                <>
                    <motion.div
                        key="sidebar-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[90] md:hidden"
                    />
                    <motion.div
                        key="sidebar-menu"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 w-[70vw] max-w-sm bg-background border-r border-muted z-[100] md:hidden shadow-2xl flex flex-col"
                    >
                        <button 
                            onClick={() => setIsSidebarOpen(false)} 
                            className="absolute top-4 right-4 p-2 text-foreground hover:bg-muted/20 rounded-md transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <div className="flex flex-col items-start gap-6 px-6 pt-12 text-lg font-sans font-semibold tracking-tight">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`transition-colors ${pathname === link.href ? "" : "text-muted hover:text-foreground"}`}
                                    style={pathname === link.href ? { color: "var(--accent-blue)" } : {}}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
        </>
    );
}
