"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import useStore, { initI18nStore } from "@/store"

import { LANGUAGES } from "@/lib/consts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "../icons"
import { Button } from "../ui/button"

export default function Language() {
  const pathName = usePathname()
  const { locale, setLocale } = useStore()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/"
    const segments = pathName.split("/")
    segments[1] = locale
    return segments.join("/")
  }

  return (
    <li className="list-none">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icons.world />
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {LANGUAGES.map(({ value, label }) => (
            <Link href={redirectedPathName(value)} key={value}>
              <DropdownMenuItem
                key={value}
                className={`${
                  locale === value
                    ? "bg-accent font-bold"
                    : "bg-transparent font-normal"
                }`}
                onClick={() => {
                  setLocale(value)
                  initI18nStore(value)
                }}
              >
                {label}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  )
}
