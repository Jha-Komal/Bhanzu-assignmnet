import type { Metadata } from "next";
import { Deck } from "@/components/Deck";
import { Icon } from "@/components/Icon";
import { Doodle } from "@/components/Doodle";

export const metadata: Metadata = { title: "Part 3 · Propose ideas · Bhanzu Growth PM case study" };

const Fit = ({ children }: { children: React.ReactNode }) => <div className="fit stack" style={{ gap: 12 }}>{children}</div>;

type Tone = "orange" | "green" | "blue" | "red" | "gold";

// A parent message, drawn as a chat. Anything in [brackets] is a tap target.
function Bubble({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <div className="bub">
      {parts.map((t, i) => (t.startsWith("[") ? <span key={i} className="chipb">{t}</span> : <span key={i}>{t}</span>))}
    </div>
  );
}

type Idea = {
  n: string;
  title: string;
  pill: "P0" | "P1" | "P2";
  sub: string;
  what: string;
  lever: string;
  why: string;
  sign: string;
  msg: string[];
  between?: string;
  guard: string;
};

const IDEAS: Idea[] = [
  {
    n: "01", title: "Protect the hour", pill: "P0", sub: "A booking is not yet a protected hour on a family calendar.",
    what: "At booking, present the precise local time, 60-minute duration, join link, one-tap calendar invite and reschedule control. Preserve their original slot until a new one is confirmed.",
    lever: "Implementation intention: turn a vague plan into a calendar commitment; reduce the effort of changing it.",
    why: "Broad reach, including same-day bookings; relatively testable without a new product experience.",
    sign: "Calendar additions and completed reschedules; judge success by verified attendance.",
    msg: ["Aarav’s Bhanzu maths demo is booked for Wednesday, 5:00–6:00 PM.\n\nPlease keep Aarav and a device available for the full hour.\n\nAdd to calendar: [Calendar link]\nJoin the demo: [Join link]\nNeed a different time? [Reschedule link]"],
    guard: "Do not treat calendar clicks as the outcome. Confirm that self-serve rescheduling exists or can be supported before promising it.",
  },
  {
    n: "02", title: "Remind for a reason, not for the sake of reminding", pill: "P0", sub: "A reminder should make the next step easier, not create noise.",
    what: "Use a time-left sequence: booking confirmation; 24 hours ahead when applicable; 60 minutes before with setup guidance; 10 minutes before with the direct join link. Collapse messages for same-day bookings.",
    lever: "Salience and prospective memory; timely prompts at the moment of action.",
    why: "Likely inexpensive to test after auditing existing touchpoints; helps short and long gaps without assuming interest is fading.",
    sign: "Timely join rate and attendance by randomly assigned booking; monitor opt-outs.",
    msg: ["Tomorrow at 5 PM, Aarav has his 60-minute Bhanzu maths demo. No special preparation is needed—just keep a notebook and a device ready.\n\nChange the time if needed: [Reschedule link]", "Aarav’s demo starts in 10 minutes. Join directly: [Join link]"],
    between: "— 10 minutes before —",
    guard: "Respect channel consent and frequency caps. For bookings made within an hour of the session, send confirmation and timely join guidance—not a flood of stacked reminders.",
  },
  {
    n: "03", title: "Give parents an easy way to say “we need help”", pill: "P0", sub: "Some interested parents need a way to surface a problem before it becomes a no-show.",
    what: "Before the session, offer three actions: Ready, Change time, and Need joining help; route the latter two to real support or usable self-service.",
    lever: "Active commitment plus early problem detection.",
    why: "Addresses the possibility that an apparent drop in intent is actually an unresolved constraint.",
    sign: "Fraction of reported issues resolved before the session; eventual attendance, not “Ready” taps.",
    msg: ["Hi Priya, is everything set for Aarav’s maths demo tomorrow at 5 PM?\n\n[We’re ready]  [Change time]  [Need help joining]"],
    guard: "A “Ready” response is not a confirmed attendance. Never ask without having a usable resolution path for the other options.",
  },
  {
    n: "04", title: "Show the value before asking for an hour", pill: "P1", sub: "A parent may want maths help but remain unsure what the child will experience.",
    what: "Offer a short, accurate preview of the live, interactive 60-minute class, what the child needs, and why an Academic Counsellor follows up after the class.",
    lever: "Reduce uncertainty, increase trust and perceived relevance.",
    why: "Copy and a short existing-class preview can be tested quickly; addresses parent and child anxiety without a full product build.",
    sign: "Preview comprehension and verified attendance; monitor expectation mismatch complaints.",
    msg: ["What happens in Aarav’s Bhanzu demo?\n\nHe’ll take part in a 60-minute live, interactive maths class. Afterward, an Academic Counsellor will discuss the session and the available learning options with you.\n\nSee what to expect: [Preview link]"],
    guard: "Use real classroom material and accurate claims. Do not guarantee a diagnosis, learning improvement, or a pressure-free sales interaction without operational proof.",
  },
  {
    n: "05", title: "Rescue a family at the joining moment", pill: "P1", sub: "A forgotten link or technical problem should not turn into a lost opportunity.",
    what: "For families who consented to support, display joining help at the start of the session and offer timely assistance after an actual failed join attempt. One intervention, not a sequence of chasing messages.",
    lever: "Remove immediate friction at the decision point.",
    why: "Potentially high value, but depends on reliable join telemetry, staff capacity and family contact preferences.",
    sign: "Help requests resolved; verified join after assistance.",
    msg: ["Hi Priya, if Aarav is having trouble joining today’s demo, try this link: [Join link].\n\nNeed help? [Support link]  |  Prefer another slot? [Reschedule link]"],
    guard: "Do not infer low intent from failure to click a message. Avoid intrusive “we noticed you’re not here” messages without a privacy-appropriate event trigger.",
  },
  {
    n: "06", title: "Let the child begin the maths experience", pill: "P1", sub: "The parent books; the child also has to want to show up.",
    what: "Offer one optional 60–90-second, age-appropriate maths puzzle after booking. The child chooses an answer and sees an encouraging response; one question remains for the live class. With consent, a brief record of the attempt reaches the teacher, who can pick up the same puzzle during the demo. No streaks or daily homework.",
    lever: "Curiosity and ownership: the child has started something they can continue with a real teacher.",
    why: "This connects the booking to the actual lesson, rather than offering a standalone game. Higher effort and uncertain attendance impact keep it P1.",
    sign: "Challenge completion among all families assigned to it; compare verified demo attendance with a control group.",
    msg: ["Aarav has a quick maths mystery waiting.\n\nCan he spot the pattern in 90 seconds? Try it together: [Challenge link]\n\nThe live teacher can continue the puzzle with him during his demo."],
    guard: "Make it optional and encouraging, without scores or ability labels. Bhanzu already provides a live, interactive maths demo. Having the teacher receive the child’s pre-demo response and continue that exact puzzle is the proposed enhancement, not a confirmed existing workflow. Use the message above once that handoff is in place and tested.",
  },
  {
    n: "07", title: "Ask one question the teacher can use", pill: "P1", sub: "Personal relevance may matter more than generic marketing messages.",
    what: "Ask the parent one optional question: what do they most want their child to gain? Pass the response to the teacher and Academic Counsellor only if their workflow can actually use it.",
    lever: "Personal relevance, being heard and lower uncertainty.",
    why: "Could connect booking to demo and counselling, but requires reliable handoff and a clear response from the teaching team.",
    sign: "Parent response rate; teacher usage confirmation; attendance and enrolment guardrails.",
    msg: ["One quick question before Aarav’s demo: what matters most to you?\n\n[More confidence]  [Enjoying maths]  [Help with tricky topics]  [Exploring harder questions]"],
    guard: "Do not collect answers into a dead-end form. If the teacher cannot act on the information, leave this out.",
  },
  {
    n: "08", title: "Offer an earlier slot when the family wants one", pill: "P2", sub: "Five-day bookings may reflect availability rather than weaker desire.",
    what: "Where an earlier slot genuinely opens, offer it without changing the booked time unless the parent accepts. Track whether the original later slot was chosen or forced by supply.",
    lever: "Reduce delay and improve schedule fit—not “fix low motivation.”",
    why: "Conditional on Part 2 investigation of earliest available slots, selected times and weekday patterns.",
    sign: "Earlier-slot opt-in and verified attendance compared with eligible holdout families.",
    msg: ["An earlier maths demo slot is available for Aarav.\n\nYour Wednesday 5 PM booking is still confirmed. Would you like to see the earlier option? [View slots]"],
    guard: "Never claim scarcity or an earlier opening that does not exist. Do not move appointments without explicit agreement.",
  },
];

const IdeaCard = ({ i }: { i: Idea }) => (
  <article className="icard">
    <div className="ihead">
      <span className="inum">{i.n}</span>
      <span className={`ipill ${i.pill.toLowerCase()}`}>{i.pill}</span>
    </div>
    <h3>{i.title}</h3>
    <p className="isub">{i.sub}</p>
    <dl className="ifacts">
      <div><dt>What I’d do</dt><dd>{i.what}</dd></div>
      <div><dt>Behavioural lever</dt><dd>{i.lever}</dd></div>
      <div><dt>Why this priority</dt><dd>{i.why}</dd></div>
      <div><dt>Early sign to inspect</dt><dd>{i.sign}</dd></div>
    </dl>
    <div className="chat">
      <span className="chat-label">Illustrative parent message · subject to channel consent</span>
      <Bubble text={i.msg[0]} />
      {i.between && <span className="chat-between">{i.between}</span>}
      {i.msg[1] && <Bubble text={i.msg[1]} />}
    </div>
    <p className="guard"><Icon name="shield" size={24} tone="gold" /><span><b>Risk / guardrail.</b> {i.guard}</span></p>
  </article>
);

const Stage = ({ icon, tone, t, d }: { icon: string; tone: Tone; t: string; d: string }) => (
  <div className="stage">
    <Icon name={icon} size={36} tone={tone} />
    <b>{t}</b>
    <span>{d}</span>
  </div>
);

const slides = [
  // ---------------- Slide 1: where I start, the journey, what earns attention ----------------
  <Fit key="s1">
    <div className="grid2">
      <div className="col">
        <div className="panel peach">
          <span className="kicker">Growth PM case study · Part 3</span>
          <h1>Propose ideas</h1>
          <p>
            A parent can genuinely want a better maths outcome for their child and still miss a demo. I would first make the appointment easier
            to honour, then test whether greater clarity and child involvement create additional motivation to attend.
          </p>
          <div className="hd" style={{ marginTop: 2 }}>
            <Icon name="question" size={28} tone="gold" />
            <h3>The question</h3>
          </div>
          <p>
            Propose ideas that could improve attendance above the 65% benchmark. For each: what would you do and why, what psychological or
            behavioural lever would you pull, and what would you prioritise first? For communication, write actual message copy.
          </p>
        </div>

        <div className="panel">
          <span className="kicker">01 · Decision before solution</span>
          <div className="hd"><Icon name="search" size={28} tone="blue" /><h3>The data changes where I start</h3></div>
          <div className="kpis">
            <div className="kpi2"><b>65%</b><span>Overall demo attendance benchmark</span></div>
            <div className="kpi2 hot"><b>34%</b><span>Same-day no-shows: long waiting cannot explain all of them</span></div>
            <div className="kpi2"><b>66% → 55%</b><span>Day 0 to day 7 attendance; not a smooth decline</span></div>
          </div>
          <div className="callout">
            <b>My decision.</b> Test preventable attendance friction across <i>all</i> bookings before investing in a product built around
            “keeping interest alive for five days.” A later booking does not necessarily imply weaker intent; the family may have different
            urgency or fewer usable slots.
          </div>
          <div className="grid2">
            <div className="mini-card">
              <h3>What Part 2 suggests</h3>
              <p>Families may struggle to protect an hour, find the link, understand the value, involve the child or choose a workable time. These are <b>hypotheses</b>, not proven causes.</p>
            </div>
            <div className="mini-card">
              <h3>What changes the priority</h3>
              <p>Booking volumes × avoidable no-show share × realistic recovery × downstream enrolment value, adjusted for cost. First audit messages, join logs, slot supply and ~20 recent no-show families.</p>
            </div>
          </div>
          <p className="small">
            The brief describes a confirmation but does <b>not</b> establish whether reminders, rescheduling, calls or support already exist.
            Everything below is a proposed <b>addition or improvement to be tested against the actual current journey</b>, not a claim that
            Bhanzu has none of it.
          </p>
        </div>

        <div className="panel">
          <span className="kicker">02 · The family journey</span>
          <div className="hd"><Icon name="flag" size={28} /><h3>One journey, not eight disconnected tactics</h3></div>
          <p className="small">
            A parent books because their child matters to them; then real life competes for the hour. The product should help them protect the
            appointment, understand its value, involve the child where useful, and recover quickly if plans change.
          </p>
          <div className="stages">
            <Stage icon="calendar" tone="orange" t="Booking" d="protect the hour · 1" />
            <Stage icon="mail" tone="gold" t="Before demo" d="prepare + build trust · 2, 4, 6, 7" />
            <Stage icon="bell" tone="red" t="At risk" d="get help or reschedule · 3, 5, 8" />
            <Stage icon="laptop" tone="green" t="Live demo" d="teacher uses context · 6, 7" />
          </div>
          <p className="small">The earlier slot offer is conditional on actual capacity. Communication is optional and consent-aware, not a reason to bombard families.</p>
        </div>
      </div>

      <div className="col">
        <div className="panel" style={{ flex: 1 }}>
          <span className="kicker">03 · Prioritise with impact × effort</span>
          <div className="hd"><Icon name="target" size={28} tone="green" /><h3>What earns attention first?</h3></div>
          <p className="small">
            Without booking volumes, reason frequencies, implementation details or experimental results, numeric ICE scores would be invented
            precision. Here <b>impact means plausible potential</b>, not measured uplift; <b>effort is an assumption</b> to confirm with
            operations and engineering. P0 means first test, P1 means next investigation or prototype, P2 means conditional.
          </p>
          <div className="tw"><table>
            <thead><tr><th>Idea</th><th>Impact hypothesis</th><th>Effort assumption</th><th>Priority and reasoning</th></tr></thead>
            <tbody>
              <tr><td><b>1. Protect the hour</b></td><td>High · touches every booking; prevents avoidable calendar friction</td><td>Low–Med · depends on booking stack</td><td><span className="tag x">P0</span> Direct, broad and testable</td></tr>
              <tr><td><b>2. Useful time-left reminders</b></td><td>High · wide reach if current reminders are insufficient</td><td>Low · only if existing messaging is reusable</td><td><span className="tag x">P0</span> Improve after journey audit</td></tr>
              <tr><td><b>3. Ready / need help</b></td><td>Med–High · surfaces solvable barriers before a miss</td><td>Med · requires real routing and resolution</td><td><span className="tag x">P0</span> Complements 1 and 2; avoid dead-end buttons</td></tr>
              <tr><td><b>4. Demo preview</b></td><td>Med · may reduce doubt; actual prevalence unknown</td><td>Low–Med · truthful preview and approval needed</td><td><span className="tag p">P1</span> Test if interviews reveal unclear expectations</td></tr>
              <tr><td><b>5. Joining rescue</b></td><td>Med · reaches only families with joining friction</td><td>Med–High · live detection / support coverage</td><td><span className="tag p">P1</span> Dependent on failure logs and service capacity</td></tr>
              <tr><td><b>6. Child’s maths challenge</b></td><td>Potentially High · child anticipation and a useful teacher handoff; unvalidated</td><td>High · content, UX and teacher handoff</td><td><span className="tag p">P1</span> Prototype to test the uncertain mechanism</td></tr>
              <tr><td><b>7. Child’s goal question</b></td><td>Med · can create relevance if teacher uses it</td><td>Med · needs handoff, training and data handling</td><td><span className="tag p">P1</span> Don’t collect information nobody acts on</td></tr>
              <tr><td><b>8. Earlier slot option</b></td><td>High if lack of slots causes long waits; otherwise low</td><td>Med–High · dependent on real capacity</td><td><span className="tag y">P2</span> Promote to P0 if slot supply is the bottleneck</td></tr>
            </tbody></table></div>
          <div className="callout">
            <b>Decision from this matrix.</b> First test ideas 1–3 as <b>Attendance Readiness</b>, assuming the audit finds unaddressed friction.
            Don’t assume a reminder will help when one already exists. Develop idea 6 separately as a <b>learning prototype</b>: its potential
            for child engagement and demo continuity is distinctive, but its attendance impact is still unproven.
          </div>
          <p className="small">
            To update the priorities, use the final Part 2 evidence plan: booking volumes × avoidable no-show reasons × realistically
            recoverable share × downstream value, with effort and parent experience considered. This is the quantitative framework for later,
            not a fabricated score today.
          </p>
        </div>
      </div>
    </div>
  </Fit>,

  // ---------------- Slide 2: the eight interventions ----------------
  <Fit key="s2">
    <div className="panel peach" style={{ flexDirection: "row", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
      <Icon name="chat" size={40} />
      <div>
        <span className="kicker">04 · Concrete interventions</span>
        <h3 style={{ fontSize: "1.35em" }}>What I would put in front of a family</h3>
      </div>
      <div className="strip-art"><Doodle name="books" /><Doodle name="symbols" /><Doodle name="child" /></div>
    </div>
    <div className="ideas">
      {IDEAS.map((i) => <IdeaCard key={i.n} i={i} />)}
    </div>
  </Fit>,

  // ---------------- Slide 3: rollout and bridge to Part 4 ----------------
  <Fit key="s3">
    <div className="grid2">
      <div className="col">
        <div className="panel peach">
          <span className="kicker">05 · The actual rollout decision</span>
          <div className="hd"><Icon name="flag" size={28} /><h3>Start with one measurable fix, not eight launches</h3></div>
          <div className="callout" style={{ background: "#fff" }}>
            <b>First experiment: Attendance Readiness.</b> Test ideas 1–3 as one coherent journey—protect the hour, prompt at useful times, and
            resolve conflicts—against the current Bhanzu experience. Test idea 4 separately if parent interviews identify uncertainty about
            the session, and only with an accurate preview.
          </div>
          <div className="steps5">
            <span>Audit present journey</span><i>→</i>
            <span>Talk to no-shows</span><i>→</i>
            <span>Randomised holdout</span><i>→</i>
            <span>Verify attendance</span><i>→</i>
            <span>Scale / stop</span>
          </div>
        </div>

        <div className="panel">
          <div className="tw"><table>
            <thead><tr><th>What I’d measure</th><th>Definition / reason</th></tr></thead>
            <tbody>
              <tr><td><b>Primary</b></td><td>Verified attended demos ÷ all bookings assigned to each group, by original assignment. Define eligibility, cancellations and reschedules before launch.</td></tr>
              <tr><td><b>Downstream guardrail</b></td><td>Enrolments per assigned booking; don’t celebrate more attendance if it produces poorer enrolment outcomes.</td></tr>
              <tr><td><b>Other guardrails</b></td><td>Booking-to-attendance time, opt-outs, message complaints, support load, completed reschedules and no-show recovery.</td></tr>
              <tr><td><b>Diagnostic cuts</b></td><td>0–1, 2–3, 4–7 days; actual hours; source channel; slot availability and weekday. Do not assume bucket sizes.</td></tr>
              <tr><td><b>First three days</b></td><td>Check message delivery, link functionality, reschedule completion and problem-resolution rates. These show that the intervention works operationally—not yet that it lifts attendance.</td></tr>
            </tbody></table></div>
        </div>

        <div className="panel" style={{ flex: 1 }}>
          <div className="hd"><Icon name="scale" size={28} tone="blue" /><h3>Decide in advance: scale, revise or stop</h3></div>
          <div className="decide">
            <div className="d scale"><Icon name="check" size={32} tone="green" /><div><b>Scale</b><p>Verified attendance improves against control by the pre-agreed business-relevant threshold, with no unacceptable deterioration in enrolments per booking, support burden or opt-outs.</p></div></div>
            <div className="d revise"><Icon name="refresh" size={32} tone="gold" /><div><b>Revise</b><p>Families use the tools and problems are resolved, but attendance does not improve convincingly: identify which step failed, then run a narrower test.</p></div></div>
            <div className="d stop"><Icon name="cross" size={32} tone="red" /><div><b>Stop</b><p>No meaningful attendance gain after an adequately powered evaluation, or the operational cost / family friction outweighs the benefit.</p></div></div>
          </div>
          <p className="small">
            Agree the minimum worthwhile uplift and sample size using actual booking volumes, economics and variance <b>before</b> the
            experiment. Randomise by family where repeat bookings might otherwise cross groups; analyse by original assignment and follow
            sessions to completion. First-three-day operational checks are not proof of attendance impact.
          </p>
        </div>
      </div>

      <div className="col">
        <div className="panel" style={{ flex: 1 }}>
          <span className="kicker">06 · Bridge to Part 4</span>
          <div className="hd"><Icon name="puzzle" size={28} tone="orange" /><h3>What I would build as the micro-experience</h3></div>
          <div className="grid2">
            <div className="mini-card">
              <h3>Most practical first attendance test</h3>
              <p><b>Attendance Readiness.</b> Optimises the immediate problem with low user effort and clear measurement, though it may mostly address logistics rather than deeper engagement.</p>
            </div>
            <div className="mini-card">
              <h3>Best differentiated Part 4 candidate</h3>
              <p><b>Child’s First Maths Challenge.</b> A child tries one short puzzle before the demo; the teacher continues it live, and the counsellor can refer to what was actually observed. This only works if the handoff is implemented.</p>
            </div>
          </div>
          <p>
            The brief asks for <b>one</b> working experience that aims to improve attendance <b>and</b> carries engagement into the demo,
            counsellor call and enrolment. I would prototype Idea 6 as one connected moment:{" "}
            <b>child tries a puzzle → teacher revisits it in the demo → counsellor discusses the teacher’s actual observations</b>. The child has
            a reason to anticipate the class, and the parent sees what the lesson feels like. The counsellor receives only relevant, consented
            context—not a speculative learning score. <b>These benefits are hypotheses to test, not proven attendance gains.</b> Compared with a
            reminder, it has greater effort and uncertainty but tests a distinctly child-led mechanism. The prototype should show the handoff
            without claiming real integration or learning improvement.
          </p>
          <div className="moment">
            <div><Icon name="puzzle" size={44} tone="orange" /><b>Child tries a puzzle</b></div>
            <i>→</i>
            <div><Icon name="laptop" size={44} tone="green" /><b>Teacher revisits it in the demo</b></div>
            <i>→</i>
            <div><Icon name="phone" size={44} tone="blue" /><b>Counsellor discusses the teacher’s actual observations</b></div>
          </div>
          <div className="callout warn">
            <b>What I will not claim.</b> I cannot promise a move from 65% to 75–80%, declare that parents lose interest over time, or assume
            existing messaging is absent. This is a ranked test plan based on the two earlier analyses—not a set of validated results.
          </div>
        </div>
      </div>
    </div>
  </Fit>,
];

export default function Part3() {
  return <Deck slides={slides} prev={{ href: "/part-2", label: "Part 2" }} next={{ href: "/part-4", label: "Part 4" }} />;
}
