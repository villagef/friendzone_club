import { ReactNode } from "react"
import { Input } from "../ui/input"
import AlertInput from "../InputAlert"
import { Label } from "../ui/label"
import { InputSelectProps } from "../InputSelect"

export default function InputText({
  label,
  methods,
  isLoading,
  type = "text",
}: InputSelectProps) {
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
