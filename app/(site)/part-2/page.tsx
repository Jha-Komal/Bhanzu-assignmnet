import type { Metadata } from "next";
import { Deck } from "@/components/Deck";
import { Icon } from "@/components/Icon";
import { Doodle, Spot } from "@/components/Doodle";
import { ZoneChart } from "@/components/part1/Charts";

export const metadata: Metadata = { title: "Part 2 · Diagnose the drop · Bhanzu Growth PM case study" };

const Fit = ({ children }: { children: React.ReactNode }) => <div className="fit stack" style={{ gap: 12 }}>{children}</div>;

type Tone = "orange" | "green" | "blue" | "red" | "gold";

const Step = ({ when, icon, tone, hot, t, us }: { when: string; icon: string; tone: Tone; hot?: boolean; t: string; us: string }) => (
  <div className={`tl-item${hot ? " hot" : ""}`}>
    <Icon name={icon} size={38} tone={tone} />
    <div>
      <span className="when">{when}</span>
      <div><b>{t}</b></div>
      <div className="us">{us}</div>
    </div>
  </div>
);

const Force = ({ icon, tone, t, d, wide }: { icon: string; tone: Tone; t: string; d: string; wide?: boolean }) => (
  <div className={`force2${wide ? " wide" : ""}`}>
    <Icon name={icon} size={32} tone={tone} />
    <div>
      <b>{t}</b>
      <span className="d">{d}</span>
    </div>
    {wide && <Doodle name="symbols" className="wide-art" />}
  </div>
);

const Prio = ({ n, t, why, check }: { n: string; t: string; why: string; check: string }) => (
  <div className="pcard">
    <span className="num">{n}</span>
    <div>
      <h3>{t}</h3>
      <dl>
        <div><dt>Why first</dt><dd>{why}</dd></div>
        <div><dt>Fastest decisive check</dt><dd>{check}</dd></div>
      </dl>
    </div>
  </div>
);

const Assume = ({ icon, tone, a, how }: { icon: string; tone: Tone; a: string; how: string }) => (
  <div className="acard">
    <Icon name={icon} size={32} tone={tone} />
    <div>
      <b>I’m assuming: {a}</b>
      <div className="how"><b>How I’d check it:</b> {how}</div>
    </div>
  </div>
);

const slides = [
  // ---------------- Slide 1: the two beliefs ----------------
  <Fit key="s1">
    <div className="grid4">
      <div className="panel peach">
        <span className="kicker">Growth PM case study · Part 2</span>
        <h1>Diagnose the drop</h1>
        <p>
          Two parents can want the same outcome for their child but feel different urgency—or face different constraints. The uneven attendance
          pattern suggests a better question than “Does waiting cause no-shows?”: what makes an interested family ready and able to show up?
        </p>
        <div className="hd" style={{ marginTop: 4 }}>
          <Icon name="question" size={28} tone="gold" />
          <h3>The question</h3>
        </div>
        <p>
          Some on the team believe attendance falls as the booking gap grows. They also believe a parent who books 5 days out is no different
          from one who books the same day, since both wanted the demo when they clicked the ad. Do you agree? Where the data does show a drop,
          what is happening in the days between booking and session? What forces work against attendance as time passes?
        </p>
        <div className="callout">
          <b>What matters for Bhanzu.</b> Don’t mistake a later booking for a less caring parent—or a same-day booking for guaranteed
          commitment. The 34% same-day no-show rate says a short wait alone is not enough. We need to understand both{" "}
          <b>why a family chooses a date</b> and <b>what it takes for them to attend it</b>.
        </div>
      </div>

      <div className="panel">
        <span className="kicker">The two beliefs · Do I agree?</span>
        <span className="verdict-pill p">PARTLY AGREE</span>
        <h3>“Attendance falls as the booking gap grows.”</h3>
        <p>
          <b>The endpoints suggest a decline, but “more waiting means lower attendance” is not consistently true.</b> Attendance is 66% on{" "}
          <b>both days 0 and 1</b>, eases to 64% and 62% on days 2–3, and is <b>57% on both days 4 and 5</b>. Day 6 then{" "}
          <b>rebounds to 63%</b> before day 7 reaches 55%. Another day of waiting does not always correspond to another drop.
        </p>
        <p>
          <b>My read:</b> A parent’s desire for better maths learning may be equally real across the groups, while the{" "}
          <b>urgency to act now, readiness to commit an hour, and freedom to choose a slot</b> differ. A family booking today may need a
          solution quickly; one choosing five days later may be just as serious but constrained by school or work—or still weighing options.
          Those are competing explanations, <b>not facts established by the chart</b>.
        </p>
        <p>
          <b>The test:</b> Who chose the gap, what earlier slots were actually available, and why did the family select that time? We also
          need booking counts for each day to judge whether the apparent plateaus and day-6 rebound are reliable. The data shows association,
          not that waiting itself reduces motivation.
        </p>
      </div>

      <div className="panel">
        <span className="verdict-pill x">DISAGREE</span>
        <h3>“A parent who books 5 days out is no different from a same-day parent.”</h3>
        <ul>
          <li><b>Same aspiration does not mean same urgency.</b> Both families may want their child to become confident at maths. One may want help this evening; another may be exploring a decision for next week.</li>
          <li><b>Interest is not attendance readiness.</b> A parent must also secure the child’s time, a quiet hour and a workable device. A later booking could reflect those constraints, not weaker interest.</li>
          <li><b>The outcomes differ.</b> Five-day attendance is 57% versus 66% for same-day bookings: 9 percentage points fewer attendees per 100 bookings in those respective groups. But we cannot tell whether the gap, parent differences or available slots produced that difference.</li>
        </ul>
      </div>

      <div className="panel">
        <div className="hd"><Icon name="trend" size={28} tone="blue" /><h3>Where the drop shows in the data</h3></div>
        <ZoneChart />
        <p className="small">Axis zoomed to 50–70% for readability. The plateaus, dip and rebound describe observed rates, not a proven day-4 threshold or a causal effect.</p>
      </div>
    </div>
  </Fit>,

  // ---------------- Slide 2: the days between, and the forces ----------------
  <Fit key="s2">
    <div className="grid2">
      <div className="panel">
        <span className="kicker">What is happening in the days between</span>
        <div className="hd"><Icon name="calendar" size={28} /><h3>A real intention meets five days of real life</h3></div>
        <p className="small">
          Imagine Priya booking on Friday for her daughter’s Wednesday demo after a difficult maths homework evening. This is a fictional
          parent story to make plausible friction visible—not interview evidence. The brief confirms a booking and a confirmation; any further
          messages, calls or support are unknown.
        </p>
        <div className="tl">
          <Step when="Fri night" icon="heart" tone="orange" t="Priya watches her daughter struggle through homework. She finds Bhanzu, feels hopeful and books Wednesday’s demo." us="A booking and confirmation are described in the brief. We do not know what else she receives." />
          <Step when="Saturday" icon="calendar" tone="gold" t="The family has errands, a birthday party and other commitments. Wednesday still seems far away." us="Possible force: the reserved hour has not become a protected calendar commitment." />
          <Step when="Sunday" icon="chat" tone="blue" t="Her daughter asks, “What will I have to do? What if the questions are too hard?” Priya has no quick answer." us="Possible force: the child’s comfort and the parent’s confidence may affect whether they attend together." />
          <Step when="Mon, Tue" icon="people" tone="red" hot t="A school test gets announced. Her partner asks whether the demo will be useful—or just another sales call. Priya wonders if they should move the time." us="Possible forces: schedule conflict, trust, and ease of rescheduling. Existing Bhanzu support is unknown." />
          <Step when="Wednesday" icon="link" tone="red" hot t="At 4:45 PM, homework runs late. Priya cannot find the joining link quickly. The demo starts without them." us="One possible no-show path—not proof that this happened or that it is common." />
        </div>
        <p className="small">
          <b>Her wish has not necessarily changed; her ability to act on it might have.</b> The story illustrates how scheduling, the child’s
          comfort, uncertainty and joining friction can accumulate. I’d verify which moments occur, how often and in which gap groups before
          choosing a fix.
        </p>
      </div>

      <div className="panel">
        <span className="kicker">Forces that work against attendance as time passes</span>
        <div className="hd"><Icon name="layers" size={28} tone="red" /><h3>Seven ways a good intention can lose to real life</h3></div>
        <div className="forces2">
          <Force icon="pause" tone="gold" t="1 · Fading priority" d="The concern that made a parent book can stop feeling urgent once school and home life take over." />
          <Force icon="calendar" tone="red" t="2 · Crowding out" d="A test, tuition, guests or a work call can take over the 60-minute window—even when the family still wants the demo." />
          <Force icon="mute" tone="blue" t="3 · Unhelpful silence" d="If guidance or timely reminders are absent, the appointment may become a forgotten form submission. First verify what Bhanzu already sends." />
          <Force icon="question" tone="orange" t="4 · Doubt" d="“Will my child feel embarrassed?” “Is it going to be a hard sell?” Unanswered questions can weaken confidence." />
          <Force icon="scale" tone="green" t="5 · Comparison" d="A recommendation from a friend or another class may change what the family prioritises." />
          <Force icon="people" tone="gold" t="6 · Other people" d="The person booking is not the only person needed: the child may resist, and another caregiver may control the schedule." />
          <Force wide icon="wrench" tone="red" t="7 · Small logistics" d="A buried link, unfamiliar device or inability to reschedule can undo even a same-day booking." />
        </div>
      </div>
    </div>
  </Fit>,

  // ---------------- Slide 3: investigation order and uncertainty ----------------
  <Fit key="s3">
    <div className="grid2">
      <div className="col">
        <div className="panel" style={{ flex: 1 }}>
          <span className="kicker">From possibilities to an investigation order</span>
          <div className="hd"><Icon name="target" size={28} tone="green" /><h3>Three hypotheses to check first</h3></div>
          <p className="small">
            I would investigate friction affecting even same-day bookings first, then expectations and slot choice. This order reflects reach
            and ease of investigation—not proof of what causes most no-shows. After checking the evidence, I would rank opportunities by{" "}
            <b>affected bookings × avoidable no-show share × realistic recovery rate × downstream enrolment value</b>, balanced against
            implementation cost.
          </p>
          <Prio n="1" t="Schedule or joining friction" why="Could affect even the 34% of same-day no-shows; often actionable." check="Join logs, scheduled time vs attempted time, reschedule behaviour; short no-show calls." />
          <Prio n="2" t="Communication or expectation gaps" why="Potentially spans all gaps; current experience is unspecified." check="Audit exact messages sent and support flows by gap; ask parents what they expected." />
          <Prio n="3" t="Gap selection / slot availability" why="Changes whether longer-gap differences call for more slots, better matching or more engagement." check="Compare first available slot, slot shown, slot chosen, weekday/time and booking source." />
          <div className="callout">
            <b>Decision rule.</b> If missed sessions are mostly logistical, simplify scheduling and joining. If expectations are unclear,
            improve pre-demo communication. If long gaps reflect limited supply, test earlier slot access. The next experiment should target
            the largest <b>recoverable</b> loss, not simply the most plausible story.
          </div>
        </div>
      </div>

      <div className="col">
        <div className="panel" style={{ flex: 1 }}>
          <span className="kicker">Acknowledging uncertainty</span>
          <div className="hd"><Icon name="search" size={28} tone="blue" /><h3>What I still need to know before prescribing a fix</h3></div>
          <Assume icon="bars" tone="green" a="The day-4/5 drop is reliable." how="Get denominators, dates and confidence intervals; check whether day 6 is a small or unusual cohort." />
          <Assume icon="mail" tone="gold" a="Parents are going silent or missing useful contact." how="Audit the complete confirmation/reminder/call journey. Do not assume step 3 means zero follow-up." />
          <Assume icon="calendar" tone="blue" a="Slot availability and parent selection explain some gap differences." how="Capture earliest available slot, all offered slots, chosen slot, booking channel and weekday/time." />
          <Assume icon="phone" tone="orange" a="No-shows share actionable reasons." how="Contact ~20 recent no-shows across same-day and long-gap buckets; ask an open question first, then probe scheduling, joining and expectations." />
          <Assume icon="flag" tone="red" a="A proposed fix changes attendance, not just clicks." how="Test one focused intervention with a control group; track verified attendance and downstream enrolment, not only engagement." />
          <div className="callout warn">
            <b>Evidence boundary.</b> No behavioural cause has been established. These hypotheses guide what to investigate—not what to claim
            as proven.
          </div>
          <Spot name="bulb" />
        </div>
      </div>
    </div>
  </Fit>,
];

export default function Part2() {
  return <Deck slides={slides} prev={{ href: "/part-1", label: "Part 1" }} next={{ href: "/part-3", label: "Part 3" }} />;
}
