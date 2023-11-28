import { redirect } from "next/navigation"
import type { Locale } from "@/i18n.config"

import { DictionaryType } from "./types"

const dictionaries: Record<Locale, () => Promise<DictionaryType>> = {
  en: async () =>
    import("@/dictionaries/en.json").then((module) => module.default),
  pl: async () =>
    import("@/dictionaries/pl.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  if (dictionaries[locale]) {
    return await dictionaries[locale]()
  } else {
    redirect("/")
  }
}
