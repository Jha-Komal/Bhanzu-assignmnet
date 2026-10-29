"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/pass", label: "Mission Pass" },
  { href: "/messages", label: "Parent messages" },
  { href: "/counsellor", label: "Counsellor view" },
];

export function Header() {
  const path = usePathname();
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <header className="header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Home">
          <i aria-hidden /> bhanzu
        </Link>
        <nav className="nav" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={active(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
