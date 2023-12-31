export const subNavbarConfig = {
  profile: {
    name: "My profile",
    href: "/account/profile",
  },
  settings: {
    name: "Settings",
    href: "/account/settings",
  },
  support: {
    name: "Help & Support",
    href: "/support",
  },
  credits: {
    name: "Add Credits",
    href: "/credits",
  },
  logout: {
    name: "Logout",
    href: "/",
  },
};

export type SubNavbarConfig = typeof subNavbarConfig;
