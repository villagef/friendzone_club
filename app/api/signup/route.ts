import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

import { SignUpSchemaType } from "@/lib/types"

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
  try {
    const body: SignUpSchemaType = await req.json()
    const {
      gender,
      name,
      email,
      dob,
      location,
      password,
      emailVerificationToken,
    } = body

    if (!gender || !name || !dob || !email || !location || !password) {
      return new NextResponse("Please fill all fields", { status: 422 })
    }

    const exist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (exist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 422 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        gender,
        name,
        email,
        dob,
        location,
        password: hashedPassword,
        emailVerificationToken: emailVerificationToken,
        emailVerificationTokenExpiry: new Date(
          new Date().getTime() + 12 * 60 * 60 * 1000,
        ),
      },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: "Server error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
