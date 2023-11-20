import React from "react"

export default function Spinner() {
  return (
    <div className="flex h-24 w-full items-center justify-center">
      <div className="inline-block h-16 w-16 animate-spin rounded-full border-[6px] border-current border-t-transparent text-button" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
