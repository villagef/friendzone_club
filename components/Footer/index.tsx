import Link from "next/link";
import Image from "next/image";
import { footerConfig } from "@/config/footer";

export default function Footer() {
  const links = Object.values(footerConfig);
  return (
    <div className="w-full bg-primaryGradientEnd">
      <div className="container flex w-full flex-col items-center justify-center px-10 py-6 text-white  md:flex-row">
        <div className="flex w-full pb-6 sm:pb-0">
          <Link href={"/"} className="mb-6 md:mb-0">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={190}
              height={20}
              priority
            />
          </Link>
        </div>
        <div className="flex w-full flex-col justify-end gap-4 whitespace-nowrap px-4 md:flex-row md:justify-center">
          {links.map(link => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex w-full justify-start whitespace-nowrap pt-8 text-gray-600 md:justify-end md:pt-0">
          © 2023 FriendZone Club Inc.
        </div>
      </div>
    </div>
  );
}
