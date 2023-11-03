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
  ({ href, name, icon, onClick }: NavLinkProps, _ref) => {
    const IconComponent = icon && Icons[icon]
    return (
      <Link href={href} onClick={onClick}>
        {IconComponent ? (
          <Button variant="ghost" size="default" className="my-2">
            <IconComponent className="stroke-secondary dark:stroke-primary" />
            <span className="mx-2 text-secondary dark:text-primary">
              {name}
            </span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="default"
            className="text-secondary dark:text-primary"
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
