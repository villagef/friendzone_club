import { Icons } from "@/components/icons"

export interface NavLinkProps {
  href: string
  key: string
  icon: keyof typeof Icons
}

export const navbarConfig: { [key: string]: NavLinkProps } = {
  explore: {
    href: "/explore",
    key: "explore",
    icon: "explore",
  },
  favourite: {
    href: "/favourite",
    key: "favourite",
    icon: "favourite",
  },
  message: {
    href: "/messages",
    key: "messages",
    icon: "message",
  },
  notification: {
    href: "/account/notifications",
    key: "notifications",
    icon: "notification",
  },
}
