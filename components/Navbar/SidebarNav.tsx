"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { subNavbarConfig } from "@/config/subNavbar"
import { Separator } from "@/components/ui/separator"
import { navbarConfig, NavLinkProps } from "@/config/navbar"
import { useScroll } from "@/hooks/useScroll"
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

export default function SidebarNav() {
  const router = useRouter()
  const { profile, settings, support, credits, logout } = subNavbarConfig
  const [open, setOpen] = useState(false)
  const links = Object.values(navbarConfig)
  const subLinks = [settings, support] as NavLinkProps[]
  const { y } = useScroll()

  const stroke = y > 0 ? "stroke-primary" : "stroke-secondary"

  const handleNavOpen = () => {
    setOpen(true)
  }

  const handleNavClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    router.push("/")
    handleNavClose()
  }

  return (
    <Sheet key={"top"}>
      <div
        className={`${
          open ? "hidden" : "flex sm:hidden"
        } w-full flex-row items-center justify-between px-6 py-4`}
      >
        <Link href={"/"}>
          <Logo styling={`pr-2 ${stroke}`} />
        </Link>
        <SheetTrigger asChild>
          <Button variant="ghost" size={"icon"} onClick={handleNavOpen}>
            <Icons.hamburger className={stroke} />
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent
        side="top"
        className="h-full overflow-y-auto bg-primaryGradientStart text-secondary dark:text-primary"
      >
        <SheetHeader>
          <SheetTitle>
            <SheetTrigger asChild className="w-full">
              <Logo width={220} />
            </SheetTrigger>
            <SheetClose
              asChild
              onClick={handleNavClose}
              className="absolute right-3 top-3"
            >
              <Button variant="ghost" size={"icon"}>
                <Icons.close />
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <Link href={profile.href}>
          <SheetTrigger className="w-full">
            <div
              className="mt-5 flex justify-center pb-4 text-start"
              onClick={handleNavClose}
            >
              <UserAvatar />
              <div className="pl-4">
                <span className="my-0 py-0 text-lg font-bold">John</span>
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
            >
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
            <Button
              variant="outline"
              size={"xl"}
              className="font-bold"
              onClick={handleLogout}
            >
              {logout.name}
            </Button>
          </SheetTrigger>
        </SheetFooter>
        <SheetFooter className="flex flex-row items-center justify-center gap-8 py-8">
          <ModeToggle />
          <Language />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
