"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Doodle } from "./Doodle";

// The Part 4 micro-experience. Everything is simulated in the browser (localStorage). Nothing is sent anywhere.

type Band = "A" | "B" | "C";
type View = "parent" | "child" | "teacher" | "counsellor";
type Step = "intro" | "p1" | "p2" | "done";

const T = "#1b84a3";
const O = "#f26a21";
const G = "#f5b72c";

// A figure is drawn from a short description, so every puzzle stays visual.
type F = { k: "circ" | "tri" | "sqs" | "tdots" | "rdots" | "sdots" | "ring"; c?: "o" | "t" | "g"; n?: number };

function Fig({ f, size = 92 }: { f: F; size?: number }) {
  const col = f.c === "o" ? O : f.c === "t" ? T : G;
  const dots: { x: number; y: number; c: string }[] = [];
  const n = f.n ?? 1;
  let r = 6;
  if (f.k === "tdots") {
    const s = Math.min(18, 84 / n);
    r = s * 0.36;
    for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) dots.push({ x: 50 + (j - i / 2) * s, y: 8 + r + i * s, c: T });
  } else if (f.k === "rdots" || f.k === "sdots" || f.k === "ring") {
    const cols = f.k === "rdots" ? n + 1 : n;
    const rows = n;
    const s = 84 / Math.max(cols, rows);
    r = s * 0.36;
    for (let i = 0; i < rows; i++)
      for (let j = 0; j < cols; j++) {
        const border = i === 0 || j === 0 || i === rows - 1 || j === cols - 1;
        dots.push({ x: 50 + (j - (cols - 1) / 2) * s, y: 50 + (i - (rows - 1) / 2) * s, c: f.k === "ring" ? (border ? O : "#bfe3ee") : T });
      }
  }
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden focusable="false">
      {f.k === "circ" && <circle cx="50" cy="50" r="32" fill={col} stroke="#292622" strokeWidth="3" />}
      {f.k === "tri" && <polygon points="50,16 86,82 14,82" fill={col} stroke="#292622" strokeWidth="3" strokeLinejoin="round" />}
      {f.k === "sqs" && <rect x="20" y="20" width="60" height="60" rx="6" fill={col} stroke="#292622" strokeWidth="3" />}
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={r} fill={d.c} />)}
    </svg>
  );
}

type Puzzle = { q: string; figs: F[]; opts: { v: string; f?: F }[]; a: string; why: string; explain: string[]; reveal: F; label: string };

const AGE: Record<Band, { label: string; age: string }> = { A: { label: "6–8 years", age: "7" }, B: { label: "9–11 years", age: "9" }, C: { label: "12–14 years", age: "13" } };

const P: Record<Band, [Puzzle, Puzzle]> = {
  A: [
    { label: "Take-turns pattern", q: "Which shape comes next?", figs: [{ k: "circ", c: "o" }, { k: "tri", c: "t" }, { k: "circ", c: "o" }, { k: "tri", c: "t" }, { k: "circ", c: "o" }],
      opts: [{ v: "tri-t", f: { k: "tri", c: "t" } }, { v: "circ-o", f: { k: "circ", c: "o" } }, { v: "sqs-g", f: { k: "sqs", c: "g" } }, { v: "circ-t", f: { k: "circ", c: "t" } }], a: "tri-t",
      why: "The shapes take turns: circle, triangle, circle, triangle.", explain: ["Circle, triangle, circle, triangle, circle.", "The two shapes take turns.", "After a circle, a triangle comes next."], reveal: { k: "tri", c: "t" } },
    { label: "Repeating group", q: "Which shape comes next?", figs: [{ k: "circ", c: "o" }, { k: "circ", c: "o" }, { k: "tri", c: "t" }, { k: "circ", c: "o" }, { k: "circ", c: "o" }, { k: "tri", c: "t" }, { k: "circ", c: "o" }, { k: "circ", c: "o" }],
      opts: [{ v: "tri-t", f: { k: "tri", c: "t" } }, { v: "circ-o", f: { k: "circ", c: "o" } }, { v: "sqs-g", f: { k: "sqs", c: "g" } }], a: "tri-t",
      why: "Two circles, then a triangle, again and again.", explain: ["Look for the part that repeats: two circles, then a triangle.", "Two circles have come since the last triangle.", "So a triangle comes next."], reveal: { k: "tri", c: "t" } },
  ],
  B: [
    { label: "Growing triangles", q: "How many dots will the next triangle have?", figs: [1, 2, 3, 4].map((n) => ({ k: "tdots" as const, n })),
      opts: ["12", "15", "16", "20"].map((v) => ({ v })), a: "15", why: "Each triangle adds one more row: 10 + 5 = 15.",
      explain: ["The triangles have 1, 3, 6 and 10 dots.", "Each new triangle adds a row: +2, +3, +4, so next is +5.", "10 + 5 = 15 dots."], reveal: { k: "tdots", n: 5 } },
    { label: "Growing rectangles", q: "How many dots will rectangle 4 have?", figs: [1, 2, 3].map((n) => ({ k: "rdots" as const, n })),
      opts: ["16", "18", "20", "24"].map((v) => ({ v })), a: "20", why: "Rectangle 4 is 4 rows of 5 dots.",
      explain: ["Rectangle n has n rows of n + 1 dots.", "Rectangle 3 is 3 × 4 = 12.", "Rectangle 4 is 4 × 5 = 20."], reveal: { k: "rdots", n: 4 } },
  ],
  C: [
    { label: "Growing squares", q: "How many dots will square 5 have?", figs: [1, 2, 3, 4].map((n) => ({ k: "sdots" as const, n })),
      opts: ["20", "24", "25", "36"].map((v) => ({ v })), a: "25", why: "Square n has n rows of n dots: 5 × 5 = 25.",
      explain: ["The squares have 1, 4, 9 and 16 dots.", "Each square is n rows of n dots.", "5 × 5 = 25."], reveal: { k: "sdots", n: 5 } },
    { label: "Border dots", q: "How many orange border dots will the 5 × 5 square have?", figs: [2, 3, 4].map((n) => ({ k: "ring" as const, n })),
      opts: ["16", "18", "20", "25"].map((v) => ({ v })), a: "16", why: "The border is 4 sides of 4 dots: 4 × (5 − 1) = 16.",
      explain: ["Border dots: 4, 8 and 12 for the 2×2, 3×3 and 4×4 squares.", "Each step adds 4 more border dots.", "So the 5×5 square has 12 + 4 = 16."], reveal: { k: "ring", n: 5 } },
  ],
};

const OBS = ["Spotted the pattern quickly", "Needed a hint", "Explained their reasoning aloud", "Wanted the harder puzzle", "Preferred to work with the teacher"];

type State = {
  view: View;
  band: Band;
  step: Step;
  p1?: string;
  p2?: string;
  tStep: number;
  chips: string[];
  note: string;
  saved?: boolean;
};

const INIT: State = { view: "parent", band: "B", step: "intro", tStep: 0, chips: [], note: "" };
const KEY = "maths-mystery-v2";

export function MathsMystery() {
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
    window.setTimeout(() => setToast(""), 2400);
  };
  const [c1, c2] = P[s.band];
  const finished = s.step === "done";
  const last = s.p2 !== undefined ? c2 : c1;

  const TABS: { v: View; label: string; icon: string }[] = [
    { v: "parent", label: "1 · Parent", icon: "user" },
    { v: "child", label: "2 · Child", icon: "puzzle" },
    { v: "teacher", label: "3 · Teacher", icon: "laptop" },
    { v: "counsellor", label: "4 · Counsellor", icon: "phone" },
  ];

  const Pz = ({ pz, pick, onPick }: { pz: Puzzle; pick?: string; onPick: (v: string) => void }) => (
    <>
      <div className="mm-top"><h3>{pz.q}</h3></div>
      <div className="mm-figs">
        {pz.figs.map((f, i) => <div key={i} className="mm-fig"><Fig f={f} /></div>)}
        <div className="mm-fig q">?</div>
      </div>
      <div className={`mm-opts${pz.opts[0].f ? " pics" : ""}`}>
        {pz.opts.map((o) => (
          <button key={o.v} disabled={pick !== undefined} aria-label={o.f ? `Shape option ${o.v}` : o.v} className={`mm-opt${pick === o.v ? (o.v === pz.a ? " good" : " try") : pick !== undefined && o.v === pz.a ? " good" : ""}`} onClick={() => onPick(o.v)}>
            {o.f ? <Fig f={o.f} size={64} /> : o.v}
          </button>
        ))}
      </div>
    </>
  );

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
        <span className="mm-tag">Optional · picked for Aarav’s age</span>
        <h3>Try a quick picture puzzle</h3>
        <p>One age-matched visual puzzle, with a harder one if he enjoys it. He can bring his idea to the live demo.</p>
        <div className="row">
          <button className="btn" onClick={() => up({ view: "child" })}>Open the challenge for Aarav →</button>
          <button className="btn ghost" onClick={() => say("Simulated: WhatsApp would open with a link. No personal information is shared.")}>Share on WhatsApp</button>
        </div>
      </div>
      <div className="mm-age">
        <span className="mm-sub">Sample age from the booking (illustrative):</span>
        <div className="row">
          {(Object.keys(AGE) as Band[]).map((b) => (
            <button key={b} className="chip" aria-pressed={s.band === b} onClick={() => setS({ ...INIT, band: b })}>{AGE[b].label}</button>
          ))}
        </div>
      </div>
    </div>
  );

  const child = (() => {
    if (s.step === "intro")
      return (
        <div className="mm-screen mm-center">
          <Doodle name="child" className="mm-hero" />
          <h3>Hi Aarav! Here’s a picture puzzle</h3>
          <p className="mm-sub">Picked for ages {AGE[s.band].label}. No scores, no streaks, no penalties.</p>
          <button className="btn" onClick={() => up({ step: "p1" })}>Let’s look →</button>
        </div>
      );
    if (s.step === "p1")
      return (
        <div className="mm-screen">
          <span className="mm-tag">Challenge 1 · {c1.label}</span>
          <Pz pz={c1} pick={s.p1} onPick={(v) => up({ p1: v })} />
          {s.p1 !== undefined && (
            <div className="mm-feedback">
              <b>{s.p1 === c1.a ? "Nice spotting!" : "Good try! Every guess teaches us something."}</b>
              <p>{c1.why}</p>
              <div className="row">
                <button className="btn" onClick={() => up({ step: "p2" })}>Try a harder one (optional)</button>
                <button className="btn ghost" onClick={() => up({ step: "done" })}>That’s enough for now</button>
              </div>
            </div>
          )}
        </div>
      );
    if (s.step === "p2")
      return (
        <div className="mm-screen">
          <span className="mm-tag warm">Challenge 2 · harder · {c2.label}</span>
          <Pz pz={c2} pick={s.p2} onPick={(v) => up({ p2: v })} />
          {s.p2 !== undefined && (
            <div className="mm-feedback">
              <b>{s.p2 === c2.a ? "Great reasoning!" : "Good try! This one is tricky."}</b>
              <p>{c2.why}</p>
              <button className="btn" onClick={() => up({ step: "done" })}>Save my idea for the teacher</button>
            </div>
          )}
        </div>
      );
    return (
      <div className="mm-screen mm-center">
        <Doodle name="stars" className="mm-stars" />
        <h3>Saved for your teacher!</h3>
        <p>Bring your idea to the live class. The teacher can explore the pattern with you.</p>
        <div className="row" style={{ justifyContent: "center" }}>
          <button className="btn" onClick={() => up({ view: "teacher" })}>See the teacher’s view →</button>
          <button className="btn ghost" onClick={() => up({ step: "intro", p1: undefined, p2: undefined, tStep: 0, chips: [], note: "", saved: false })}>Play again</button>
        </div>
      </div>
    );
  })();

  const empty = (who: string) => (
    <div className="mm-screen mm-center">
      <Doodle name="books" className="mm-books" />
      <h3>Aarav hasn’t tried the challenge yet</h3>
      <p className="mm-sub">The {who} sees nothing until the child has attempted the first puzzle. That is the intended behaviour: no invented information.</p>
      <button className="btn" onClick={() => up({ view: "child" })}>Go to the child’s puzzle →</button>
    </div>
  );

  const attempted = s.p1 !== undefined;
  const teacher = !attempted ? empty("teacher") : (
    <div className="mm-screen">
      <div className="mm-top"><span className="mm-tag">Teacher handoff · before the live demo</span><h3>What Aarav did</h3></div>
      <dl className="mm-rec">
        <div><dt>Age band</dt><dd>{AGE[s.band].label} (from the booking)</dd></div>
        <div><dt>Challenge 1</dt><dd>{c1.label} · chose {c1.opts.find((o) => o.v === s.p1)?.f ? "a shape" : s.p1} · {s.p1 === c1.a ? "matched the pattern" : "tried the pattern"}</dd></div>
        <div><dt>Challenge 2</dt><dd>{s.p2 !== undefined ? `${c2.label} · ${s.p2 === c2.a ? "matched the pattern" : "tried the pattern"}` : "Not attempted (optional)"}</dd></div>
      </dl>
      <div className="mm-sim">
        <span className="mm-tag warm">Simulation of the proposed teacher continuation</span>
        <h3>Continue the same pattern: {last.label}</h3>
        <ol className="mm-trick">
          {last.explain.slice(0, s.tStep + 1).map((t, i) => <li key={i}><span>{t}</span></li>)}
        </ol>
        {s.tStep < last.explain.length - 1 ? (
          <button className="btn" onClick={() => up({ tStep: s.tStep + 1 })}>Next step</button>
        ) : (
          <div className="mm-why"><Fig f={last.reveal} size={96} /><div><b>The next picture</b><p>{last.why}</p></div></div>
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

  const counsellor = !attempted ? empty("counsellor") : (
    <div className="mm-screen">
      <div className="mm-top"><span className="mm-tag">Counsellor view · after the demo</span><h3>Before you call Aarav’s parent</h3></div>
      <div className="mm-two">
        <div className="mm-box">
          <h4>Before the demo · child’s attempts</h4>
          <p className="mm-sub">From the puzzle itself. Not verified by a teacher.</p>
          <ul>
            <li>Age band {AGE[s.band].label}</li>
            <li>Challenge 1: {s.p1 === c1.a ? "matched the pattern" : "tried the pattern"}</li>
            <li>Challenge 2: {s.p2 !== undefined ? (s.p2 === c2.a ? "matched the pattern" : "tried the pattern") : "not attempted"}</li>
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
            : "“I saw Aarav tried a quick picture puzzle before the class. What did he think of it?”"}
        </p>
      </div>
      <p className="mm-sub">No improvement claim is made. The parent’s enrolment decision remains theirs.</p>
    </div>
  );

  const body = { parent, child, teacher, counsellor }[s.view];
  const aside: Record<View, { t: string; d: string }> = {
    parent: { t: "You are the parent", d: "Booking is already confirmed. The challenge sits below the join, calendar and reschedule actions, matched to the child’s age with no difficulty screen." },
    child: { t: "You are the child", d: "One age-matched picture puzzle with encouraging feedback. A harder second one is optional." },
    teacher: { t: "You are the teacher", d: "You see the age band and the attempts before the live demo, then continue the same pattern and record what you saw." },
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
        <button className="btn ghost" onClick={() => { setS(INIT); say("Reset. Start again as the parent."); }}>Reset demo</button>
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
            <li className={s.view === "parent" ? "on" : ""}>Parent finds the optional challenge after booking</li>
            <li className={s.view === "child" ? "on" : ""}>Child solves an age-matched picture puzzle</li>
            <li className={s.view === "teacher" ? "on" : ""}>Teacher continues the exact puzzle</li>
            <li className={s.view === "counsellor" ? "on" : ""}>Counsellor discusses what actually happened</li>
          </ol>
          <p className="small">Booking is assumed complete before this experience begins; sample name, age, and slot are illustrative. Browser-only demonstration; no real Bhanzu booking, messages, teacher integration or data collection.</p>
        </aside>
      </div>
    </div>
  );
}
