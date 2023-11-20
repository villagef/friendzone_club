import React, { useState } from "react"
import Datepicker, { DateType } from "react-tailwindcss-datepicker"

import {
  ErrorSchemaType,
  RegisterSchemaType,
  SetValueSchemaType,
  SignupSchemaKeys,
} from "@/lib/types"

import InputLabel from "../InputLabel"
import { Label } from "../ui/label"

interface InputCalendarProps {
  label: SignupSchemaKeys
  isLoading?: boolean
  register: RegisterSchemaType
  setValue: SetValueSchemaType
  errors: ErrorSchemaType
}

const DatepickerComponent = React.forwardRef<
  React.ElementRef<typeof Datepicker>,
  React.ComponentPropsWithoutRef<typeof Datepicker>
>(({ ...props }, _ref) => <Datepicker {...props} />)
DatepickerComponent.displayName = "DatepickerComponent"

export default function InputCalendar({
  label,
  isLoading,
  register,
  setValue,
  errors,
}: InputCalendarProps) {
  const errorMsg = errors[label]?.message
  const [calendarValue, setCalendarValue] = useState<{
    startDate: DateType
    endDate: DateType
  }>({
    startDate: null,
    endDate: null,
  })

  const handleValueChange = (newValue: DateType | undefined) => {
    if (!newValue) return
    setCalendarValue({ startDate: newValue, endDate: newValue })
    setValue(label, newValue.toString())
  }
  return (
    <div className="grid gap-1">
      <Label className="text-[10px] font-semibold">
        {(label === "dob" ? "Date of Birth" : label).toUpperCase()}{" "}
        {errorMsg && <InputLabel message={errorMsg} />}
      </Label>
      <div className="mb-2">
        <DatepickerComponent
          {...register(label)}
          value={calendarValue}
          onChange={(value) => handleValueChange(value?.endDate)}
          asSingle={true}
          maxDate={new Date()}
          startFrom={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
          }
          i18n="en"
          disabled={isLoading}
          useRange={false}
          inputClassName={`h-9 w-full rounded-md border border-input bg-transparent px-3 text-primary text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
            errorMsg && "border-destructive"
          }`}
        />
      </div>
    </div>
  )
}
