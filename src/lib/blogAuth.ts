export const BLOG_AUTH_COOKIE = "blog_auth";

/**
 * Derives a deterministic token from the password via HMAC-SHA256, so the
 * cookie never holds the raw password — only something that proves you knew
 * it. Same password always produces the same token, so verification doesn't
 * need any shared/session state — middleware can recompute and compare.
 *
 * Uses Web Crypto (crypto.subtle) rather than Node's crypto module so this
 * works identically in both the Edge-runtime middleware and the Worker's
 * Node-flavored server action context.
 */
export async function deriveBlogAuthToken(password: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode("blog-unlock-v1"));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
