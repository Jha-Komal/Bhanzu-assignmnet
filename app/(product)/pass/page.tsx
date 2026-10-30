"use client";

import Link from "next/link";
import { Gate } from "@/components/Gate";
import { PassCard } from "@/components/PassCard";
import { stats } from "@/lib/content";
import { derive, useStore } from "@/lib/store";

export default function Pass() {
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

  // What the one big button does right now.
  let cta: { label: string; href?: string; hint?: string } = { label: "" };
  if (!state.speed) cta = { label: `Start ${b.child}'s Speed Run`, href: "/pass/speed-run" };
  else if (d.nextMission && state.dayOffset >= d.nextMission.day)
    cta = { label: d.nextMission.preDemo ? "Play the pre-demo mission" : `Play Mission ${d.nextMission.n}`, href: `/pass/mission/${d.nextMission.n}` };
  else if (d.demoDay) cta = { label: "Go to the live demo", href: "/pass/demo-day" };
  else if (d.nextMission)
    cta = { label: "Next mission is waiting", hint: `It unlocks on day ${d.nextMission.day}. Open Reviewer tools and press +1 day.` };
  const s = state.speed ? stats(state.speed) : null;

  return (
    <div className="wrap section" style={{ paddingTop: 36 }}>
      <div className="grid g2" style={{ alignItems: "start", gap: 28 }}>
        <div className="stack">
          <PassCard state={state} />
          <div className="card stack">
            <div className="row between">
              <h3>Today</h3>
              <span className="flame" aria-label={`${d.steps} steps in a row`}>🔥 {d.steps} in a row</span>
            </div>
            {cta.href ? (
              <Link href={cta.href} className="btn lg block">{cta.label}</Link>
            ) : (
              <>
                <button className="btn lg block" disabled>{cta.label}</button>
                <p className="small muted">{cta.hint}</p>
              </>
            )}
            <p className="tiny muted">20 seconds. A missed day just waits, nothing is lost.</p>
          </div>
          <div className="card stack">
            <h3>Badges</h3>
            <div className="row">
              {d.badges.map((x) => (
                <span key={x.id} className={`badge ${x.earned ? "on" : ""}`}>{x.earned ? "🏅" : "🔒"} {x.label}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="stack">
          <div className="card">
            <h3 style={{ marginBottom: 18 }}>{b.child}&rsquo;s path to demo day</h3>
            <div className="track">
              <div className={`stop ${state.speed ? "done" : "now"}`}>
                <div className="dot">{state.speed ? "✓" : "1"}</div>
                <div><h3>Speed Run</h3><p className="small muted">90 seconds, right after booking.</p></div>
              </div>
              {d.missions.map((m) => {
                const done = !!state.missions[String(m.n)];
                const open = state.speed && !done && state.dayOffset >= m.day && d.nextMission?.n === m.n;
                return (
                  <div key={m.n} className={`stop ${done ? "done" : open ? "now" : ""}`}>
                    <div className="dot">{done ? "✓" : m.n}</div>
                    <div>
                      <h3>{m.preDemo ? "Pre-demo mission" : `Mission ${m.n}`}</h3>
                      <p className="small muted">{m.preDemo ? "20 seconds, on demo day." : `20 seconds, unlocks on day ${m.day}.`}</p>
                    </div>
                  </div>
                );
              })}
              <div className={`stop ${state.round2 ? "done" : d.demoDay && d.allMissionsDone ? "now" : ""}`}>
                <div className="dot">{state.round2 ? "✓" : "🎓"}</div>
                <div><h3>Demo day</h3><p className="small muted">The trick opens live. Then a short repeat round.</p></div>
              </div>
            </div>
          </div>

          {s && (
            <div className="card blue stack">
              <h3>Snapshot for {b.parent}</h3>
              <p className="small">{s.ok} of {s.total} right, about {s.avg.toFixed(1)} seconds each. Strength: <b>{s.strong}</b>. Will grow fastest in: <b>{s.grow}</b>.</p>
            </div>
          )}
          {state.round2 && (
            <Link href="/pass/demo-day" className="btn ghost block">See the level-up card</Link>
          )}
        </div>
      </div>
    </div>
  );
}
