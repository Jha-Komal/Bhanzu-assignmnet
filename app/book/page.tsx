"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BANDS, type Band } from "@/lib/content";
import { useStore } from "@/lib/store";

const HOURS = [16, 17, 18, 19];
const hourLabel = (h: number) => `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? "PM" : "AM"}`;

// Sign-up is simulated: any 10-digit number works, and the code is shown on screen.
export default function Book() {
  const router = useRouter();
  const { book } = useStore();
  const [step, setStep] = useState(1);
  const [parent, setParent] = useState("");
  const [phone, setPhone] = useState("");
  const [child, setChild] = useState("");
  const [band, setBand] = useState<Band>("B");
  const [otp, setOtp] = useState("");
  const [day, setDay] = useState(2);
  const [hour, setHour] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);

  const days = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 8 }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() + i);
      return { i, d };
    });
  }, []);

  const phoneOk = /^\d{10}$/.test(phone.replace(/\s/g, ""));
  const detailsOk = parent.trim().length > 1 && child.trim().length > 1 && phoneOk;

  function hourOk(dayIdx: number, h: number) {
    if (dayIdx > 0) return true;
    const t = new Date();
    t.setHours(h, 0, 0, 0);
    return t.getTime() > Date.now() + 2 * 3600e3;
  }

  function submit() {
    if (hour === null) return;
    const demo = new Date();
    demo.setDate(demo.getDate() + day);
    demo.setHours(hour, 0, 0, 0);
    book({
      parent: parent.trim(),
      phone: phone.replace(/\s/g, ""),
      child: child.trim(),
      band,
      bookedAt: Date.now(),
      gap: day,
      demoAt: demo.getTime(),
    });
    router.push("/booked");
  }

  return (
    <div className="narrow section">
      <div className="stack" style={{ gap: 22 }}>
        <div className="steps" aria-label={`Step ${step} of 3`}>
          {[1, 2, 3].map((s) => (
            <i key={s} className={s <= step ? "on" : ""} />
          ))}
        </div>

        {step === 1 && (
          <div className="card shadow stack">
            <div className="stack-s">
              <span className="eyebrow">Step 1 of 3</span>
              <h2>Book a free demo</h2>
              <p className="muted small">Live class, up to 6 children, no card, no commitment.</p>
            </div>
            <label className="field">Your name
              <input value={parent} onChange={(e) => setParent(e.target.value)} placeholder="Priya" autoComplete="given-name" />
            </label>
            <label className="field">Mobile number
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit number" inputMode="numeric" autoComplete="tel-national" />
              {touched && !phoneOk && <span className="err">Enter any 10-digit number. This is a simulation.</span>}
            </label>
            <label className="field">Child&rsquo;s name
              <input value={child} onChange={(e) => setChild(e.target.value)} placeholder="Aarav" />
            </label>
            <div className="field">Child&rsquo;s age
              <div className="row">
                {(Object.keys(BANDS) as Band[]).map((b) => (
                  <button key={b} type="button" className="chip" aria-pressed={band === b} onClick={() => setBand(b)}>
                    {BANDS[b].label}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="btn block lg"
              onClick={() => {
                setTouched(true);
                if (detailsOk) setStep(2);
              }}
            >
              Send me a code
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="card shadow stack">
            <div className="stack-s">
              <span className="eyebrow">Step 2 of 3</span>
              <h2>Verify your number</h2>
              <p className="muted small">Simulated. In a real flow a code would be texted to {phone}. Your code is <b>1234</b>.</p>
            </div>
            <label className="field">Code
              <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="1234" inputMode="numeric" maxLength={4} />
              {otp.length === 4 && otp !== "1234" && <span className="err">That is not the code. Use 1234.</span>}
            </label>
            <div className="row">
              <button className="btn ghost" onClick={() => setOtp("1234")}>Fill it for me</button>
              <button className="btn" disabled={otp !== "1234"} onClick={() => setStep(3)}>Verify</button>
            </div>
            <button className="link" onClick={() => setStep(1)}>Back</button>
          </div>
        )}

        {step === 3 && (
          <div className="card shadow stack">
            <div className="stack-s">
              <span className="eyebrow">Step 3 of 3</span>
              <h2>Pick a time for {child || "your child"}</h2>
              <p className="muted small">
                Pick a later day to see how the pass adds daily missions for a longer wait. Booking more than 3 days ahead is where attendance drops most.
              </p>
            </div>
            <div className="slot-days" role="group" aria-label="Day">
              {days.map(({ i, d }) => (
                <button key={i} className="day" aria-pressed={day === i} onClick={() => { setDay(i); setHour(null); }}>
                  {i === 0 ? "Today" : d.toLocaleDateString("en-IN", { weekday: "short" })}
                  <small>{d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</small>
                </button>
              ))}
            </div>
            <div className="slot-times" role="group" aria-label="Time">
              {HOURS.map((h) => (
                <button key={h} className="time" aria-pressed={hour === h} disabled={!hourOk(day, h)} onClick={() => setHour(h)}>
                  {hourLabel(h)}
                </button>
              ))}
            </div>
            {day === 0 && !HOURS.some((h) => hourOk(0, h)) && <p className="small muted">No more slots today. Try tomorrow.</p>}
            <button className="btn block lg" disabled={hour === null} onClick={submit}>
              Book my free demo
            </button>
            <button className="link" onClick={() => setStep(2)}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
}
