"use client"

import { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "../icons"
import { Button } from "../ui/button"

const languages = [
  { label: "English", value: "en" },
  { label: "Polish", value: "pl" },
] as const

export default function Language() {
  const [value, setValue] = useState<string>()

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
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.value}
              className={`${
                value === language.value
                  ? "bg-accent font-bold"
                  : "bg-transparent font-normal"
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
