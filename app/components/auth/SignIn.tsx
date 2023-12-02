"use client"

import React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { DictionaryType, signinSchema, SignInSchemaType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import ButtonSignInGoogle from "@/components/ButtonSignInGoogle"
import { Icons } from "@/components/icons"
import InputPassword from "@/components/InputPassword"
import InputText from "@/components/InputText"

interface SignInProps {
  dictionary: DictionaryType["auth"]["signin"]
}

export default function SignIn({ dictionary }: SignInProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signinSchema),
  })

  function onSubmit(data: SignInSchemaType) {
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          toast.success("Successfully logged in", { position: "top-right" })
        } else {
          toast.error("Invalid credentials", { position: "top-right" })
        }
      })
      .catch((err) => {
        console.error(err)
        toast.error("Something went wrong", { position: "top-right" })
      })
  }

  return (
    <div className="mx-auto flex w-full  flex-col justify-center">
      <div className="mb-4 flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {dictionary.title}
        </h1>
        <p className="text-sm">{dictionary.subtitle}</p>
      </div>
      <div className={"grid gap-4"}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-2">
            <InputText
              label="email"
              type="email"
              isLoading={isSubmitting}
              register={register}
              errors={errors}
            />
            <InputPassword
              register={register}
              errors={errors}
              disabled={isSubmitting}
            />
            <div className="w-full text-right">
              <Link
                href="/forgot-password"
                className="text-right text-xs text-primary"
              >
                {dictionary.forgot}
              </Link>
            </div>
            <Button
              variant={"primary"}
              disabled={!watch().password}
              className="my-4"
            >
              {isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {dictionary.button}
            </Button>
          </div>
        </form>
        <div className="text-center text-xs">
          {dictionary.create.label}
          <Link href="/signup">
            <span className="mx-2 w-full text-sm font-semibold underline">
              {dictionary.create.link}
            </span>
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-foreground px-2">{dictionary.separator}</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <ButtonSignInGoogle loading={isSubmitting} />
        </div>
      </div>
    </div>
  )
}
