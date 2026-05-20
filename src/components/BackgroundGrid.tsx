"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function BackgroundGrid({
    color = "rgba(100, 100, 100, 0.2)",
    fixed = true,
    spotlight = false,
    interaction = true
}: {
    color?: string;
    fixed?: boolean;
    spotlight?: boolean;
    interaction?: boolean;
}) {
    const pathname = usePathname();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const isProjectCaseStudy = pathname?.startsWith("/projects/") && pathname !== "/projects";

    useEffect(() => {
        if (isProjectCaseStudy) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const spotlightColor = 'rgba(255, 255, 255, 0.25)';

        const parseColor = (str: string): [number, number, number, number] => {
            const m = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)/);
            if (m) return [+m[1], +m[2], +m[3], m[4] !== undefined ? +m[4] : 1];
            const hex = str.trim().replace('#', '');
            const h = hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex;
            return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 1];
        };

        // Mutable color state — rebuilt whenever the palette changes
        const colors = { base: '', table: [] as string[] };

        const rebuildColors = () => {
            const cs = getComputedStyle(document.documentElement);
            const hover = cs.getPropertyValue('--grid-hover').trim() || 'rgba(200,200,255,0.7)';
            const base = cs.getPropertyValue('--grid-base').trim() || color;
            const hp = parseColor(hover);
            const bp = parseColor(base);
            // Cap hover alpha so the effect stays subtle regardless of palette values
            hp[3] = Math.min(hp[3], 0.30);
            colors.base = base;
            colors.table = Array.from({ length: 101 }, (_, i) => {
                const t = i / 100;
                const r = Math.round(hp[0] + (bp[0] - hp[0]) * t);
                const g = Math.round(hp[1] + (bp[1] - hp[1]) * t);
                const b = Math.round(hp[2] + (bp[2] - hp[2]) * t);
                const a = +(hp[3] + (bp[3] - hp[3]) * t).toFixed(3);
                return `rgba(${r},${g},${b},${a})`;
            });
        };

        rebuildColors();

        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;
        let delayedMouseX = -1000;
        let delayedMouseY = -1000;

        const gridSize = 10;
        const hoverRadius = 180;
        const hoverRadiusSq = hoverRadius * hoverRadius;
        const innerRadiusSq = (hoverRadius * 0.8) ** 2;
        const easing = 0.15;
        const IDLE_MS = 250;

        let lastMoveTime = 0;
        let rafRunning = false;

        const render = () => {
            if (!ctx || !canvas) return;

            delayedMouseX += (mouseX - delayedMouseX) * easing;
            delayedMouseY += (mouseY - delayedMouseY) * easing;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (spotlight && delayedMouseX > -100 && delayedMouseY > -100) {
                const gradient = ctx.createRadialGradient(delayedMouseX, delayedMouseY, 0, delayedMouseX, delayedMouseY, 300);
                gradient.addColorStop(0, spotlightColor);
                gradient.addColorStop(1, "transparent");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            const rows = Math.ceil(canvas.height / gridSize);
            const cols = Math.ceil(canvas.width / gridSize);

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = c * gridSize + gridSize / 2;
                    const y = r * gridSize + gridSize / 2;

                    const dx = x - delayedMouseX;
                    const dy = y - delayedMouseY;
                    // Squared distance check — avoids Math.sqrt for ~95% of dots
                    const distSq = dx * dx + dy * dy;

                    if (interaction && distSq < hoverRadiusSq) {
                        const dist = Math.sqrt(distSq);
                        // Circular gradient: t=0 at cursor (hover color), t=1 at edge (base color)
                        const t = Math.pow(dist / hoverRadius, 0.6);
                        const dotColor = colors.table[Math.min(100, Math.round(t * 100))];

                        const scaling = Math.pow(1 - dist / hoverRadius, 1.5);
                        const angle = Math.atan2(dy, dx);
                        const displacement = dist * scaling;

                        const renderX = x + Math.cos(angle) * displacement;
                        const renderY = y + Math.sin(angle) * displacement;

                        const newDx = renderX - delayedMouseX;
                        const newDy = renderY - delayedMouseY;
                        const distToMouseSq = newDx * newDx + newDy * newDy;

                        if (distToMouseSq < innerRadiusSq) {
                            const distToMouse = Math.sqrt(distToMouseSq);
                            const innerRadius = hoverRadius * 0.8;
                            const sizeFactor = 1 - Math.pow(distToMouse / innerRadius, 2);
                            const stretch = 10 * sizeFactor;
                            const isHorizontal = (r + c) % 2 === 0;
                            const w = isHorizontal ? 2 + stretch : 2;
                            const h = isHorizontal ? 2 : 2 + stretch;
                            ctx.fillStyle = dotColor;
                            ctx.fillRect(renderX - w / 2, renderY - h / 2, w, h);
                        } else {
                            ctx.fillStyle = dotColor;
                            ctx.fillRect(renderX - 1, renderY - 1, 2, 2);
                        }
                    } else {
                        ctx.fillStyle = colors.base;
                        ctx.fillRect(x - 1, y - 1, 2, 2);
                    }
                }
            }

            // Self-pause when mouse has been idle — no wasted frames
            if (Date.now() - lastMoveTime < IDLE_MS) {
                animationFrameId = requestAnimationFrame(render);
            } else {
                rafRunning = false;
            }
        };

        const startRaf = () => {
            if (!rafRunning) {
                rafRunning = true;
                animationFrameId = requestAnimationFrame(render);
            }
        };

        const handleResize = () => {
            if (fixed) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            } else {
                const rect = canvas.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    canvas.width = rect.width;
                    canvas.height = rect.height;
                }
            }
            // Redraw static frame after resize
            render();
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (fixed) {
                const windowWidth = window.innerWidth;
                const contentWidth = 1280;
                const leftBound = (windowWidth - contentWidth) / 2;
                const rightBound = (windowWidth + contentWidth) / 2;

                if (windowWidth > contentWidth) {
                    if (e.clientX < leftBound) mouseX = leftBound;
                    else if (e.clientX > rightBound) mouseX = rightBound;
                    else mouseX = e.clientX;
                } else {
                    mouseX = e.clientX;
                }

                const footer = document.getElementById("main-footer");
                if (footer) {
                    const footerRect = footer.getBoundingClientRect();
                    mouseY = e.clientY > footerRect.top ? footerRect.top : e.clientY;
                } else {
                    mouseY = e.clientY;
                }
            } else {
                const rect = canvas.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
            }

            lastMoveTime = Date.now();
            startRaf();
        };

        // Re-read palette variables whenever PaletteChanger writes to :root style
        const paletteObserver = new MutationObserver(() => {
            rebuildColors();
            lastMoveTime = Date.now();
            startRaf();
        });
        paletteObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

        handleResize(); // sets canvas size and draws initial static frame
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        let resizeObserver: ResizeObserver | null = null;
        if (!fixed) {
            resizeObserver = new ResizeObserver(() => handleResize());
            resizeObserver.observe(canvas);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (resizeObserver) resizeObserver.disconnect();
            paletteObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, fixed, isProjectCaseStudy]);

    if (isProjectCaseStudy) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            className={`${fixed ? "fixed top-0 left-0 -z-10" : "absolute inset-0 z-0"} w-full h-full pointer-events-none`}
        />
    );
}
