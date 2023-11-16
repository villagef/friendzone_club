import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function handleTokenFetch(
  token: string,
  target: string,
  email?: string | null,
) {
  const data = email ? { email, token } : { token }
  const res = await fetch(target, {
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
