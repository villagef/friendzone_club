import { forwardRef } from "react"
import Link from "next/link"
import { subNavbarConfig } from "@/config/subNavbar"
import { Button } from "../ui/button"

interface ButtonCreditsProps {
  onClick?: () => void
}

const ButtonCredits = forwardRef(({ onClick }: ButtonCreditsProps, _ref) => {
  const { credits } = subNavbarConfig
  return (
    <Link href={credits.href} className="w-full" onClick={onClick && onClick}>
      <Button
        variant="primary"
        size={"xl"}
        className="my-1 w-full"
        onClick={onClick && onClick}
      >
        {credits.name}
        <span className="sr-only">{credits.name}</span>
      </Button>
    </Link>
  )
})

ButtonCredits.displayName = `${subNavbarConfig.credits.name}`

export default ButtonCredits
