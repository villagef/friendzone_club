import Link from "next/link"
import { subNavbarConfig } from "@/config/subNavbar"
import { Button } from "../ui/button"

interface ButtonCreditsProps {
  onClick?: () => void
}

export default function ButtonCredits ({ onClick }: ButtonCreditsProps) {
  const { credits } = subNavbarConfig;
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
}

