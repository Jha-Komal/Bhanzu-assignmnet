"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Gate } from "@/components/Gate";
import { PUZZLES, TOTAL_PIECES } from "@/lib/content";
import { derive, useStore } from "@/lib/store";

export default function MissionPage() {
  return (
    <Gate>
      <Inner />
    </Gate>
  );
}

function Inner() {
  const { n } = useParams<{ n: string }>();
  const num = Number(n);
  const { state, saveMission } = useStore();
  const b = state.booking!;
  const d = derive(state);
  const mission = d.missions.find((m) => m.n === num);
  const puzzle = mission ? PUZZLES[b.band][(num - 2) % 3] : undefined;
  const saved = state.missions[String(num)];
  const [picked, setPicked] = useState<number | null>(null);

  if (!mission || !puzzle)
    return (
      <div className="narrow section">
        <div className="card center stack"><h2>That mission does not exist</h2><Link href="/pass" className="btn">Back to the pass</Link></div>
      </div>
    );

  if (!state.speed || state.dayOffset < mission.day)
    return (
      <div className="narrow section">
        <div className="card soft center stack">
          <div className="mascot" aria-hidden>🔒</div>
          <h2>This mission is not open yet</h2>
          <p className="muted">It unlocks on day {mission.day}. {!state.speed ? `Play ${b.child}'s Speed Run first.` : "Open Reviewer tools and press +1 day."}</p>
          <Link href="/pass" className="btn">Back to the pass</Link>
        </div>
      </div>
    );

  const answered = picked !== null || !!saved;
  const ok = saved ? saved.ok : picked === puzzle.a;
  const pieceNo = 1 + d.doneMissions.length + (saved ? 0 : 1);
  const next = d.missions.find((m) => m.n !== num && !state.missions[String(m.n)]);

  function choose(o: number) {
    if (answered) return;
    setPicked(o);
    saveMission(num, o === puzzle!.a);
  }

  return (
    <div className="narrow game">
      <div className="card shadow stack">
        <div className="row between">
          <span className="pill">{mission.preDemo ? "Pre-demo mission" : `Mission ${num}`}</span>
          <span className="small muted">20 seconds, no timer</span>
        </div>
        <div className="qtext" style={{ fontSize: "clamp(26px,6vw,40px)" }}>{puzzle.q}</div>
        {!answered && <p className="center muted small">Hint: {puzzle.hint}</p>}
        <div className="opts">
          {puzzle.opts.map((o) => {
            const cls = !answered ? "" : o === puzzle.a ? "ok" : o === picked ? "no" : "";
            return (
              <button key={o} className={`opt ${cls}`} disabled={answered} onClick={() => choose(o)}>{o}</button>
            );
          })}
        </div>
        {answered && (
          <div className="card soft stack center" style={{ animation: "rise 0.4s both" }}>
            <div className="confetti" aria-hidden>{ok ? "⭐" : "💡"}</div>
            <h3>{ok ? `Spot on, ${b.child}!` : "Almost! Here is the trick."}</h3>
            <p className="small">{puzzle.why}</p>
            <p style={{ fontWeight: 700 }}>🔓 Piece {Math.min(pieceNo, TOTAL_PIECES)} of {TOTAL_PIECES} unlocked. A try always counts.</p>
            <div className="row" style={{ justifyContent: "center" }}>
              {next && state.dayOffset >= next.day ? (
                <Link href={`/pass/mission/${next.n}`} className="btn">Next mission</Link>
              ) : state.dayOffset >= b.gap ? (
                <Link href="/pass/demo-day" className="btn">Go to the live demo</Link>
              ) : (
                <Link href="/pass" className="btn">Back to the pass</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
