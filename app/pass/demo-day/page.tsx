"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Gate } from "@/components/Gate";
import { Quiz } from "@/components/Quiz";
import { genQuestions, stats, TRICKS } from "@/lib/content";
import { derive, fmtWhen, useStore } from "@/lib/store";

export default function DemoDay() {
  return (
    <Gate>
      <Inner />
    </Gate>
  );
}

function Inner() {
  const { state, saveRound2 } = useStore();
  const b = state.booking!;
  const d = derive(state);
  const trick = TRICKS[b.band];
  const questions = useMemo(() => genQuestions(b.band), [b.band]);
  const [phase, setPhase] = useState<"reveal" | "round" | "done">(state.round2 ? "done" : "reveal");
  const [copied, setCopied] = useState(false);

  if (!d.demoDay)
    return (
      <div className="narrow section">
        <div className="card soft center stack">
          <div className="mascot" aria-hidden>⏳</div>
          <h2>Demo day is {d.daysLeft} day{d.daysLeft === 1 ? "" : "s"} away</h2>
          <p className="muted">{b.child}&rsquo;s class is on {fmtWhen(b.demoAt)}. Open Reviewer tools and press <b>Jump to demo day</b> to see it.</p>
          <Link href="/pass" className="btn">Back to the pass</Link>
        </div>
      </div>
    );

  if (phase === "reveal")
    return (
      <div className="narrow section">
        <div className="stack" style={{ gap: 20 }}>
          <div className="card soft stack center">
            <div className="eyebrow">Live with Ms. Kavya · simulated</div>
            <h2>
              All {d.pieces} pieces are in, {b.child}!
            </h2>
            <p className="muted">Here is the secret, unlocked in class.</p>
            <div className="lockbox">
              <div className="big">{trick.teaser} = {trick.answer}</div>
            </div>
          </div>
          <div className="reveal">
            {trick.steps.map((t, i) => (
              <div key={i} className="stepcard" style={{ animationDelay: `${i * 0.35}s` }}>
                <b>{i + 1}</b>
                <span>{t}</span>
              </div>
            ))}
          </div>
          <p className="center" style={{ fontWeight: 700 }}>{trick.tryIt}</p>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn lg" onClick={() => setPhase("round")}>Now the repeat round</button>
          </div>
        </div>
      </div>
    );

  if (phase === "round")
    return (
      <div className="narrow game">
        <Quiz
          questions={questions}
          child={b.child}
          onDone={(a) => {
            saveRound2(a);
            setPhase("done");
          }}
        />
      </div>
    );

  const before = stats(state.speed ?? []);
  const after = stats(state.round2 ?? []);
  const faster = before.avg > 0 ? Math.round(((before.avg - after.avg) / before.avg) * 100) : 0;
  const headline =
    after.ok >= before.ok && faster >= 5
      ? `${b.child} got ${faster}% faster in one hour`
      : after.ok > before.ok
        ? `${b.child} got more right in one hour`
        : `${b.child} gave it a real go. Practice will build the speed.`;
  const summary = `${b.child}'s two rounds: before, ${before.ok} of ${before.total} in ${before.avg.toFixed(1)}s each. After the demo, ${after.ok} of ${after.total} in ${after.avg.toFixed(1)}s each.`;

  return (
    <div className="narrow section">
      <div className="stack" style={{ gap: 20 }}>
        <div className="card shadow stack center">
          <div className="confetti" aria-hidden>🏆</div>
          <span className="eyebrow">Level-up card</span>
          <h2>{headline}</h2>
          <div className="versus">
            <div className="col before"><span className="small muted">Before</span><b>{before.ok}/{before.total}</b><span className="small">{before.avg.toFixed(1)}s each</span></div>
            <div className="col after"><span className="small muted">After</span><b>{after.ok}/{after.total}</b><span className="small">{after.avg.toFixed(1)}s each</span></div>
          </div>
          <p className="small muted">Same kinds of questions, new numbers. Measured by the child&rsquo;s own answers, not compared with anyone else.</p>
          <div className="row" style={{ justifyContent: "center" }}>
            <button
              className="btn ghost"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(summary);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? "Copied" : "Copy to share"}
            </button>
          </div>
        </div>

        <div className="card blue stack">
          <h3>What happens next</h3>
          <p className="small">A counsellor will call {b.parent} tomorrow to talk about {b.child}&rsquo;s numbers and answer questions. There is nothing to decide on the call.</p>
          <div className="row">
            <Link href="/counsellor" className="btn">See what the counsellor sees</Link>
            <Link href="/messages" className="btn ghost">See the parent messages</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
