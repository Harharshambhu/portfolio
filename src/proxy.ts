import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "blog_auth";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/blog/unlock")) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie && cookie === process.env.BLOG_PASSWORD) {
    return NextResponse.next();
  }

  // Already authenticated via Sanity Studio login (Presentation tool preview) —
  // draft mode implies the request came from someone with edit access.
  if (req.cookies.get("__prerender_bypass") && req.cookies.get("__next_preview_data")) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/blog/unlock";
  url.search = "";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

// Matches /blog/<something> (requires at least one segment), so the
// /blog index list stays public — only individual post pages are gated.
export const config = {
  matcher: ["/blog/:path+"],
};
