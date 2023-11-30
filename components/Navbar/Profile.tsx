"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

import { subNavbarConfig } from "@/config/subNavbar"
import { DictionaryType } from "@/lib/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import ButtonCredits from "../ButtonCredits"
import ButtonSignOut from "../ButtonSignOut"
import { Button } from "../ui/button"
import SidebarNavLink from "./SidebarNavLink"
import UserAvatar from "./UserAvatar"

interface ProfileProps {
  dictionary: DictionaryType["navigation"]
}

export default function Profile({ dictionary }: ProfileProps) {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const userName = session?.user?.name
  const userAvatar = session?.user?.image
  const { profile, settings, support } = subNavbarConfig
  const subLinks = [settings, support]

  return (
    <li>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={"avatar"} size={"avatar"}>
            <UserAvatar src={userAvatar} />
            <span className="sr-only">Visit your profile</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="hidden w-[280px] sm:block">
          <Link href={profile.href}>
            <DropdownMenuItem className="flex bg-primary/10">
              <UserAvatar src={userAvatar} />
              <div className="px-2">
                <span className="my-0 py-0 pl-2 text-lg font-medium">
                  {userName}
                </span>
                <p className="my-0 py-0 pl-2 text-xs font-normal">
                  {profile.name}
                </p>
              </div>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuGroup>
            {subLinks.map((props) => (
              <SidebarNavLink
                key={props.key}
                href={props.href}
                label={
                  dictionary.links[props.key as keyof typeof dictionary.links]
                }
                onClick={() => setOpen(false)}
              />
            ))}
            <ButtonCredits label={dictionary.credits} />
            <ButtonSignOut label={dictionary.signout} />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  )
}
