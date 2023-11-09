"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import ReCAPTCHA from "react-google-recaptcha"
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import Authentication from "@/components/Authentication"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { COUNTRIES } from "@/lib/consts"
import InputCalendar from "@/components/InputCalendar"
import InputSelect from "@/components/InputSelect"
import InputText from "@/components/InputText"

type LabelType = "name" | "gender" | "email" | "dob" | "location" | "password"

export interface FieldProps {
  label: LabelType
  type?: string
  methods: UseFormReturn<FieldValues>
  isLoading: boolean
  items?: string[]
}

const registrationSchema = z.object({
  gender: z.string().min(1, { message: "required" }).default(""),
  name: z.string().min(2, { message: "required" }).default(""),
  email: z
    .string()
    .email({ message: "The email is invalid." })
    .min(1, { message: "required" })
    .default(""),
  dob: z.string().min(1, { message: "required" }).default(""),
  location: z.string().min(1, { message: "required" }).default(""),
  password: z
    .string()
    .min(6, {
      message: "min 6 characters.",
    })
    .default(""),
})

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const route = useRouter()
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const methods = useForm({
    resolver: zodResolver(registrationSchema),
  })

  async function handleLoginWithCredentials(data: FieldValues) {
    setIsLoading(true)

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      })

      if (res.ok) {
        toast.success("Account created successfully", {
          position: "top-right",
        })
        route.push("/signin")
      } else {
        toast.error("Something went wrong", {
          position: "top-right",
        })
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
      })
    } finally {
      setIsLoading(false)
    }
  }

  function isOver18(date: Date): boolean {
    const now = new Date()
    const ofAge = new Date(now.setFullYear(now.getFullYear() - 18))

    if (date > ofAge) {
      return false
    } else {
      return true
    }
  }

  const onSubmit = async (data: FieldValues) => {
    const _dob = new Date(data.dob as Date)
    try {
      if (isOver18(_dob)) {
        await registrationSchema.parseAsync(data)
        await handleLoginWithCredentials(data)
      } else {
        toast.error("You must be over 18 years old", {
          position: "top-right",
        })
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong", {
        position: "top-right",
      })
    } finally {
      recaptchaRef?.current?.reset()
    }
  }

  const onRecaptchaChange = (token: string | null) => {
    if (!token) return
    setCaptchaToken(token)
  }

  const allFieldsFilled =
    Object.values(methods.watch()).length !== 0 &&
    Object.values(methods.watch()).every(Boolean)
  const token = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  return (
    <Authentication isSignup>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm">
            Enter your credentials below to create your account
          </p>
        </div>
        <div className={"grid gap-6"}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-1">
                <div className="grid grid-cols-2 gap-x-4">
                  <InputSelect
                    label="gender"
                    isLoading={isLoading}
                    methods={methods}
                    items={["Male", "Female", "Transgender", "Non-binary"]}
                  />
                  <InputSelect
                    label="location"
                    isLoading={isLoading}
                    methods={methods}
                    items={COUNTRIES.map(country => country.name)}
                  />
                </div>
                <InputCalendar
                  label="dob"
                  methods={methods}
                  isLoading={isLoading}
                />
                <InputText
                  label="name"
                  methods={methods}
                  isLoading={isLoading}
                />
                <InputText
                  label="email"
                  type="email"
                  methods={methods}
                  isLoading={isLoading}
                />
                <InputText
                  label="password"
                  type="password"
                  methods={methods}
                  isLoading={isLoading}
                />
                <div className="text-center text-xs">
                  Are you a member already?
                  <Link href="/signin">
                    <span className="mx-2 w-full text-sm font-semibold underline">
                      Sign in
                    </span>
                  </Link>
                </div>
                {allFieldsFilled && (
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    onChange={onRecaptchaChange}
                    sitekey={token!}
                    className="mt-2"
                  />
                )}
                <Button
                  variant={"primary"}
                  disabled={!captchaToken || isLoading}
                  className="mt-2">
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create account
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
        <p className="px-8 text-center text-xs text-primary/90">
          By clicking 'Create account' you agree to our{" "}
          <Link
            href="/support"
            className="font-semibold underline underline-offset-4 hover:text-button">
            Terms&Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/support"
            className="font-semibold underline underline-offset-4 hover:text-button">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </Authentication>
  )
}
