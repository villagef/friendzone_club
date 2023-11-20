import { ReactElement } from "react"

import Language from "@/components/LanguageToggle"
import Logo from "@/components/Logo"
import ModeToggle from "@/components/ModeToggle"

interface AuthenticationProps {
  children?: ReactElement
}

export default function Authentication({ children }: AuthenticationProps) {
  return (
    <div className="fixed left-0 top-0 z-40 flex h-full w-screen flex-col items-center justify-center overflow-y-auto bg-gradient-to-b from-primaryGradientStart to-primaryGradientEnd md:grid lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-transparent px-4 py-5 dark:border-r dark:border-secondary/20 lg:flex">
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg italic">
              &ldquo;Discover a world of endless possibilities and meaningful
              connections as you take the first step towards an exciting journey
              of friendships and exploration.&rdquo;
            </p>
            <footer className="text-sm">~ Chat Gpt</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center p-0 sm:bg-transparent lg:relative lg:bg-foreground lg:dark:bg-background">
        <div className="absolute right-0 top-0 flex w-full items-center justify-between bg-foreground py-3 dark:bg-black sm:top-4 sm:bg-transparent sm:py-0 sm:dark:bg-transparent ">
          <div className="w-full px-4 sm:px-4 lg:hidden">
            <Logo />
          </div>
          <div className="flex w-full justify-end gap-x-2 pr-4 sm:pr-6">
            <Language />
            <ModeToggle />
          </div>
        </div>
        <div className="h-full w-full overflow-y-auto rounded-none bg-foreground p-4 pb-12 pt-24 shadow-lg dark:bg-black/80 sm:mb-8 sm:mt-16 sm:h-auto sm:w-auto sm:min-w-[350px] sm:max-w-[450px] sm:rounded-lg sm:p-6 lg:dark:bg-transparent/20">
          {children}
        </div>
      </div>
    </div>
  )
}
