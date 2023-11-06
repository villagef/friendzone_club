"use client"

import { SyntheticEvent, useState } from "react"
import Link from "next/link"
import Authentication from "@/components/Authentication"
import { Icons } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }
  return (
    <Authentication isSignup>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm">
            Enter your credentials below to create your account
          </p>
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
                placeholder="password (min 8 characters)"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="text-primary"
              />
              <Label className="" htmlFor="password">
                Confirm Password
              </Label>
              <Input
                id="password"
                placeholder="confirm password"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="text-primary"
              />
              <div className="text-center text-xs">
                Are you a member already?
                <Link href="/auth/signin">
                  <span className="mx-2 w-full text-sm font-semibold underline">
                    Sign in
                  </span>
                </Link>
              </div>
              <Button variant={"primary"} disabled={isLoading} className="mt-4">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create account
              </Button>
            </div>
          </form>
        </div>
        <p className="px-8 text-center text-sm text-primary/90">
          By clicking 'Create account' you agree to our{" "}
          <Link
            href="/support"
            className="underline underline-offset-4 hover:text-button">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/support"
            className="underline underline-offset-4 hover:text-button">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </Authentication>
  )
}
