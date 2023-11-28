"use client"

import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"

import { Icons } from "../icons"
import { Button } from "../ui/button"

interface ButtonSignInProps {
  icon?: boolean
}

export default function ButtonSignIn({ icon }: ButtonSignInProps) {
  const handleClick = () => {
    signIn()
  }
  const t = useTranslations("button")
  return (
    <Button variant="primary" size={"default"} onClick={handleClick}>
      {icon && (
        <Icons.login className={"stroke-secondary dark:stroke-primary"} />
      )}
      <span className="mx-2">{t("signin")}</span>
      <span className="sr-only">{t("signin")}</span>
    </Button>
  )
}
