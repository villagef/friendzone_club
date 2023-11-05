import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import SidebarNav from "./SidebarNav"
import Nav from "./Nav"

export default async function MainNav() {
  const session = await getServerSession(options)
  return (
    <div className="sticky left-0 top-0 z-10 flex w-full items-center justify-center bg-gradient-to-l from-primaryGradientStart to-primaryGradientEnd px-4 py-3">
      <Nav session={session} />
      <SidebarNav session={session} />
    </div>
  )
}
