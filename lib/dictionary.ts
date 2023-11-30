import { notFound } from "next/navigation"
import type { Locale } from "@/i18n"

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  pl: () => import("@/dictionaries/pl.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  const dictionaryFunction = dictionaries[locale]
  if (dictionaryFunction) {
    return await dictionaryFunction()
  } else {
    return notFound()
  }
}
