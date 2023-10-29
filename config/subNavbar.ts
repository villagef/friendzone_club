export const subNavbarConfig = {
  profile: {
    name: "Profile",
    href: "/home/account/profile",
    description: "Profile",
  },
  settings: {
    name: "Settings",
    href: "/home/account/settings",
    description: "Account Settings",
  },
  subcription: {
    name: "Subscription",
    href: "/home/account/subscription",
    description: "Select Subscription Plan",
  },
  becomeFriend: {
    name: "Become a Friend",
    href: "/home/become",
    description: "Become a Friend",
  },
  logout: {
    name: "Logout",
    href: "/",
    description: "Profile settings",
  },
};

export type SubNavbarConfig = typeof subNavbarConfig;
