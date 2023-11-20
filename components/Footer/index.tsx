import Link from "next/link"

import { footerConfig } from "@/config/footer"

export default function Footer() {
  const links = Object.values(footerConfig)
  return (
    <div className="w-full py-6 sm:py-4">
      <div className="container flex w-full flex-col items-center justify-center px-6">
        <div className="flex w-full flex-col justify-end gap-4 whitespace-nowrap text-sm font-medium text-primary/80 sm:flex-row sm:justify-center">
          {links.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="w-full pt-4 text-center text-sm text-primary/60">
          © 2023 FriendZone Club
        </div>
      </div>
    </div>
  )
}
