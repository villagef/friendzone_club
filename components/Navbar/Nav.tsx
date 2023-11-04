import { Session } from "next-auth"
import { navbarConfig } from "@/config/navbar"
import Language from "./Language"
import NavLink from "./NavLink"
import Profile from "./Profile"
import { ModeToggle } from "./ModeToggle"
import Logo from "../Logo"
import ButtonSignIn from "../ButtonSignIn"

interface NavProps {
  session: Session | null
}

export default function Nav({ session }: NavProps) {
  return (
    <div className="hidden w-full max-w-screen-2xl flex-col items-center justify-between px-6 py-2 sm:flex sm:flex-row">
      <Logo />
      <ul className="mt-8 flex items-center sm:mt-0 sm:gap-x-5 md:gap-x-6 lg:gap-x-8">
        {session ? (
          <>
            {Object.values(navbarConfig).map(props => (
              <NavLink key={props.name} {...props} />
            ))}
            <Language />
            <ModeToggle />
            <Profile />
          </>
        ) : (
          <>
            <Language />
            <ModeToggle />
            <ButtonSignIn />
          </>
        )}
      </ul>
    </div>
  )
}
