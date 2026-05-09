import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import BackgroundGrid from "@/components/BackgroundGrid";
import TargetCursor from "@/components/TargetCursor";
import SmoothScroll from "@/components/SmoothScroll";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const merriweather = Merriweather({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Anirudh Singh | Portfolio",
  description: "Product & XR Designer | M.Des at IIT Jodhpur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${merriweather.variable} antialiased min-h-screen flex flex-col items-center bg-background text-foreground relative`}
      >
        <SmoothScroll>
          <TargetCursor />
          <BackgroundGrid />

          {/* Left mask */}
          <div className="fixed top-0 left-0 h-full bg-background z-0 hidden min-[1330px]:block" style={{ width: 'calc((100vw - 1280px) / 2)' }} />
          {/* Right mask */}
          <div className="fixed top-0 right-0 h-full bg-background z-0 hidden min-[1330px]:block" style={{ width: 'calc((100vw - 1280px) / 2)' }} />

          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
