"use client";

import { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

interface TargetCursorProps {
    targetSelector?: string;
    spinDuration?: number;
    hideDefaultCursor?: boolean;
    hoverDuration?: number;
    parallaxOn?: boolean;
}

const TargetCursor: React.FC<TargetCursorProps> = ({
    targetSelector = '.cursor-target, a:not(.no-cursor-interaction), button:not(.no-cursor-interaction)',
    spinDuration = 2,
    hideDefaultCursor = true,
    hoverDuration = 0.2,
    parallaxOn = true
}) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cornersRef = useRef<NodeListOf<Element> | null>(null);
    const spinTl = useRef<gsap.core.Timeline | null>(null);

    // 4 trailing circles: c1 = biggest/fastest, c4 = smallest/slowest
    const c1Ref = useRef<HTMLDivElement>(null);
    const c2Ref = useRef<HTMLDivElement>(null);
    const c3Ref = useRef<HTMLDivElement>(null);
    const c4Ref = useRef<HTMLDivElement>(null);

    const isActiveRef = useRef(false);
    const targetCornerPositionsRef = useRef<{ x: number; y: number }[] | null>(null);
    const tickerFnRef = useRef<(() => void) | null>(null);
    const activeStrengthRef = useRef({ current: 0 });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            if (typeof window === 'undefined') return false;
            const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.innerWidth <= 768;
            const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
            const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
            const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
            return !!((hasTouchScreen && isSmallScreen) || isMobileUserAgent);
        };
        setIsMobile(checkMobile());
    }, []);

    const constants = useMemo(
        () => ({
            borderWidth: 3,
            cornerSize: 12
        }),
        []
    );

    const xToRef = useRef<((value: number) => void) | null>(null);
    const yToRef = useRef<((value: number) => void) | null>(null);

    const moveCursor = useCallback((x: number, y: number) => {
        xToRef.current?.(x);
        yToRef.current?.(y);
    }, []);

    useEffect(() => {
        if (
            isMobile ||
            !cursorRef.current ||
            !c1Ref.current || !c2Ref.current || !c3Ref.current || !c4Ref.current
        ) return;

        const cursor = cursorRef.current;
        const initX = window.innerWidth / 2;
        const initY = window.innerHeight / 2;

        xToRef.current = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power2.out" });
        yToRef.current = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power2.out" });

        gsap.set(cursor, { xPercent: -50, yPercent: -50, x: initX, y: initY });

        // Place each circle at center on mount
        [c1Ref, c2Ref, c3Ref, c4Ref].forEach(ref => {
            gsap.set(ref.current, { xPercent: -50, yPercent: -50, x: initX, y: initY });
        });

        // quickTo setters — biggest circle = fastest follow, smallest = most lag
        const c1X = gsap.quickTo(c1Ref.current, "x", { duration: 0.15, ease: "power2.out" });
        const c1Y = gsap.quickTo(c1Ref.current, "y", { duration: 0.15, ease: "power2.out" });
        const c2X = gsap.quickTo(c2Ref.current, "x", { duration: 0.2, ease: "power2.out" });
        const c2Y = gsap.quickTo(c2Ref.current, "y", { duration: 0.2, ease: "power2.out" });
        const c3X = gsap.quickTo(c3Ref.current, "x", { duration: 0.25, ease: "power2.out" });
        const c3Y = gsap.quickTo(c3Ref.current, "y", { duration: 0.25, ease: "power2.out" });
        const c4X = gsap.quickTo(c4Ref.current, "x", { duration: 0.48, ease: "power2.out" });
        const c4Y = gsap.quickTo(c4Ref.current, "y", { duration: 0.48, ease: "power2.out" });

        cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

        let activeTarget: Element | null = null;
        let currentLeaveHandler: (() => void) | null = null;
        let resumeTimeout: NodeJS.Timeout | null = null;

        const cleanupTarget = (target: Element) => {
            if (currentLeaveHandler) {
                target.removeEventListener('mouseleave', currentLeaveHandler);
            }
            currentLeaveHandler = null;
        };

        const createSpinTimeline = () => {
            if (spinTl.current) {
                spinTl.current.kill();
            }
            spinTl.current = gsap
                .timeline({ repeat: -1 })
                .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
        };

        createSpinTimeline();

        const tickerFn = () => {
            if (!cursorRef.current || !cornersRef.current || !activeTarget) {
                return;
            }

            // Safety check: if target is removed from DOM, trigger leave
            if (!document.body.contains(activeTarget)) {
                if (currentLeaveHandler) currentLeaveHandler();
                return;
            }

            const strength = activeStrengthRef.current.current;
            if (strength === 0) return;

            const cursorX = gsap.getProperty(cursorRef.current, 'x') as number;
            const cursorY = gsap.getProperty(cursorRef.current, 'y') as number;
            const { borderWidth, cornerSize } = constants;

            const rect = activeTarget.getBoundingClientRect();
            const dynamicTargetCorners = [
                { x: rect.left - borderWidth, y: rect.top - borderWidth },
                { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
                { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
                { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
            ];

            const corners = Array.from(cornersRef.current);
            corners.forEach((corner, i) => {
                const currentX = gsap.getProperty(corner, 'x') as number;
                const currentY = gsap.getProperty(corner, 'y') as number;

                const targetX = dynamicTargetCorners[i].x - cursorX;
                const targetY = dynamicTargetCorners[i].y - cursorY;

                const finalX = currentX + (targetX - currentX) * strength;
                const finalY = currentY + (targetY - currentY) * strength;

                const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

                gsap.to(corner, {
                    x: finalX,
                    y: finalY,
                    duration: duration,
                    ease: duration === 0 ? 'none' : 'power1.out',
                    overwrite: 'auto'
                });
            });
        };

        tickerFnRef.current = tickerFn;

        // Switch circles to white inside the dark footer, regardless of whether
        // the change was triggered by mouse movement or page scroll.
        const circles = [c1Ref.current, c2Ref.current, c3Ref.current, c4Ref.current];
        const footer = document.getElementById('main-footer');
        let isInFooter = false;

        const updateCircleColor = (x: number, y: number) => {
            if (!footer) return;
            const rect = footer.getBoundingClientRect();
            const nowInFooter = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
            if (nowInFooter !== isInFooter) {
                isInFooter = nowInFooter;
                gsap.to(circles, { backgroundColor: nowInFooter ? '#ffffff' : '#000000', duration: 0.35, ease: 'power2.out' });
            }
        };

        const moveHandler = (e: MouseEvent) => {
            moveCursor(e.clientX, e.clientY);
            c1X(e.clientX); c1Y(e.clientY);
            c2X(e.clientX); c2Y(e.clientY);
            c3X(e.clientX); c3Y(e.clientY);
            c4X(e.clientX); c4Y(e.clientY);
            updateCircleColor(e.clientX, e.clientY);
        };
        window.addEventListener('mousemove', moveHandler);

        const scrollHandler = () => {
            if (!cursorRef.current) return;
            const mouseX = gsap.getProperty(cursorRef.current, 'x') as number;
            const mouseY = gsap.getProperty(cursorRef.current, 'y') as number;
            updateCircleColor(mouseX, mouseY);
            if (!activeTarget) return;
            const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
            const isStillOverTarget =
                elementUnderMouse &&
                (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);
            if (!isStillOverTarget) {
                if (currentLeaveHandler) {
                    currentLeaveHandler();
                }
            }
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });

        const mouseDownHandler = () => {
            if (!cursorRef.current) return;
            gsap.to([c1Ref.current, c2Ref.current, c3Ref.current, c4Ref.current], { scale: 0.7, duration: 0.2 });
            gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
        };

        const mouseUpHandler = () => {
            if (!cursorRef.current) return;
            gsap.to([c1Ref.current, c2Ref.current, c3Ref.current, c4Ref.current], { scale: 1, duration: 0.3 });
            gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
        };

        window.addEventListener('mousedown', mouseDownHandler);
        window.addEventListener('mouseup', mouseUpHandler);

        const enterHandler = (e: MouseEvent) => {
            const directTarget = e.target as Element;
            const allTargets: Element[] = [];
            let current: Element | null = directTarget;
            while (current && current !== document.body) {
                if (current.matches(targetSelector)) {
                    allTargets.push(current);
                }
                current = current.parentElement;
            }
            const target = allTargets[0] || null;
            if (!target || !cursorRef.current || !cornersRef.current) return;
            if (activeTarget === target) return;
            if (activeTarget) {
                cleanupTarget(activeTarget);
            }
            if (resumeTimeout) {
                clearTimeout(resumeTimeout);
                resumeTimeout = null;
            }

            activeTarget = target;
            const corners = Array.from(cornersRef.current);
            corners.forEach(corner => gsap.killTweensOf(corner));

            gsap.killTweensOf(cursorRef.current, 'rotation');
            spinTl.current?.pause();
            gsap.set(cursorRef.current, { rotation: 0 });

            isActiveRef.current = true;
            gsap.ticker.add(tickerFnRef.current!);

            gsap.to(activeStrengthRef.current, {
                current: 1,
                duration: hoverDuration,
                ease: 'power2.out'
            });

            gsap.to(cornersRef.current, {
                opacity: 1,
                duration: 0.2,
                ease: 'power2.out'
            });

            const leaveHandler = () => {
                if (tickerFnRef.current) {
                    gsap.ticker.remove(tickerFnRef.current);
                }

                isActiveRef.current = false;
                targetCornerPositionsRef.current = null;
                gsap.set(activeStrengthRef.current, { current: 0, overwrite: true });
                activeTarget = null;

                if (cornersRef.current) {
                    const corners = Array.from(cornersRef.current);
                    gsap.killTweensOf(corners);
                    const { cornerSize } = constants;
                    const positions = [
                        { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
                        { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
                        { x: cornerSize * 0.5, y: cornerSize * 0.5 },
                        { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
                    ];
                    const tl = gsap.timeline();
                    corners.forEach((corner, index) => {
                        tl.to(
                            corner,
                            {
                                x: positions[index].x,
                                y: positions[index].y,
                                opacity: 0,
                                duration: 0.3,
                                ease: 'power3.out'
                            },
                            0
                        );
                    });
                }

                resumeTimeout = setTimeout(() => {
                    if (!activeTarget && cursorRef.current && spinTl.current) {
                        const currentRotation = gsap.getProperty(cursorRef.current, 'rotation') as number;
                        const normalizedRotation = currentRotation % 360;
                        spinTl.current.kill();
                        spinTl.current = gsap
                            .timeline({ repeat: -1 })
                            .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
                        gsap.to(cursorRef.current, {
                            rotation: normalizedRotation + 360,
                            duration: spinDuration * (1 - normalizedRotation / 360),
                            ease: 'none',
                            onComplete: () => {
                                spinTl.current?.restart();
                            }
                        });
                    }
                    resumeTimeout = null;
                }, 50);

                cleanupTarget(target);
            };

            currentLeaveHandler = leaveHandler;
            target.addEventListener('mouseleave', leaveHandler);
        };

        window.addEventListener('mouseover', enterHandler, { passive: true });

        return () => {
            if (tickerFnRef.current) {
                gsap.ticker.remove(tickerFnRef.current);
            }

            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseover', enterHandler);
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('mousedown', mouseDownHandler);
            window.removeEventListener('mouseup', mouseUpHandler);

            if (activeTarget) {
                cleanupTarget(activeTarget);
            }

            spinTl.current?.kill();

            isActiveRef.current = false;
            targetCornerPositionsRef.current = null;
            activeStrengthRef.current = { current: 0 };
        };
    }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor, isMobile, hoverDuration, parallaxOn]);

    useEffect(() => {
        if (isMobile || !cursorRef.current || !spinTl.current) return;
        if (spinTl.current.isActive()) {
            spinTl.current.kill();
            spinTl.current = gsap
                .timeline({ repeat: -1 })
                .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
        }
    }, [spinDuration, isMobile]);

    if (isMobile) {
        return null;
    }

    return (
        <>
            <div ref={c1Ref} className="cursor-trail cursor-trail-1" />
            <div ref={c2Ref} className="cursor-trail cursor-trail-2" />
            <div ref={c3Ref} className="cursor-trail cursor-trail-3" />
            <div ref={c4Ref} className="cursor-trail cursor-trail-4" />
            <div ref={cursorRef} className="target-cursor-wrapper">
                <div className="target-cursor-corner corner-tl" />
                <div className="target-cursor-corner corner-tr" />
                <div className="target-cursor-corner corner-br" />
                <div className="target-cursor-corner corner-bl" />
            </div>
        </>
    );
};

export default TargetCursor;
