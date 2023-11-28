"use client"

import { useSession } from "next-auth/react"

import { navbarConfig } from "@/config/navbar"

import ButtonSignIn from "../ButtonSignIn"
import Language from "../LanguageToggle"
import Logo from "../Logo"
import ModeToggle from "../ModeToggle"
import NavLink from "./NavLink"
import Profile from "./Profile"

export default function Nav() {
  const { data: session } = useSession()
  return (
    <div className="hidden h-[55px] w-full max-w-screen-2xl flex-col items-center justify-between sm:flex sm:flex-row">
      <Logo />
      <ul className="mt-8 flex items-center sm:mt-0 sm:gap-x-5 md:gap-x-6 lg:gap-x-8">
        {session ? (
          <>
            {Object.values(navbarConfig).map((props) => (
              <NavLink key={props.name} {...props} />
            ))}
            <ModeToggle />
            <Language />
            <Profile />
          </>
        ) : (
          <>
            <ModeToggle />
            <Language />
            <ButtonSignIn />
          </>
        )}
      </ul>
    </div>
  )
}
