import { navbarConfig } from "@/config/navbar";
import Link from "next/link";
import Image from "next/image";
import Language from "./Language";
import NavLink from "./NavLink";
import Profile from "./Profile";

export default function Nav() {
  return (
    <div className="hidden w-full max-w-screen-2xl flex-col items-center justify-between px-6 py-4 sm:flex sm:flex-row">
      <Link href={"/"}>
        <Image src="/logo.svg" alt="Logo" width={240} height={24} priority />
      </Link>
      <ul className="mt-8 flex items-center gap-x-6 sm:mt-0 sm:gap-x-9">
        {Object.values(navbarConfig).map(props => (
          <NavLink key={props.name} {...props} />
        ))}
        <Language />
        <Profile />
      </ul>
    </div>
  );
}
