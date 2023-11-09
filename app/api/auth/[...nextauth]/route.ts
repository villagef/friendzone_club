import NextAuth, { NextAuthOptions } from "next-auth"
import { authOptions } from "./options"

const handler = NextAuth(authOptions) as NextAuthOptions

export { handler as GET, handler as POST }
