import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"

import "./globals.css"

import { i18n } from "@/i18n"

import { GlobalParamsType } from "@/lib/types"
import { cn } from "@/lib/utils"
import Footer from "@/components/Footer"
import MainNav from "@/components/Navbar"

import Provider from "./provider"

interface RootLayoutProps extends GlobalParamsType {
  children: React.ReactNode
}

const font = FontSans({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "FriendZone Club",
  description: "FriendZone Club cheating app",
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ params: { locale } }))
}

export default function RootLayout({
  children,
  params: { lang },
}: RootLayoutProps) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "w-full overflow-x-hidden bg-gradient-to-l from-primaryGradientStart to-primaryGradientEnd font-sans antialiased",
          font.className,
        )}
      >
        <Provider locale={lang}>
          <MainNav lang={lang} />
          <div className=" w-full">{children}</div>
          <Footer lang={lang} />
        </Provider>
      </body>
    </html>
  )
}
