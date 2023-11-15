"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "sonner"

import { signinSchema, SignInSchemaType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

export default function SignInPage() {
  const { status } = useSession()
  const route = useRouter()

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signinSchema),
  })

  const handleSignInWithGoogle = (event: React.SyntheticEvent) => {
    event.preventDefault()
    signIn("google")
  }

  function onSubmit(data: FieldValues) {
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          toast.success("Successfully logged in", { position: "top-right" })
          route.push("/explore")
        } else {
          toast.error("Invalid credentials", { position: "top-right" })
        }
      })
      .catch((err) => {
        console.error(err)
        toast.error("Something went wrong", { position: "top-right" })
      })
  }

  const allFieldsFilled = Object.values(watch()).every(Boolean)

  if (status === "authenticated") return route.push("/explore")
  return (
    status === "unauthenticated" && (
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to your account
          </h1>
          <p className="text-sm">Enter your credentails below to sign in</p>
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
              <Label htmlFor="password">
                Password{" "}
                {errors.password && (
                  <span className="ml-1 text-xs text-destructive">
                    {errors.password.message as React.ReactNode}
                  </span>
                )}
              </Label>
              <Input
                id="password"
                {...register("password")}
                placeholder="password"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isSubmitting}
                className="mb-0 text-primary"
              />
              <Link
                href="/password-reset"
                className="text-right text-xs text-primary"
              >
                Forgot password?
              </Link>
              <Button
                variant={"primary"}
                disabled={!allFieldsFilled || isSubmitting}
                className="mt-4"
              >
                {isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign in
              </Button>
            </div>
          </form>
          <div className="text-center text-xs">
            Not a member?
            <Link href="/signup">
              <span className="mx-2 w-full text-sm font-semibold underline">
                Create free account
              </span>
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-foreground px-2">Or continue with</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <Button
              onClick={handleSignInWithGoogle}
              variant="outline"
              type="button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2" />
              )}
              Google
            </Button>
          </div>
        </div>
      </div>
    )
  )
}
