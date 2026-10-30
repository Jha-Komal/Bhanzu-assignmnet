"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Gate } from "@/components/Gate";
import { Quiz } from "@/components/Quiz";
import { genQuestions, stats, TOTAL_PIECES, TRICKS } from "@/lib/content";
import { useStore } from "@/lib/store";

export default function SpeedRun() {
  return (
    <Gate>
      <Inner />
    </Gate>
  );
}

function Inner() {
  const { state, saveSpeed } = useStore();
  const b = state.booking!;
  const questions = useMemo(() => genQuestions(b.band), [b.band]);
  const [phase, setPhase] = useState<"intro" | "play" | "done">(state.speed ? "done" : "intro");
  const trick = TRICKS[b.band];

  if (phase === "intro")
    return (
      <div className="narrow game">
        <div className="card shadow stack center">
          <div className="mascot" aria-hidden>🚀</div>
          <h2>Hi {b.child}! Ready for your Speed Run?</h2>
          <p className="muted">5 quick questions. Beat the clock. Every answer helps your teacher, so there are no wrong moves.</p>
          <button className="btn lg" onClick={() => setPhase("play")}>Let&rsquo;s go</button>
        </div>
      </div>
    );

  if (phase === "play")
    return (
      <div className="narrow game">
        <Quiz
          questions={questions}
          child={b.child}
          onDone={(a) => {
            saveSpeed(a);
            setPhase("done");
          }}
        />
      </div>
    );

  const s = stats(state.speed ?? []);
  return (
    <div className="narrow section">
      <div className="stack" style={{ gap: 22 }}>
        <div className="card shadow stack center">
          <div className="confetti" aria-hidden>🎉</div>
          <h2>Nice one, {b.child}!</h2>
          <p style={{ fontWeight: 700 }}>⭐ Piece 1 of {TOTAL_PIECES} unlocked</p>
          <div className="lockbox">
            <div className="eyebrow" style={{ color: "var(--gold)" }}>Trick #1 · locked</div>
            <div className="big" style={{ margin: "8px 0" }}>
              {trick.teaser} = <span className="blur">{trick.answer}</span>
            </div>
            <p style={{ color: "#d8d0c8" }}>The method is not on the first page of the internet. Ms. Kavya unlocks it live.</p>
          </div>
        </div>

        <div className="card stack">
          <div className="stack-s">
            <span className="eyebrow">For {b.parent}</span>
            <h3>{b.child}&rsquo;s starting point</h3>
            <p className="muted small">A 90-second snapshot, not a grade. No score is shared or compared.</p>
          </div>
          <div className="meter">
            <div><b>{s.ok}/{s.total}</b><span>answered right</span></div>
            <div><b>{s.avg.toFixed(1)}s</b><span>average thinking time</span></div>
          </div>
          <p><span className="pill green">Strength</span> <b>{s.strong}</b></p>
          <p><span className="pill">Where {b.child} will grow fastest</span> <b>{s.grow}</b></p>
          <p className="muted small">Ms. Kavya sees this before the class and plans around it. We repeat the same kind of questions at the end of the demo so you can see the change.</p>
        </div>

        <div className="row" style={{ justifyContent: "center" }}>
          <Link href="/pass" className="btn lg">See the Demo Pass</Link>
        </div>
      </div>
    </div>
  );
}
