import { redirect } from "next/navigation"
import { i18n, Locale } from "@/i18n.config"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "sonner"

import { getDictionary } from "@/lib/dictionary"
import ClientProvider from "@/components/ClientProvider"
import { ThemeProvider } from "@/components/theme-provider"

export default async function Provider({
  lang,
  children,
}: {
  lang: Locale
  children: React.ReactNode
}) {
  let dictionary
  try {
    dictionary = await getDictionary(lang)
  } catch (error) {
    redirect(i18n.defaultLocale)
  }
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
