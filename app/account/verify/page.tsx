"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import Spinner from "@/components/Spinner"

export default function VerifyAccount() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  )
  const searchParams = useSearchParams()
  const route = useRouter()
  const token = searchParams.get("token") || null

  async function handleVerifyEmail(token: string) {
    try {
      if (token.length !== 16) {
        setStatus("error")
      }

      const res = await fetch("/api/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      })

      await res.json()
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

  useEffect(() => {
    if (status === "success") {
      toast.success("Account verified successfully", {
        position: "top-right",
      })
    }
    if (status === "error") {
      toast.error("Something went wrong", {
        position: "top-right",
      })
    }
  }, [status])

  if (status === "loading") {
    return <Spinner />
  }
  if (status === "success") {
    route.push("/signin")
  } else {
    return (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-foreground">
        <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg bg-secondary p-10 text-xl shadow-md dark:bg-transparent/20">
          {token ? (
            <>
              <h1>We can not verify your email</h1>
              <Button variant="primary">Verify again</Button>
            </>
          ) : (
            <>
              <h1>Find verification link in your email</h1>
              <Button variant="primary">Check email</Button>
            </>
          )}
        </div>
      </div>
    )
  }
}
