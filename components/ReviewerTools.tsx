"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { derive, useStore } from "@/lib/store";

// Lets a reviewer move through the days without waiting, and start over.
export function ReviewerTools() {
  const { state, setDay, reset, ready } = useStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  if (!ready) return null;
  const b = state.booking;
  const d = derive(state);
  return (
    <div className="rt">
      {open && (
        <div className="rt-panel" role="dialog" aria-label="Reviewer tools">
          <h3>Reviewer tools</h3>
          {b ? (
            <>
              <p className="small">
                Booked for a <b>{b.gap}-day gap</b>. Simulated day: <b>{state.dayOffset}</b> of {b.gap}.
                {d.demoDay ? " It is demo day." : ` ${d.daysLeft} day${d.daysLeft === 1 ? "" : "s"} to go.`}
              </p>
              <div className="row">
                <button className="btn" onClick={() => setDay(state.dayOffset + 1)} disabled={state.dayOffset >= b.gap}>+1 day</button>
                <button className="btn ghost" onClick={() => setDay(b.gap)} disabled={state.dayOffset >= b.gap}>Jump to demo day</button>
              </div>
            </>
          ) : (
            <p className="small">Book a demo first, then move through the days here.</p>
          )}
          <button
            className="btn ghost"
            onClick={() => {
              reset();
              setOpen(false);
              router.push("/");
            }}
          >
            Start over
          </button>
          <p className="tiny muted">Simulated time only. Nothing is sent to anyone.</p>
        </div>
      )}
      <button className="rt-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
        {open ? "Close" : "Reviewer tools"}
      </button>
    </div>
  );
}
