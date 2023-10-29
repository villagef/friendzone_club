"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import Language from "./Language";
import Profile from "./Profile";

const config = [
  {
    href: "/explore",
    name: "Explore",
    icon: "/explore.svg",
  },
  {
    href: "/favourite",
    name: "Favourite",
    icon: "/favourite.svg",
  },
  {
    href: "/messages",
    name: "Messages",
    icon: "/message.svg",
  },
  {
    href: "/notifications",
    name: "Notifications",
    icon: "/notification.svg",
  },
];

export function MainNav() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-screen-2xl flex justify-between items-center p-6">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            alt="Logo"
            className="dark:invert"
            width={240}
            height={24}
            priority
          />
        </Link>
        <div className="">
          <ul className="flex items-center gap-x-6">
            {config.map(props => (
              <NavLink key={props.name} {...props} />
            ))}
            <Language />
            <Profile />
          </ul>
        </div>
      </div>
    </div>
  );
}
