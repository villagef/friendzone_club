"use client"

import React, { useState } from "react"

import {
  ErrorSchemaType,
  RegisterSchemaType,
  SignupSchemaKeys,
} from "@/lib/types"

import { Icons } from "../icons"
import InputLabel from "../InputLabel"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface InputPasswordProps {
  label: SignupSchemaKeys
  register: RegisterSchemaType
  errors: ErrorSchemaType
  disabled: boolean
}

export default function InputPassword({
  label,
  register,
  errors,
  disabled,
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }
  const errorMsg = errors["password"]?.message
  return (
    <div className="grid gap-1">
      <Label htmlFor="password" className="text-[10px] font-semibold uppercase">
        {label} {errorMsg && <InputLabel message={errorMsg} />}
      </Label>
      <div className="relative">
        <Input
          id="password"
          {...register("password")}
          placeholder="Password (min 8 characters)"
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
