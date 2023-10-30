"use client";

import { useScroll } from "@/hooks/useScroll";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";

export function MainNav() {
  const { y: scrollYPos } = useScroll();
  return (
    <div
      className={`sticky top-0 flex w-full items-center justify-center ${
        scrollYPos > 0 ? "bg-navbar" : "bg-transparent"
      }`}
    >
      <Nav />
      <SidebarNav />
    </div>
  );
}
