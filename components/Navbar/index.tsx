"use client";

import { useScroll } from "@/hooks/useScroll";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";

export function MainNav() {
  const { y: scrollYPos } = useScroll();
  return (
    <div
      className={`sticky left-0 top-0 z-10 flex w-full items-center justify-center ${
        scrollYPos > 0 ? "bg-primaryGradientEnd" : "bg-primaryGradientEnd"
      }`}
    >
      <Nav />
      <SidebarNav />
    </div>
  );
}
