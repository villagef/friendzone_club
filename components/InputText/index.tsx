import { ReactNode } from "react"
import { Label } from "@radix-ui/react-dropdown-menu"
import { FieldProps } from "@/app/signup/page"
import { Input } from "../ui/input"
import AlertInput from "../InputAlert"

export default function InputText({
  label,
  type = "text",
  methods,
  isLoading,
}: FieldProps) {
  const errorMsg = methods?.formState?.errors[label]?.message as ReactNode
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
        {...methods.register(label)}
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
