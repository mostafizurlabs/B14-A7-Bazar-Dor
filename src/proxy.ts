
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const hasSession =
    request.cookies.has("better-auth.session_token") ||
    request.cookies.has("__Secure-better-auth.session_token");

  if (!hasSession) {
    return NextResponse.redirect(
      new URL("/signin", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/product/:path*",
    "/profile",
    "/profile/update-profile",
  ],
};
