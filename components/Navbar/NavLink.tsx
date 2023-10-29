import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Tooltip from "../ui/tooltip";

interface NavLinkProps {
  href: string;
  name: string;
  icon?: string;
}

export default function NavLink({ href, name, icon }: NavLinkProps) {
  return (
    <Tooltip content={name}>
      <li>
        <Link href={href}>
          {icon ? (
            <Button variant="ghost" size="icon">
              <Image src={icon} alt={name} width={24} height={24} />
            </Button>
          ) : (
            <Button variant="ghost" size="default">
              {name}
            </Button>
          )}
        </Link>
      </li>
    </Tooltip>
  );
}
