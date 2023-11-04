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
        } w-full flex-row items-center justify-between px-6 py-2`}>
        <Logo styling={`pr-2`} />
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size={"icon"}
            onClick={handleNavOpen}
            aria-label="Open side menu">
            <Icons.hamburger
              className={"stroke-secondary dark:stroke-primary"}
            />
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent
        side="top"
        className="h-full overflow-y-auto bg-primaryGradientStart text-secondary dark:text-primary">
        <SheetHeader>
          <SheetTitle>
            <SheetTrigger>
              <Logo width={200} />
            </SheetTrigger>
            <SheetClose
              asChild
              onClick={handleNavClose}
              className="absolute right-3 top-3">
              <Button
                variant="ghost"
                size={"icon"}
                aria-label="Close side menu">
                <Icons.close className="stroke-secondary dark:text-primary" />
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <Link href={profile.href}>
          <SheetTrigger className="w-full">
            <div
              className="mt-5 flex justify-center pb-4 text-start"
              onClick={handleNavClose}>
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
        <Link href={credits.href}>
          <SheetTrigger asChild>
            <Button
              variant="primary"
              size={"xl"}
              className="my-1.5"
              onClick={handleNavClose}
              aria-label="Get more credits">
              {credits.name}
            </Button>
          </SheetTrigger>
        </Link>
        <div className="flex flex-col items-center justify-center py-4 ">
          {subLinks.map(props => (
            <SheetTrigger key={props.name} asChild>
              <SidebarNavLink {...props} onClick={handleNavClose} />
            </SheetTrigger>
          ))}
        </div>
        <SheetFooter>
          <SheetTrigger asChild>
            <ButtonSignOut />
          </SheetTrigger>
        </SheetFooter>
        <SheetFooter className="flex flex-row items-center justify-center gap-8 py-8">
          <ModeToggle />
          <Language />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ) : (
    <div
      className={`flex w-full flex-row items-center justify-between px-2 py-4 sm:hidden`}>
      <Logo width={200} styling={`pr-2`} />
      <div className="flex gap-x-6">
        <ModeToggle />
        <Language />
        <ButtonSignIn icon />
      </div>
    </div>
  )
}
