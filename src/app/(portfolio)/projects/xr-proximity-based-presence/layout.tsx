import { Lora, Outfit } from "next/font/google";

const lora = Lora({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    style: ["normal", "italic"],
    variable: "--font-lora",
});

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-outfit",
});

export default function XRCaseStudyLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${lora.variable} ${outfit.variable}`}>
            {children}
        </div>
    );
}
