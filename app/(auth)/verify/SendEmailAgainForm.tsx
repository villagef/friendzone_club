import React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function SendEmailAgainForm() {
  const route = useRouter()
  function handleCheckEmailClick() {
    //check email box
    route.push("/signin")
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg p-10 text-center text-xl shadow-md dark:bg-transparent/80 sm:shadow-none sm:dark:bg-transparent">
      <h1>Find verification link in your email</h1>
      <Button variant="primary" onClick={handleCheckEmailClick}>
        Check email
      </Button>
    </div>
  )
}
