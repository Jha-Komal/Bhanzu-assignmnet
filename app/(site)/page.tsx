import Link from "next/link";

const PARTS = [
  ["1", "Read the data", "What the attendance numbers show, what makes sense, and what I would ask.", "/part-1"],
  ["2", "Diagnose the drop", "Why parents who book do not show up, and how I would check each belief.", "/part-2"],
  ["3", "Propose ideas", "Prioritised ideas to lift attendance from 65% towards 75 to 80%.", "/part-3"],
  ["4", "The product", "A working prototype: the Mission Pass, between booking and the demo.", "/part-4"],
];

export default function Cover() {
  return (
    <section className="cover">
      <div className="wrap">
        <div className="stack">
          <span className="eyebrow">Growth PM case study · Bhanzu</span>
          <h1 style={{ maxWidth: "16ch" }}>Why do parents book a free demo and not show up?</h1>
          <p className="muted" style={{ fontSize: 21, maxWidth: "56ch" }}>
            About 65% of parents who book a free demo attend. Four short parts: read the data, diagnose the drop, propose ideas, and a working
            prototype you can try.
          </p>
          <div className="row">
            <Link href="/part-1" className="btn lg">Start with Part 1</Link>
            <span className="tiny muted">Use the arrow keys or swipe to move through each part.</span>
          </div>
        </div>
        <div className="parts">
          {PARTS.map(([n, t, d, href]) => (
            <Link key={n} href={href} className="partcard">
              <span className="pn">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
