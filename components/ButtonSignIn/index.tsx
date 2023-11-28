"use client"

import { signIn } from "next-auth/react"

import { Icons } from "../icons"
import { Button } from "../ui/button"

interface ButtonSignInProps {
  label: string
  icon?: boolean
}

export default function ButtonSignIn({ label, icon }: ButtonSignInProps) {
  const handleClick = () => {
    signIn()
  }
  return (
    <Button variant="primary" size={"default"} onClick={handleClick}>
      {icon && (
        <Icons.login className={"stroke-secondary dark:stroke-primary"} />
      )}
      <span className="mx-2">{label}</span>
      <span className="sr-only">{label}</span>
    </Button>
  )
}
