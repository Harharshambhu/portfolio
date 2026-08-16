"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Post } from "@/sanity/queries";
import PasswordModal from "./PasswordModal";

const hasUnlockCookie = () =>
  typeof document !== "undefined" && document.cookie.includes("blog_auth=");

// ─── Blog Row — same ripple fill interaction as About page ───────────────────

function BlogRow({
  idx,
  post,
  globalMouse,
  isMobile,
  onLockedClick,
}: {
  idx: number;
  post: Post;
  globalMouse: { x: number; y: number };
  isMobile: boolean;
  onLockedClick: (href: string) => boolean;
}) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const updateHoverState = (mouseX: number, mouseY: number) => {
    if (!rowRef.current || isMobile) return;
    const rect = rowRef.current.getBoundingClientRect();
    const isOver =
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom;

    if (isOver && !hovered) {
      // Set the ripple's origin only on entry — updating it on every
      // subsequent mousemove would restart the clip-path transition
      // mid-animation and make the fill look stuck/laggy while moving.
      setHovered(true);
      setOrigin({ x: mouseX - rect.left, y: mouseY - rect.top });
    } else if (!isOver && hovered) {
      setHovered(false);
    }
  };

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => updateHoverState(globalMouse.x, globalMouse.y);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hovered, globalMouse, isMobile]);

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      prefetch={false}
      ref={rowRef}
      className="relative flex flex-col md:flex-row py-4 border-b border-border px-3 -mx-3 rounded-sm overflow-hidden cursor-pointer no-underline bg-white/70"
      onClick={(e) => {
        const href = `/blog/${post.slug.current}`;
        if (onLockedClick(href)) e.preventDefault();
      }}
      onMouseEnter={() => { if (!isMobile) updateHoverState(globalMouse.x, globalMouse.y); }}
      onMouseMove={(e) => { if (!isMobile) updateHoverState(e.clientX, e.clientY); }}
      onMouseLeave={() => { if (!isMobile) setHovered(false); }}
      style={{
        borderBottomColor: hovered ? "transparent" : undefined,
        transition: "border-color 0.2s ease",
      }}
    >
      {/* Ripple fill */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: "var(--accent-blue)",
          clipPath: hovered
            ? `circle(150% at ${origin.x}px ${origin.y}px)`
            : `circle(0% at ${origin.x}px ${origin.y}px)`,
          transition: "clip-path 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* Serial No */}
      <div className="relative md:w-[5%] shrink-0">
        <span
          className="font-sans font-medium text-sm tabular-nums"
          style={{
            color: hovered ? "var(--text-hover-muted)" : "var(--muted)",
            transition: "color 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {String(idx + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Date */}
      <div className="relative shrink-0 flex items-center">
        <span
          className="font-sans text-sm tabular-nums"
          style={{
            color: hovered ? "var(--text-hover-muted)" : "var(--muted)",
            transition: "color 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
        </span>
      </div>

      {/* Line separator — fills whatever gap remains between date and name */}
      <div className="relative flex-1 hidden md:flex items-center px-4">
        <div
          className="w-full"
          style={{
            borderTopWidth: "1px",
            borderTopStyle: "solid",
            borderTopColor: hovered ? "var(--text-hover-muted)" : "var(--muted)",
            transition: "border-color 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>

      {/* Name */}
      <div className="relative md:shrink-0 md:max-w-[55%]">
        <span
          className="font-medium text-lg leading-tight"
          style={{
            color: hovered ? "var(--text-hover)" : "var(--foreground)",
            transition: "color 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {post.title}
        </span>
      </div>
    </Link>
  );
}

// ─── Blog List (client wrapper for mouse tracking) ────────────────────────────

export default function BlogList({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 });
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setGlobalMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Returns true if the click was intercepted (row is locked, popup opened).
  const onLockedClick = (href: string) => {
    if (hasUnlockCookie()) return false;
    setPendingHref(href);
    return true;
  };

  if (posts.length === 0) {
    return (
      <div className="flex flex-col gap-3 py-16 items-center text-center">
        <span className="text-muted text-sm font-sans uppercase tracking-wider">Nothing yet</span>
        <p className="text-muted text-sm max-w-sm leading-relaxed">
          First post coming soon. Write one via the{" "}
          <Link href="/studio" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Studio
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col border-t border-border w-3/4 mx-auto">
        {posts.map((post, idx) => (
          <BlogRow
            key={post._id}
            idx={idx}
            post={post}
            globalMouse={globalMouse}
            isMobile={isMobile}
            onLockedClick={onLockedClick}
          />
        ))}
      </div>

      {pendingHref && (
        <PasswordModal
          onClose={() => setPendingHref(null)}
          onSuccess={() => {
            const href = pendingHref;
            setPendingHref(null);
            if (href) {
              // router.refresh() forces the RSC payload for the target route
              // to be re-fetched with the just-set cookie, in case a stale
              // (pre-unlock) response was already cached for it.
              router.refresh();
              router.push(href);
            }
          }}
        />
      )}
    </>
  );
}
