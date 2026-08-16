import { NextRequest, NextResponse } from "next/server";
import { BLOG_AUTH_COOKIE, deriveBlogAuthToken } from "./lib/blogAuth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/blog/unlock")) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(BLOG_AUTH_COOKIE)?.value;
  if (cookie && process.env.BLOG_PASSWORD) {
    const expected = await deriveBlogAuthToken(process.env.BLOG_PASSWORD);
    if (cookie === expected) {
      return NextResponse.next();
    }
  }

  const url = req.nextUrl.clone();
  url.pathname = "/blog/unlock";
  url.search = "";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

// Matches /blog/<something> (requires at least one segment), so the
// /blog index list stays public — only individual post pages are gated.
//
// NOTE: kept as the legacy "middleware.ts" convention (not renamed to
// proxy.ts) on purpose. Next.js 16's new Proxy primitive always runs on
// Node.js runtime, but @opennextjs/cloudflare (the adapter deploying this
// site) doesn't yet support Node.js-runtime middleware — it requires the
// old Edge-only middleware.ts. The dev-server deprecation warning this
// causes is cosmetic; switching to proxy.ts breaks the actual Cloudflare
// build (confirmed via `npx @opennextjs/cloudflare build`).
export const config = {
  matcher: ["/blog/:path+"],
  runtime: "experimental-edge",
};
