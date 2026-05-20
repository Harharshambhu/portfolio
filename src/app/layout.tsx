import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BackgroundGrid from "@/components/BackgroundGrid";
import TargetCursor from "@/components/TargetCursor";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import PaletteChanger from "@/components/PaletteChanger";

const plusJakartaSans = localFont({
  src: [
    {
      path: "../../public/fonts/Plus_Jakarta_Sans/PlusJakartaSans-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/Plus_Jakarta_Sans/PlusJakartaSans-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});

const merriweather = localFont({
  src: [
    {
      path: "../../public/fonts/Merriweather/static/Merriweather_48pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Merriweather/static/Merriweather_48pt-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Merriweather/static/Merriweather_48pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Merriweather/static/Merriweather_48pt-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Merriweather/static/Merriweather_48pt-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Merriweather/static/Merriweather_48pt-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-serif",
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
          <div className="hidden md:block"><TargetCursor /></div>
          <div className="hidden md:block"><BackgroundGrid /></div>
          <ScrollProgressBar />
          <PaletteChanger />

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
