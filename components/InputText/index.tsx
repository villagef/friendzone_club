import { ErrorSchemaType, RegisterSchemaType } from "@/lib/types"

import InputLabel from "../InputLabel"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export interface InputTextProps {
  label: string
  isLoading?: boolean
  register: RegisterSchemaType
  errors: ErrorSchemaType
  type?: string
}

export default function InputText({
  label,
  isLoading,
  register,
  errors,
  type = "text",
}: InputTextProps) {
  const errorMsg = errors[label]?.message
  return (
    <div className="grid gap-1">
      <Label className="text-[10px] font-semibold">
        {label.toUpperCase()} {errorMsg && <InputLabel message={errorMsg} />}
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
