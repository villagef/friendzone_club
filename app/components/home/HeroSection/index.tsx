import { DictionaryType } from "@/lib/types"
import ButtonSignUp from "@/components/ButtonSignUp"

interface HeroSectionProps {
  dictionary: DictionaryType["page"]["home"]["hero"]
}
export default function HeroSection({ dictionary }: HeroSectionProps) {
  return (
    <div className="container flex h-auto max-h-[800px] max-w-screen-2xl flex-col items-center justify-center bg-transparent px-6 py-16 sm:p-8 md:py-36 lg:flex-row xl:h-[calc(100vh-55px)]">
      <div className="flex h-2/3 w-full flex-col items-center justify-center py-12 text-primary sm:h-full lg:w-[1100px]">
        <p className="text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-5xl md:tracking-wide xl:text-6xl">
          {dictionary.title}
        </p>
        <p className="mt-4 text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-5xl md:tracking-wide xl:text-6xl">
          {dictionary.subtitle}
        </p>
        <p className="md:px-42 lg:px-46 text-md mt-2 p-0 py-6 text-center leading-8 tracking-wider sm:mt-6 sm:px-24 md:text-xl">
          {dictionary.description}
        </p>
        <ButtonSignUp label={dictionary.join} />
      </div>
    </div>
  )
}
