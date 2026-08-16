import type { Metadata } from "next";
import { unlockBlog } from "./actions";

export const metadata: Metadata = {
  title: "Unlock — Anirudh",
  robots: "noindex, nofollow",
};

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next = "/blog", error } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-32 px-4">
      <span
        className="text-lg font-medium text-center"
        style={{ color: "var(--foreground)" }}
      >
        Do you have a Entry Pass
      </span>

      <form action={unlockBlog} className="flex flex-col gap-4 w-full max-w-sm">
        <input type="hidden" name="next" value={next} />
        <input
          id="password"
          type="password"
          name="password"
          required
          autoFocus
          className="flex h-14 w-full rounded-md px-6 py-2 text-base text-black bg-white text-center focus-visible:outline-none focus-visible:ring-[0.5px] focus-visible:ring-black transition-colors placeholder:text-gray-500"
          placeholder="Enter password"
        />
        {error && (
          <span className="text-sm text-center" style={{ color: "#e05252" }}>
            Wrong password — try again.
          </span>
        )}
        <button
          type="submit"
          className="inline-flex items-center justify-center px-9 py-4 text-base font-sans font-bold uppercase tracking-tight rounded-sm transition-colors"
          style={{ backgroundColor: "var(--accent-neon)", color: "var(--foreground)" }}
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
