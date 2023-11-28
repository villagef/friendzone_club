import Link from "next/link"

import { Icons } from "../icons"
import { Button } from "../ui/button"

interface ButtonSignUpProps {
  label: string
  icon?: boolean
}

export default function ButtonSignUp({ label, icon }: ButtonSignUpProps) {
  return (
    <Link href="/signup">
      <Button variant="primary" size={"lg"}>
        {icon && (
          <Icons.login className={"stroke-secondary dark:stroke-primary"} />
        )}
        <span className="mx-2">{label}</span>
        <span className="sr-only">{label}</span>
      </Button>
    </Link>
  )
}
