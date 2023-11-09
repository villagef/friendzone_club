import { randomBytes, randomUUID } from "crypto"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        gender: {
          label: "Gender:",
          type: "text",
          placeholder: "gender",
        },
        name: {
          label: "Name:",
          type: "text",
          placeholder: "name",
        },
        email: {
          label: "Email:",
          type: "email",
          placeholder: "example@email.com",
        },
        dob: {
          label: "Date of Birth:",
          type: "email",
          placeholder: "30.12.1990",
        },
        location: {
          label: "Location:",
          type: "text",
          placeholder: "location",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
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
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,

    })
  ],
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    newUser: "/",
  },
  callbacks: {
    signIn({ user, account, profile, email, credentials }) {
      console.log(user, account, profile, email, credentials)
      return true
    },
    redirect({ baseUrl }) {
      return baseUrl
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthOptions
