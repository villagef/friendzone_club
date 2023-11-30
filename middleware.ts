import { authMiddleware } from "@/middlewares/authMiddleware"
import { chain } from "@/middlewares/chain"
import { localeMiddleware } from "@/middlewares/localeMiddleware"

export default chain([localeMiddleware, authMiddleware])

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
}
