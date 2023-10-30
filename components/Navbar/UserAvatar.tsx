import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" />
      <AvatarFallback>FW</AvatarFallback>
    </Avatar>
  );
}
