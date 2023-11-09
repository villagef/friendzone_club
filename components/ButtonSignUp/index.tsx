import Link from "next/link"
import { heroSection } from "@/config/home"
import { Button } from "../ui/button"
import { Icons } from "../icons"

interface ButtonSignUpProps {
  icon?: boolean
}

export default function ButtonSignUp({ icon }: ButtonSignUpProps) {
  return (
    <Link href="/signup">
      <Button variant="primary" size={"lg"}>
        {icon && (
          <Icons.login className={"stroke-secondary dark:stroke-primary"} />
        )}
        <span className="mx-2">{heroSection.actionButton}</span>
        <span className="sr-only">{heroSection.actionButton}</span>
      </Button>
    </Link>
  )
}
