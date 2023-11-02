import Link from "next/link"
import { footerConfig } from "@/config/footer"
import Logo from "../Logo"

export default function Footer() {
  const links = Object.values(footerConfig)
  return (
    <div className="w-full bg-primaryGradientStart py-6 sm:py-6">
      <div className="container flex w-full flex-col items-center justify-center px-10 text-primary md:flex-row">
        <div className="flex w-full pb-6 sm:pb-0">
          <Logo width={200} />
        </div>
        <div className="flex w-full flex-col justify-end gap-4 whitespace-nowrap px-4 text-white md:flex-row md:justify-center">
          {links.map(link => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex w-full justify-start whitespace-nowrap pt-8 text-muted-foreground md:justify-end md:pt-0">
          © 2023 FriendZone Club Inc.
        </div>
      </div>
    </div>
  )
}
