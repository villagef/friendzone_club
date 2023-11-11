import { ReactNode } from "react"
import { FieldValues, UseFormReturn } from "react-hook-form"
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

export interface InputSelectItemsProps {
  label: string
  value: string
  language?: string
  icon?: string
}

export interface InputSelectProps {
  label: string
  methods: UseFormReturn<FieldValues>
  isLoading?: boolean
  items?: InputSelectItemsProps[]
  type?: string
}

export default function InputSelect({
  label,
  methods,
  isLoading,
  items,
}: InputSelectProps) {
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
                  <SelectItem
                    key={item.label}
                    value={item.value.toLocaleLowerCase()}>
                    {item.label}
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
