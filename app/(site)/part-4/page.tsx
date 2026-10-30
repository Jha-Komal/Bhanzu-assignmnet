import type { Metadata } from "next";
import { Deck } from "@/components/Deck";
import { Icon } from "@/components/Icon";
import { Doodle, Spot } from "@/components/Doodle";
import { MathsMystery } from "@/components/MathsMystery";

export const metadata: Metadata = { title: "Part 4 · Build a micro-experience · Bhanzu Growth PM case study" };

const Fit = ({ children }: { children: React.ReactNode }) => <div className="fit stack" style={{ gap: 12 }}>{children}</div>;

const Node = ({ n, t, d, icon, primary }: { n: string; t: string; d: string; icon: string; primary?: boolean }) => (
  <div className={`pnode${primary ? " primary" : ""}`}>
    <Icon name={icon} size={40} tone={primary ? "orange" : "gold"} />
    <span>{n}</span>
    <b>{t}</b>
    <p>{d}</p>
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
    <div className="p4hero">
      <div className="p4intro">
        <span className="kicker">Growth PM case study · Part 4</span>
        <h1>Let the child begin before the demo</h1>
        <p className="lede">An optional, age-appropriate visual challenge turns a confirmed booking into something the child can explore—and later discuss with a live teacher.</p>
        <Doodle name="symbols" className="p4sym" />
      </div>
      <div className="p4try">
        <Doodle name="child" className="p4kid" />
        <div className="hd"><span className="tag y">Working prototype</span><span className="small">Idea 6 from final Part 3 · Optional · one visual challenge + optional level-up</span></div>
        <h3>Try it as a parent, child, then teacher</h3>
        <p>Complete the first age-matched visual challenge, optionally level up, then switch to the teacher view to see the child’s actual response and the continuation planned for the live demo. A sample counsellor handoff shows what would follow.</p>
        <a className="btn" href="#2" style={{ alignSelf: "flex-start" }}>Open the interactive maths mystery →</a>
        <p className="small">Booking is assumed complete before this experience begins; sample name, age, and slot are illustrative. Browser-only demonstration; no real Bhanzu booking, messages, teacher integration or data collection.</p>
      </div>
    </div>

    <div className="panel">
      <span className="kicker">01 · Placement in the booking funnel</span>
      <div className="hd"><Icon name="flag" size={28} /><h3>Where the parent finds it—and what happens next</h3></div>
      <p>Once the parent has completed Bhanzu’s existing booking flow, the challenge appears <b>on the same page, immediately below booking confirmation</b>. The parent may hand over the device or share a link on WhatsApp for later. No new booking form, data entry, or difficulty choice.</p>
      <div className="p4flow">
        <Node icon="calendar" primary n="01 · BOOKING" t="Confirmation page" d="The existing demo confirmation, join and reschedule actions remain first. Beneath them: an optional visual challenge, already matched to the child’s age." />
        <Node icon="mail" n="02 · LATER ACCESS" t="Confirmation message" d="A “Share on WhatsApp” action lets the parent pass a link to the child or save it for later; it does not share personal information. Requires a hosted HTTPS page." />
        <Node icon="puzzle" n="03 · BEFORE DEMO" t="Child tries it" d="Try one age-appropriate picture puzzle immediately; optionally continue to a harder second puzzle. Bring the reasoning to the live class." />
        <Node icon="laptop" n="04 · LIVE DEMO" t="Teacher continues" d="With a proposed handoff, the teacher sees the attempts and can continue the child’s pattern or reasoning during the live interactive session." />
        <Node icon="phone" n="05 · FOLLOW-UP" t="Counsellor connects" d="The Academic Counsellor can discuss observations actually recorded by the teacher." />
      </div>
      <p className="small"><b>Placement principle:</b> The challenge is optional, secondary to confirmation, joining and rescheduling. The precise message channel and teacher integration are proposed—not established Bhanzu capabilities.</p>
    </div>

    <div className="grid3">
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
        <Step n="01" t="Parent discovers the optional challenge after confirmed booking" d="After booking is already confirmed, the parent can open the optional challenge from the confirmation page or share its link for later. No account or additional scheduling step is required." />
        <Step n="02" t="Child starts with an age-matched visual puzzle" d="The existing booking already captures the child’s age, so the system selects a suitable starting puzzle (6–8, 9–11, or 12–14 years). The child interacts with pictures and receives encouraging feedback. After the first puzzle, a harder second challenge is optional. No difficulty-selection screen, grade, streak or penalty." />
        <Step n="03" t="Teacher continues the exact puzzle" d="The teacher receives the child’s age band and available puzzle attempts before the existing live, interactive 60-minute demo. The proposed enhancement is a short continuation of the same visual pattern or reasoning—not a new class format. The prototype labels this as simulated." />
        <Step n="04" t="Counsellor discusses what actually happened" d="After the class, the Academic Counsellor uses any teacher-recorded observation—not a made-up improvement claim—in the parent conversation. The parent’s enrolment decision remains theirs." />
        <p className="small">Bhanzu’s live interactive demo and follow-up Academic Counsellor call are described in the brief. Sending pre-demo puzzle responses to the teacher and using them in the live session are <b>proposed</b> capabilities that require a working handoff and teacher approval.</p>
      </div>

      <div className="panel">
        <span className="kicker">04 · Exact copy</span>
        <div className="hd"><Icon name="chat" size={28} tone="gold" /><h3>The invitation must make sense to a busy parent</h3></div>
        <span className="tag p" style={{ alignSelf: "flex-start" }}>Illustrative copy · use only once teacher handoff is supported</span>
        <div className="chat">
          <div className="bub">{"Aarav has a quick maths mystery waiting.\n\nTry one quick picture puzzle together, picked for his age. If he enjoys it, there is a harder one to explore: "}<span className="chipb">[Challenge link]</span>{"\n\nHe can bring his idea into the live Bhanzu demo, where the teacher can explore the pattern with him. This promise is used only when the proposed teacher handoff is working."}</div>
        </div>
        <p className="small">The invitation is optional, subject to channel consent and approved message content. No claims of guaranteed improvement.</p>
        <Spot name="books" />
      </div>
    </div>

    <div className="grid3">
      <div className="panel">
        <span className="kicker">05 · First three days</span>
        <div className="hd"><Icon name="clock" size={28} /><h3>One early signal—not a premature attendance claim</h3></div>
        <div className="callout">
          <b>Primary early signal:</b> percentage of all treatment-assigned bookings whose child completes <b>Challenge 1</b> within 24 hours of booking. <b>Numerator:</b> distinct assigned bookings with the first challenge completed inside 24 hours. <b>Denominator:</b> all treatment-assigned eligible bookings, including non-openers.
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

      <div className="panel">
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

      <div className="panel">
        <span className="kicker">07 · Prototype scope</span>
        <div className="hd"><Icon name="check" size={28} tone="green" /><h3>What is working—and what is deliberately mocked</h3></div>
        <div className="scope ok">
          <b>Works in this prototype</b>
          <ul>
            <li>Child receives an age-appropriate, visual first puzzle without making a difficulty choice; a harder second puzzle is optional</li>
            <li>The child’s age band and any completed attempts appear in the teacher handoff view</li>
            <li>Simulated teacher continuation proposes a way to explore the visual pattern; teacher can record an observation</li>
            <li>Counsellor view distinguishes pre-demo attempts from teacher observations</li>
            <li>Reset and repeat without account creation</li>
          </ul>
        </div>
        <div className="scope dep">
          <b>Production dependencies</b>
          <ul>
            <li>Booking-specific, consent-appropriate invitation and hosted WhatsApp sharing</li>
            <li>Age-calibrated content and parental handling of child data</li>
            <li>Secure teacher access and reliable handoff</li>
            <li>Teacher workflow fit in a live 60-minute class</li>
            <li>Event instrumentation and controlled rollout</li>
          </ul>
        </div>
        <p className="small">This proves the interaction is usable, not that the mechanism improves attendance or learning.</p>
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
