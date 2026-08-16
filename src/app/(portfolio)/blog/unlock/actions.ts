"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { BLOG_AUTH_COOKIE, deriveBlogAuthToken } from "@/lib/blogAuth";

interface RateLimitBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

// Readable by client JS (not httpOnly) so the blog list can tell, without a
// network round trip, whether this browser already unlocked — and skip the
// popup entirely for rows the visitor can already open. Safe to expose:
// the cookie holds a derived token, never the raw password (see blogAuth.ts).
async function setUnlockCookie(password: string) {
  const token = await deriveBlogAuthToken(password);
  const cookieStore = await cookies();
  cookieStore.set(BLOG_AUTH_COOKIE, token, {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    path: "/blog",
    // no maxAge/expires — session cookie, cleared when the browser closes
  });
}

/**
 * Caps password attempts per IP so a 4-digit PIN can't be brute-forced —
 * without this, all 10,000 combinations are guessable in well under a
 * minute. Fails open (allows the attempt) if the binding is unavailable,
 * e.g. local dev without `wrangler dev`, rather than breaking the feature.
 */
async function isRateLimited(): Promise<boolean> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const limiter = (env as unknown as { BLOG_AUTH_LIMITER?: RateLimitBinding }).BLOG_AUTH_LIMITER;
    if (!limiter) return false;

    const h = await headers();
    const ip = h.get("cf-connecting-ip") ?? h.get("x-forwarded-for") ?? "unknown";
    const { success } = await limiter.limit({ key: ip });
    return !success;
  } catch {
    return false;
  }
}

/** Used by the popup — verifies the password and reports success/failure without navigating. */
export async function checkBlogPassword(password: string): Promise<boolean> {
  if (await isRateLimited()) return false;
  if (password !== process.env.BLOG_PASSWORD) return false;
  await setUnlockCookie(password);
  return true;
}

/** Used by the /blog/unlock fallback page (deep links, no-JS) — verifies then redirects. */
export async function unlockBlog(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/blog");

  if ((await isRateLimited()) || password !== process.env.BLOG_PASSWORD) {
    redirect(`/blog/unlock?next=${encodeURIComponent(next)}&error=1`);
  }

  await setUnlockCookie(password);

  redirect(next.startsWith("/blog") ? next : "/blog");
}
