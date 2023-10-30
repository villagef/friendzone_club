export const subNavbarConfig = {
  profile: {
    name: "My profile",
    href: "/account/profile",
    description: "Profile",
  },
  settings: {
    name: "Settings",
    href: "/account/settings",
    description: "Account Settings",
  },
  subscription: {
    name: "Subscription",
    href: "/account/subscription",
    description: "Select Subscription Plan",
  },
  help: {
    name: "Help",
    href: "/account/help",
    description: "Help",
  },
  becomeFriend: {
    name: "Become a Friend",
    href: "/become",
    description: "Become a Friend",
  },
  logout: {
    name: "Logout",
    href: "/",
    description: "Profile settings",
  },
};

export type SubNavbarConfig = typeof subNavbarConfig;
