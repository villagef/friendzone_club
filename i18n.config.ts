export const i18n = {
  defaultLocale: "en",
  locales: ["en", "pl"],
  //   localeDetection: false,
  //   localeDir: "locales",
  //   enableInSFC: false,
} as const

export type Locale = (typeof i18n.locales)[number]
