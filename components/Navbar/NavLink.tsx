import Link from "next/link";

interface NavLinkProps {
  href: string;
  name: string;
}

export default function NavLink({ href, name }: NavLinkProps) {
  return (
    <li className="text-lg">
      <Link href={href}>{name}</Link>
    </li>
  );
}
