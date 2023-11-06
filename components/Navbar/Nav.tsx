import { Session } from "next-auth"
import { navbarConfig } from "@/config/navbar"
import NavLink from "./NavLink"
import Profile from "./Profile"
import Logo from "../Logo"
import ButtonSignIn from "../ButtonSignIn"
import ModeToggle from "../ModeToggle"
import Language from "../LanguageToggle"

interface NavProps {
  session: Session | null
}

export default function Nav({ session }: NavProps) {
  return (
    <div className="hidden h-[55px] w-full max-w-screen-2xl flex-col items-center justify-between sm:flex sm:flex-row">
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
