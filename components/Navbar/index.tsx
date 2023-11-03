import SidebarNav from "./SidebarNav"
import Nav from "./Nav"

export function MainNav() {
  return (
    <div className="sticky left-0 top-0 z-10 flex w-full items-center justify-center bg-primaryGradientStart">
      <Nav />
      <SidebarNav />
    </div>
  )
}
