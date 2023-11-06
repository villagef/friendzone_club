import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import SidebarNav from "./SidebarNav"
import Nav from "./Nav"

export default async function MainNav() {
  const session = await getServerSession(authOptions)
  return (
    <div className="sticky left-0 top-0 z-10 flex w-full items-center justify-center bg-gradient-to-l from-primaryGradientStart to-primaryGradientEnd px-4 py-2">
      <Nav session={session} />
      <SidebarNav session={session} />
    </div>
  )
}
