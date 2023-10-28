"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

export function MainNav() {
  return (
    <div className="flex justify-between items-center py-6 px-20">
      <Link href={"/"}>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={240}
          height={24}
          priority
        />
      </Link>
      <ul className="flex gap-x-10">
        <NavLink href="/" name="Home" />
        <NavLink href="friends" name="Friends" />
        <NavLink href="search" name="Search" />
      </ul>
      <div className="h-10 w-10 rounded-full bg-gray-200 flex justify-center items-center relative">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Friend Avatar</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
