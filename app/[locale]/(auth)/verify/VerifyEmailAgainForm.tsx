"use client"

import { randomBytes } from "crypto"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  verificationTokenResetSchema,
  VerificationTokenResetSchemaResetSchemaType,
} from "@/lib/types"
import { handleTokenFetch } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

export default function VerifyEmailAgainForm(): React.ReactElement {
  const token = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerificationTokenResetSchemaResetSchemaType>({
    resolver: zodResolver(verificationTokenResetSchema),
  })
  const email = watch("email")
  const recaptchaToken = watch("recaptchaToken")

  async function onSubmit() {
    try {
      if (!recaptchaToken && !email) {
        toast.error("Type your email and check reCaptcha", {
          position: "top-right",
        })
      } else {
        const token = randomBytes(10).toString("hex")
        const resToken = await handleTokenFetch(
          token,
          "/api/auth/sendVerifyToken",
          email!,
        )
        const resEmail = await handleTokenFetch(
          token,
          "/api/auth/sendVerifyEmail",
          email!,
        )

        if (resToken.ok && resEmail.ok) {
          toast.success("Email sent successfully", { position: "top-right" })
        } else {
          toast.error("Something went wrong", { position: "top-right" })
        }
      }
    } catch {
      toast.error("Something went wrong", { position: "top-right" })
    } finally {
      reset()
    }
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            We can not verify your account
          </h1>
          <p className="text-sm">
            Enter the email address you used when you joined and we’ll send you
            link to validate your account.
          </p>
        </div>
        <div className={"grid gap-6 "}>
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
              {token && email && (
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
                Verify again
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
