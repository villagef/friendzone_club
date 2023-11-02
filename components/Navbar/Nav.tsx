"use client"

import { useTheme } from "next-themes"
import { navbarConfig } from "@/config/navbar"
import { useScroll } from "@/hooks/useScroll"
import Language from "./Language"
import NavLink from "./NavLink"
import Profile from "./Profile"
import { ModeToggle } from "./ModeToggle"
import Logo from "../Logo"

export default function Nav() {
  const { y } = useScroll()
  const { theme } = useTheme()
  const isDark = theme === "light" && y > 0
  return (
    <div className="hidden w-full max-w-screen-2xl flex-col items-center justify-between px-6 py-2 sm:flex sm:flex-row">
      <Logo dark={isDark} />
      <ul className="mt-8 flex items-center sm:mt-0 sm:gap-x-5 md:gap-x-6 lg:gap-x-8">
        {Object.values(navbarConfig).map(props => (
          <NavLink key={props.name} {...props} />
        ))}
        <Language />
        <ModeToggle />
        <Profile />
      </ul>
    </div>
  )
}
