import { ReactNode } from "react"
import { FieldErrors, UseFormReturn } from "react-hook-form"

import { SignupSchemaKeys, SignUpSchemaType } from "@/lib/types"

import AlertInput from "../InputAlert"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export interface InputSelectProps {
  label: SignupSchemaKeys
  isLoading?: boolean
  register: UseFormReturn<SignUpSchemaType, unknown, undefined>["register"]
  errors: FieldErrors<SignUpSchemaType>
  type?: string
}

export default function InputText({
  label,
  isLoading,
  register,
  errors,
  type = "text",
}: InputSelectProps) {
  const errorMsg = errors[label]?.message as ReactNode
  return (
    <div className="grid gap-1">
      <Label className="text-[10px] font-semibold">
        {label.toUpperCase()}{" "}
        {errorMsg && (
          <AlertInput>
            <span>{errorMsg}</span>
          </AlertInput>
        )}
      </Label>
      <Input
        {...register(label)}
        id={label}
        placeholder={label}
        type={type}
        autoCapitalize="none"
        autoComplete={label}
        autoCorrect="off"
        disabled={isLoading}
        required
        className={`border-destructive text-primary ${
          !errorMsg && "border-destructive"
        }}`}
      />
    </div>
  )
}
