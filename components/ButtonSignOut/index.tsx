"use client"

import { signOut } from "next-auth/react"

import { Button } from "../ui/button"

export default function ButtonSignOut({ label }: { label: string }) {
  const handleClick = () => {
    signOut()
  }
  return (
    <Button variant={"outline"} size={"xl"} onClick={handleClick}>
      {label}
    </Button>
  )
}
