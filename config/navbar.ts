import { Icons } from "@/components/icons";

export interface NavLinkProps {
  href: string;
  name: string;
  icon: keyof typeof Icons;
}

export const navbarConfig: { [key: string]: NavLinkProps } = {
  explore: {
    href: "/explore",
    name: "Explore",
    icon: "explore",
  },
  favourite: {
    href: "/favourite",
    name: "Favourite",
    icon: "favourite",
  },
  message: {
    href: "/messages",
    name: "Messages",
    icon: "message",
  },
  notification: {
    href: "/notifications",
    name: "Notifications",
    icon: "notification",
  },
};
