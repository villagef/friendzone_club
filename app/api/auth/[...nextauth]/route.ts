import { randomBytes, randomUUID } from "crypto"
import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST || "http://localhost:3000",
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER || "",
          pass: process.env.EMAIL_SERVER_PASSWORD || "",
        },
      },
      from: process.env.EMAIL_FROM || "default@default.com",
      maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
      type: "email",
      ...(process.env.NODE_ENV !== "production" ? {
        sendVerificationRequest(params) {
          console.log("LOGIN LINK", params.url)
        }
      } : {}) 
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined ) {
        if( !credentials?.email || !credentials?.password){
          return null
        }

      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email
        }
      })

      if(!user){
        return null
      } else {
        const match = await bcrypt.compare(credentials.password, user.password)

        if(match){
          return user
        } else {
          return null
        }
      }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/",
    newUser: "/",
    error: "/",
  },
  callbacks: {
    async signIn({ account, profile}) {
      if (account?.provider === "google") {
        const _user = await prisma.user.findUnique({
          where: {
            email: profile?.email
          }
        })

        if(!_user){
          return Promise.resolve(false).then(() => {
            return {
              error: "Please sign up first"
            }
          }).then(() => {
            return false
          })
        } else {
          // if(!_user.emailVerified){
          //   return Promise.resolve(false).then(() => {
          //     return {
          //       error: "Please verify your email first"
          //     }
          //   }).then(() => {
          //     return false
          //   })
          // }
          return true
        }
      }
        return true
    },
    redirect({ baseUrl }) {
      return baseUrl
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
} satisfies NextAuthOptions

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
