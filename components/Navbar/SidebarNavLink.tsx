import Link from "next/link"

import { Icons } from "../icons"
import { Button } from "../ui/button"

interface NavLinkProps {
  href: string
  label: string
  icon?: keyof typeof Icons
  onClick?: () => void
}

export default function SidebarNavLink({
  href,
  label,
  icon,
  onClick,
}: NavLinkProps) {
  const IconComponent = icon && Icons[icon]
  return (
    <Link href={href} onClick={onClick} className="my-1 w-full">
      {IconComponent ? (
        <Button variant="ghost" size="xl">
          <IconComponent />
          <span className="mx-2">{label}</span>
        </Button>
      ) : (
        <Button variant="ghost" size="xl">
          {label}
        </Button>
      )}
    </Link>
  )
}
