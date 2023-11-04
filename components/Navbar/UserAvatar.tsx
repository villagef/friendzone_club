import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface UserAvatarProps {
  src: string | null | undefined
}

export default function UserAvatar({ src }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={src ?? ""} />
      <AvatarFallback>FW</AvatarFallback>
    </Avatar>
  )
}
