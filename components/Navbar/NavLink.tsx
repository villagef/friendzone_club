"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useScroll } from "@/hooks/useScroll"
import { Icons } from "../icons"

interface NavLinkProps {
  href: string
  name: string
  icon: keyof typeof Icons
}

export default function NavLink({ href, name, icon }: NavLinkProps) {
  const IconComponent = Icons[icon]
  const { y } = useScroll()

  const stroke = y > 0 ? "stroke-primary" : "stroke-secondary"

  return (
    <li>
      <Link href={href}>
        {icon ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Navigate to ${name}`}
          >
            <IconComponent className={stroke} />
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
