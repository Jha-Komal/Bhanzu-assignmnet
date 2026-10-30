"use client";

import Link from "next/link";
import { Gate } from "@/components/Gate";
import { PassCard } from "@/components/PassCard";
import { WORRIES } from "@/lib/content";
import { fmtWhen, useStore } from "@/lib/store";

export default function Booked() {
  return (
    <Gate>
      <Inner />
    </Gate>
  );
}

function Inner() {
  const { state, confirm, setWorry } = useStore();
  const b = state.booking!;
  return (
    <div className="narrow section">
      <div className="stack" style={{ gap: 22 }}>
        <div className="stack-s center">
          <div className="confetti" aria-hidden>🎉</div>
          <h1 style={{ fontSize: "clamp(30px,5vw,44px)" }}>You&rsquo;re booked, {b.parent}</h1>
          <p className="muted">{b.child}&rsquo;s free demo is on <b>{fmtWhen(b.demoAt)}</b>. 60 minutes, live with Ms. Kavya.</p>
        </div>

        <PassCard state={state} />

        <div className="card stack">
          <div className="stack-s">
            <h3>Keep {b.child}&rsquo;s seat</h3>
            <p className="muted small">One tap tells us a real family is coming, so the teacher holds the spot.</p>
          </div>
          {state.confirmed ? (
            <div className="pill green" style={{ alignSelf: "flex-start" }}>✓ Confirmed. We&rsquo;ve kept {b.child}&rsquo;s seat with Ms. Kavya.</div>
          ) : (
            <button className="btn lg" onClick={confirm}>Yes, we&rsquo;ll be there</button>
          )}
          <div className="stack-s">
            <b className="small">One thing that helps Ms. Kavya most: what worries you about {b.child}&rsquo;s maths? (optional)</b>
            <div className="row">
              {WORRIES.map((w) => (
                <button key={w} className="chip" aria-pressed={state.worry === w} onClick={() => setWorry(w)}>{w}</button>
              ))}
            </div>
            {state.worry && <p className="small muted">Thank you. Ms. Kavya will start with this.</p>}
          </div>
        </div>

        <div className="card soft stack center">
          <div className="mascot" aria-hidden>📱➡️🧒</div>
          <h2 style={{ fontSize: 28 }}>Hand the phone to {b.child}</h2>
          <p className="muted">
            A 90-second game: 5 quick questions. It helps Ms. Kavya start at {b.child}&rsquo;s level, and it earns the first piece of a trick that opens
            only in the live class. Let {b.child} answer alone. Wrong answers are useful to the teacher.
          </p>
          <div className="row" style={{ justifyContent: "center" }}>
            <Link href="/pass/speed-run" className="btn lg">{b.child} is ready</Link>
            <Link href="/pass" className="btn ghost lg">Later</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
