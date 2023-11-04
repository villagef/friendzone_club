"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { subNavbarConfig } from "@/config/subNavbar"
import ProfileLink from "./ProfileLink"
import UserAvatar from "./UserAvatar"
import { Button } from "../ui/button"
import ButtonSignOut from "../ButtonSignOut"

export default function Profile() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const userName = session?.user?.name
  const userAvatar = session?.user?.image
  const { profile, settings, support, credits } = subNavbarConfig

  return (
    <li>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"avatar"}
            size={"avatar"}
            aria-label="Visit your profile">
            <UserAvatar src={userAvatar} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="hidden w-[280px] sm:block">
          <Link href={profile.href}>
            <DropdownMenuItem className="flex">
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
            <ProfileLink {...settings} />
            <ProfileLink {...support} />
            <Link href={credits.href}>
              <DropdownMenuItem className="my-3 p-0">
                <Button
                  variant="primary"
                  size={"xl"}
                  className="m-0"
                  aria-label="Get more credits">
                  {credits.name}
                </Button>
              </DropdownMenuItem>
            </Link>
            <ButtonSignOut />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  )
}
