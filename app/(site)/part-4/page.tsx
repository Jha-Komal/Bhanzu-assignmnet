import type { Metadata } from "next";
import { Deck } from "@/components/Deck";
import { Icon } from "@/components/Icon";
import { Doodle, Spot } from "@/components/Doodle";
import { MathsMystery } from "@/components/MathsMystery";

export const metadata: Metadata = { title: "Part 4 · Build a micro-experience · Bhanzu Growth PM case study" };

const Fit = ({ children }: { children: React.ReactNode }) => <div className="fit stack" style={{ gap: 12 }}>{children}</div>;

const Node = ({ n, t, d, primary }: { n: string; t: string; d: string; primary?: boolean }) => (
  <div className={`pnode${primary ? " primary" : ""}`}>
    <span>{n}</span>
    <div><b>{t}</b><p>{d}</p></div>
  </div>
);

const Step = ({ n, t, d }: { n: string; t: string; d: string }) => (
  <div className="jstep">
    <span className="num">{n}</span>
    <div><b>{t}</b><p>{d}</p></div>
  </div>
);

const slides = [
  // ---------------- Slide 1: the explanation ----------------
  <Fit key="s1">
    <div className="grid3">
      <div className="col">
        <div className="panel peach">
          <span className="kicker">Growth PM case study · Part 4</span>
          <h1>Let the child begin before the demo</h1>
          <p>One small maths mystery turns a parent-booked appointment into something the child has started—and can continue with a live teacher.</p>
          <div className="proto">
            <div className="hd"><span className="tag y">Working prototype</span><span className="small">Idea 6 from final Part 3 · Optional · two short puzzles</span></div>
            <h3>Try it as a parent, child, then teacher</h3>
            <p>Complete the puzzle, then switch to the teacher view to see the child’s actual response and the continuation planned for the live demo. A sample counsellor handoff shows what would follow.</p>
            <p className="small">Names, session and booking are illustrative. Browser-only demonstration; no real Bhanzu booking, messages, teacher integration or data collection.</p>
            <a className="btn" href="#2" style={{ alignSelf: "flex-start" }}>Open the interactive maths mystery →</a>
          </div>
        </div>

        <div className="panel">
          <span className="kicker">01 · Placement in the booking funnel</span>
          <div className="hd"><Icon name="flag" size={28} /><h3>Where the parent finds it—and what happens next</h3></div>
          <p>The invitation appears <b>immediately after a successful demo booking</b>, on the confirmation page. The parent can try it then or return through the booking confirmation message; neither requires another booking.</p>
          <div className="pflow">
            <Node primary n="01 · BOOKING" t="Confirmation page" d="Demo details and join/reschedule actions come first. Beneath them: optional “Try a 90-second maths mystery” link." />
            <Node n="02 · LATER ACCESS" t="Confirmation message" d="The same challenge link accompanies the booking confirmation, using an approved, consented channel." />
            <Node n="03 · BEFORE DEMO" t="Child tries it" d="Choose Explorer, Detective or Mastermind; answer two questions; leave a number mystery for the live class." />
            <Node n="04 · LIVE DEMO" t="Teacher continues" d="The teacher receives the responses and can explore the mystery during the existing interactive session." />
            <Node n="05 · FOLLOW-UP" t="Counsellor connects" d="The Academic Counsellor can discuss observations actually recorded by the teacher." />
          </div>
          <p className="small"><b>Placement principle:</b> The challenge is optional, secondary to confirmation, joining and rescheduling. The precise message channel and teacher integration are proposed—not established Bhanzu capabilities.</p>
        </div>
      </div>

      <div className="col">
        <div className="panel">
          <span className="kicker">02 · Why this one</span>
          <div className="hd"><Icon name="target" size={28} tone="green" /><h3>Not the cheapest attendance fix—the strongest learning-continuity hypothesis</h3></div>
          <div className="mini-card">
            <h3>P0 · Attendance Readiness</h3>
            <p>Ideas 1–3: protect the hour, communicate at useful times, and resolve joining or scheduling issues. First production experiment because they may address avoidable friction across bookings.</p>
          </div>
          <div className="mini-card">
            <h3>P1 · Child’s maths challenge</h3>
            <p>Idea 6: a short, child-led activity designed to build anticipation and give the teacher something concrete to pick up in a live class. More work, less certainty; chosen for the assignment’s <i>attendance plus downstream engagement</i> objective.</p>
          </div>
          <div className="callout">
            <b>Decision.</b> Part 1 shows 34% same-day no-shows and an irregular gap pattern. Part 2 shows that desire for a better maths outcome need not equal readiness or ability to attend. Readiness interventions tackle practical barriers; this experience separately tests child ownership and perceived relevance. Neither mechanism is proven by the data.
          </div>
        </div>

        <div className="panel">
          <span className="kicker">03 · Actual user journey</span>
          <div className="hd"><Icon name="people" size={28} tone="blue" /><h3>What happens inside the interactive experience</h3></div>
          <Step n="01" t="Parent hands the optional challenge to the child" d="From the confirmed booking page or confirmation message, the parent opens the same challenge. No account or additional scheduling step is required." />
          <Step n="02" t="Child chooses a level and solves two puzzles" d="The child chooses Explorer (easy), Detective (medium), or Mastermind (hard), then tries two short puzzles with instant, encouraging feedback. The second puzzle is a number trick that works with any starting number. No grade, streak, or penalty." />
          <Step n="03" t="Teacher continues the exact puzzle" d="The teacher receives the selected level and both responses before the existing live, interactive 60-minute demo. In the proposed enhancement, the teacher uses a child-chosen starting number to reveal why the maths trick always ends at 5. The prototype includes a clearly labelled simulation of that explanation." />
          <Step n="04" t="Counsellor discusses what actually happened" d="After the class, the Academic Counsellor uses any teacher-recorded observation—not a made-up improvement claim—in the parent conversation. The parent’s enrolment decision remains theirs." />
          <p className="small">Bhanzu’s live interactive demo and follow-up Academic Counsellor call are described in the brief. Sending pre-demo puzzle responses to the teacher and using them in the live session are <b>proposed</b> capabilities that require a working handoff and teacher approval.</p>
        </div>
      </div>

      <div className="col">
        <div className="panel">
          <span className="kicker">04 · Exact copy</span>
          <div className="hd"><Icon name="chat" size={28} tone="gold" /><h3>The invitation must make sense to a busy parent</h3></div>
          <span className="tag p" style={{ alignSelf: "flex-start" }}>Illustrative copy · use only once teacher handoff is supported</span>
          <div className="chat">
            <div className="bub">{"Aarav has a quick maths mystery waiting.\n\nLet him choose Explorer, Detective or Mastermind and solve two quick puzzles: "}<span className="chipb">[Challenge link]</span>{"\n\nOne puzzle ends with a mystery about numbers. During his live Bhanzu demo, the teacher can explore the secret with him."}</div>
          </div>
          <p className="small">The invitation is optional, subject to channel consent and approved message content. No claims of guaranteed improvement.</p>
        </div>

        <div className="panel">
          <span className="kicker">05 · First three days</span>
          <div className="hd"><Icon name="clock" size={28} /><h3>One early signal—not a premature attendance claim</h3></div>
          <div className="callout">
            <b>Primary early signal:</b> percentage of all treatment-assigned bookings whose child completes both puzzles within 24 hours of booking. <b>Numerator:</b> distinct assigned bookings with both puzzles completed inside 24 hours. <b>Denominator:</b> all treatment-assigned eligible bookings, including non-openers.
          </div>
          <p>Within the first three days, check activation among bookings that have had a full 24 hours to act. Also verify that the teacher-facing response record appears reliably. No arbitrary activation target: set a decision threshold with actual baseline traffic and operational costs.</p>
          <div className="tw"><table>
            <thead><tr><th>Result</th><th>Next decision</th></tr></thead>
            <tbody>
              <tr><td>Few families complete it</td><td>Review invitation, optionality, discoverability, age-fit and loading; revise before expanding.</td></tr>
              <tr><td>Children complete it, but teacher handoff fails</td><td>Fix handoff first; do not promise continuation to families until it works.</td></tr>
              <tr><td>Completion and handoff work</td><td>Run a controlled attendance test; do not infer conversion lift from completions.</td></tr>
            </tbody></table></div>
        </div>

        <div className="panel" style={{ flex: 1 }}>
          <span className="kicker">06 · How we know if it works</span>
          <div className="hd"><Icon name="scale" size={28} tone="blue" /><h3>Test the real attendance outcome later</h3></div>
          <p>Randomise eligible booked families to existing experience versus existing experience plus challenge, with consistent messaging and booking conditions; stratify by original booking gap and source where sample sizes permit. Analyse by original assignment, including non-openers.</p>
          <div className="tw"><table>
            <thead><tr><th>Metric</th><th>Definition / reason</th></tr></thead>
            <tbody>
              <tr><td><b>Primary outcome</b></td><td>Verified demo attendance ÷ treatment/control-assigned bookings, under a pre-agreed reschedule and cancellation rule.</td></tr>
              <tr><td><b>Downstream</b></td><td>Enrolments per booking; attended-to-enrolled conversion, interpreted alongside attendance.</td></tr>
              <tr><td><b>Operational</b></td><td>Teacher handoff completion and whether the puzzle was actually continued in the live session.</td></tr>
              <tr><td><b>Guardrails</b></td><td>Opt-outs, complaints, parent burden, child experience and teacher prep time.</td></tr>
            </tbody></table></div>
          <p className="small">Scale only if a sufficiently powered test shows meaningful attendance benefit with acceptable operational cost and no material downstream harm. If activation is healthy but attendance is unchanged, stop treating curiosity as a demonstrated attendance lever.</p>
        </div>
      </div>
    </div>

    <div className="grid2">
      <div className="panel">
        <span className="kicker">07 · Prototype scope</span>
        <div className="hd"><Icon name="check" size={28} tone="green" /><h3>Works in this prototype</h3></div>
        <ul>
          <li>Child chooses Explorer, Detective or Mastermind and attempts two questions with immediate feedback</li>
          <li>Level and both attempts appear in the teacher handoff view</li>
          <li>Simulated teacher continuation explains the open maths mystery; teacher can record an observation</li>
          <li>Counsellor view distinguishes pre-demo attempts from teacher observations</li>
          <li>Reset and repeat without account creation</li>
        </ul>
      </div>
      <div className="panel">
        <span className="kicker">07 · Prototype scope</span>
        <div className="hd"><Icon name="wrench" size={28} tone="red" /><h3>Production dependencies</h3></div>
        <ul>
          <li>Booking-specific, consent-appropriate invitation</li>
          <li>Age-calibrated content and parental handling of child data</li>
          <li>Secure teacher access and reliable handoff</li>
          <li>Teacher workflow fit in a live 60-minute class</li>
          <li>Event instrumentation and controlled rollout</li>
        </ul>
        <p className="small">This proves the interaction is usable, not that the mechanism improves attendance or learning.</p>
        <Spot name="child" />
      </div>
    </div>
  </Fit>,

  // ---------------- Slide 2: the micro-experience ----------------
  <Fit key="s2">
    <MathsMystery />
  </Fit>,
];

export default function Part4() {
  return <Deck slides={slides} prev={{ href: "/part-3", label: "Part 3" }} next={{ href: "/", label: "Cover" }} />;
}
