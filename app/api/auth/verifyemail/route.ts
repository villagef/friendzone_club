import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const { token } = body
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationTokenExpiry: {
          gte: new Date(),
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 422 })
    } else {
      if (user.emailVerified) {
        return NextResponse.json(
          { error: "Email already verified" },
          { status: 422 },
        )
      } else {
        const update = await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            emailVerified: true,
            emailVerificationToken: "",
            emailVerificationTokenExpiry: new Date(),
          },
        })

        if (!update) {
          return NextResponse.json(
            { error: "Error verifying email" },
            { status: 500 },
          )
        }
        return NextResponse.json({ message: "Email verified" }, { status: 200 })
      }
    }
  } catch {
    return NextResponse.json(
      { error: "Error verifying email" },
      { status: 500 },
    )
  }
}
