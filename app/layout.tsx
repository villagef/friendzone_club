import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "sonner"

import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProvider>
      <html lang="en" suppressHydrationWarning>
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
