import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const user = req.cookies.get("user");

  if (
    !user &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/signup"
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (user && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/applications", req.url));
  }

  if (user && req.nextUrl.pathname === "/signup") {
    return NextResponse.redirect(new URL("/applications", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/applications"],
};
