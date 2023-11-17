"use client"

import React, { useState } from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

import { SignInSchemaType } from "@/lib/types"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface InputPasswordProps {
  register: UseFormReturn<SignUpSchemaType, unknown, undefined>["register"]
  errors: FieldErrors<SignInSchemaType>
  disabled: boolean
}

export default function InputPassword({
  register,
  errors,
  disabled,
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  return (
    <div>
      <Label htmlFor="password" className="text-xs">
        Password{" "}
        {errors.password && (
          <span className="ml-1 text-[10px] text-destructive">
            {errors.password.message as React.ReactNode}
          </span>
        )}
      </Label>
      <div className="relative">
        <Input
          id="password"
          {...register("password")}
          placeholder="password (min 6 characters)"
          type={showPassword ? "text" : "password"}
          autoCapitalize="none"
          autoComplete="new-password"
          autoCorrect="off"
          disabled={disabled}
          className="mb-0 pr-10 text-primary"
        />
        <Button
          type="button"
          variant={null}
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1"
        >
          {showPassword ? <Icons.eyeOff /> : <Icons.eye />}
        </Button>
      </div>
    </div>
  )
}
