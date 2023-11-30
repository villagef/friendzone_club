export const subNavbarConfig = {
  profile: {
    name: "My profile",
    key: "profile",
    href: "/account/profile",
  },
  settings: {
    name: "Settings",
    key: "settings",
    href: "/account/settings",
  },
  support: {
    name: "Help & Support",
    key: "support",
    href: "/support",
  },
  credits: {
    name: "Add Credits",
    key: "credits",
    href: "/credits",
  },
}

export type SubNavbarConfig = typeof subNavbarConfig
