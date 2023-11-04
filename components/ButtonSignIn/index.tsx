"use client"

import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import { Icons } from "../icons"

interface ButtonSignInProps {
  icon?: boolean
}

export default function ButtonSignIn({ icon }: ButtonSignInProps) {
  const handleClick = () => {
    signIn()
  }
  return icon ? (
    <Button
      variant="primary"
      size={"icon"}
      aria-label="Login"
      onClick={handleClick}>
      <Icons.login className={"stroke-secondary dark:stroke-primary"} />
    </Button>
  ) : (
    <Button
      variant={"primary"}
      size={"lg"}
      aria-label="Login"
      onClick={handleClick}>
      Sign in
    </Button>
  )
}
