import Image from "next/image"

import { DictionaryType } from "@/lib/types"

interface PrologSectionProps {
  dictionary: DictionaryType["page"]["home"]["prolog"]
}

export default function PrologSection({ dictionary }: PrologSectionProps) {
  return (
    <div className="container flex h-3/5 w-full max-w-screen-2xl flex-col items-center justify-center bg-transparent px-0 sm:px-8 lg:flex-row">
      <div className="h-50 order-2 ml-0 mt-16 flex w-full flex-col items-center justify-center px-6 md:ml-6 lg:order-1 lg:mt-0 lg:w-1/2">
        <p className=" text-center text-3xl font-bold tracking-tight text-primary md:text-4xl md:tracking-wide lg:text-start ">
          {dictionary.title}
        </p>
        <p className="text-md py-6 text-center leading-8 tracking-wide text-primary md:text-xl lg:text-start">
          {dictionary.subtitle}
        </p>
      </div>
      <div className="md:h-50 order-1 flex w-full flex-col items-center justify-center px-6 lg:order-2 lg:mt-0 lg:w-1/2">
        <Image
          src={"/images/phone.avif"}
          width={500}
          height={400}
          alt="Phone with user profiles"
          className="mt-4 rounded-xl shadow-xl sm:mt-0"
        />
      </div>
    </div>
  )
}
