import Link from "next/link";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface ProfileLinkProps {
  href: string;
  name: string;
}

export default function ProfileLink({ href, name }: ProfileLinkProps) {
  return (
    <Link href={href}>
      <DropdownMenuItem className="cursor-pointer">{name}</DropdownMenuItem>
    </Link>
  );
}
