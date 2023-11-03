import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "../icons"

interface NavLinkProps {
  href: string
  name: string
  icon: keyof typeof Icons
}

export default function NavLink({ href, name, icon }: NavLinkProps) {
  const IconComponent = Icons[icon]

  return (
    <li>
      <Link href={href}>
        {icon ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Navigate to ${name}`}
          >
            <IconComponent className={"stroke-secondary dark:stroke-primary"} />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="default"
            aria-label={`Navigate to ${name}`}
          >
            {name}
          </Button>
        )}
      </Link>
    </li>
  )
}
