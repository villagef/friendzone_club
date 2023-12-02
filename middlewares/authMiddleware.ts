import { NextFetchEvent, NextResponse } from "next/server"
import { i18n, Locale } from "@/i18n"
import { getToken } from "next-auth/jwt"
import { NextRequestWithAuth } from "next-auth/middleware"

import { CustomMiddleware } from "./chain"

const protectedPaths = [
  "/explore",
  "/messages",
  "/favourite",
  "/notifications",
  "/profile",
]

const protectedPathsForAuthenticatedUser = ["/signin", "/signup"]

function getProtectedRoutes(protectedPaths: string[], locales: Locale[]) {
  let protectedPathsWithLocale = [...protectedPaths]

  protectedPaths.forEach((route) => {
    locales.forEach(
      (locale) =>
        (protectedPathsWithLocale = [
          ...protectedPathsWithLocale,
          `/${locale}${route}`,
        ]),
    )
  })

  return protectedPathsWithLocale
}

export function authMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequestWithAuth, event: NextFetchEvent) => {
    const response = NextResponse.next()

    const token = await getToken({ req: request })

    request.nextauth = request.nextauth || {}
    request.nextauth.token = token
    const pathname = request.nextUrl.pathname

    const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
      ...i18n.locales,
    ])

    const protectedPathsWithLocaleForAuthenticated = getProtectedRoutes(
      protectedPathsForAuthenticatedUser,
      [...i18n.locales],
    )

    if (!token && protectedPathsWithLocale.includes(pathname)) {
      const signInUrl = new URL("/api/auth/signin", request.url)
      signInUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(signInUrl)
    } else if (
      token &&
      protectedPathsWithLocaleForAuthenticated.includes(pathname)
    ) {
      return NextResponse.redirect(new URL("/explore", request.url))
    }

    return middleware(request, event, response)
  }
}
