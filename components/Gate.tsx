"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useStore } from "@/lib/store";

// Shows a friendly stop if the visitor has not booked a demo in this browser yet.
export function Gate({ children }: { children: ReactNode }) {
  const { ready, state } = useStore();
  if (!ready) return <div className="narrow section center muted">Loading…</div>;
  if (!state.booking)
    return (
      <div className="narrow section">
        <div className="card soft stack center">
          <div className="mascot">🎟️</div>
          <h2>Book a free demo to get a pass</h2>
          <p className="muted">The Mission Pass appears right after booking. It takes about a minute to try the booking, and it is all simulated.</p>
          <div className="row" style={{ justifyContent: "center" }}>
            <Link href="/book" className="btn lg">Book a free demo</Link>
          </div>
        </div>
      </div>
    );
  return <>{children}</>;
}
