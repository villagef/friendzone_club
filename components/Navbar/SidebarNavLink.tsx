import { forwardRef } from "react"
import Link from "next/link"
import { Icons } from "../icons"
import { Button } from "../ui/button"

interface NavLinkProps {
  href: string
  name: string
  icon?: keyof typeof Icons
  onClick: () => void
}

const SidebarNavLink = forwardRef(
  ({ href, name, icon, onClick }: NavLinkProps) => {
    const IconComponent = icon && Icons[icon]
    return (
      <Link href={href} onClick={onClick} className="w-full">
        {IconComponent ? (
          <Button
            variant="ghost"
            size="xl"
            className="my-1.5 bg-secondary/5"
            aria-label={`Navigate to ${name}`}
          >
            <IconComponent className="stroke-white" />
            <span className="mx-2 text-secondary dark:text-primary">
              {name}
            </span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="xl"
            className="my-1.5 bg-secondary/5 text-secondary dark:text-primary"
            aria-label={`Navigate to ${name}`}
          >
            {name}
          </Button>
        )}
      </Link>
    )
  },
)

SidebarNavLink.displayName = "SidebarNavLink"

export default SidebarNavLink
