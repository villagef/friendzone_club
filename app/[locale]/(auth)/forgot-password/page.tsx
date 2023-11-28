"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

import SendNewPasswordForm from "./SendNewPasswordForm"
import SendRequestForm from "./SendRequestForm"

export default function PasswordResetPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || null

  useEffect(() => {
    if (token && token.length !== 20) {
      toast.error("Invalid token", { position: "top-right" })
    }
  }, [])

  if (!token || (token && token.length !== 20)) {
    return <SendRequestForm />
  } else {
    return <SendNewPasswordForm />
  }
}
