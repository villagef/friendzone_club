import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const { email, token } = body.data

    if (!email || !token) {
      return NextResponse.json(
        { error: "No email and token provided" },
        { status: 422 },
      )
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User doesn't exist" }, { status: 422 })
    } else {
      const update = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          passwordResetToken: token,
          passwordResetTokenExpiry: new Date(
            new Date().getTime() + 12 * 60 * 60 * 1000,
          ),
        },
      })

      if (!update) {
        return NextResponse.json(
          { error: "Error resending verification email" },
          { status: 500 },
        )
      }
      return NextResponse.json(
        { message: "Email with new token sent" },
        { status: 200 },
      )
    }
  } catch {
    return NextResponse.json(
      { error: "Error resending verification email" },
      { status: 500 },
    )
  }
}
