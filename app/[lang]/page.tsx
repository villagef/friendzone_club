import { Locale } from "@/i18n"

import { getDictionary } from "@/lib/dictionary"
import FAQSection from "@/app/[lang]/_home/FAQSection"
import ReviewsSection from "@/app/[lang]/_home/ReviewsSection"

import HeroSection from "./_home/HeroSection"
import PrologSection from "./_home/PrologSection"

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)
  return (
    <>
      <main className="w-full">
        <HeroSection dictionary={page.home.hero} />
      </main>
      <main className="w-full bg-background py-6">
        <PrologSection dictionary={page.home.prolog} />
      </main>
      <main className=" md-24 w-full bg-foreground py-8 shadow-md sm:py-12 lg:py-20">
        <ReviewsSection dictionary={page.home.reviews} />
      </main>
      <main className="w-full py-6 sm:py-12">
        <FAQSection dictionary={page.home.faq} />
      </main>
    </>
  )
}
