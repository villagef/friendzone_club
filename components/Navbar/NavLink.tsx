import Link from "next/link";
import { useScroll } from "@/hooks/useScroll";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";

interface NavLinkProps {
  href: string;
  name: string;
  icon: keyof typeof Icons;
}

export default function NavLink({ href, name, icon }: NavLinkProps) {
  const { y: scrollYPos } = useScroll();
  const IconComponent = Icons[icon];
  return (
    <li>
      <Link href={href}>
        {icon ? (
          <Button variant="ghost" size="icon">
            <IconComponent
              className={`${
                scrollYPos > 0 ? "stroke-primary" : "stroke-white"
              }`}
            />
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
