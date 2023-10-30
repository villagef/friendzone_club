export const subNavbarConfig = {
  profile: {
    name: "My profile",
    href: "/account/profile",
  },
  settings: {
    name: "Settings",
    href: "/account/settings",
  },
  subscription: {
    name: "Subscription",
    href: "/account/subscription",
  },
  help: {
    name: "Help",
    href: "/help",
  },
  becomeFriend: {
    name: "Become a Friend",
    href: "/plan",
  },
  logout: {
    name: "Logout",
    href: "/",
  },
};

export type SubNavbarConfig = typeof subNavbarConfig;
