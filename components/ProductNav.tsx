"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/part-4", label: "Overview" },
  { href: "/pass", label: "Mission Pass" },
  { href: "/messages", label: "Parent messages" },
  { href: "/counsellor", label: "Counsellor view" },
];

export function ProductNav() {
  const path = usePathname();
  const active = (href: string) => (href === "/part-4" ? path === href : path.startsWith(href));
  return (
    <div className="subnav">
      <div className="wrap">
        <span className="tiny muted">Part 4 prototype</span>
        <nav className="nav" aria-label="Prototype">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={active(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
