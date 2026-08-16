"use client";

/**
 * StudioClient — dynamically loads Sanity Studio with ssr: false
 * so webpack never tries to bundle sanity into the server bundle
 * (avoids the swr CJS/ESM interop issue).
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import config from "../../../../sanity.config";

const LoadingScreen = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "sans-serif",
      fontSize: "14px",
      color: "#888",
    }}
  >
    Loading Studio…
  </div>
);

// Load NextStudio only in the browser
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false, loading: LoadingScreen }
);

export default function StudioClient() {
  // NextStudio initializes internal router state during its first commit,
  // which React flags as a state update on an unmounted component if it
  // renders in the same pass as this wrapper. Delaying by one tick avoids it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <LoadingScreen />;
  return <NextStudio config={config} />;
}
