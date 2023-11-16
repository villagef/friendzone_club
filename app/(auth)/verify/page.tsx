"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { handleTokenFetch } from "@/lib/utils"
import Spinner from "@/components/Spinner"

import SendEmailAgainForm from "./SendEmailAgainForm"
import VerifyEmailAgainForm from "./VerifyEmailAgainForm"

export default function VerifyAccount() {
  const [status, setStatus] = useState<"success" | "error" | null>(null)
  const route = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || null

  async function handleVerifyEmail(token: string) {
    try {
      if (token.length !== 20) {
        setStatus("error")
      }

      const res = await handleTokenFetch(token, "/api/auth/verifyEmail")

      if (res.ok) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  useEffect(() => {
    if (!token) {
      setStatus("error")
    } else {
      handleVerifyEmail(token)
    }
  }, [])

  if (status === null) {
    return <Spinner />
  }

  if (status === "success") {
    toast.success("Account verified successfully", {
      position: "top-right",
    })
    route.push("/signin")
  } else {
    return <>{token ? <VerifyEmailAgainForm /> : <SendEmailAgainForm />}</>
  }
}
