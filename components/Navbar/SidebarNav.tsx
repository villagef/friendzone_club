"use client"

import Link from "next/link"
import { useState } from "react"
import { Session } from "next-auth"
import { subNavbarConfig } from "@/config/subNavbar"
import { Separator } from "@/components/ui/separator"
import { navbarConfig, NavLinkProps } from "@/config/navbar"
import SidebarNavLink from "./SidebarNavLink"
import UserAvatar from "./UserAvatar"
import { ModeToggle } from "./ModeToggle"
import Language from "./Language"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import Logo from "../Logo"
import ButtonSignOut from "../ButtonSignOut"
import ButtonSignIn from "../ButtonSignIn"
import ButtonCredits from "../ButtonCredits"

interface NavProps {
  session: Session | null
}

export default function SidebarNav({ session }: NavProps) {
  const { profile, settings, support, credits } = subNavbarConfig
  const [open, setOpen] = useState(false)
  const links = Object.values(navbarConfig)
  const subLinks = [settings, support] as NavLinkProps[]
  const userName = session?.user?.name
  const userAvatar = session?.user?.image

  const handleNavOpen = () => {
    setOpen(true)
  }

  const handleNavClose = () => {
    setOpen(false)
  }

  return session ? (
    <Sheet key={"top"}>
      <div
        className={`${
          open ? "hidden" : "flex sm:hidden"
        } w-full flex-row items-center justify-between`}
      >
        <Logo styling={`pr-2`} />
        <SheetTrigger asChild>
          <Button variant="ghost" size={"icon"} onClick={handleNavOpen}>
            <Icons.hamburger />
            <span className="sr-only">Open side menu</span>
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent
        side="top"
        className="h-full overflow-y-auto bg-gradient-to-b from-primaryGradientStart to-primaryGradientEnd "
      >
        <SheetHeader>
          <SheetTitle>
            <div className="flex w-full">
              <SheetTrigger>
                <Logo width={180} />
              </SheetTrigger>
            </div>
            <SheetClose
              asChild
              onClick={handleNavClose}
              className="absolute right-3 top-3"
            >
              <Button variant="ghost" size={"icon"}>
                <Icons.close />
                <span className="sr-only">Close side menu</span>
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <Link href={profile.href}>
          <SheetTrigger className="w-full">
            <div
              className="my-4 flex justify-center text-start"
              onClick={handleNavClose}
            >
              <UserAvatar src={userAvatar} />
              <div className="pl-4">
                <span className="my-0 py-0 text-lg font-bold">{userName}</span>
                <p className="my-0 py-0 text-sm">{profile.name}</p>
              </div>
            </div>
            <Separator />
          </SheetTrigger>
        </Link>
        <div className="flex flex-col items-center justify-center py-3">
          {links.map(props => (
            <SheetTrigger key={props.name} asChild>
              <SidebarNavLink {...props} onClick={handleNavClose} />
            </SheetTrigger>
          ))}
        </div>
        <SheetTrigger asChild>
          <ButtonCredits onClick={handleNavClose} />
        </SheetTrigger>
        <div className="flex flex-col items-center justify-center py-4 ">
          {subLinks.map(props => (
            <SheetTrigger key={props.name} asChild>
              <SidebarNavLink {...props} onClick={handleNavClose} />
            </SheetTrigger>
          ))}
        </div>
        <SheetFooter>
          <ButtonSignOut />
        </SheetFooter>
        <SheetFooter className="flex flex-row items-center justify-center gap-8 pt-6">
          <ModeToggle />
          <Language />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ) : (
    <div
      className={`flex w-full flex-row items-center justify-between sm:hidden`}
    >
      <Logo width={190} styling="pr-2" />
      <div className="flex gap-x-2">
        <ModeToggle />
        <Language />
        <ButtonSignIn />
      </div>
    </div>
  )
}
