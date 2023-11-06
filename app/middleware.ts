import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log("middleware", request.nextUrl.pathname)
    console.log("middleware", request.nextauth.token)

    if (request.nextUrl.pathname.startsWith("/messages")) {
      return NextResponse.rewrite(new URL("/", request.url))
    }

    if (request.nextUrl.pathname.startsWith("/explore")) {
      return NextResponse.rewrite(new URL("/", request.url))
    }

    if (request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.rewrite(new URL("/auth/signup", request.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
)

export const config = { matcher: ["/explore", "/messages", "/favourite"] }
