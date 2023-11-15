import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function handleSendEmail(email: string, token: string) {
  const data = { email, token }
  const res = await fetch("/api/auth/sendemail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  })

  return await res.json()
}

export async function handleUpdateVarifyToken(email: string, token: string) {
  const data = { email, token }
  const res = await fetch("/api/auth/sendVerifyToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  })

  return await res.json()
}

export function isOver18(date: Date): boolean {
  const now = new Date()
  const ofAge = new Date(now.setFullYear(now.getFullYear() - 18))

  if (date > ofAge) {
    return false
  } else {
    return true
  }
}
