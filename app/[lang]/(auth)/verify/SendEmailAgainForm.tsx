"use client"

import React from "react"
import { useRouter } from "next/navigation"
import useStore from "@/store"

import { Button } from "@/components/ui/button"

export default function SendEmailAgainForm() {
  const route = useRouter()
  const { email } = useStore()
  const emailProvider = "https://www." + (email?.split("@")[1] || "gmail.com")
  function handleCheckEmailClick() {
    route.push("/signin")
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg p-10 text-center text-xl shadow-md dark:bg-transparent/80 sm:shadow-none sm:dark:bg-transparent">
      <h1 className="text-xl font-semibold tracking-tight">
        Find verification link in your email
      </h1>
      <a href={emailProvider} target="_blank">
        <Button variant="primary" onClick={handleCheckEmailClick}>
          Check email
        </Button>
      </a>
    </div>
  )
}
