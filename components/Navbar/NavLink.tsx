import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";

interface NavLinkProps {
  href: string;
  name: string;
  icon: keyof typeof Icons;
}

export default function NavLink({ href, name, icon }: NavLinkProps) {
  const IconComponent = Icons[icon];
  return (
    <li>
      <Link href={href}>
        {icon ? (
          <Button variant="ghost" size="icon">
            <IconComponent />
          </Button>
        ) : (
          <Button variant="ghost" size="default">
            {name}
          </Button>
        )}
      </Link>
    </li>
  );
}
