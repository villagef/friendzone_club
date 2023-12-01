import React from "react"
import Link from "next/link"

import { subNavbarConfig } from "@/config/subNavbar"

import { Button } from "../ui/button"

interface ButtonCreditsProps {
  label: string
  onClick?: () => void
}

const ButtonCredits = React.forwardRef<HTMLAnchorElement, ButtonCreditsProps>(
  ({ label, onClick }, ref) => {
    const { credits } = subNavbarConfig
    return (
      <Link
        href={credits.href}
        className="w-full"
        onClick={onClick && onClick}
        ref={ref}
      >
        <Button
          variant="primary"
          size={"xl"}
          className="my-1 w-full"
          onClick={onClick && onClick}
        >
          {label}
          <span className="sr-only">{label}</span>
        </Button>
      </Link>
    )
  },
)

ButtonCredits.displayName = "ButtonCredits"

export default ButtonCredits
