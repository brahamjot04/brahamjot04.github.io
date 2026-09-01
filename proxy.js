import { NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - /api routes
     * - /_next/static (static files)
     * - /_next/image (image optimization files)
     * - Public static assets
     */
    "/((?!api|_next/static|_next/image|favicon.png|og-image.png|robots.txt|sitemap.xml|manifest.json|assets).*)",
  ],
};

export default function proxy(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const pathname = url.pathname;

  // Detect admin subdomain (supports admin.brahamjot.dev, studio.brahamjot.dev, admin.localhost, etc.)
  const isSubdomainAdmin =
    hostname.startsWith("admin.") ||
    hostname.startsWith("studio.") ||
    hostname.startsWith("manage.");

  if (isSubdomainAdmin) {
    // When visiting the subdomain, serve the Admin Studio at root "/" or "/admin"
    if (pathname === "/" || pathname === "/admin") {
      return NextResponse.rewrite(new URL("/admin", req.url));
    }
    // Default any other request on the admin subdomain to the Admin Studio
    return NextResponse.rewrite(new URL("/admin", req.url));
  }

  // On the primary domain (e.g. brahamjot.dev):
  // Obscure /admin by returning 404 Not Found so it cannot be accessed directly
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  return NextResponse.next();
}
