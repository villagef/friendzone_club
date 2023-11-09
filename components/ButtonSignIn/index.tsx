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
  return (
    <Button variant="primary" size={"default"} onClick={handleClick}>
      {icon && (
        <Icons.login className={"stroke-secondary dark:stroke-primary"} />
      )}
      <span className="mx-2">Sign in</span>
      <span className="sr-only">Sign in</span>
    </Button>
  )
}
