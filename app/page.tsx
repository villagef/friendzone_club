import Link from "next/link";
import Image from "next/image";
import { firstSection, landingPage } from "@/config/home";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className="w-full bg-gradient-to-t from-primaryGradientStart to-primaryGradientEnd">
        <div className="container flex h-[calc(100vh-70px)] max-h-[800px] max-w-screen-2xl flex-col items-center justify-center bg-transparent sm:p-8 lg:flex-row">
          <div className="h-50 flex w-full flex-col items-center justify-center p-8 lg:w-[990px]">
            <p className="text-center text-4xl font-bold tracking-tight text-primary md:text-5xl md:tracking-wide xl:text-6xl">
              {landingPage.title}
            </p>
            <p className="mt-2 text-center text-sm leading-8 text-slate-300 dark:text-gray-300 sm:mt-6 md:text-lg ">
              {landingPage.subtitle}
            </p>
            <Link href={landingPage.actionButtonTarget}>
              <Button variant={"primary"} size={"lg"} className="mt-4">
                {landingPage.actionButton}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <main className="w-full bg-transparent py-8">
        <div className="container flex h-3/5 max-h-[450px] max-w-screen-2xl flex-col items-center justify-center bg-transparent sm:p-8 lg:flex-row">
          <div className="h-50 order-2 flex w-full flex-col items-center justify-center p-8 lg:order-1 lg:w-1/2">
            <p className=" text-center text-3xl font-bold tracking-tight text-black md:text-4xl md:tracking-wide lg:text-start ">
              {firstSection.title}
            </p>
            <p className="mt-2 text-center text-sm leading-8 text-black sm:mt-6 md:text-lg lg:text-start ">
              {firstSection.subtitle}
            </p>
          </div>
          <div className="h-50 order-1 mt-24 flex w-full flex-col items-center justify-center p-8 lg:order-2 lg:mt-0 lg:w-1/2">
            <Image
              src={"/phone.avif"}
              width={600}
              height={600}
              alt="image"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </main>
    </>
  );
}
