import Image from "next/image"
import { firstSection, heroSection } from "@/config/home"
import FAQSection from "@/components/FAQSection"
import ReviewsSection from "@/components/ReviewsSection"
import ButtonSignUp from "@/components/ButtonSignUp"

export default function Home() {
  return (
    <>
      <main className="w-full bg-gradient-to-l from-primaryGradientStart to-primaryGradientEnd">
        <div className="container flex h-auto max-h-[800px] max-w-screen-2xl flex-col items-center justify-center bg-transparent px-6 py-16 sm:p-8 md:py-36 lg:flex-row xl:h-[calc(100vh-70px)]">
          <div className="h-50 flex w-full flex-col items-center justify-center text-primary lg:w-[990px]">
            <p className="text-center text-4xl  font-bold tracking-tight sm:text-5xl md:text-5xl md:tracking-wide xl:text-6xl">
              {heroSection.title}
            </p>
            <p className="mt-4 text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-5xl md:tracking-wide xl:text-6xl">
              {heroSection.subtitle}
            </p>
            <p className="md:px-42 lg:px-46 text-md mt-2 p-0 py-6 text-center leading-8 tracking-wider sm:mt-6 sm:px-24 md:text-xl">
              {heroSection.description}
            </p>
            <ButtonSignUp />
          </div>
        </div>
      </main>
      <main className="w-full py-6">
        <div className="container flex h-3/5 w-full max-w-screen-2xl flex-col items-center justify-center bg-transparent px-0 sm:px-8 lg:flex-row">
          <div className="h-50 order-2 ml-0 mt-16 flex w-full flex-col items-center justify-center px-6 md:ml-6 lg:order-1 lg:mt-0 lg:w-1/2">
            <p className=" text-center text-3xl font-bold tracking-tight text-primary md:text-4xl md:tracking-wide lg:text-start ">
              {firstSection.title}
            </p>
            <p className="text-md py-6 text-center leading-8 tracking-wide text-primary md:text-xl lg:text-start">
              {firstSection.subtitle}
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
      <main className="w-full bg-gradient-to-l from-primaryGradientStart to-primaryGradientEnd py-6 sm:py-12">
        <FAQSection />
      </main>
    </>
  )
}
