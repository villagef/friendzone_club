import { getDictionary } from "@/lib/dictionary"
import { GlobalParamsType } from "@/lib/types"
import SignUp from "@/app/components/auth/SignUp"

export default async function SignUpPage({
  params: { lang },
}: GlobalParamsType) {
  const { auth } = await getDictionary(lang)
  return <SignUp dictionary={auth.signup} />
}
