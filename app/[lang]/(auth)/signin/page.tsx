import React from "react"

import { getDictionary } from "@/lib/dictionary"
import { GlobalParamsType } from "@/lib/types"
import SignIn from "@/app/components/auth/SignIn"

export default async function SignInPage({
  params: { lang },
}: GlobalParamsType) {
  const { auth } = await getDictionary(lang)
  return <SignIn dictionary={auth.signin} />
}
