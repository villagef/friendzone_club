import Link from "next/link"
import { Locale } from "@/i18n"

import { getDictionary } from "@/lib/dictionary"

interface FooterProps {
  lang: Locale
}

export default async function Footer({ lang }: FooterProps) {
  const { footer } = await getDictionary(lang)
  const links = Object.entries(footer.links)

  return (
    <div className="w-full py-6 sm:py-4">
      <div className="container flex w-full flex-col items-center justify-center px-6">
        <div className="flex w-full flex-col justify-end gap-4 whitespace-nowrap text-sm font-medium text-primary/80 sm:flex-row sm:justify-center">
          {links.map((link) => (
            <Link key={link[0]} href={link[0]}>
              {link[1]}
            </Link>
          ))}
        </div>
        <div className="w-full pt-4 text-center text-sm text-primary/60">
          {footer.copyright}
        </div>
      </div>
    </div>
  )
}
