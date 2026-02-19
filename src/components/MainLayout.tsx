"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import LetsTalkSection from "./LetsTalkSection";
import ScrollReveal from "./ScrollReveal";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <main
            className={`w-full max-w-screen-xl px-6 pb-12 md:pb-20 flex flex-col gap-12 z-10 transition-all ${isHome ? "pt-[calc(12vw+120px)]" : "pt-32"
                }`}
        >
            <Navigation />
            {children}

            {pathname !== "/contact" && (
                <ScrollReveal>
                    <LetsTalkSection />
                </ScrollReveal>
            )}
        </main>
    );
}
