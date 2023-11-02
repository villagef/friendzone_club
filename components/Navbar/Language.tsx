"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useScroll } from "@/hooks/useScroll"
import { Button } from "../ui/button"
import { Icons } from "../icons"

const languages = [
  { label: "English", value: "en" },
  { label: "Polish", value: "pl" },
] as const

export default function Language() {
  const [value, setValue] = useState<string>()
  const { y } = useScroll()

  const stroke = y > 0 ? "stroke-primary" : "stroke-secondary"

  return (
    <li className="list-none">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icons.world className={stroke} />
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map(language => (
            <DropdownMenuItem
              key={language.value}
              className={`${
                value === language.value ? "bg-secondary" : "bg-transparent"
              }`}
              onClick={() => {
                setValue(language.value)
              }}
            >
              {language.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  )
}
