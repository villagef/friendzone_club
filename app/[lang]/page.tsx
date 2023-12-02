import { getDictionary } from "@/lib/dictionary"
import { GlobalParamsType } from "@/lib/types"
import FAQSection from "@/app/components/home/FAQSection"
import HeroSection from "@/app/components/home/HeroSection"
import PrologSection from "@/app/components/home/PrologSection"
import ReviewsSection from "@/app/components/home/ReviewsSection"

export default async function Home({ params: { lang } }: GlobalParamsType) {
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
