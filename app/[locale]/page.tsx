import Image from "next/image"
import { useTranslations } from "next-intl"

import ButtonSignUp from "@/components/ButtonSignUp"
import FAQSection from "@/components/FAQSection"
import ReviewsSection from "@/components/ReviewsSection"

export default function Home() {
  const t = useTranslations("page")
  const tButton = useTranslations("button")
  return (
    <>
      <main className="w-full">
        <div className="container flex h-auto max-h-[800px] max-w-screen-2xl flex-col items-center justify-center bg-transparent px-6 py-16 sm:p-8 md:py-36 lg:flex-row xl:h-[calc(100vh-55px)]">
          <div className="flex h-2/3 w-full flex-col items-center justify-center py-12 text-primary sm:h-full lg:w-[1100px]">
            <p className="text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-5xl md:tracking-wide xl:text-6xl">
              {t("home.hero.title")}
            </p>
            <p className="mt-4 text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-5xl md:tracking-wide xl:text-6xl">
              {t("home.hero.subtitle")}
            </p>
            <p className="md:px-42 lg:px-46 text-md mt-2 p-0 py-6 text-center leading-8 tracking-wider sm:mt-6 sm:px-24 md:text-xl">
              {t("home.hero.description")}
            </p>
            <ButtonSignUp label={tButton("join")} />
          </div>
        </div>
      </main>
      <main className="w-full bg-background py-6">
        <div className="container flex h-3/5 w-full max-w-screen-2xl flex-col items-center justify-center bg-transparent px-0 sm:px-8 lg:flex-row">
          <div className="h-50 order-2 ml-0 mt-16 flex w-full flex-col items-center justify-center px-6 md:ml-6 lg:order-1 lg:mt-0 lg:w-1/2">
            <p className=" text-center text-3xl font-bold tracking-tight text-primary md:text-4xl md:tracking-wide lg:text-start ">
              {t("home.prolog.title")}
            </p>
            <p className="text-md py-6 text-center leading-8 tracking-wide text-primary md:text-xl lg:text-start">
              {t("home.prolog.subtitle")}
            </p>
          </div>
          <div className="md:h-50 order-1 flex w-full flex-col items-center justify-center px-6 lg:order-2 lg:mt-0 lg:w-1/2">
            <Image
              src={"/phone.avif"}
              width={500}
              height={400}
              alt="Phone with user profiles"
              className="mt-4 rounded-xl shadow-xl sm:mt-0"
            />
          </div>
        </div>
      </main>
      <main className="md-24 w-full bg-foreground py-8 shadow-md sm:py-12 lg:py-20">
        <ReviewsSection />
      </main>
      <main className="w-full py-6 sm:py-12">
        <FAQSection />
      </main>
    </>
  )
}
