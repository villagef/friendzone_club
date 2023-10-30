import { forwardRef } from "react";
import Link from "next/link";
import { Icons } from "../icons";
import { Button } from "../ui/button";

interface NavLinkProps {
  href: string;
  name: string;
  icon?: keyof typeof Icons;
  onClick: () => void;
}

const SidebarNavLink = forwardRef(
  ({ href, name, icon, onClick }: NavLinkProps) => {
    const IconComponent = icon && Icons[icon];
    return (
      <Link href={href} onClick={onClick}>
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
  },
);

SidebarNavLink.displayName = "SidebarNavLink";

export default SidebarNavLink;
