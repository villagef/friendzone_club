"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { newPasswordSchema, NewPasswordSchemaType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

export default function SendNewPasswordForm() {
  const _recaptchaToken = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const route = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(newPasswordSchema),
  })
  const searchParams = useSearchParams()
  const passwordToken = searchParams.get("token") || null

  const password = watch("password")
  const confirmPassword = watch("confirmPassword")
  const recaptchaToken = watch("recaptchaToken")

  const onSubmit = async (data: NewPasswordSchemaType) => {
    if (!passwordToken) {
      toast.error("Invalid token", { position: "top-right" })
      reset()
    } else {
      const _data = { token: passwordToken, password: data.confirmPassword! }

      const res = await fetch("/api/auth/sendNewPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_data),
      })

      if (res.ok) {
        toast.success("Password modified successfully", {
          position: "top-right",
        })
        reset()
        route.push("/signin")
      } else {
        toast.error("Something went wrong", { position: "top-right" })
        reset()
      }
    }
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Want to setup new password?
          </h1>
          <p className="text-sm">Enter new password and confirm it.</p>
        </div>
        <div className={"grid gap-6"}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="password">
                  New Password{" "}
                  {errors.password && (
                    <span className="ml-1 text-xs text-destructive">
                      {errors.password.message as React.ReactNode}
                    </span>
                  )}
                </Label>
                <Input
                  id="password"
                  {...register("password")}
                  placeholder="new password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  className="mb-0 text-primary"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="confirmPassword">
                  Confirm Password{" "}
                  {errors.confirmPassword && (
                    <span className="ml-1 text-xs text-destructive">
                      {errors.confirmPassword.message as React.ReactNode}
                    </span>
                  )}
                </Label>
                <Input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  placeholder="confirm password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  className="mb-0 text-primary"
                />
              </div>
              {password && confirmPassword && (
                <ReCAPTCHA
                  {...register("recaptchaToken")}
                  onChange={(value) =>
                    value && setValue("recaptchaToken", value)
                  }
                  sitekey={_recaptchaToken!}
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
                Modify password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
