import Link from "next/link";
import Image from "next/image";

import { landingPage } from "@/config/site";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="container relative flex h-[calc(70vh-70px)] max-h-[625px] max-w-screen-2xl flex-col items-center sm:p-8 lg:flex-row xl:h-[calc(100vh-70px)]">
      <div className="w-50 order-1 flex h-full lg:order-2 lg:w-1/2">
        <Image
          src="/woman.png"
          alt="Woman Image"
          width={700}
          height={500}
          className="rounded-lg object-cover opacity-60"
        />
      </div>
      <div className="h-50 order-2 flex w-full flex-col items-center justify-end p-8 sm:w-[500px] lg:order-1 lg:w-1/2">
        <p className="text-center text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-start xl:text-6xl">
          {landingPage.title}
        </p>
        <p className="mt-2 text-center text-sm leading-8 text-slate-300 dark:text-gray-300 sm:mt-6 md:text-lg lg:text-start">
          {landingPage.subtitle}
        </p>
        <Link href={landingPage.actionButtonTarget} className="w-full">
          <Button variant={"primary"} size={"xl"} className="mt-4">
            {landingPage.actionButton}
          </Button>
        </Link>
      </div>
    </main>
  );
}
