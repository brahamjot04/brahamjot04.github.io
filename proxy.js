import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.png|og-image.png|robots.txt|sitemap.xml|manifest.json|assets).*)",
  ],
};

export default function proxy(req) {
  const pathname = req.nextUrl.pathname;

  // Block old /admin route and return 404
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  return NextResponse.next();
}

export const middleware = proxy;
