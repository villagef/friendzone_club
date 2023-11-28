import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { Toaster } from "sonner"

import ClientProvider from "@/components/ClientProvider"
import { ThemeProvider } from "@/components/theme-provider"

export default function Provider({
  locale,
  children,
}: {
  locale: string
  children: React.ReactNode
}) {
  const messages = useMessages()
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
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
    </NextIntlClientProvider>
  )
}
