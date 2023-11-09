"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Datepicker, { DateType } from "react-tailwindcss-datepicker"

import Authentication from "@/components/Authentication"
import { Icons } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FormField } from "@/components/ui/form"
import { COUNTRIES } from "@/lib/consts"

type LabelType = "name" | "gender" | "email" | "dob" | "location" | "password"

interface FieldProps {
  label: LabelType
  type?: string
  methods: UseFormReturn<FieldValues>
  isLoading: boolean
  items?: string[]
}

const registrationSchema = z.object({
  gender: z.string().min(1, { message: "required" }).default(""),
  name: z.string().min(2, { message: "required" }).default(""),
  email: z
    .string()
    .email({ message: "The email is invalid." })
    .min(1, { message: "required" })
    .default(""),
  dob: z.string().min(1, { message: "required" }).default(""),
  location: z.string().min(1, { message: "required" }).default(""),
  password: z
    .string()
    .min(6, {
      message: "min 6 characters.",
    })
    .default(""),
})

export const AlertInput = ({ children }: { children: React.ReactNode }) =>
  Boolean(children) ? (
    <span role="alert" className="text-xs text-destructive">
      {children}
    </span>
  ) : null

export function CalendarForm({ label, methods, isLoading }: FieldProps) {
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

export function SelectField({ label, items, methods, isLoading }: FieldProps) {
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
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent className="w-full">
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

export function InputField({
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

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const route = useRouter()

  const methods = useForm({
    resolver: zodResolver(registrationSchema),
  })

  async function handleLoginWithCredentials(data: FieldValues) {
    setIsLoading(true)

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      })

      if (res.ok) {
        toast.success("Account created successfully", {
          position: "top-right",
        })
        route.push("/signin")
      } else {
        toast.error("This user already exists", {
          position: "top-right",
        })
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
      })
    } finally {
      setIsLoading(false)
    }
  }

  function isOver18(date: Date): boolean {
    const now = new Date()
    const ofAge = new Date(now.setFullYear(now.getFullYear() - 18))

    if (date > ofAge) {
      return false
    } else {
      return true
    }
  }

  const onSubmit = async (data: FieldValues) => {
    const _dob = new Date(data.dob as Date)
    try {
      if (isOver18(_dob)) {
        await registrationSchema.parseAsync(data)
        await handleLoginWithCredentials(data)
      } else {
        toast.error("You must be over 18 years old", {
          position: "top-right",
        })
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong", {
        position: "top-right",
      })
    }
  }

  const allFieldsFilled = Object.values(methods.watch()).every(Boolean)

  return (
    <Authentication isSignup>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm">
            Enter your credentials below to create your account
          </p>
        </div>
        <div className={"grid gap-6"}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-1">
                <div className="grid grid-cols-2 gap-x-4">
                  <SelectField
                    label="gender"
                    isLoading={isLoading}
                    methods={methods}
                    items={["Male", "Female", "Transgender", "Non-binary"]}
                  />
                  <SelectField
                    label="location"
                    isLoading={isLoading}
                    methods={methods}
                    items={COUNTRIES.map(country => country.name)}
                  />
                </div>
                <CalendarForm
                  label="dob"
                  methods={methods}
                  isLoading={isLoading}
                />
                <InputField
                  label="name"
                  methods={methods}
                  isLoading={isLoading}
                />
                <InputField
                  label="email"
                  type="email"
                  methods={methods}
                  isLoading={isLoading}
                />
                <InputField
                  label="password"
                  type="password"
                  methods={methods}
                  isLoading={isLoading}
                />
                <div className="text-center text-xs">
                  Are you a member already?
                  <Link href="/signin">
                    <span className="mx-2 w-full text-sm font-semibold underline">
                      Sign in
                    </span>
                  </Link>
                </div>
                <Button
                  variant={"primary"}
                  disabled={!allFieldsFilled || isLoading}
                  className="mt-4">
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create account
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
        <p className="px-8 text-center text-sm text-primary/90">
          By clicking 'Create account' you agree to our{" "}
          <Link
            href="/support"
            className="font-semibold underline underline-offset-4 hover:text-button">
            Terms&Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/support"
            className="font-semibold underline underline-offset-4 hover:text-button">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </Authentication>
  )
}
