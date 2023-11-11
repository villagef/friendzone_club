import { NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export const middleware = (request: NextRequestWithAuth) => {
  const isAuthorized = request.headers
    .get("cookie")
    ?.includes("next-auth.session-token")
  if (isAuthorized) {
    return NextResponse.next()
  } else {
    return NextResponse.redirect(new URL("/signin", request.url))
  }
}

export const config = {
  matcher: [
    "/explore",
    "/messages",
    "/favourite",
    "/notifications",
    "/profile",
  ],
}
