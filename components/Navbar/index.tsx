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
      className={`sticky top-0 flex w-full items-center justify-center ${
        scrollYPos > 0 ? "bg-popover" : "bg-transparent"
      }`}
    >
      <div className="flex w-full max-w-screen-2xl flex-col items-center justify-between px-6 py-4 sm:flex-row">
        <Link href={"/"}>
          <Image src="/logo.svg" alt="Logo" width={240} height={24} priority />
        </Link>
        <ul className="mt-8 flex items-center gap-x-6 sm:mt-0 sm:gap-x-9">
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
