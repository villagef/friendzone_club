"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useScroll } from "@/hooks/useScroll"
import { Icons } from "../icons"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const { y } = useScroll()

  const sunStroke = y > 0 ? "stroke-primary" : "stroke-secondary"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Theme selector">
          <Icons.sun
            className={`stroke- h-[1.2rem] w-[1.2rem] ${sunStroke} rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:stroke-primary`}
          />
          <Icons.moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90  scale-0 transition-all dark:rotate-0 dark:scale-100 dark:stroke-primary" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
