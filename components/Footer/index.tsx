import Link from "next/link"
import { footerConfig } from "@/config/footer"

export default function Footer() {
  const links = Object.values(footerConfig)
  return (
    <div className="w-full bg-primaryGradientStart py-6 sm:py-4">
      <div className="container flex w-full flex-col items-center justify-center px-10 text-white">
        <div className="flex w-full flex-col justify-end gap-4 whitespace-nowrap px-4 text-white sm:flex-row sm:justify-center">
          {links.map(link => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="w-full pt-4 text-center text-muted-foreground">
          © 2023 FriendZone Club
        </div>
      </div>
    </div>
  )
}
