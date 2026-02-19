import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anirudh Singh | Portfolio",
  description: "Product & XR Designer | M.Des at IIT Jodhpur",
};

import Navigation from "@/components/Navigation";
import BackgroundGrid from "@/components/BackgroundGrid";
import TargetCursor from "@/components/TargetCursor";
import MainLayout from "@/components/MainLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col items-center bg-background text-foreground relative`}
      >
        <TargetCursor />
        <BackgroundGrid />

        {/* Left Mask which is white */}
        <div className="fixed top-0 left-0 h-full bg-background z-0 hidden min-[1330px]:block" style={{ width: 'calc((100vw - 1280px) / 2)' }} />
        {/* Right Mask which is white */}
        <div className="fixed top-0 right-0 h-full bg-background z-0 hidden min-[1330px]:block" style={{ width: 'calc((100vw - 1280px) / 2)' }} />

        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
