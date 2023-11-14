"use client"

import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { passwordResetSchema, PasswordResetSchemaType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Authentication from "@/components/Authentication"
import { Icons } from "@/components/icons"
import Spinner from "@/components/Spinner"

export default function PasswordResetPage() {
  const token = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const { status } = useSession()
  const route = useRouter()
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [emailSend, setEmailSend] = React.useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(passwordResetSchema),
  })

  const handleButton = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setEmailSend((prev) => !prev)
  }

  const onSubmit = (data: PasswordResetSchemaType) => {
    reset()
    console.log(data.email)
    setEmailSend(true)
    toast.success("Successfully sent email", { position: "top-right" })
  }

  const onRecaptchaChange = (token: string | null) => {
    if (!token) return
    setCaptchaToken(token)
  }

  const allFieldsFilled =
    Object.values(watch()).length === 1 && Object.values(watch()).every(Boolean)

  if (status === "loading") return <Spinner />
  if (status === "authenticated") return route.push("/explore")
  return (
    <Authentication>
      {emailSend ? (
        <>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="mb-2 text-2xl font-semibold tracking-tight">
                Please check your email
              </h1>
              <p className="text-sm">
                If you don't receive an email, please check your spam folder or
                send another request.
              </p>
            </div>
            <Button variant={"primary"} onClick={handleButton}>
              Send Again
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Forgot your password?
              </h1>
              <p className="text-sm">
                Enter the email address you used when you joined and we’ll send
                you link to reset your password.
              </p>
            </div>
            <div className={"grid gap-6"}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Label className="" htmlFor="email">
                      Email{" "}
                      {errors.email && (
                        <span className="ml-1 text-xs text-destructive">
                          {errors.email.message as React.ReactNode}
                        </span>
                      )}
                    </Label>
                    <Input
                      id="email"
                      {...register("email")}
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isSubmitting}
                      className="text-primary"
                    />
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
                    disabled={errors.email ? true : false || !captchaToken}
                    className="mt-2"
                    type="submit"
                  >
                    {isSubmitting && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Send Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </Authentication>
  )
}
