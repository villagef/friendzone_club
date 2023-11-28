import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"

import "../globals.css"

import { notFound } from "next/navigation"
import { Locale, locales } from "@/i18n"

import { cn } from "@/lib/utils"
import Footer from "@/components/Footer"
import MainNav from "@/components/Navbar"

import Provider from "./provider"

const font = FontSans({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "FriendZone Club",
  description: "FriendZone Club cheating app",
}

// export async function generateStaticParams() {
//   return locales.map((locale) => ({ params: { locale } }))
// }

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  if (!locales.includes(locale as string)) notFound()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "w-full overflow-x-hidden bg-gradient-to-l from-primaryGradientStart to-primaryGradientEnd font-sans antialiased",
          font.className,
        )}
      >
        <Provider locale={locale}>
          <MainNav />
          <div className=" w-full">{children}</div>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
