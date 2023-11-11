import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

interface BodyProps {
    data: {
        gender: string;
        name: string;
        email: string;
        dob: string;
        location: string;
        password: string;
        emailVerified: boolean;
    }
}

export const POST = async (req: Request) => {
    try{
        const body = await req.json() as BodyProps
        const {gender, name, email, dob, location, password} = body.data
        
        if(!gender || !name || !dob || !email || !location || !password){
            return new NextResponse("Please fill all fields", {status: 422})
        }
        
        const exist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        
        if (exist) {
            return NextResponse.json({ error: "User already exists" }, { status: 422 });
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
                image: "",
                emailVerified: false
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