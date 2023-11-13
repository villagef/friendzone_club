import React from "react"

export default function Spinner() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-foreground">
      <div className="inline-block h-24 w-24 animate-spin rounded-full border-[6px] border-current border-t-transparent text-button" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
