"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Doodle } from "./Doodle";

// The Part 4 micro-experience. Everything is simulated in the browser (localStorage). Nothing is sent anywhere.

type Level = "explorer" | "detective" | "mastermind";
type View = "parent" | "child" | "teacher" | "counsellor";
type ChildStep = "level" | "p1" | "p2" | "done";

const LEVELS: Record<Level, { name: string; hint: string; icon: string; range: [number, number]; def: number; q: string; seq: string; a: number; opts: number[]; why: string }> = {
  explorer: { name: "Explorer", hint: "Easy", icon: "flag", range: [1, 9], def: 7, q: "What comes next?", seq: "2, 4, 6, 8, …", a: 10, opts: [9, 10, 12, 14], why: "Each number is 2 more than the one before." },
  detective: { name: "Detective", hint: "Medium", icon: "search", range: [10, 50], def: 23, q: "What comes next?", seq: "3, 6, 12, 24, …", a: 48, opts: [27, 30, 36, 48], why: "Each number is double the one before." },
  mastermind: { name: "Mastermind", hint: "Hard", icon: "target", range: [10, 99], def: 47, q: "What comes next?", seq: "1, 4, 9, 16, …", a: 25, opts: [20, 24, 25, 36], why: "These are square numbers: 1×1, 2×2, 3×3, 4×4. Next is 5×5." },
};

const OBS = ["Spotted the pattern quickly", "Needed a hint", "Curious about why the trick works", "Wanted to try more numbers", "Preferred to work with the teacher"];

type State = {
  view: View;
  childStep: ChildStep;
  level?: Level;
  pick?: number;
  start?: number;
  locked?: boolean;
  trickStep: number;
  guess?: string;
  tried: number[];
  tStep: number;
  chips: string[];
  note: string;
  saved?: boolean;
};

const INIT: State = { view: "parent", childStep: "level", trickStep: 0, tried: [], tStep: 0, chips: [], note: "" };
const KEY = "maths-mystery-v1";

const trick = (n: number) => [
  { label: "Start with your number", expr: `${n}`, val: n },
  { label: "Double it", expr: `2 × ${n}`, val: 2 * n },
  { label: "Add 10", expr: `${2 * n} + 10`, val: 2 * n + 10 },
  { label: "Halve it", expr: `${2 * n + 10} ÷ 2`, val: n + 5 },
  { label: "Take away your starting number", expr: `${n + 5} − ${n}`, val: 5 },
];

export function MathsMystery({ onBack }: { onBack?: () => void }) {
  const [s, setS] = useState<State>(INIT);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setS({ ...INIT, ...JSON.parse(raw) });
    } catch {
      /* storage can be blocked */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s, ready]);

  const up = (p: Partial<State>) => setS((x) => ({ ...x, ...p }));
  const say = (t: string) => {
    setToast(t);
    window.setTimeout(() => setToast(""), 2200);
  };
  const L = s.level ? LEVELS[s.level] : undefined;
  const attempted = !!s.level && s.pick !== undefined;
  const finished = s.childStep === "done";

  const TABS: { v: View; label: string; icon: string }[] = [
    { v: "parent", label: "1 · Parent", icon: "user" },
    { v: "child", label: "2 · Child", icon: "puzzle" },
    { v: "teacher", label: "3 · Teacher", icon: "laptop" },
    { v: "counsellor", label: "4 · Counsellor", icon: "phone" },
  ];

  /* ---------------- views ---------------- */
  const parent = (
    <div className="mm-screen">
      <div className="mm-top">
        <span className="mm-ok"><Icon name="check" size={22} tone="green" /> Booking confirmed</span>
        <h3>Aarav’s Bhanzu maths demo</h3>
        <p className="mm-sub">Wednesday, 5:00–6:00 PM · live, interactive, 60 minutes</p>
      </div>
      <div className="mm-actions">
        <button className="btn" onClick={() => say("Simulated: the join link would open here.")}>Join the demo</button>
        <button className="btn ghost" onClick={() => say("Simulated: a calendar invite would download.")}>Add to calendar</button>
        <button className="btn ghost" onClick={() => say("Simulated: self-serve rescheduling would open.")}>Need a different time?</button>
      </div>
      <div className="mm-invite">
        <Doodle name="child" className="mm-kid" />
        <span className="mm-tag">Optional · for Aarav</span>
        <h3>Try a 90-second maths mystery</h3>
        <p>Two quick puzzles. One ends with a mystery about numbers that the teacher can explore with Aarav in the live demo.</p>
        <button className="btn" onClick={() => up({ view: "child" })}>Hand the phone to Aarav →</button>
      </div>
    </div>
  );

  const child = (() => {
    if (s.childStep === "level")
      return (
        <div className="mm-screen">
          <div className="mm-top"><h3>Hi Aarav! Choose your mission</h3><p className="mm-sub">Two short puzzles. No grades, no streaks, no penalties.</p></div>
          <div className="mm-levels">
            {(Object.keys(LEVELS) as Level[]).map((k) => (
              <button key={k} className="mm-level" onClick={() => up({ level: k, childStep: "p1", pick: undefined, start: LEVELS[k].def, locked: false, trickStep: 0, guess: undefined, tried: [], tStep: 0, chips: [], note: "", saved: false })}>
                <Icon name={LEVELS[k].icon} size={44} />
                <b>{LEVELS[k].name}</b>
                <span>{LEVELS[k].hint}</span>
              </button>
            ))}
          </div>
        </div>
      );
    if (!L) return null;
    if (s.childStep === "p1")
      return (
        <div className="mm-screen">
          <div className="mm-top"><span className="mm-tag">{L.name} · Puzzle 1 of 2</span><h3>{L.q}</h3><p className="mm-seq">{L.seq}</p></div>
          <div className="mm-opts">
            {L.opts.map((o) => (
              <button key={o} disabled={s.pick !== undefined} className={`mm-opt${s.pick === o ? (o === L.a ? " good" : " try") : s.pick !== undefined && o === L.a ? " good" : ""}`} onClick={() => up({ pick: o })}>{o}</button>
            ))}
          </div>
          {s.pick !== undefined && (
            <div className="mm-feedback">
              <b>{s.pick === L.a ? "Nice spotting!" : "Good try! Detectives learn from every guess."}</b>
              <p>{L.why} The answer is {L.a}.</p>
              <button className="btn" onClick={() => up({ childStep: "p2" })}>On to the mystery →</button>
            </div>
          )}
        </div>
      );
    if (s.childStep === "p2") {
      const n = s.start ?? L.def;
      const steps = trick(n);
      const [lo, hi] = L.range;
      if (!s.locked)
        return (
          <div className="mm-screen">
            <div className="mm-top"><span className="mm-tag">{L.name} · Puzzle 2 of 2</span><h3>The number mystery</h3><p className="mm-sub">Pick any starting number. Keep it secret from the maths!</p></div>
            <div className="mm-stepper">
              <button aria-label="Smaller" onClick={() => up({ start: Math.max(lo, n - 1) })}>−</button>
              <b>{n}</b>
              <button aria-label="Bigger" onClick={() => up({ start: Math.min(hi, n + 1) })}>+</button>
            </div>
            <div className="row" style={{ justifyContent: "center" }}>
              <button className="btn ghost" onClick={() => up({ start: lo + Math.floor(Math.random() * (hi - lo + 1)) })}>Surprise me</button>
              <button className="btn" onClick={() => up({ locked: true, trickStep: 0, tried: [n] })}>Lock it in</button>
            </div>
            <p className="mm-sub" style={{ textAlign: "center" }}>Numbers from {lo} to {hi}</p>
          </div>
        );
      const last = s.trickStep >= steps.length - 1;
      const shown = steps.slice(0, s.trickStep + 1);
      return (
        <div className="mm-screen">
          <div className="mm-top"><span className="mm-tag">{L.name} · Puzzle 2 of 2</span><h3>Follow the steps with {n}</h3></div>
          <ol className="mm-trick">
            {shown.map((t, i) => (
              <li key={i} className={i === shown.length - 1 && last && s.guess ? "final" : ""}>
                <span>{t.label}</span>
                <b>{i === steps.length - 1 && !s.guess ? "?" : `${t.expr} = ${t.val}`}</b>
              </li>
            ))}
          </ol>
          {!last && <button className="btn" onClick={() => up({ trickStep: s.trickStep + 1 })}>Do the next step</button>}
          {last && !s.guess && (
            <div className="mm-feedback">
              <b>What do you think the last step gives?</b>
              <div className="mm-opts small">
                {["My starting number", "5", "10", "Something different every time"].map((g) => (
                  <button key={g} className="mm-opt" onClick={() => up({ guess: g })}>{g}</button>
                ))}
              </div>
            </div>
          )}
          {last && s.guess && (
            <div className="mm-feedback">
              <b>It’s 5!</b>
              <p>Try a different starting number. Does it still end at 5?</p>
              <div className="row">
                <button className="btn ghost" onClick={() => {
                  const r = lo + Math.floor(Math.random() * (hi - lo + 1));
                  up({ start: r, tried: s.tried.includes(r) ? s.tried : [...s.tried, r] });
                }}>Try another number</button>
                <button className="btn" onClick={() => up({ childStep: "done" })}>Save the mystery for my teacher</button>
              </div>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="mm-screen mm-done">
        <Doodle name="stars" className="mm-stars" />
        <h3>Mystery saved for your teacher!</h3>
        <p>Why does it <b>always</b> end at 5? Your live teacher will show you the secret in your demo.</p>
        <div className="row" style={{ justifyContent: "center" }}>
          <button className="btn" onClick={() => up({ view: "teacher" })}>See the teacher’s view →</button>
          <button className="btn ghost" onClick={() => up({ childStep: "level", level: undefined, pick: undefined, locked: false, guess: undefined, tried: [], trickStep: 0 })}>Play again</button>
        </div>
      </div>
    );
  })();

  const empty = (who: string) => (
    <div className="mm-screen mm-empty">
      <Doodle name="books" className="mm-books" />
      <h3>Aarav hasn’t tried the maths mystery yet</h3>
      <p>The {who} sees nothing until the child completes both puzzles. That is the intended behaviour: no invented information.</p>
      <button className="btn" onClick={() => up({ view: "child" })}>Go to the child’s puzzle →</button>
    </div>
  );

  const teacher = !finished ? empty("teacher") : (() => {
    const n = s.tried[s.tried.length - 1] ?? s.start ?? L!.def;
    const steps = trick(n);
    return (
      <div className="mm-screen">
        <div className="mm-top"><span className="mm-tag">Teacher handoff · before the live demo</span><h3>What Aarav did</h3></div>
        <dl className="mm-rec">
          <div><dt>Level chosen</dt><dd>{L!.name} ({L!.hint.toLowerCase()})</dd></div>
          <div><dt>Puzzle 1</dt><dd>{L!.seq} → chose {s.pick} · {s.pick === L!.a ? "matched the pattern" : `pattern answer was ${L!.a}`}</dd></div>
          <div><dt>Puzzle 2</dt><dd>Started with {s.tried.join(", ")} · guessed “{s.guess}” · saw the answer 5</dd></div>
        </dl>
        <div className="mm-sim">
          <span className="mm-tag warm">Simulation of the proposed teacher explanation</span>
          <h3>Continue the exact puzzle with {n}</h3>
          <ol className="mm-trick">
            {steps.slice(0, s.tStep + 1).map((t, i) => (
              <li key={i}><span>{t.label}</span><b>{t.expr} = {t.val}</b></li>
            ))}
          </ol>
          {s.tStep < steps.length - 1 ? (
            <button className="btn" onClick={() => up({ tStep: s.tStep + 1 })}>Next step</button>
          ) : (
            <div className="mm-why">
              <b>Why it always ends at 5:</b> call the starting number <i>n</i>. Double it: 2n. Add 10: 2n + 10. Halve it: n + 5. Take away n: <b>5</b>. The n cancels out, so any starting number works.
            </div>
          )}
        </div>
        <div className="mm-obs">
          <h3>Record an observation after class</h3>
          <div className="row">
            {OBS.map((o) => (
              <button key={o} className="chip" aria-pressed={s.chips.includes(o)} onClick={() => up({ saved: false, chips: s.chips.includes(o) ? s.chips.filter((c) => c !== o) : [...s.chips, o] })}>{o}</button>
            ))}
          </div>
          <label className="field" htmlFor="mm-note">
            Optional note
            <input id="mm-note" value={s.note} placeholder="Anything the counsellor should know" onChange={(e) => up({ note: e.target.value, saved: false })} />
          </label>
          <button className="btn" disabled={!s.chips.length && !s.note.trim()} onClick={() => up({ saved: true })}>{s.saved ? "Saved ✓" : "Save observation"}</button>
        </div>
      </div>
    );
  })();

  const counsellor = !finished ? empty("counsellor") : (
    <div className="mm-screen">
      <div className="mm-top"><span className="mm-tag">Counsellor view · after the demo</span><h3>Before you call Aarav’s parent</h3></div>
      <div className="mm-two">
        <div className="mm-box">
          <h4>Before the demo · child’s attempts</h4>
          <p className="mm-sub">From the puzzle itself. Not verified by a teacher.</p>
          <ul>
            <li>Chose {L!.name}</li>
            <li>Puzzle 1: {s.pick === L!.a ? "matched the pattern" : "tried the pattern"}</li>
            <li>Number mystery: tried {s.tried.length} number{s.tried.length === 1 ? "" : "s"}</li>
          </ul>
        </div>
        <div className={`mm-box${s.saved ? " strong" : ""}`}>
          <h4>Recorded by the teacher in class</h4>
          {s.saved ? (
            <>
              <ul>{s.chips.map((c) => <li key={c}>{c}</li>)}</ul>
              {s.note.trim() && <p>“{s.note.trim()}”</p>}
            </>
          ) : (
            <p className="mm-sub">Nothing recorded yet. Do not refer to what happened in class.</p>
          )}
        </div>
      </div>
      <div className="mm-opener">
        <b>Suggested opener</b>
        <p>
          {s.saved
            ? `“Aarav’s teacher noticed: ${[...s.chips.map((c) => c.toLowerCase()), s.note.trim()].filter(Boolean).join("; ")}. What did Aarav say about the demo?”`
            : "“I saw Aarav tried a short maths mystery before the class. What did he think of it?”"}
        </p>
      </div>
      <p className="mm-sub">No improvement claim is made. The parent’s enrolment decision remains theirs.</p>
    </div>
  );

  const body = { parent, child, teacher, counsellor }[s.view];
  const aside: Record<View, { t: string; d: string }> = {
    parent: { t: "You are the parent", d: "The booking is confirmed first. The mystery is a secondary, optional card below the join, calendar and reschedule actions." },
    child: { t: "You are the child", d: "Pick a level, solve two short puzzles with instant, encouraging feedback, and leave a number mystery for the live class." },
    teacher: { t: "You are the teacher", d: "You see the level and both responses before the live demo, then continue the same puzzle and record what you saw." },
    counsellor: { t: "You are the counsellor", d: "You see pre-demo attempts and teacher-recorded observations separately, and only refer to what was actually recorded." },
  };

  return (
    <div className="mm">
      <div className="mm-bar">
        <div className="mm-tabs" role="tablist" aria-label="Who you are">
          {TABS.map((t) => (
            <button key={t.v} role="tab" aria-selected={s.view === t.v} className={s.view === t.v ? "on" : ""} onClick={() => up({ view: t.v })}>
              <Icon name={t.icon} size={26} tone={s.view === t.v ? "orange" : "gold"} /> {t.label}
            </button>
          ))}
        </div>
        <div className="row">
          {onBack && <button className="btn ghost" onClick={onBack}>← How it works</button>}
          <button className="btn ghost" onClick={() => { setS(INIT); say("Reset. Start again as the parent."); }}>Reset demo</button>
        </div>
      </div>
      <div className="mm-grid">
        <div className="mm-frame">
          <div className="mm-url"><i /><i /><i /><span>bhanzu.example / aarav-demo</span></div>
          {body}
          {toast && <div className="mm-toast" role="status">{toast}</div>}
        </div>
        <aside className="mm-aside">
          <Doodle name="pencil" className="mm-pencil" />
          <span className="kicker">Working prototype</span>
          <h3>{aside[s.view].t}</h3>
          <p>{aside[s.view].d}</p>
          <ol className="mm-path">
            <li className={s.view === "parent" ? "on" : ""}>Parent opens the optional challenge</li>
            <li className={s.view === "child" ? "on" : ""}>Child chooses a level and solves two puzzles</li>
            <li className={s.view === "teacher" ? "on" : ""}>Teacher continues the exact puzzle</li>
            <li className={s.view === "counsellor" ? "on" : ""}>Counsellor discusses what actually happened</li>
          </ol>
          <p className="small">Names, session and booking are illustrative. Browser-only demonstration; no real Bhanzu booking, messages, teacher integration or data collection.</p>
          {attempted && !finished && <p className="small"><b>In progress:</b> the child has started the puzzles.</p>}
        </aside>
      </div>
    </div>
  );
}
