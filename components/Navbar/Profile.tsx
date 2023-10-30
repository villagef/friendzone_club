import React from "react";
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
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { profile, settings, subscription, becomeFriend, logout } =
    subNavbarConfig;

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <li className="ml-3">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>FW</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>
            <ProfileLink {...profile} />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <ProfileLink {...subscription} />
            <ProfileLink {...settings} />
            <DropdownMenuSeparator />
            <Link href={becomeFriend.href}>
              <DropdownMenuItem>
                <Button variant="primary" size={"xl"}>
                  {becomeFriend.name}
                </Button>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Button variant="outline" size={"xl"} onClick={handleLogout}>
                {logout.name}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
