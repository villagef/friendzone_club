import { Locale } from "@/i18n.config"

import { getDictionary } from "@/lib/dictionary"

import Nav from "./Nav"
import SidebarNav from "./SidebarNav"

interface MainNavProps {
  lang: Locale
}

export default async function MainNav({ lang }: MainNavProps) {
  const dictionary = await getDictionary(lang)
  return (
    <div className="sticky left-0 top-0 z-10 flex w-full items-center justify-center bg-gradient-to-l from-primaryGradientStart to-primaryGradientEnd px-2 py-1.5 sm:px-2 sm:py-0">
      <Nav dictionary={dictionary} />
      <SidebarNav dictionary={dictionary} />
    </div>
  )
}
