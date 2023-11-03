import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  width?: number
  height?: number
  styling?: string
  dark?: boolean
}

export default function Logo({
  width = 240,
  height = 24,
  styling,
  dark = false,
}: LogoProps) {
  return (
    <Link href={"/"}>
      <Image
        src={`${dark ? "/logoDark.svg" : "/logo.svg"}`}
        alt="Logo"
        width={width}
        height={height}
        priority
        className={`fill-black p-4 ${styling || ""}`}
      />
    </Link>
  )
}
