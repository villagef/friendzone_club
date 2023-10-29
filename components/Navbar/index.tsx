"use client";

import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import Language from "./Language";
import Profile from "./Profile";
import { useScroll } from "@/hooks/useScroll";
import { navbarConfig } from "@/config/navbar";

export function MainNav() {
  const { y: scrollYPos } = useScroll();
  return (
    <div
      className={`w-full sticky top-0 flex items-center justify-center ${
        scrollYPos > 0 ? "bg-popover" : "bg-transparent"
      }`}>
      <div className="w-full max-w-screen-2xl flex justify-between flex-col sm:flex-row items-center p-6">
        <Link href={"/"}>
          <Image src="/logo.svg" alt="Logo" width={240} height={24} priority />
        </Link>
        <ul className="flex items-center gap-x-6 sm:gap-x-10 mt-8 sm:mt-0">
          {Object.values(navbarConfig).map(props => (
            <NavLink key={props.name} {...props} />
          ))}
          <Language />
          <Profile />
        </ul>
      </div>
    </div>
  );
}
