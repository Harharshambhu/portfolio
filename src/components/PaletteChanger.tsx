"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export interface Palette {
  id: string;
  vars: Record<string, string>;
}

export const DARK: Palette = {
  id: "dark",
  vars: {
    "--background": "rgba(10,18,24,1)",
    "--foreground": "rgba(203,216,220,1)",
    "--muted": "rgba(89,126,125,1)",
    "--border": "rgba(203,216,220,0.1)",
    "--hover": "rgba(93,196,184,0.08)",
    "--accent-neon": "rgba(93,196,184,1)",
    "--accent-blue": "rgba(13,59,72,1)",
    "--grid-base": "rgba(203,216,220,0.06)",
    "--grid-hover": "rgba(93,196,184,0.28)",
    "--spotlight-primary": "#5DC4B8",
    "--spotlight-secondary": "#597E7D",
    "--text-hover": "#0a1218",
    "--text-hover-muted": "rgba(10,18,24,0.75)",
    "--cursor-color": "#CBD8DC",
  },
};

export const LIGHT: Palette = {
  id: "light",
  vars: {
    "--background": "rgba(249,245,230,1)",
    "--foreground": "rgba(38,66,43,1)",
    "--muted": "rgba(89,116,93,1)",
    "--border": "rgba(38,66,43,0.14)",
    "--hover": "rgba(241,78,7,0.08)",
    "--accent-neon": "rgba(241,78,7,1)",
    "--accent-blue": "rgba(112,39,65,1)",
    "--grid-base": "rgba(38,66,43,0.10)",
    "--grid-hover": "rgba(241,78,7,0.25)",
    "--spotlight-primary": "#F14E07",
    "--spotlight-secondary": "#702741",
    "--text-hover": "#F9F5E6",
    "--text-hover-muted": "rgba(249,245,230,0.75)",
    "--cursor-color": "#26422B",
  },
};

export function applyPalette(p: Palette) {
  const root = document.documentElement;
  Object.entries(p.vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

export default function PaletteChanger() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    const dark = saved === "dark";
    applyPalette(dark ? DARK : LIGHT);
    setIsDark(dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    applyPalette(next ? DARK : LIGHT);
    setIsDark(next);
    localStorage.setItem("portfolio-theme", next ? "dark" : "light");
  };

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-[60] flex-col items-end gap-2 group">
      {/* Tooltip */}
      <div
        className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap"
        style={{
          background: isDark ? "rgba(203,216,220,1)" : "rgba(38,66,43,1)",
          color: isDark ? "rgba(10,18,24,1)" : "rgba(249,245,230,1)",
        }}
      >
        {isDark ? "Switch to light" : "Too bright? Go dark"}
      </div>

      <button
        onClick={toggle}
        className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        style={{
          background: isDark ? "rgba(10,18,24,0.9)" : "rgba(245,245,245,0.9)",
          border: isDark ? "1px solid rgba(203,216,220,0.15)" : "1px solid rgba(10,10,10,0.12)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
        }}
      >
        {isDark
          ? <Sun  size={18} style={{ color: "rgba(203,216,220,0.8)" }} />
          : <Moon size={18} style={{ color: "rgba(10,10,10,0.7)" }} />
        }
      </button>
    </div>
  );
}
