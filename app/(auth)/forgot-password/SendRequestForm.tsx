"use client"

import { randomBytes } from "crypto"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useStore from "@/store"
import { zodResolver } from "@hookform/resolvers/zod"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { passwordResetSchema, PasswordResetSchemaType } from "@/lib/types"
import { handleTokenFetch } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

export default function SendRequestForm() {
  const token = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const { email: userEmail, setEmail: setUserEmail } = useStore()
  const emailProvider =
    "https://www." + (userEmail?.split("@")[1] || "gmail.com")
  const [emailSent, setEmailSent] = useState(false)
  const route = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(passwordResetSchema),
  })

  const email = watch("email")
  const recaptchaToken = watch("recaptchaToken")

  const handleSendAgainButton = () => {
    reset()
    setEmailSent(false)
  }

  const handleCheckEmailButton = () => {
    route.push("/signin")
  }

  const onSubmit = async (data: PasswordResetSchemaType) => {
    setUserEmail(data.email)

    const token = randomBytes(10).toString("hex")
    const resToken = await handleTokenFetch(
      token,
      "/api/auth/sendResetPasswordToken",
      data.email!,
    )
    const resEmail = await handleTokenFetch(
      token,
      "/api/auth/sendResetPasswordEmail",
      email!,
    )

    if (resToken.message && resEmail.message) {
      toast.success("Email sent successfully", { position: "top-right" })
      reset()
      setEmailSent(true)
    } else {
      toast.error("Something went wrong", { position: "top-right" })
      reset()
      setEmailSent(false)
    }
  }

  return emailSent ? (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">
            Please check your email
          </h1>
          <p className="text-sm">
            If you don't receive an email, please check your spam folder or send
            another request.
          </p>
        </div>
        <div className="flex w-full flex-col gap-y-3">
          <a href={emailProvider} target="_blank">
            <Button
              variant={"primary"}
              size={"xl"}
              onClick={handleCheckEmailButton}
            >
              Check your email
            </Button>
          </a>
          <Button variant={"outline"} onClick={handleSendAgainButton}>
            Send Again
          </Button>
        </div>
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
            Enter the email address you used when you joined and we’ll send you
            link to reset your password.
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
              {email && (
                <ReCAPTCHA
                  {...register("recaptchaToken")}
                  onChange={(value) =>
                    value && setValue("recaptchaToken", value)
                  }
                  sitekey={token!}
                  className="mt-2"
                />
              )}
              <Button
                variant={"primary"}
                disabled={isSubmitting || (recaptchaToken ? false : true)}
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
  )
}
