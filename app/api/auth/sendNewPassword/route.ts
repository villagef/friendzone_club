import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const { token, password } = body

    if (!token && !password) {
      return NextResponse.json(
        { error: "No email and password provided" },
        { status: 422 },
      )
    }

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpiry: {
          gte: new Date(),
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Token expired or doesn't exist" },
        { status: 422 },
      )
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const update = await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: hashedPassword,
          passwordResetToken: "",
          passwordResetTokenExpiry: new Date(),
        },
      })

      if (!update) {
        return NextResponse.json(
          { error: "Error changing password" },
          { status: 500 },
        )
      }
      return NextResponse.json({ message: "Password changed" }, { status: 200 })
    }
  } catch {
    return NextResponse.json(
      { error: "Error changing password" },
      { status: 500 },
    )
  }
}
