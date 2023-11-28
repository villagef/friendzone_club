import { i18n, Locale } from "@/i18n.config"
import { create } from "zustand"

import { getDictionary } from "@/lib/dictionary"
import { DictionaryType } from "@/lib/types"

interface StoreProps {
  email: string | null
  setEmail: (email: string) => void
  locale: Locale
  dictionary: DictionaryType | null
  setLocale: (locale: Locale) => void
  init: (lang: Locale) => Promise<void>
}

const useStore = create<StoreProps>((set) => ({
  email: null,
  setEmail: (value: string) => set(() => ({ email: value })),
  locale: i18n.defaultLocale,
  dictionary: null,
  setLocale: (newLocale: Locale) => {
    set({ locale: newLocale })
  },
  init: async (lang) => {
    const _locale = useStore.getState().locale || lang
    try {
      const dictionary = await getDictionary(_locale)
      set({ dictionary })
    } catch (error) {
      console.error(`Error initializing i18n store:`, error)
    }
  },
}))

export const initI18nStore = useStore.getState().init

export default useStore
