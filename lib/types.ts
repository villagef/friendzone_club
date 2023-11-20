import {
  FieldErrors,
  FieldValues,
  SetFieldValue,
  UseFormRegister,
} from "react-hook-form"
import { z } from "zod"

//SIGNUP SCHEMA
export const signupSchema = z.object({
  id: z.string().optional().default(""),
  gender: z.string().min(1, { message: "required" }).default(""),
  location: z.string().min(1, { message: "required" }).default(""),
  dob: z.string().min(1, { message: "required" }).default(""),
  name: z.string().min(2, { message: "required" }).default(""),
  email: z
    .string()
    .email({ message: "invalid email" })
    .min(1, { message: "required" })
    .max(64, { message: "too long email" })
    .default(""),
  password: z
    .string()
    .min(6, {
      message: "min 6 characters",
    })
    .default(""),
  passwordResetToken: z.string().optional().default(""),
  passwordResetTokenExpiry: z.string().optional().default(""),
  emailVerified: z.boolean().optional().default(false),
  emailVerificationToken: z.string().optional().default(""),
  emailVerificationTokenExpiry: z.string().optional().default(""),
  image: z.string().optional().default(""),
})

export type SignUpSchemaType = z.infer<typeof signupSchema>
export type SignupSchemaKeys = keyof SignUpSchemaType

//SIGNIN SCHEMA
export const signinSchema = z.object({
  email: z
    .string()
    .email({ message: "invalid email" })
    .min(1, { message: "required" })
    .max(64, { message: "too long email" }),
  password: z.string().min(1, {
    message: "required",
  }),
})

export type SignInSchemaType = z.infer<typeof signinSchema>
export type SignInSchemaKeys = keyof SignInSchemaType

//PASSWORD RESET SCHEMA
export const passwordResetSchema = z.object({
  email: z
    .string()
    .email({ message: "invalid email" })
    .min(1, { message: "required" })
    .max(64, { message: "too long email" }),
  recaptchaToken: z.string().min(1, { message: "required" }),
})

export type PasswordResetSchemaType = z.infer<typeof passwordResetSchema>
export type PasswordResetSchemaKeys = keyof PasswordResetSchemaType

//PASSWORD RESET SCHEMA
export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, {
        message: "min 6 characters",
      })
      .default(""),
    confirmPassword: z
      .string()
      .min(6, {
        message: "min 6 characters",
      })
      .default(""),
    recaptchaToken: z.string().min(1, { message: "required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>
export type NewPasswordSchemaKeys = keyof NewPasswordSchemaType

//VERIFICATION TOKEN RESET SCHEMA
export const verificationTokenResetSchema = z.object({
  email: z
    .string()
    .email({ message: "invalid email" })
    .min(1, { message: "required" })
    .max(64, { message: "too long email" }),
  recaptchaToken: z.string().min(1, { message: "required" }),
})

export type VerificationTokenResetSchemaResetSchemaType = z.infer<
  typeof verificationTokenResetSchema
>
export type VerificationTokenResetSchemaResetSchemaKeys =
  keyof VerificationTokenResetSchemaResetSchemaType

//FORM INPUTS
export interface FieldValueProps {
  [key: string]: string | number | boolean | undefined | null
}
export type RegisterSchemaType = UseFormRegister<FieldValueProps>
export type ErrorSchemaType = FieldErrors
export type SetValueSchemaType = SetFieldValue<FieldValues>
