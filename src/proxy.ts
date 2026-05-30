import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth-token";

const ADMIN_COOKIE = "naaz-admin";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // Public reads — the homepage and detail pages need these without auth.
  const isPublicRead =
    method === "GET" &&
    (pathname.startsWith("/api/content") ||
      pathname.startsWith("/api/rides") ||
      pathname === "/api/bookings");

  // Public booking creation — guests submit bookings from the /book page.
  const isPublicBookingCreate =
    method === "POST" && pathname === "/api/bookings";

  if (isPublicRead || isPublicBookingCreate) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const isAdmin = await verifyAdminToken(token);

  if (isAdmin) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/content/:path*",
    "/api/rides/:path*",
    "/api/bookings/:path*",
    "/api/db-reset/:path*",
  ],
};
