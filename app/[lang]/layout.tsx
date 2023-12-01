import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"

import "./globals.css"

import { notFound } from "next/navigation"
import { i18n, Locale } from "@/i18n"

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

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ params: { locale } }))
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
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