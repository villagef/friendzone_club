import Link from "next/link";
import { Icons } from "../icons";
import { Button } from "../ui/button";

interface NavLinkProps {
  href: string;
  name: string;
  description?: string;
  icon?: keyof typeof Icons;
}

export default function SidebarNavLink({ href, name, icon }: NavLinkProps) {
  const IconComponent = icon && Icons[icon];
  return (
    <Link href={href}>
      {IconComponent ? (
        <Button variant="ghost" size="default" className="my-2">
          <IconComponent className="stroke-primary" />
          <span className="mx-2">{name}</span>
        </Button>
      ) : (
        <Button variant="ghost" size="default">
          {name}
        </Button>
      )}
    </Link>
  );
}
