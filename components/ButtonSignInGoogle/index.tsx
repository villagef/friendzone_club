import React from "react"
import { signIn } from "next-auth/react"

import { Icons } from "../icons"
import { Button } from "../ui/button"

interface ButtonSignInGoogleProps {
  loading: boolean
}

export default function ButtonSignInGoogle({
  loading,
}: ButtonSignInGoogleProps) {
  const handleSignInWithGoogle = (event: React.SyntheticEvent) => {
    event.preventDefault()
    signIn("google")
  }

  return (
    <Button
      onClick={handleSignInWithGoogle}
      variant="outline"
      type="button"
      disabled={loading}
    >
      {loading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2" />
      )}
      Google
    </Button>
  )
}
