import Nav from "./Nav"
import SidebarNav from "./SidebarNav"

export default function MainNav() {
  return (
    <div className="sticky left-0 top-0 z-10 flex w-full items-center justify-center bg-gradient-to-l from-primaryGradientStart to-primaryGradientEnd px-4 py-2">
      <Nav />
      <SidebarNav />
    </div>
  )
}
