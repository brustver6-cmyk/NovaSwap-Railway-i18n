import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin protection (MVP): require a session cookie.
  const isAdminPath = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (!isAdminPath) return NextResponse.next();

  if (pathname === "/admin/login" || pathname === "/api/admin/login") return NextResponse.next();

  const cookie = req.cookies.get("ns_admin")?.value;
  if (!cookie) return NextResponse.redirect(new URL("/admin/login", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
