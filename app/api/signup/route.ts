import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

interface BodyProps {
    data: {
    email: string;
    password: string;
    }
}

export const POST = async (req: Request) => {
    try{
        const body = await req.json() as BodyProps
        const {email, password} = body.data
        
        if(!email || !password){
            return new NextResponse("Please fill all fields", {status: 422})
        }
        
        const exist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        
        if(exist){
            return new NextResponse("User already exist", {status: 422})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        return NextResponse.json({user}, {status: 201})
    } catch (error) {
        console.error(error);

        return NextResponse.json({error: "Server error"}, {status: 500}    )
    } finally {
        await prisma.$disconnect()
    }
}