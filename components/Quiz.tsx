"use client";

import { useEffect, useRef, useState } from "react";
import type { Answer, Question } from "@/lib/content";

const LIMIT = 12000;

// One question at a time, a gentle timer, no red marks that stay. Used for the Speed Run and the demo-day round.
export function Quiz({ questions, child, onDone }: { questions: Question[]; child: string; onDone: (a: Answer[]) => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const started = useRef(Date.now());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const locked = useRef(false);
  const q = questions[i];

  useEffect(() => {
    started.current = Date.now();
    locked.current = false;
    timer.current = setTimeout(() => finish(null), LIMIT);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  function finish(val: number | null) {
    if (locked.current) return;
    locked.current = true;
    if (timer.current) clearTimeout(timer.current);
    const ok = val === q.a;
    const ms = Math.min(Date.now() - started.current, LIMIT);
    const next = [...answers, { cat: q.cat, ok, ms, q: q.q }];
    setPicked(val === null ? -1 : val);
    setAnswers(next);
    setTimeout(() => {
      if (i + 1 >= questions.length) onDone(next);
      else {
        setI(i + 1);
        setPicked(null);
      }
    }, 750);
  }

  let streak = 0;
  for (let k = answers.length - 1; k >= 0 && answers[k].ok; k--) streak++;

  return (
    <div className="card shadow stack">
      <div className="prog" aria-label={`Question ${i + 1} of ${questions.length}`}>
        {questions.map((_, k) => (
          <i key={k} className={k < i ? "done" : k === i ? "cur" : ""} />
        ))}
      </div>
      <p className="center" style={{ fontWeight: 700, color: "var(--orange-d)", minHeight: 26 }}>
        {i === 0 ? `Go, ${child}! Beat the clock ⏱️` : streak >= 2 ? `🔥 ${streak} in a row!` : "Keep going!"}
      </p>
      <div className="qtext" aria-live="polite">{q.q} = ?</div>
      <div className="timer" aria-hidden>
        <b key={i} style={{ animation: `shrink ${LIMIT}ms linear forwards` }} />
      </div>
      <div className="opts">
        {q.opts.map((o) => {
          const state = picked === null ? "" : o === q.a ? "ok" : o === picked ? "no" : "";
          return (
            <button key={o} className={`opt ${state}`} disabled={picked !== null} onClick={() => finish(o)}>
              {o}
            </button>
          );
        })}
      </div>
      <style>{`@keyframes shrink { from { transform: scaleX(1); } to { transform: scaleX(0); } }`}</style>
    </div>
  );
}
