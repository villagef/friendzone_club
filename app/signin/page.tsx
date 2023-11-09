"use client"

import React from "react"

import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { object, string, ZodError } from "zod"
import { FieldValues, FormProvider, useForm } from "react-hook-form"
import { Icons } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Authentication from "@/components/Authentication"

const loginSchema = object({
  email: string()
    .email({ message: "The email is invalid." })
    .min(1, { message: "required" }),
  password: string().min(1, {
    message: "required",
  }),
})

export default function SignInForm() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const methods = useForm({
    resolver: data => {
      try {
        loginSchema.parse(data)
        return { values: data, errors: {} }
      } catch (error) {
        return {
          values: {},
          errors: (error as ZodError).errors.reduce(
            (acc, err) => ({ ...acc, [err.path[0]]: err.message }),
            {} as Record<string, string>,
          ),
        }
      }
    },
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const route = useRouter()
  const handleSignInWithGoogle = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setIsLoading(true)
    signIn("google")
  }

  const handleSignInWithFacebook = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setIsLoading(true)
    signIn("facebook")
  }

  function onSubmit(data: FieldValues) {
    setIsLoading(true)
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then(res => {
        if (res?.ok) {
          toast.success("Successfully logged in", { position: "top-right" })
          route.push("/explore")
        } else {
          toast.error("Invalid credentials", { position: "top-right" })
        }
      })
      .catch(err => {
        console.error(err)
        toast.error("Something went wrong", { position: "top-right" })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Authentication isSignup={!!session}>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to your account
          </h1>
          <p className="text-sm">Enter your credentails below to sign in</p>
        </div>
        <div className={"grid gap-6"}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="" htmlFor="email">
                    Email{" "}
                    {methods.formState.errors.email && (
                      <span className="ml-1 text-xs text-destructive">
                        {methods.formState.errors.email as React.ReactNode}
                      </span>
                    )}
                  </Label>
                  <Input
                    id="email"
                    {...methods.register("email")}
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="text-primary"
                  />
                </div>
                <Label className="" htmlFor="password">
                  Password{" "}
                  {methods.formState.errors.password && (
                    <span className="ml-1 text-xs text-destructive">
                      {methods.formState.errors.password as React.ReactNode}
                    </span>
                  )}
                </Label>
                <Input
                  id="password"
                  {...methods.register("password")}
                  placeholder="password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="text-primary"
                />
                <Button
                  variant={"primary"}
                  disabled={isLoading}
                  className="mt-4">
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign in
                </Button>
              </div>
            </form>
          </FormProvider>
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
              <span className="bg-background px-2">Or continue with</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <Button
              onClick={handleSignInWithGoogle}
              variant="outline"
              type="button"
              disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2" />
              )}
              Google
            </Button>
            <Button
              onClick={handleSignInWithFacebook}
              variant="outline"
              type="button"
              disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.facebook className="mr-2" />
              )}
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </Authentication>
  )
}
