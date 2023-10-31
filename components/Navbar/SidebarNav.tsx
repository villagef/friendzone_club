"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { subNavbarConfig } from "@/config/subNavbar";
import { Separator } from "@/components/ui/separator";
import { navbarConfig, NavLinkProps } from "@/config/navbar";
import SidebarNavLink from "./SidebarNavLink";
import UserAvatar from "./UserAvatar";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function SidebarNav() {
  const router = useRouter();
  const { profile, settings, subscription, help, becomeFriend, logout } =
    subNavbarConfig;
  const [open, setOpen] = useState(false);
  const links = Object.values(navbarConfig);
  const subLinks = [settings, subscription, help] as NavLinkProps[];

  const handleNavOpen = () => {
    setOpen(true);
  };

  const handleNavClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    router.push("/");
    handleNavClose();
  };

  return (
    <Sheet key={"top"}>
      <div
        className={`${
          open ? "hidden" : "flex sm:hidden"
        } w-full flex-row items-center justify-between px-6 py-4`}
      >
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={240}
            height={24}
            className="pr-4"
            priority
          />
        </Link>
        <SheetTrigger asChild>
          <Button variant="ghost" size={"icon"} onClick={handleNavOpen}>
            <Icons.hamburger />
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent side="top" className="h-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <Link href={"/"}>
              <SheetTrigger asChild>
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={200}
                  height={24}
                  priority
                />
              </SheetTrigger>
            </Link>
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
                <span className="my-0 py-0 text-lg font-bold text-primary">
                  John
                </span>
                <p className="my-0 py-0 text-sm text-secondary">
                  {profile.name}
                </p>
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
        <Link href={becomeFriend.href}>
          <SheetTrigger asChild>
            <Button
              variant="primary"
              size={"xl"}
              className="my-1.5"
              onClick={handleNavClose}
            >
              {becomeFriend.name}
            </Button>
          </SheetTrigger>
        </Link>
        <div className="flex flex-col items-center justify-center py-4">
          {subLinks.map(props => (
            <SheetTrigger key={props.name} asChild>
              <SidebarNavLink {...props} onClick={handleNavClose} />
            </SheetTrigger>
          ))}
        </div>
        <SheetFooter>
          <SheetTrigger asChild>
            <Button variant="outline" size={"xl"} onClick={handleLogout}>
              {logout.name}
            </Button>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
