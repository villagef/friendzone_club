import { ReactNode } from "react"
import { FieldProps } from "@/app/signup/page"
import { FormField } from "../ui/form"
import AlertInput from "../InputAlert"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Label } from "../ui/label"

export default function InputSelect({
  label,
  items,
  methods,
  isLoading,
}: FieldProps) {
  const errorMsg = methods?.formState?.errors[label]?.message as ReactNode

  return (
    <FormField
      {...methods.register(label)}
      name={label}
      render={({ field }) => (
        <div className="grid gap-1">
          <Label className="text-[10px] font-semibold">
            {label.toUpperCase()}{" "}
            {errorMsg && (
              <AlertInput>
                <span>{errorMsg}</span>
              </AlertInput>
            )}
          </Label>
          <Select disabled={isLoading} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items?.map(item => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    />
  )
}
