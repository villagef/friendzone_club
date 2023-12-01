import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  width?: number
  height?: number
  styling?: string
}

export default function Logo({ width = 220, height = 24, styling }: LogoProps) {
  return (
    <Link href={"/"}>
      <Image
        src="/images/logo.svg"
        alt="Logo"
        width={width}
        height={height}
        priority
        className={`mr-4 p-1 dark:invert ${styling || ""}`}
      />
    </Link>
  )
}
