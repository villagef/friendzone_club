import Link from "next/link";
import { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface ProfileLinkProps extends DropdownMenuItemProps {
  href: string;
  name: string;
}

export default function ProfileLink({
  href,
  name,
  ...props
}: ProfileLinkProps) {
  return (
    <Link href={href}>
      <DropdownMenuItem
        className="my-1 py-2 font-medium text-primary"
        {...props}
      >
        {name}
      </DropdownMenuItem>
    </Link>
  );
}
