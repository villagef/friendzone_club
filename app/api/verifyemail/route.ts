import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const { token } = body.data

    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationTokenExpiry: {
          gte: new Date().toLocaleString(),
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 422 })
    }

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        emailVerified: true,
        emailVerificationToken: "",
        emailVerificationTokenExpiry: "",
      },
    })

    return NextResponse.json({ message: "Email verified" }, { status: 200 })
  } catch (error) {
    let message = "Unknown Error"
    if (error instanceof Error) message = error.message
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
