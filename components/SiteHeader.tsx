"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PARTS = [
  { href: "/part-1", label: "1 Read the data", match: ["/part-1"] },
  { href: "/part-2", label: "2 Diagnose the drop", match: ["/part-2"] },
  { href: "/part-3", label: "3 Propose ideas", match: ["/part-3"] },
  { href: "/part-4", label: "4 Micro-experience", match: ["/part-4"] },
];

export function SiteHeader() {
  const path = usePathname();
  return (
    <header className="header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Case study home">
          <i aria-hidden /> bhanzu
          <span className="brand-sub">growth case study</span>
        </Link>
        <nav className="nav" aria-label="Parts of the case study">
          {PARTS.map((p) => (
            <Link key={p.href} href={p.href} aria-current={p.match.some((m) => path.startsWith(m)) ? "page" : undefined}>
              {p.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
