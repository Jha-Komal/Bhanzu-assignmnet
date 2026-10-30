import type { Metadata } from "next";
import { Deck } from "@/components/Deck";
import { Icon } from "@/components/Icon";
import { Chart1, Chart2, Donut } from "@/components/part1/Charts";

export const metadata: Metadata = { title: "Part 1 · Read the data · Bhanzu Growth PM case study" };

const Fit = ({ children }: { children: React.ReactNode }) => <div className="fit stack" style={{ gap: 12 }}>{children}</div>;

const Q = ({ id, t, d }: { id: string; t: string; d: string }) => (
  <div className="qline">
    <span className="qid">{id}</span>
    <div>
      <b>{t}</b>
      <p>{d}</p>
    </div>
  </div>
);

const Area = ({ icon, tone, area, ask, why }: { icon: string; tone: "orange" | "green" | "blue" | "red" | "gold"; area: string; ask: string; why: string }) => (
  <div className="row-area">
    <Icon name={icon} size={30} tone={tone} />
    <div>
      <b>{area}.</b> {ask}
      <div className="why"><b>Why it matters:</b> {why}</div>
    </div>
  </div>
);

const slides = [
  // ---------------- Slide 1: what I see ----------------
  <Fit key="s1">
    <div className="grid4">
      <div className="panel peach">
        <span className="kicker">Growth PM case study · Part 1 · Read the data (no right answer)</span>
        <div className="donutwrap">
          <div><Donut /></div>
          <h1>Even same-day bookings have a 34% no-show rate</h1>
        </div>
        <p>
          Longer booking gaps are associated with lower attendance, but 34% of same-day bookings also miss the demo. The data points to two
          questions: what differs across booking gaps, and why do so many short-gap bookings not attend?
        </p>
        <div className="hd" style={{ marginTop: 4 }}>
          <Icon name="eye" size={28} />
          <h3>In one paragraph</h3>
        </div>
        <p>
          Attendance is 66% for same-day and next-day bookings, 62% by day 3, 57% on days 4–5 and 55% on day 7; day 6 rebounds to 63%. These
          are observed rates, not evidence that waiting causes the difference. The most actionable anomaly is 34% non-attendance even for
          same-day bookings. Before prioritising a fix, I need booking counts, gap definitions, slot availability, existing communications and
          reasons for missing sessions.
        </p>
      </div>

      <div className="panel">
        <span className="kicker">A · What I see · The data, drawn two ways</span>
        <div className="hd"><Icon name="bars" size={28} tone="green" /><h3>Chart 1 · Who comes and who does not, by days between booking and session</h3></div>
        <Chart1 />
        <p className="small">The first chart uses a full 0 to 100 scale, so nothing is exaggerated. The second zooms to 50 to 70 so the shape is readable, and carries numbered markers that match the patterns in section B.</p>
      </div>

      <div className="panel">
        <div className="hd"><Icon name="trend" size={28} tone="blue" /><h3>Chart 2 · Zoomed to 50–70% to show the shape</h3></div>
        <Chart2 />
        <p className="small">Zoomed axes make small differences look dramatic. A 5-point drop here is a 5-point drop on Chart 1. Pattern 6, the floor, is the red above every bar in Chart 1, so it has no marker here.</p>
      </div>

      <div className="panel sand">
        <div className="hd"><Icon name="search" size={28} tone="gold" /><h3>Reading the shape, plainly</h3></div>
        <ul>
          <li><b>Days 0 and 1:</b> flat at 66%.</li>
          <li><b>Days 2 and 3:</b> a gentle slide, 64% then 62%.</li>
          <li><b>Days 4 and 5:</b> both at 57%, five points under day 3.</li>
          <li><b>Day 6:</b> back up to 63%, which breaks the trend.</li>
          <li><b>Day 7:</b> the lowest, 55%.</li>
          <li><b>Spread:</b> 11 points from best to worst. No-shows go from 34% to 45%, which is 32% more no-shows per booking. The absolute spread is the number that matters for the whole funnel.</li>
        </ul>
        <p className="small">I would not fit or compare trend models yet. With only eight percentages and no booking counts, I cannot assess precision, bucket reliability or whether the apparent day-4 step is meaningful.</p>
      </div>
    </div>
  </Fit>,

  // ---------------- Slide 2: funnel, scenario, patterns ----------------
  <Fit key="s2">
    <div className="grid2">
      <div className="panel">
        <div className="hd"><Icon name="flag" size={28} /><h3>Where this data sits in the enrolment funnel they shared</h3></div>
        <div className="steps6">
          <div className="fstep"><Icon name="megaphone" size={26} /><b>1</b>Parent sees an ad on Meta or Google</div>
          <div className="fstep in"><Icon name="calendar" size={26} /><b>2</b>Lands on booking page, schedules a free demo</div>
          <div className="fstep in"><Icon name="clock" size={26} /><b>3</b>Gets a confirmation, then waits for the date</div>
          <div className="fstep in"><Icon name="laptop" size={26} /><b>4</b>Joins the 60-minute live demo</div>
          <div className="fstep"><Icon name="phone" size={26} /><b>5</b>Counsellor calls to discuss and offer enrolment</div>
          <div className="fstep"><Icon name="coin" size={26} /><b>6</b>Pays, and the child begins</div>
        </div>
        <ul>
          <li><b>The table covers steps 2 to 4 only.</b> Everyone in it already booked, so every parent here showed some intent. People who clicked an ad and never booked are not in this data.</li>
          <li><b>The gap is step 3.</b> The funnel describes it as a confirmation and then waiting. It lists no reminder, no contact and no owner for the days in between. Whatever happens there is the thing I most want to see.</li>
          <li><b>Step 4 is a gate.</b> The case says attendees are far more likely to enrol and no-shows are almost never recovered. So each no-show is lost for steps 5 and 6 too.</li>
        </ul>
      </div>

      <div className="panel peach">
        <div className="hd"><Icon name="people" size={28} tone="green" /><h3>Per 1,000 bookings: a scenario, not an impact estimate</h3></div>
        <div className="bar1000" role="img" aria-label="650 attend now, 10 hypothetical, 340 remaining no-shows">
          <div style={{ flex: 650, background: "#1f9d6b" }}>650 attend now</div>
          <div style={{ flex: 10, background: "#f5b72c" }} title="Hypothetical difference: 10" />
          <div style={{ flex: 340, background: "#d64545" }}>340 remaining no-shows</div>
        </div>
        <p>
          At the reported 65% benchmark, 1,000 bookings imply approximately 650 attendees and 350 non-attendees. <b>Hypothetical:</b> if the
          overall rate became 66%, that would be 660 attendees, or 10 more per 1,000.
        </p>
        <p>
          This is a one-point scenario, <b>not</b> an estimate of how many no-shows the booking gap causes or how much a scheduling
          intervention would recover. The 66% rate is observed only in the day-0 and day-1 buckets.
        </p>
        <div className="callout">
          <b>My first investigation is pattern 6.</b> A 34% same-day no-show rate warrants attention even before explaining the longer-gap
          pattern. I would validate booking volumes, exact waiting hours and operational causes, then compare the addressable impact of
          short-gap friction versus long-gap attrition. The available table cannot quantify causal opportunity size.
        </div>
      </div>
    </div>

    <div className="panel">
      <span className="kicker">B · Patterns that stand out</span>
      <div className="hd"><Icon name="list" size={28} tone="blue" /><h3>Seven patterns, and which ones make sense</h3></div>
      <p className="small">“Makes sense” means it matches what I would expect from how parents behave. “Needs explaining” means it does not. The numbers match the markers on Chart 2.</p>
      <div className="tw"><table>
        <thead><tr><th>#</th><th>Pattern</th><th>Evidence in the data</th><th>Makes sense?</th><th>How far I trust it</th></tr></thead>
        <tbody>
          <tr><td className="n">1</td><td><b>Attendance is lower the further ahead a parent books.</b></td><td>66% at days 0 to 1 against 55% at day 7.</td><td><span className="tag y">Yes</span> Time gives more chances for other things to happen.</td><td>Direction: fairly high. Shape: low.</td></tr>
          <tr><td className="n">2</td><td><b>The biggest single move is between day 3 and day 4.</b></td><td>−5 points in one day, more than the −4 across days 0 to 3. Days 4 and 5 agree at 57%.</td><td><span className="tag p">Partly</span> A “this week or next week” boundary would do this. So would a change in who books far ahead.</td><td>Medium. Two neighbouring days agree.</td></tr>
          <tr><td className="n">3</td><td><b>Same day is no better than next day.</b></td><td>66% and 66%.</td><td><span className="tag x">Needs explaining</span> I would expect the freshest intent to win.</td><td>Medium. Needs counts.</td></tr>
          <tr><td className="n">4</td><td><b>Day 6 bounces back.</b></td><td>63%, between 57% (day 5) and 55% (day 7).</td><td><span className="tag x">Needs explaining</span> Forgetting does not reverse for one day. Weekend slots, counsellor-booked demos or a small sample could each do it.</td><td>Low until I see how many bookings sit in that bucket.</td></tr>
          <tr><td className="n">5</td><td><b>Day 7 is the worst.</b></td><td>55%.</td><td><span className="tag y">Yes</span> It is the longest wait. But I do not know if “7” means exactly 7 or 7 and over.</td><td>Medium.</td></tr>
          <tr><td className="n">6</td><td><b>Same-day non-attendance is substantial.</b> The highest observed bucket rate is 66%.</td><td>34% of same-day bookers do not come.</td><td><span className="tag x">Needs explaining</span> Calendar-day grouping hides exact hours. A long wait is less plausible for some same-day parents, but we still need their booking-to-session hours and reasons.</td><td>High. It is the table’s own number.</td></tr>
          <tr><td className="n">7</td><td><b>The 65% benchmark suggests heavy weight in high-rate buckets, if comparable.</b></td><td>65% exceeds every day-2-to-7 bucket rate. If the benchmark is the exact volume-weighted mean of these same rows, no more than 50% of bookings can be in days 2–7 (their highest rate is 64%). The exact mix is unknown.</td><td><span className="tag y">Yes</span> The short-gap buckets must carry substantial weight, conditional on aligned definitions and rounding.</td><td>Medium. Rests on how the benchmark was computed.</td></tr>
        </tbody></table></div>
    </div>
  </Fit>,

  // ---------------- Slide 3: questions, clarifying, plan ----------------
  <Fit key="s3">
    <div className="grid2">
      <div className="col">
      <div className="panel">
        <span className="kicker">C · Questions this raises</span>
        <div className="hd"><Icon name="question" size={28} tone="red" /><h3>What I would ask about the data itself</h3></div>
        <Q id="Q1" t="Why does attendance hold for about three days and then fall?" d="Is there a threshold in the parent’s week, or in what we send her?" />
        <Q id="Q2" t="Why is booking the same day no better than booking tomorrow?" d="Are same-day bookings really made minutes before, or is “day 0” a mix?" />
        <Q id="Q3" t="Why does day 6 recover?" d="Is it a real group (weekend, counsellor-booked) or noise?" />
        <Q id="Q4" t="Why do 34% of same-day bookers not come?" d="Is it the link, the timing, the child, or doubt about what the demo is?" />
        <Q id="Q5" t="Is the gap a cause, or just a label?" d="A parent who picks a slot five days out and one who was only offered that slot may be different people. The same-looking number could be two different behaviours." />
        <Q id="Q6" t="What does a parent get between confirmation and session?" d="The funnel shows one confirmation and then waiting. If that is all, the length of the silence grows with the gap." />
        <Q id="Q7" t="Is long-gap attendance associated with worse outcomes at steps 5 and 6?" d="If downstream conversion is also lower, the segment may have higher commercial risk; causality would still be unproven." />
        <Q id="Q8" t="Is “almost never recovered” measured or assumed?" d="Do we try, and how soon after the missed session?" />
      </div>
      <div className="panel" style={{ background: "#fff6df", borderColor: "transparent" }}>
        <div className="hd"><Icon name="ban" size={28} tone="gold" /><h3>What I would not conclude yet</h3></div>
        <p>
          That the gap causes the drop. That the shape is a slope or a step. That shortening gaps would lift overall attendance by any
          specified amount. That the day-6 bounce is real. Each of these needs one of the answers above.
        </p>
      </div>

      <div className="panel peach">
        <div className="hd"><Icon name="clock" size={28} /><h3>How I would get those answers in a week</h3></div>
        <div className="weekgrid">
          <div><span className="pill">Day 1 to 2</span>Ask analytics for the same table with booking counts, slot source and channel.</div>
          <div><span className="pill">Day 2 to 3</span>Make a test booking and capture every message and when it arrives.</div>
          <div><span className="pill">Day 3 to 5</span>Call 20 recent no-shows with one open question: “What happened on the day?”</div>
          <div><span className="pill">Day 5</span>Re-read the data with counts and decide which pattern to investigate first.</div>
        </div>
      </div>
      </div>
      <div className="col">
      <div className="panel" style={{ flex: 1 }}>
        <span className="kicker">D · What I would want to know before concluding</span>
        <div className="hd"><Icon name="chat" size={28} tone="blue" /><h3>Clarifying questions, and what each answer would change</h3></div>
        <Area icon="ruler" tone="orange" area="Definitions" ask="Is the gap in calendar days or hours? Counted from booking to the original slot or the final slot after any reschedule? What counts as “attended”: joined at all, or stayed some minutes? Is day 7 exactly 7 or 7 and over? Are cancellations and reschedules in the no-show number?" why="“Day 1” can be 2 hours or 47. A rescheduled booking counted at its first gap can hide a recovery that already works." />
        <Area icon="bars" tone="green" area="Size and noise" ask="How many bookings sit in each day? Over what period? Is the 65% the weighted average of these same rows?" why="Without bucket sizes and uncertainty intervals, a 57% versus 63% difference could reflect sampling variation; large sample sizes alone would not fix selection bias." />
        <Area icon="people" tone="blue" area="Who and why" ask="Who chose the slot: the parent, “first available”, or a counsellor? What are the splits by Meta or Google, campaign, child’s grade, city, weekday, time of day, device, first booking or repeat?" why="Slot availability versus preference changes which interventions are worth testing. Differences in channel, day or family characteristics may confound the aggregate pattern." />
        <Area icon="mail" tone="gold" area="Step 3 today" ask="What is sent between confirmation and session: how many touches, on which channel, when, from whom? Where does the join link live? Does anyone call before the demo?" why="This reveals whether messaging or joining friction is a credible mechanism, rather than assuming the funnel description fully specifies current operations." />
        <Area icon="coin" tone="green" area="Steps 5 and 6" ask="Attended-to-enrolled by gap bucket. Counsellor connect rate and how soon the call happens. Revenue per booking by gap." why="The goal is enrolments, not attendance. A rise in attendance that converts worse would not help." />
        <Area icon="up" tone="red" area="Upstream (steps 1 and 2)" ask="Does booking conversion change when only far-away slots are shown? Which campaigns produce long-gap bookings?" why="The table starts after booking. A change that shortens the gap but costs bookings could lose more than it gains." />
        <Area icon="chat" tone="orange" area="The parent’s own words" ask="Why did recent no-shows not come? Has anyone asked?" why="A small qualitative sample can uncover mechanisms to test; it will not establish their prevalence." />
      </div>

      </div>
    </div>
  </Fit>,
];

export default function Part1() {
  return <Deck slides={slides} prev={{ href: "/", label: "Cover" }} next={{ href: "/part-2", label: "Part 2" }} />;
}
