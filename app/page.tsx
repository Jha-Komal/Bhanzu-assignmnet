import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="stack" style={{ gap: 22 }}>
            <span className="pill">Free live demo · up to 6 children · no card, no commitment</span>
            <h1>
              Help your child <span>fall in love</span> with maths
            </h1>
            <p className="muted" style={{ fontSize: 20, maxWidth: "46ch" }}>
              Book a free live class. Between booking and the class, your child plays a two-minute Mission Pass and unlocks a maths trick that
              opens only in the live session.
            </p>
            <div className="row">
              <Link href="/book" className="btn lg">Book a free demo</Link>
              <Link href="#how" className="btn ghost lg">See how it works</Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden>
            <div className="blob" style={{ width: 300, height: 300, background: "var(--orange-l)", opacity: 0.45, right: 10, top: 10 }} />
            <div className="blob" style={{ width: 170, height: 170, background: "var(--blue)", opacity: 0.25, left: 20, bottom: 10 }} />
            <div className="floaty" style={{ left: 30, top: 40 }}>47 × 11 = ?</div>
            <div className="floaty" style={{ right: 20, top: 120, animationDelay: "1s" }}>🔒 Piece 3 of 5</div>
            <div className="floaty" style={{ left: 70, bottom: 60, animationDelay: "2s" }}>🔥 3 in a row</div>
            <div className="floaty" style={{ right: 60, bottom: 20, animationDelay: "1.5s", fontSize: 18 }}>Aarav's Math Mission</div>
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="wrap stack" style={{ gap: 30 }}>
          <div className="stack-s center">
            <span className="eyebrow">How it works</span>
            <h2>From booking to the live class in three moments</h2>
          </div>
          <div className="grid g3">
            {[
              ["Speed Run", "Right after booking, your child plays 5 quick questions for about 90 seconds. They earn a Demo Pass and the first piece of a locked trick. You get a starting-point snapshot."],
              ["Daily missions", "Until the class, one 20-second puzzle unlocks the next piece. Short waits get one or two. Longer waits get up to three. A missed day just waits."],
              ["Demo day", "The teacher unlocks the trick live, then replays the same kind of questions so you both see the change in one hour."],
            ].map(([t, d], i) => (
              <div key={t} className="card stack-s">
                <div className="num">{i + 1}</div>
                <h3>{t}</h3>
                <p className="muted small">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap grid g2" style={{ alignItems: "center" }}>
          <div className="stack">
            <span className="eyebrow">Why it exists</span>
            <h2>A free class is easy to forget</h2>
            <p className="muted">
              In the case data, about a third of parents who book a demo do not show up, even when it is the same day. Waiting makes it worse
              after day 3. The Mission Pass gives the child a reason to want the class, gives the teacher a starting point, and gives the
              counsellor something real to talk about.
            </p>
          </div>
          <div className="card shadow stack">
            <h3>Try it in two minutes</h3>
            <ol className="stack-s small" style={{ paddingLeft: 20, margin: 0 }}>
              <li>Book a demo. Pick a slot a few days away to see the daily missions.</li>
              <li>Hand the &ldquo;phone&rdquo; to the child and play the Speed Run.</li>
              <li>Open <b>Reviewer tools</b> (bottom left) and press <b>+1 day</b> to unlock missions.</li>
              <li>Jump to demo day, then see the <b>Parent messages</b> and the <b>Counsellor view</b>.</li>
            </ol>
            <Link href="/book" className="btn">Start</Link>
          </div>
        </div>
      </section>
    </>
  );
}
