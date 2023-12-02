import { NextMiddlewareResult } from "next/dist/server/web/types"
import { NextResponse } from "next/server"
import type { NextFetchEvent } from "next/server"
import { NextRequestWithAuth } from "next-auth/middleware"

export type CustomMiddleware = (
  request: NextRequestWithAuth,
  event: NextFetchEvent,
  response: NextResponse,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware

export function chain(
  functions: MiddlewareFactory[],
  index = 0,
): CustomMiddleware {
  const current = functions[index]

  if (current) {
    const next = chain(functions, index + 1)
    return current(next)
  }

  return (
    _request: NextRequestWithAuth,
    _event: NextFetchEvent,
    response: NextResponse,
  ) => {
    return response
  }
}
