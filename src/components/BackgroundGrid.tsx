"use client";

import { useEffect, useRef } from "react";

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
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;
        let delayedMouseX = -1000;
        let delayedMouseY = -1000;

        const gridSize = 10; // Denser grid (10px)
        const hoverRadius = 120; // Increased radius for smoother falloff
        const easing = 0.15; // Smooth factor for delay

        const render = () => {
            if (!ctx || !canvas) return;

            // Smooth Interpolation
            delayedMouseX += (mouseX - delayedMouseX) * easing;
            delayedMouseY += (mouseY - delayedMouseY) * easing;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Spotlight Effect
            if (spotlight && delayedMouseX > -100 && delayedMouseY > -100) {
                const gradient = ctx.createRadialGradient(delayedMouseX, delayedMouseY, 0, delayedMouseX, delayedMouseY, 300);
                gradient.addColorStop(0, "rgba(255, 255, 255, 0.15)");
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

                    // Calculate distance to delayed mouse
                    const dx = x - delayedMouseX;
                    const dy = y - delayedMouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Distortion / Repulsion
                    let renderX = x;
                    let renderY = y;
                    let distToMouse = dist;

                    if (interaction && dist < hoverRadius) {
                        const scaling = 1 * Math.pow(1 - dist / hoverRadius, 1.5);
                        const angle = Math.atan2(dy, dx);
                        const displacement = dist * scaling;

                        renderX = x + Math.cos(angle) * displacement;
                        renderY = y + Math.sin(angle) * displacement;

                        const newDx = renderX - delayedMouseX;
                        const newDy = renderY - delayedMouseY;
                        distToMouse = Math.sqrt(newDx * newDx + newDy * newDy);
                    }

                    // Base dimensions
                    let w = 2;
                    let h = 2;

                    const isHorizontal = (r + c) % 2 === 0;

                    if (interaction && distToMouse < hoverRadius * 0.8) {
                        const sizeFactor = 1 - Math.pow(distToMouse / (hoverRadius * 0.8), 2);
                        const colorFactor = 1 - Math.pow(distToMouse / (hoverRadius * 0.8), 10);

                        const stretch = 10 * sizeFactor;
                        const thickness = 2;

                        if (isHorizontal) {
                            w = 2 + stretch;
                            h = thickness;
                        } else {
                            w = thickness;
                            h = 2 + stretch;
                        }

                        // Color (Neon Blue hover effect: target 30, 80, 255)
                        const rCol = 100 - (70 * colorFactor);
                        const gCol = 100 - (20 * colorFactor);
                        const bCol = 100 + (155 * colorFactor);
                        const alpha = (0.2 + (0.8 * colorFactor)) * 0.8;

                        ctx.fillStyle = `rgba(${Math.round(rCol)}, ${Math.round(gCol)}, ${Math.round(bCol)}, ${alpha})`;
                    } else {
                        // Use the passed color prop for default state
                        ctx.fillStyle = color;
                    }

                    ctx.fillRect(renderX - w / 2, renderY - h / 2, w, h);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        const handleResize = () => {
            if (fixed) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            } else {
                // If not fixed, use the parent container's size or standard CSS sizing
                // We rely on CSS w-full h-full, but we need to set internal/buffer size
                const rect = canvas.getBoundingClientRect();
                // Check if rect is zero (hidden), avoid 0 size
                if (rect.width > 0 && rect.height > 0) {
                    canvas.width = rect.width;
                    canvas.height = rect.height;
                }
            }
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

                // Clamp Y at footer top if footer exists
                const footer = document.getElementById("main-footer");
                if (footer) {
                    const footerRect = footer.getBoundingClientRect();
                    // If mouse is below footer top, clamp Y to footer top
                    if (e.clientY > footerRect.top) {
                        mouseY = footerRect.top;
                    } else {
                        mouseY = e.clientY;
                    }
                } else {
                    mouseY = e.clientY;
                }
            } else {
                // For non-fixed, calculate relative to canvas
                const rect = canvas.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        // Additional observer for non-fixed resizing
        let resizeObserver: ResizeObserver | null = null;
        if (!fixed) {
            resizeObserver = new ResizeObserver(() => handleResize());
            resizeObserver.observe(canvas);
        }

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (resizeObserver) resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, fixed]);

    return (
        <canvas
            ref={canvasRef}
            className={`${fixed ? "fixed top-0 left-0 -z-10" : "absolute inset-0 z-0"} w-full h-full pointer-events-none`}
        />
    );
}
