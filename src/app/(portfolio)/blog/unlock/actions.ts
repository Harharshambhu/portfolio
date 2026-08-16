"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "blog_auth";

// Readable by client JS (not httpOnly) so the blog list can tell, without a
// network round trip, whether this browser already unlocked — and skip the
// popup entirely for rows the visitor can already open.
async function setUnlockCookie(password: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, password, {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    path: "/blog",
    // no maxAge/expires — session cookie, cleared when the browser closes
  });
}

/** Used by the popup — verifies the password and reports success/failure without navigating. */
export async function checkBlogPassword(password: string): Promise<boolean> {
  if (password !== process.env.BLOG_PASSWORD) return false;
  await setUnlockCookie(password);
  return true;
}

/** Used by the /blog/unlock fallback page (deep links, no-JS) — verifies then redirects. */
export async function unlockBlog(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/blog");

  if (password !== process.env.BLOG_PASSWORD) {
    redirect(`/blog/unlock?next=${encodeURIComponent(next)}&error=1`);
  }

  await setUnlockCookie(password);

  redirect(next.startsWith("/blog") ? next : "/blog");
}
