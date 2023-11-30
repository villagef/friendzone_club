import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "sonner"

import ClientProvider from "@/components/ClientProvider"
import { ThemeProvider } from "@/components/theme-provider"

export default function Provider({
  children,
}: {
  locale: string
  children: React.ReactNode
}) {
  return (
    <ClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      <Toaster richColors />
      <Analytics />
    </ClientProvider>
  )
}
