import { ReactElement } from "react"
import ButtonSignIn from "@/components/ButtonSignIn"
import Language from "@/components/LanguageToggle"
import Logo from "@/components/Logo"
import ModeToggle from "@/components/ModeToggle"

interface AuthenticationProps {
  isSignup?: boolean
  children?: ReactElement
}

export default function Authentication({
  isSignup,
  children,
}: AuthenticationProps) {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-screen flex-col items-center justify-center bg-gradient-to-b from-primaryGradientStart to-primaryGradientEnd md:grid lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-transparent p-6 dark:border-r lg:flex">
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
      <div className="flex h-full w-full items-center justify-center p-4 sm:p-10 lg:relative lg:bg-foreground lg:dark:bg-background">
        <div className="absolute right-0 top-3 flex w-full items-center justify-between sm:top-6 ">
          <div className="w-full px-4 sm:px-6 lg:hidden">
            <Logo />
          </div>
          <div className="flex w-full justify-end gap-x-2 pr-4 sm:pr-10">
            <Language />
            <ModeToggle />
            {isSignup && <ButtonSignIn />}
          </div>
        </div>
        <div className="w-full rounded-lg bg-background p-4 shadow-lg dark:bg-transparent/20 sm:w-auto sm:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
