/**
 * /studio — Embedded Sanity Studio
 *
 * Server Component: exports metadata (no 'use client').
 * Actual Studio is loaded client-side via StudioClient to avoid
 * server-side bundling of sanity's swr dependency.
 */
import type { Metadata, Viewport } from "next";
import StudioClient from "./StudioClient";

export const metadata: Metadata = {
  title: "Studio — Anirudh",
  robots: "noindex, nofollow", // Keep the studio out of search results
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function StudioPage() {
  return <StudioClient />;
}
