"use client"

import { randomBytes } from "crypto"
import { useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import useStore from "@/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { COUNTRIES, GENDERS } from "@/lib/consts"
import { signupSchema, SignUpSchemaType } from "@/lib/types"
import { handleTokenFetch, isOver18 } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import InputCalendar from "@/components/InputCalendar"
import InputSelect from "@/components/InputSelect"
import InputText from "@/components/InputText"
import Spinner from "@/components/Spinner"

export default function SignUpPage() {
  const token = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const { status } = useSession()
  const route = useRouter()
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { setEmail } = useStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signupSchema),
  })

  async function handleSignInWithCredentials(data: SignUpSchemaType) {
    const token = randomBytes(10).toString("hex")
    const _data = { ...data, token: token }
    setEmail(data.email)

    const resSignup = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    })

    const responseSignup = await resSignup.json()

    if (resSignup.ok) {
      const resEmail = await handleTokenFetch(
        token,
        "/api/auth/sendVerifyEmail",
        data.email!,
      )
      if (resEmail.message) {
        toast.success("Account created successfully", {
          position: "top-right",
        })
        reset()
        route.push("/verify")
      } else {
        toast.error(resEmail.error, {
          position: "top-right",
        })
      }
    } else {
      toast.error(responseSignup.error, {
        position: "top-right",
      })
    }
  }

  const onSubmit = async (data: SignUpSchemaType) => {
    const _dob = new Date(data.dob)
    try {
      if (isOver18(_dob)) {
        await signupSchema.parseAsync(data)
        await handleSignInWithCredentials(data)
      } else {
        toast.error("You must be over 18 years old", {
          position: "top-right",
        })
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong 3", {
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
    Object.values(watch()).length !== 0 && Object.values(watch()).every(Boolean)

  if (status === "authenticated") return route.push("/explore")
  return status === "unauthenticated" ? (
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-1">
            <div className="grid grid-cols-2 gap-x-4">
              <InputSelect
                label="gender"
                isLoading={isSubmitting}
                register={register}
                setValue={setValue}
                errors={errors}
                items={GENDERS}
              />
              <InputSelect
                label="location"
                isLoading={isSubmitting}
                register={register}
                setValue={setValue}
                errors={errors}
                items={COUNTRIES}
              />
            </div>
            <InputCalendar
              label="dob"
              isLoading={isSubmitting}
              register={register}
              setValue={setValue}
              errors={errors}
            />
            <InputText
              label="name"
              isLoading={isSubmitting}
              register={register}
              errors={errors}
            />
            <InputText
              label="email"
              type="email"
              isLoading={isSubmitting}
              register={register}
              errors={errors}
            />
            <InputText
              label="password"
              type="password"
              isLoading={isSubmitting}
              register={register}
              errors={errors}
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
              disabled={!captchaToken || isSubmitting}
              className="mt-2"
            >
              {isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create account
            </Button>
          </div>
        </form>
      </div>
      <p className="px-8 text-center text-xs text-primary/90">
        By clicking 'Create account' you agree to our{" "}
        <Link
          href="/support"
          className="font-semibold underline underline-offset-4 hover:text-button"
        >
          Terms&Conditions
        </Link>{" "}
        and{" "}
        <Link
          href="/support"
          className="font-semibold underline underline-offset-4 hover:text-button"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  ) : (
    <Spinner />
  )
}
