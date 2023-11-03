import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { DM_Sans as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { MainNav } from "@/components/Navbar"
import Footer from "@/components/Footer"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "w-full overflow-x-hidden bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <MainNav />
          <div className="min-h-[calc(100vh-143px)] w-full">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
