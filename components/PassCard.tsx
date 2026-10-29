"use client";

import { TOTAL_PIECES } from "@/lib/content";
import { derive, fmtWhen, type State } from "@/lib/store";

// The Demo Pass: who, when, how many pieces of the locked trick are in.
export function PassCard({ state }: { state: State }) {
  const b = state.booking!;
  const d = derive(state);
  return (
    <div className="pass">
      <div style={{ fontWeight: 700, letterSpacing: "0.1em", fontSize: 13, opacity: 0.9 }}>DEMO PASS</div>
      <h2 style={{ marginTop: 6 }}>{b.child}&rsquo;s Math Mission</h2>
      <div className="meta">
        <div><small>Live with</small><b>Ms. Kavya</b></div>
        <div><small>When</small><b>{fmtWhen(b.demoAt)}</b></div>
        <div><small>{d.demoDay ? "Status" : "Starts in"}</small><b>{d.demoDay ? "Today" : d.daysLeft === 0 ? "A few hours" : `${d.daysLeft} day${d.daysLeft === 1 ? "" : "s"}`}</b></div>
      </div>
      <div className="lock" aria-label={`${d.pieces} of ${TOTAL_PIECES} pieces unlocked`}>
        {Array.from({ length: TOTAL_PIECES }, (_, i) => (
          <div key={i} className={`pc ${i < d.pieces ? "on" : ""}`}>{i < d.pieces ? "★" : "🔒"}</div>
        ))}
      </div>
      <p style={{ marginTop: 12, fontWeight: 600, fontSize: 15 }}>
        {d.pieces} of {TOTAL_PIECES} pieces in. The trick itself opens live.
      </p>
    </div>
  );
}
