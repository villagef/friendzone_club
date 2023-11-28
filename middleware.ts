import { NextResponse } from "next/server"
import { NextRequestWithAuth } from "next-auth/middleware"
import createIntlMiddleware from "next-intl/middleware"

import { locales } from "./i18n"

export default createIntlMiddleware({
  locales,
  defaultLocale: "en",
})

// export const middleware = (request: NextRequestWithAuth) => {
//   const isAuthorized = request.headers
//     .get("cookie")
//     ?.includes("next-auth.session-token")
//   if (isAuthorized) {
//     return NextResponse.next()
//   } else {
//     return NextResponse.redirect(new URL("/signin", request.url))
//   }
// }

// export const config = {
//   matcher: [
//     "/explore",
//     "/messages",
//     "/favourite",
//     "/notifications",
//     "/profile",
//   ],
// }
export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(pl|en)/:path*"],
}
