"use client"

import React from "react"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Authentication from "@/components/Authentication"

export default function SignInForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

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

  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <Authentication>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to your account
          </h1>
          <p className="text-sm">Enter your credentails below to sign in</p>
        </div>
        <div className={"grid gap-6"}>
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  required
                  className="text-primary"
                />
              </div>
              <Label className="" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="password"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="text-primary"
              />
              <Button variant={"primary"} disabled={isLoading} className="mt-4">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign in
              </Button>
            </div>
          </form>
          <div className="text-center text-xs">
            Not a member?
            <Link href="/auth/signup">
              <span className="mx-2 w-full text-sm font-semibold underline">
                Sign up
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
