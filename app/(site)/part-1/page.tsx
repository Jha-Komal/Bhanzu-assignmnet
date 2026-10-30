import type { Metadata } from "next";
import { Deck } from "@/components/Deck";
import { Chart1, Chart2 } from "@/components/part1/Charts";

export const metadata: Metadata = { title: "Part 1 · Read the data · Bhanzu Growth PM case study" };

const Head = ({ k, title, sub }: { k: string; title: string; sub?: string }) => (
  <div className="stack-s">
    <span className="kicker">{k}</span>
    <h2>{title}</h2>
    {sub && <p className="note">{sub}</p>}
  </div>
);

const slides = [
  // 1 title
  <>
    <span className="kicker">Growth PM case study · Part 1 · Read the data (no right answer)</span>
    <h1>Even same-day bookings have a 34% no-show rate</h1>
    <p className="lede">
      Longer booking gaps are associated with lower attendance, but 34% of same-day bookings also miss the demo. The data points to two
      questions: what differs across booking gaps, and why do so many short-gap bookings not attend?
    </p>
  </>,

  // 2 one paragraph
  <>
    <Head k="In one paragraph" title="Attendance slides from 66% to 55%, with one odd rebound" />
    <div className="stats">
      <div className="stat hi"><b>66<small>%</small></b><span>same day and next day</span></div>
      <div className="stat"><b>62<small>%</small></b><span>by day 3</span></div>
      <div className="stat"><b>57<small>%</small></b><span>days 4 and 5</span></div>
      <div className="stat"><b>63<small>%</small></b><span>day 6 rebounds</span></div>
      <div className="stat low"><b>55<small>%</small></b><span>day 7</span></div>
    </div>
    <p className="lede">
      These are observed rates, not evidence that waiting causes the difference. The most actionable anomaly is 34% non-attendance even for
      same-day bookings. Before prioritising a fix, I need booking counts, gap definitions, slot availability, existing communications and
      reasons for missing sessions.
    </p>
  </>,

  // 3 chart 1
  <>
    <Head
      k="A · What I see · Chart 1"
      title="Who comes and who does not, by days between booking and session"
      sub="Full 0 to 100 scale, so nothing is exaggerated."
    />
    <div className="card"><Chart1 /></div>
  </>,

  // 4 chart 2
  <>
    <Head
      k="A · What I see · Chart 2"
      title="Zoomed to 50–70% to show the shape"
      sub="The numbered markers match the patterns in section B."
    />
    <div className="card"><Chart2 /></div>
    <p className="note">
      Zoomed axes make small differences look dramatic. A 5-point drop here is a 5-point drop on Chart 1. Pattern 6, the floor, is the red
      above every bar in Chart 1, so it has no marker here.
    </p>
  </>,

  // 5 shape
  <>
    <Head k="A · What I see" title="Reading the shape, plainly" />
    <div className="grid g2">
      {[
        ["Days 0 and 1", "Flat at 66%."],
        ["Days 2 and 3", "A gentle slide, 64% then 62%."],
        ["Days 4 and 5", "Both at 57%, five points under day 3."],
        ["Day 6", "Back up to 63%, which breaks the trend."],
        ["Day 7", "The lowest, 55%."],
        ["Spread", "11 points from best to worst. No-shows go from 34% to 45%, which is 32% more no-shows per booking. The absolute spread is the number that matters for the whole funnel."],
      ].map(([t, d]) => (
        <div key={t} className="card stack-s">
          <h3>{t}</h3>
          <p className="muted">{d}</p>
        </div>
      ))}
    </div>
    <p className="note">
      I would not fit or compare trend models yet. With only eight percentages and no booking counts, I cannot assess precision, bucket
      reliability or whether the apparent day-4 step is meaningful.
    </p>
  </>,

  // 6 funnel
  <>
    <Head k="A · What I see" title="Where this data sits in the enrolment funnel they shared" />
    <div className="steps6">
      <div className="fstep"><b>1</b>Parent sees an ad on Meta or Google</div>
      <div className="fstep in"><b>2</b>Lands on booking page, schedules a free demo</div>
      <div className="fstep in"><b>3</b>Gets a confirmation, then waits for the date</div>
      <div className="fstep in"><b>4</b>Joins the 60-minute live demo</div>
      <div className="fstep"><b>5</b>Counsellor calls to discuss and offer enrolment</div>
      <div className="fstep"><b>6</b>Pays, and the child begins</div>
    </div>
    <ul>
      <li><b>The table covers steps 2 to 4 only.</b> Everyone in it already booked, so every parent here showed some intent. People who clicked an ad and never booked are not in this data.</li>
      <li><b>The gap is step 3.</b> The funnel describes it as a confirmation and then waiting. It lists no reminder, no contact and no owner for the days in between. Whatever happens there is the thing I most want to see.</li>
      <li><b>Step 4 is a gate.</b> The case says attendees are far more likely to enrol and no-shows are almost never recovered. So each no-show is lost for steps 5 and 6 too.</li>
    </ul>
  </>,

  // 7 per 1000
  <>
    <Head k="A · What I see" title="Per 1,000 bookings: a scenario, not an impact estimate" />
    <div className="bar1000" role="img" aria-label="650 attend now, a hypothetical 10 more, 340 remaining no-shows">
      <div style={{ flex: 650, background: "#1f9d6b" }}>650 attend now</div>
      <div style={{ flex: 10, background: "#f5b72c" }} title="Hypothetical difference: 10" />
      <div style={{ flex: 340, background: "#d64545" }}>340 remaining no-shows</div>
    </div>
    <p className="lede">
      At the reported 65% benchmark, 1,000 bookings imply approximately 650 attendees and 350 non-attendees. <b>Hypothetical:</b> if the
      overall rate became 66%, that would be 660 attendees, or 10 more per 1,000.
    </p>
    <p className="note">
      This is a one-point scenario, <b>not</b> an estimate of how many no-shows the booking gap causes or how much a scheduling
      intervention would recover. The 66% rate is observed only in the day-0 and day-1 buckets.
    </p>
  </>,

  // 8 patterns 1-4
  <>
    <Head k="B · Patterns that stand out · 1 of 2" title="Seven patterns, and which ones make sense" sub="“Makes sense” means it matches what I would expect from how parents behave. “Needs explaining” means it does not. The numbers match the markers on Chart 2." />
    <div className="tw"><table>
      <thead><tr><th>#</th><th>Pattern</th><th>Evidence in the data</th><th>Makes sense?</th><th>How far I trust it</th></tr></thead>
      <tbody>
        <tr><td className="n">1</td><td><b>Attendance is lower the further ahead a parent books.</b></td><td>66% at days 0 to 1 against 55% at day 7.</td><td><span className="tag y">Yes</span> Time gives more chances for other things to happen.</td><td>Direction: fairly high. Shape: low.</td></tr>
        <tr><td className="n">2</td><td><b>The biggest single move is between day 3 and day 4.</b></td><td>−5 points in one day, more than the −4 across days 0 to 3. Days 4 and 5 agree at 57%.</td><td><span className="tag p">Partly</span> A “this week or next week” boundary would do this. So would a change in who books far ahead.</td><td>Medium. Two neighbouring days agree.</td></tr>
        <tr><td className="n">3</td><td><b>Same day is no better than next day.</b></td><td>66% and 66%.</td><td><span className="tag x">Needs explaining</span> I would expect the freshest intent to win.</td><td>Medium. Needs counts.</td></tr>
        <tr><td className="n">4</td><td><b>Day 6 bounces back.</b></td><td>63%, between 57% (day 5) and 55% (day 7).</td><td><span className="tag x">Needs explaining</span> Forgetting does not reverse for one day. Weekend slots, counsellor-booked demos or a small sample could each do it.</td><td>Low until I see how many bookings sit in that bucket.</td></tr>
      </tbody></table></div>
  </>,

  // 9 patterns 5-7
  <>
    <Head k="B · Patterns that stand out · 2 of 2" title="Seven patterns, and which ones make sense" />
    <div className="tw"><table>
      <thead><tr><th>#</th><th>Pattern</th><th>Evidence in the data</th><th>Makes sense?</th><th>How far I trust it</th></tr></thead>
      <tbody>
        <tr><td className="n">5</td><td><b>Day 7 is the worst.</b></td><td>55%.</td><td><span className="tag y">Yes</span> It is the longest wait. But I do not know if “7” means exactly 7 or 7 and over.</td><td>Medium.</td></tr>
        <tr><td className="n">6</td><td><b>Same-day non-attendance is substantial.</b> The highest observed bucket rate is 66%.</td><td>34% of same-day bookers do not come.</td><td><span className="tag x">Needs explaining</span> Calendar-day grouping hides exact hours. A long wait is less plausible for some same-day parents, but we still need their booking-to-session hours and reasons.</td><td>High. It is the table’s own number.</td></tr>
        <tr><td className="n">7</td><td><b>The 65% benchmark suggests heavy weight in high-rate buckets, if comparable.</b></td><td>65% exceeds every day-2-to-7 bucket rate. If the benchmark is the exact volume-weighted mean of these same rows, no more than 50% of bookings can be in days 2–7 (their highest rate is 64%). The exact mix is unknown.</td><td><span className="tag y">Yes</span> The short-gap buckets must carry substantial weight, conditional on aligned definitions and rounding.</td><td>Medium. Rests on how the benchmark was computed.</td></tr>
      </tbody></table></div>
    <div className="callout">
      <b>My first investigation is pattern 6.</b> A 34% same-day no-show rate warrants attention even before explaining the longer-gap
      pattern. I would validate booking volumes, exact waiting hours and operational causes, then compare the addressable impact of
      short-gap friction versus long-gap attrition. The available table cannot quantify causal opportunity size.
    </div>
  </>,

  // 10 questions 1-4
  <>
    <Head k="C · Questions this raises · 1 of 2" title="What I would ask about the data itself" />
    <div className="qgrid">
      <div className="qcard"><span className="qid">Q1</span><div><b>Why does attendance hold for about three days and then fall?</b><p>Is there a threshold in the parent’s week, or in what we send her?</p></div></div>
      <div className="qcard"><span className="qid">Q2</span><div><b>Why is booking the same day no better than booking tomorrow?</b><p>Are same-day bookings really made minutes before, or is “day 0” a mix?</p></div></div>
      <div className="qcard"><span className="qid">Q3</span><div><b>Why does day 6 recover?</b><p>Is it a real group (weekend, counsellor-booked) or noise?</p></div></div>
      <div className="qcard"><span className="qid">Q4</span><div><b>Why do 34% of same-day bookers not come?</b><p>Is it the link, the timing, the child, or doubt about what the demo is?</p></div></div>
    </div>
  </>,

  // 11 questions 5-8
  <>
    <Head k="C · Questions this raises · 2 of 2" title="What I would ask about the data itself" />
    <div className="qgrid">
      <div className="qcard"><span className="qid">Q5</span><div><b>Is the gap a cause, or just a label?</b><p>A parent who picks a slot five days out and one who was only offered that slot may be different people. The same-looking number could be two different behaviours.</p></div></div>
      <div className="qcard"><span className="qid">Q6</span><div><b>What does a parent get between confirmation and session?</b><p>The funnel shows one confirmation and then waiting. If that is all, the length of the silence grows with the gap.</p></div></div>
      <div className="qcard"><span className="qid">Q7</span><div><b>Is long-gap attendance associated with worse outcomes at steps 5 and 6?</b><p>If downstream conversion is also lower, the segment may have higher commercial risk; causality would still be unproven.</p></div></div>
      <div className="qcard"><span className="qid">Q8</span><div><b>Is “almost never recovered” measured or assumed?</b><p>Do we try, and how soon after the missed session?</p></div></div>
    </div>
  </>,

  // 12 clarifying 1
  <>
    <Head k="D · What I would want to know before concluding · 1 of 2" title="Clarifying questions, and what each answer would change" />
    <div className="tw"><table>
      <thead><tr><th>Area</th><th>What I would ask</th><th>Why it matters</th></tr></thead>
      <tbody>
        <tr><td><b>Definitions</b></td><td>Is the gap in calendar days or hours? Counted from booking to the original slot or the final slot after any reschedule? What counts as “attended”: joined at all, or stayed some minutes? Is day 7 exactly 7 or 7 and over? Are cancellations and reschedules in the no-show number?</td><td>“Day 1” can be 2 hours or 47. A rescheduled booking counted at its first gap can hide a recovery that already works.</td></tr>
        <tr><td><b>Size and noise</b></td><td>How many bookings sit in each day? Over what period? Is the 65% the weighted average of these same rows?</td><td>Without bucket sizes and uncertainty intervals, a 57% versus 63% difference could reflect sampling variation; large sample sizes alone would not fix selection bias.</td></tr>
        <tr><td><b>Who and why</b></td><td>Who chose the slot: the parent, “first available”, or a counsellor? What are the splits by Meta or Google, campaign, child’s grade, city, weekday, time of day, device, first booking or repeat?</td><td>Slot availability versus preference changes which interventions are worth testing. Differences in channel, day or family characteristics may confound the aggregate pattern.</td></tr>
      </tbody></table></div>
  </>,

  // 13 clarifying 2
  <>
    <Head k="D · What I would want to know before concluding · 2 of 2" title="Clarifying questions, and what each answer would change" />
    <div className="tw"><table>
      <thead><tr><th>Area</th><th>What I would ask</th><th>Why it matters</th></tr></thead>
      <tbody>
        <tr><td><b>Step 3 today</b></td><td>What is sent between confirmation and session: how many touches, on which channel, when, from whom? Where does the join link live? Does anyone call before the demo?</td><td>This reveals whether messaging or joining friction is a credible mechanism, rather than assuming the funnel description fully specifies current operations.</td></tr>
        <tr><td><b>Steps 5 and 6</b></td><td>Attended-to-enrolled by gap bucket. Counsellor connect rate and how soon the call happens. Revenue per booking by gap.</td><td>The goal is enrolments, not attendance. A rise in attendance that converts worse would not help.</td></tr>
        <tr><td><b>Upstream (steps 1 and 2)</b></td><td>Does booking conversion change when only far-away slots are shown? Which campaigns produce long-gap bookings?</td><td>The table starts after booking. A change that shortens the gap but costs bookings could lose more than it gains.</td></tr>
        <tr><td><b>The parent’s own words</b></td><td>Why did recent no-shows not come? Has anyone asked?</td><td>A small qualitative sample can uncover mechanisms to test; it will not establish their prevalence.</td></tr>
      </tbody></table></div>
  </>,

  // 14 not conclude + week
  <>
    <Head k="D · What I would want to know before concluding" title="What I would not conclude yet, and how I would find out" />
    <div className="callout warn">
      <b>What I would not conclude yet.</b> That the gap causes the drop. That the shape is a slope or a step. That shortening gaps would
      lift overall attendance by any specified amount. That the day-6 bounce is real. Each of these needs one of the answers above.
    </div>
    <div className="card stack">
      <h3>How I would get those answers in a week</h3>
      <div className="grid g2">
        {[
          ["Day 1 to 2", "Ask analytics for the same table with booking counts, slot source and channel."],
          ["Day 2 to 3", "Make a test booking and capture every message and when it arrives."],
          ["Day 3 to 5", "Call 20 recent no-shows with one open question: “What happened on the day?”"],
          ["Day 5", "Re-read the data with counts and decide which pattern to investigate first."],
        ].map(([d, t]) => (
          <div key={d} className="stack-s">
            <span className="pill">{d}</span>
            <p>{t}</p>
          </div>
        ))}
      </div>
    </div>
  </>,
];

export default function Part1() {
  return <Deck slides={slides} prev={{ href: "/", label: "Cover" }} next={{ href: "/part-2", label: "Part 2" }} />;
}
