import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SSR mode for Cloudflare Pages via @opennextjs/cloudflare
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Sanity image CDN
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
