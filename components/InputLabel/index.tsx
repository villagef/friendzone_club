import React from "react"
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"

interface InputLabelProps {
  message: string | FieldError | Merge<FieldError, FieldErrorsImpl>
}

export default function InputLabel({ message }: InputLabelProps) {
  return (
    <span role="alert" className="pl-2 text-xs text-destructive">
      {`${message}`}
    </span>
  )
}
