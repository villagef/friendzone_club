import Link from "next/link";
import { landingPage } from "@/config/site";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className="w-full bg-gradient-to-t from-primaryGradientStart to-primaryGradientEnd">
        <div className="container flex h-[calc(70vh-70px)] max-h-[626px] max-w-screen-2xl flex-col items-center justify-center bg-transparent sm:p-8 lg:flex-row">
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
      <main className="container relative flex h-[calc(70vh-70px)] max-h-[625px] max-w-screen-2xl flex-col items-center justify-center bg-white sm:p-8 lg:flex-row xl:h-[calc(100vh-70px)]">
        <div className="h-50 flex w-full flex-col items-center justify-center p-8 lg:w-[990px]"></div>
      </main>
      <main className="container relative flex h-[calc(70vh-70px)] max-h-[625px] max-w-screen-2xl flex-col items-center justify-center bg-white sm:p-8 lg:flex-row xl:h-[calc(100vh-70px)]">
        <div className="h-50 flex w-full flex-col items-center justify-center p-8 lg:w-[990px]"></div>
      </main>
    </>
  );
}
