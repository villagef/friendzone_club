import { z } from "zod"

export const signupSchema = z.object({
  gender: z.string().min(1, { message: "required" }).default(""),
  location: z.string().min(1, { message: "required" }).default(""),
  dob: z.string().min(1, { message: "required" }).default(""),
  name: z.string().min(2, { message: "required" }).default(""),
  email: z
    .string()
    .email({ message: "The email is invalid." })
    .min(1, { message: "required" })
    .default(""),
  password: z
    .string()
    .min(6, {
      message: "min 6 characters.",
    })
    .default(""),
})

export type SignUpSchemaType = z.infer<typeof signupSchema>

export type SignupSchemaKeys = keyof SignUpSchemaType
