"use client";

import { Gate } from "@/components/Gate";
import { stats, TRICKS } from "@/lib/content";
import { derive, fmtDay, fmtTime, useStore, type State } from "@/lib/store";

type Msg = { day: number; label: string; text: string; why: string; show: boolean };

// The messages the parent would receive for this booking. Simulated: nothing is sent.
function build(state: State): Msg[] {
  const b = state.booking!;
  const d = derive(state);
  const trick = TRICKS[b.band];
  const out: Msg[] = [];
  const link = "pass.example/a8k2";

  out.push({
    day: 0, label: "Within 60 seconds of booking", show: true,
    text: `${b.parent}, ${b.child}'s demo is booked ✅ Hand ${b.child} the phone for 90 seconds. It's the Speed Run, and it helps Ms. Kavya start at their level.\n🔗 ${link}`,
    why: "One clear action while intent is highest. The child gets a reason of their own to want the class.",
  });
  if (b.gap >= 1 && !state.speed)
    out.push({
      day: 1, label: "Day 1, only if the Speed Run is not done", show: state.dayOffset >= 1,
      text: `${b.child}'s Speed Run is waiting 🚀 Five questions, 90 seconds, and the first piece of the trick is theirs.\n🔗 ${link}`,
      why: "A gentle reminder that offers something, instead of asking for something.",
    });
  d.missions.forEach((m, i) => {
    const done = !!state.missions[String(m.n)];
    out.push({
      day: m.day, label: `${m.preDemo ? "Pre-demo mission" : `Mission ${m.n}`} · day ${m.day}`, show: state.dayOffset >= m.day,
      text: m.preDemo
        ? `The last mission is ready for ${b.child} ⭐ 20 seconds, one puzzle, one more piece. ${trick.teaser} opens live today.\n🔗 ${link}`
        : `Mission ${m.n} is ready for ${b.child} ⭐ 20 seconds, one puzzle, one new piece of the trick.\n🔗 ${link}`,
      why: i === 0 ? "A short, fun touch keeps a long wait from going silent." : "Spaced so the parent hears from us about every other day, always with something useful.",
    });
    if (!done && state.dayOffset > m.day && m.day < b.gap)
      out.push({
        day: m.day + 1, label: `Day ${m.day + 1}, because Mission ${m.n} was missed`, show: true,
        text: `${b.child}'s streak is waiting 🔥 One puzzle, 20 seconds, and the next piece is theirs.\n🔗 ${link}`,
        why: "No guilt. A missed day just waits, and the message says what is on offer.",
      });
  });
  out.push({
    day: b.gap, label: "Demo day, morning", show: state.dayOffset >= b.gap,
    text: `${b.child}, ${d.pieces} piece${d.pieces === 1 ? " is" : "s are"} in! Ms. Kavya unlocks the full trick at ${fmtTime(b.demoAt)} today.\n🔗 Join: pass.example/join/a8k2`,
    why: "The child arrives curious. The join link is one tap, no login.",
  });
  if (state.round2) {
    const before = stats(state.speed ?? []);
    const after = stats(state.round2);
    out.push({
      day: b.gap, label: "End of the demo, to the parent", show: true,
      text: `${b.child}'s two rounds today: before, ${before.ok} of ${before.total} in ${before.avg.toFixed(1)} seconds each. After one hour, ${after.ok} of ${after.total} in ${after.avg.toFixed(1)} seconds each. 🎉\nA counsellor will call you tomorrow to talk it through.`,
      why: "Proof of learning, in the child's own numbers. It also opens the counsellor call.",
    });
  }
  return out.sort((a, b2) => a.day - b2.day);
}

export default function Messages() {
  return (
    <Gate>
      <Inner />
    </Gate>
  );
}

function Inner() {
  const { state } = useStore();
  const b = state.booking!;
  const msgs = build(state);
  return (
    <div className="narrow section">
      <div className="stack" style={{ gap: 20 }}>
        <div className="stack-s">
          <span className="eyebrow">Simulated</span>
          <h2>What {b.parent} receives</h2>
          <p className="muted">
            For a {b.gap}-day gap, on day {state.dayOffset}. Faded messages are scheduled for later. Move the day with Reviewer tools (bottom left).
            The &ldquo;Why&rdquo; line says what each message is for.
          </p>
        </div>
        <div className="chat">
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "contents" }}>
              <div className="when">{m.label} · {fmtDay(b.bookedAt + m.day * 864e5)}</div>
              <div className={`bub ${m.show ? "" : "future"}`}>
                {m.text.split("\n").map((line, k) =>
                  line.startsWith("🔗") ? <span key={k} className="link-line">{line}{"\n"}</span> : <span key={k}>{line}{"\n"}</span>,
                )}
                <span className="why">Why: {m.why}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
