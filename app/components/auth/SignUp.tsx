"use client"

import { randomBytes } from "crypto"
import { useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import useStore from "@/store"
import { zodResolver } from "@hookform/resolvers/zod"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { COUNTRIES } from "@/lib/consts"
import {
  DictionaryType,
  signupSchema,
  SignupSchemaKeys,
  SignUpSchemaType,
} from "@/lib/types"
import { handleTokenFetch, isOver18 } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import InputCalendar from "@/components/InputCalendar"
import InputPassword from "@/components/InputPassword"
import InputSelect from "@/components/InputSelect"
import InputText from "@/components/InputText"

interface SignUpProps {
  dictionary: DictionaryType["auth"]["signup"]
}

export default function SignUp({ dictionary }: SignUpProps) {
  const token = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
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

  const labels = {
    gender: dictionary.gender.label as SignupSchemaKeys,
    location: dictionary.location.label as SignupSchemaKeys,
    dob: dictionary.dob.label as SignupSchemaKeys,
    name: dictionary.name.label as SignupSchemaKeys,
    email: dictionary.email.label as SignupSchemaKeys,
    password: dictionary.password.label as SignupSchemaKeys,
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center">
      <div className="mb-4 flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {dictionary.title}
        </h1>
        <p className="text-sm">{dictionary.subtitle}</p>
      </div>
      <div className={"grid gap-6"}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-1">
            <div className="grid grid-cols-2 gap-x-4">
              <InputSelect
                label={labels.gender}
                isLoading={isSubmitting}
                register={register}
                setValue={setValue}
                errors={errors}
                items={[]}
              />
              <InputSelect
                label={labels.location}
                isLoading={isSubmitting}
                register={register}
                setValue={setValue}
                errors={errors}
                items={COUNTRIES}
              />
            </div>
            <InputCalendar
              label={labels.dob}
              isLoading={isSubmitting}
              register={register}
              setValue={setValue}
              errors={errors}
            />
            <InputText
              label={labels.name}
              isLoading={isSubmitting}
              register={register}
              errors={errors}
            />
            <InputText
              label={labels.email}
              type="email"
              isLoading={isSubmitting}
              register={register}
              errors={errors}
            />
            <InputPassword
              label={labels.password}
              register={register}
              errors={errors}
              disabled={isSubmitting}
            />
            <div className="mt-1 text-center text-xs">
              {dictionary.signin.label}
              <Link href="/signin">
                <span className="mx-2 w-full text-sm font-semibold underline">
                  {dictionary.signin.link}
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
              className="my-4"
            >
              {isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {dictionary.button}
            </Button>
          </div>
        </form>
      </div>
      <div className="text-center text-xs text-primary/90">
        {dictionary.conditions.label}{" "}
        <Link
          href="/support"
          className="font-semibold underline underline-offset-4 hover:text-button"
        >
          {dictionary.conditions.terms}
        </Link>{" "}
        {dictionary.conditions.separator}{" "}
        <Link
          href="/support"
          className="font-semibold underline underline-offset-4 hover:text-button"
        >
          {dictionary.conditions.privacy}
        </Link>
        .
      </div>
    </div>
  )
}
