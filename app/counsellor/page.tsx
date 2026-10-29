"use client";

import { Gate } from "@/components/Gate";
import { BANDS, stats } from "@/lib/content";
import { derive, fmtWhen, useStore } from "@/lib/store";

export default function Counsellor() {
  return (
    <Gate>
      <Inner />
    </Gate>
  );
}

function Inner() {
  const { state } = useStore();
  const b = state.booking!;
  const d = derive(state);
  const before = state.speed ? stats(state.speed) : null;
  const after = state.round2 ? stats(state.round2) : null;
  const mark = (on: boolean, yes: string, no: string) => (
    <span className={`pill ${on ? "green" : "gray"}`}>{on ? `✓ ${yes}` : no}</span>
  );

  const opener = before
    ? `"Hi ${b.parent}, this is Ritu from the team. I watched ${b.child}'s numbers today. They were quickest on ${before.strong.toLowerCase()}, and Ms. Kavya spent the most time on ${before.grow.toLowerCase()}.${
        after ? ` By the end of the hour, ${b.child} went from ${before.avg.toFixed(1)} to ${after.avg.toFixed(1)} seconds per question.` : ""
      }${state.worry ? ` You told us ${state.worry.toLowerCase()} worry you most, so I'd like to start there.` : ""} Before I say anything about plans, what did ${b.child} say when the class ended?"`
    : `"Hi ${b.parent}, this is Ritu from the team. ${b.child} has not played the Speed Run yet, so I will ask you about their maths directly. What worries you most right now?"`;

  return (
    <div className="wrap section" style={{ paddingTop: 36 }}>
      <div className="stack" style={{ gap: 22 }}>
        <div className="stack-s">
          <span className="eyebrow">Simulated CRM · Academic Counsellor</span>
          <h2>Family Brief for {b.child}</h2>
          <p className="muted">Built from what the parent and child did. The call opens on their numbers, not on a price.</p>
        </div>
        <div className="grid g2" style={{ alignItems: "start", gap: 24 }}>
          <div className="rec" role="group" aria-label="Family Brief">
            <h3>{b.child} · {BANDS[b.band].label} · Parent: {b.parent}</h3>
            <dl>
              <dt>Demo</dt><dd>{fmtWhen(b.demoAt)} · {b.gap}-day gap</dd>
              <dt>Seat confirmed</dt><dd>{mark(!!state.confirmed, "Yes", "Not yet")}</dd>
              <dt>Her worry</dt><dd>{state.worry ?? <span className="muted">Not shared</span>}</dd>
              <dt>Speed Run</dt><dd>{before ? `${before.ok} of ${before.total} right, ${before.avg.toFixed(1)}s each` : <span className="muted">Not played</span>}</dd>
              <dt>Strength</dt><dd>{before ? before.strong : "–"}</dd>
              <dt>Growth area</dt><dd>{before ? before.grow : "–"}</dd>
              <dt>Missions done</dt><dd>{d.doneMissions.length} of {d.missions.length}</dd>
              <dt>Streak</dt><dd>🔥 {d.steps} in a row</dd>
              <dt>Badges</dt><dd>{d.badges.filter((x) => x.earned).map((x) => x.label).join(", ") || "None yet"}</dd>
              <dt>After the demo</dt><dd>{after ? `${after.ok} of ${after.total} right, ${after.avg.toFixed(1)}s each` : <span className="muted">Not played</span>}</dd>
            </dl>
          </div>
          <div className="stack">
            <div className="stack-s">
              <h3>Open the call with proof, not a pitch</h3>
              <div className="script">{opener}</div>
            </div>
            <div className="card sand stack-s">
              <h3>Read the room</h3>
              <ul className="small stack-s" style={{ paddingLeft: 20, margin: 0 }}>
                <li>{state.confirmed ? "They confirmed the seat, so intent is high." : "They did not confirm. Ask gently what is in the way."}</li>
                <li>{d.steps >= 2 ? `${b.child} came back after the first game, so the child wants to continue.` : "Little game activity so far. Ask the parent, not the child, about next steps."}</li>
                <li>{after ? "Show the before and after first. It is the strongest proof of learning." : "No before and after yet. Do not promise results."}</li>
                <li>The demo is free. There is nothing to decide on this call.</li>
              </ul>
            </div>
            <details className="card">
              <summary style={{ fontWeight: 700, cursor: "pointer" }}>Raw data (simulated)</summary>
              <pre style={{ overflow: "auto", fontSize: 12, marginBottom: 0 }}>{JSON.stringify(state, null, 2)}</pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
