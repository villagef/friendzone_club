import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "sonner"

import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

import { i18n, Locale } from "@/i18n.config"

import { cn } from "@/lib/utils"
import ClientProvider from "@/components/ClientProvider"
import Footer from "@/components/Footer"
import MainNav from "@/components/Navbar"

const font = FontSans({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "FriendZone Club",
  description: "FriendZone Club cheating app",
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ params: { lang } }))
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <ClientProvider>
      <html lang={params.lang} suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "w-full overflow-x-hidden bg-gradient-to-l from-primaryGradientStart to-primaryGradientEnd font-sans antialiased",
            font.className,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <MainNav />
            <div className=" w-full">{children}</div>
            <Footer />
          </ThemeProvider>
          <Toaster richColors />
          <Analytics />
        </body>
      </html>
    </ClientProvider>
  )
}
