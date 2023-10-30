import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { subNavbarConfig } from "@/config/subNavbar";
import ProfileLink from "./ProfileLink";
import UserAvatar from "./UserAvatar";
import { Button } from "../ui/button";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { profile, settings, subscription, help, becomeFriend, logout } =
    subNavbarConfig;

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <li>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={"avatar"} size={"avatar"}>
            <UserAvatar />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[280px]">
          <Link href={profile.href}>
            <DropdownMenuLabel className="flex">
              <UserAvatar />
              <div className="px-2">
                <span className="my-0 py-0 pl-2 text-lg">John</span>
                <p className="my-0 py-0 pl-2 text-xs text-slate-700">
                  {profile.name}
                </p>
              </div>
            </DropdownMenuLabel>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <ProfileLink {...subscription} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ProfileLink {...settings} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ProfileLink {...help} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={becomeFriend.href}>
              <Button variant="primary" size={"xl"} className="my-3">
                {becomeFriend.name}
              </Button>
            </Link>
            <Button variant="outline" size={"xl"} onClick={handleLogout}>
              {logout.name}
            </Button>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
