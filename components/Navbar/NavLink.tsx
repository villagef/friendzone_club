import Link from "next/link"

import { Button } from "@/components/ui/button"

import { Icons } from "../icons"

interface NavLinkProps {
  href: string
  label: string
  icon: keyof typeof Icons
}

export default function NavLink({ href, label, icon }: NavLinkProps) {
  const IconComponent = Icons[icon]

  return (
    <li>
      <Link href={href}>
        {icon ? (
          <Button variant="ghost" size="icon">
            <IconComponent />
            <span className="sr-only">{`Navigate to ${label}`}</span>
          </Button>
        ) : (
          <Button variant="ghost" size="default">
            {label}
            <span className="sr-only">{`Navigate to ${label}`}</span>
          </Button>
        )}
      </Link>
    </li>
  )
}
