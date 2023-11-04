"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Explore() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client")
    },
  })

  // if (session?.user.role !== "admin") {
  //   return <h1 className="text-5xl">Access Denied</h1>
  // }

  if (!session?.user) return
  const _user = session?.user || ""
  return (
    <section className="flex flex-col gap-6">
      <Button>{_user.name}</Button>
    </section>
  )
}
