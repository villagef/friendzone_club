import React, { ReactNode, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import Datepicker, { DateType } from "react-tailwindcss-datepicker"
import { FormField } from "../ui/form"
import AlertInput from "../InputAlert"
import { Label } from "../ui/label"

interface InputCalendarProps {
  label: string
  methods: UseFormReturn
  isLoading?: boolean
}

export default function InputCalendar({
  label,
  methods,
  isLoading,
}: InputCalendarProps) {
  const errorMsg = methods?.formState?.errors[label]?.message as ReactNode
  const [value, setValue] = useState<{
    startDate: DateType
    endDate: DateType
  }>({
    startDate: null,
    endDate: null,
  })

  const handleValueChange = (newValue: DateType) => {
    setValue({ startDate: newValue, endDate: newValue })
    methods.setValue(label, newValue as Date)
  }
  return (
    <FormField
      name={label}
      render={({ field }) => (
        <div className="grid gap-1">
          <Label className="text-[10px] font-semibold">
            {(label === "dob" ? "Date of Birth" : label).toUpperCase()}{" "}
            {errorMsg && (
              <AlertInput>
                <span>{errorMsg}</span>
              </AlertInput>
            )}
          </Label>
          <div className="mb-2">
            <Datepicker
              {...field}
              value={value}
              onChange={value => handleValueChange(value?.endDate || null)}
              asSingle={true}
              maxDate={new Date()}
              i18n="en"
              disabled={isLoading}
              useRange={false}
              inputClassName={`h-9 w-full rounded-md border border-input bg-transparent px-3 text-primary text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
                errorMsg && "border-destructive"
              }`}
            />
          </div>
        </div>
      )}
    />
  )
}
