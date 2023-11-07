import { JWT } from "next-auth/jwt"
import { NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export const middleware = (request: NextRequestWithAuth) => {
  if (request.nextUrl.pathname.startsWith("/auth/signup")) {
    return NextResponse.rewrite(new URL("/auth/signup", request.url))
  }
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.rewrite(new URL("/auth/signin", request.url))
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
  withAuth: {
    callbacks: {
      authorized: ({ token }: { token: JWT | null }) => !!token,
      unauthorized: () => NextResponse.redirect("/auth/signin"),
    },
  },
  middleware,
}
