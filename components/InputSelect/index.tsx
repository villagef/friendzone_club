import {
  ErrorSchemaType,
  RegisterSchemaType,
  SetValueSchemaType,
  SignupSchemaKeys,
} from "@/lib/types"

import InputLabel from "../InputLabel"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export interface InputSelectItemsProps {
  label: string
  value: string
  language?: string
  icon?: string
}

export interface InputSelectProps {
  label: SignupSchemaKeys
  isLoading?: boolean
  register: RegisterSchemaType
  setValue: SetValueSchemaType
  errors: ErrorSchemaType
  items?: InputSelectItemsProps[]
  type?: string
}

export default function InputSelect({
  label,
  isLoading,
  register,
  setValue,
  errors,
  items,
}: InputSelectProps) {
  const errorMsg = errors[label]?.message

  const handleValueChange = (newValue: string) => {
    if (!newValue) return
    setValue(label, newValue)
  }

  return (
    <div className="grid gap-1">
      <Label className="text-[10px] font-semibold">
        {label.toUpperCase()} {errorMsg && <InputLabel message={errorMsg} />}
      </Label>
      <Select
        disabled={isLoading}
        onValueChange={handleValueChange}
        {...register(label)}
      >
        <SelectTrigger>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items?.map((item) => (
              <SelectItem
                key={item.label}
                value={item.value.toLocaleLowerCase()}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
