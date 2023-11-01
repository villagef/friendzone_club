import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { subNavbarConfig } from "@/config/subNavbar";
import ProfileLink from "./ProfileLink";
import UserAvatar from "./UserAvatar";
import { Button } from "../ui/button";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const { profile, settings, support, credits, logout } = subNavbarConfig;

  return (
    <li>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={"avatar"} size={"avatar"}>
            <UserAvatar />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="hidden w-[280px] sm:block">
          <Link href={profile.href}>
            <DropdownMenuItem className="flex">
              <UserAvatar />
              <div className="px-2">
                <span className="my-0 py-0 pl-2 text-lg font-medium">John</span>
                <p className="my-0 py-0 pl-2 text-xs font-normal">
                  {profile.name}
                </p>
              </div>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <ProfileLink {...settings} />
            <ProfileLink {...support} />
            <DropdownMenuSeparator />
            <Link href={credits.href}>
              <DropdownMenuItem className="my-3 p-0">
                <Button
                  variant="primary"
                  size={"xl"}
                  className="m-0 hover:text-button"
                >
                  {credits.name}
                </Button>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <ProfileLink
              {...logout}
              className="py-2 font-bold text-transparent/70"
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
