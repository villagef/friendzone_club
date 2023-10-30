import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { subNavbarConfig } from "@/config/subNavbar";
import { Separator } from "@/components/ui/separator";
import { navbarConfig } from "@/config/navbar";
import SidebarNavLink from "./SidebarNavLink";
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
  const { profile, settings, subscription, becomeFriend, logout } =
    subNavbarConfig;
  const [open, setOpen] = useState(false);

  const handleHamburger = () => {
    setOpen(prev => !prev);
  };

  const handleLogout = () => {
    router.push("/");
    handleHamburger();
  };

  return (
    <Sheet>
      <div
        className={`${
          open ? "hidden" : "flex sm:hidden"
        } w-full flex-row items-center justify-between px-6 py-4`}
      >
        <Link href={"/"}>
          <Image src="/logo.svg" alt="Logo" width={240} height={24} priority />
        </Link>
        <SheetTrigger asChild>
          <Button variant="ghost" size={"icon"} onClick={handleHamburger}>
            <Icons.hamburger />
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent side="top" className="h-full">
        <SheetHeader>
          <SheetTitle>
            <Link href={"/"}>
              <Image
                src="/logo.svg"
                alt="Logo"
                width={240}
                height={24}
                priority
              />
            </Link>
            <SheetClose
              asChild
              onClick={handleHamburger}
              className="absolute right-3 top-3"
            >
              <Button variant="ghost" size={"icon"}>
                <Icons.close />
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <Link href={becomeFriend.href}>
          <Button variant="ghost" size={"xl"} className="mt-4">
            {profile.name}
          </Button>
          <Separator />
        </Link>
        <div className="flex flex-col items-center justify-center py-4">
          {Object.values(navbarConfig).map(props => (
            <SidebarNavLink key={props.name} {...props} />
          ))}
        </div>
        <Separator />
        <Link href={becomeFriend.href}>
          <Button variant="primary" size={"xl"} className="my-4">
            {becomeFriend.name}
          </Button>
        </Link>
        <Separator />
        <div className="flex flex-col items-center justify-center py-4">
          {[settings, subscription].map(props => (
            <SidebarNavLink key={props.name} {...props} />
          ))}
        </div>
        <SheetFooter>
          <Button variant="outline" size={"xl"} onClick={handleLogout}>
            {logout.name}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
