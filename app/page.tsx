import Link from "next/link";
import Image from "next/image";
import { firstSection, heroSection } from "@/config/home";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className="w-full bg-gradient-to-t from-primaryGradientStart to-primaryGradientEnd">
        <div className="container flex h-[calc(100vh-70px)] max-h-[800px] max-w-screen-2xl flex-col items-center justify-center bg-transparent sm:p-8 lg:flex-row">
          <div className="h-50 flex w-full flex-col items-center justify-center p-6 lg:w-[990px]">
            <p className="text-center text-4xl  font-bold tracking-tight text-primary sm:text-5xl md:text-5xl md:tracking-wide xl:text-6xl">
              {heroSection.title}
            </p>
            <p className="mt-4 text-center text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-5xl md:tracking-wide xl:text-6xl">
              {heroSection.subtitle}
            </p>
            <p className="md:px-42 lg:px-46 text-md mt-2 p-0 py-6 text-center leading-8 tracking-wider text-white sm:mt-6 sm:px-24 md:text-xl">
              {heroSection.description}
            </p>
            <Link href={heroSection.actionButtonTarget}>
              <Button variant={"primary"} size={"lg"} className="mt-4 text-lg">
                {heroSection.actionButton}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <main className="w-full bg-transparent">
        <div className="container flex h-3/5 w-full  max-w-screen-2xl flex-col items-center justify-center bg-transparent p-6 sm:p-8 lg:flex-row">
          <div className="h-50 order-2 flex w-full flex-col items-center justify-center p-2 px-8 lg:order-1 lg:w-1/2">
            <p className=" text-center text-4xl font-bold tracking-tight text-black md:text-5xl md:tracking-wide lg:text-start ">
              {firstSection.title}
            </p>
            <p className="text-md py-6 text-center leading-8 tracking-wider text-black md:text-2xl lg:text-start">
              {firstSection.subtitle}
            </p>
          </div>
          <div className="md:h-50 order-1 mb-8 flex w-full flex-col items-center justify-center lg:order-2 lg:mt-0 lg:w-1/2">
            <Image
              src={"/phone.avif"}
              width={500}
              height={400}
              alt="image"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </main>
    </>
  );
}
