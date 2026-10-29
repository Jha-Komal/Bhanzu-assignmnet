# Mission Pass: Bhanzu Growth PM case study, Part 4

A working Next.js prototype of the **Mission Pass**: one link, one pass and one short game a child plays between booking a free demo and the demo itself. It is built for the case study "Part 4: Build a micro-experience".

> Case-study prototype. Not an official Bhanzu product. Sign-up, messages, the counsellor view and all data are **simulated in the browser** (localStorage). Nothing is sent anywhere.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Try it in two minutes:

1. **Book a demo.** Any 10-digit number works, and the code is `1234`. Pick a slot a few days away to see the daily missions.
2. **Hand the phone to the child** and play the 90-second Speed Run.
3. Open **Reviewer tools** (bottom left) and press **+1 day** to unlock missions, then **Jump to demo day**.
4. On demo day: the trick unlocks, a short repeat round runs, and the level-up card shows the before and after.
5. Check **Parent messages** (what the parent would receive) and **Counsellor view** (the Family Brief the counsellor sees).

## Why this idea

From Parts 1 to 3: even same-day bookers miss about 34% of demos, and the booking gap explains only a small part of the loss. Reminders alone do not give anyone a reason to attend. This idea was picked because it:

- **Lifts attendance on every gap.** The child gets a reason of their own to want the class (a locked trick and a streak), and the parent hears from us with something useful, so a long wait never goes silent.
- **Carries engagement forward.** The teacher starts at the child's level. The counsellor opens the call on the child's own numbers instead of a price. The same measure repeated at week 4 is the proof of learning for enrolment.
- **Is cheap to run.** One link, no login, no app.

## What the parent and child see, step by step

1. **Booking.** The parent books a free demo (simulated sign-up, one time slot).
2. **Booked page.** One tap, "Yes, we'll be there", and an optional worry chip ("Word problems", and so on). These feed the Family Brief.
3. **Speed Run (child, about 90 seconds).** Five age-matched questions with a gentle timer. No red marks stay on screen. The child earns the first piece of a 5-piece locked trick.
4. **Snapshot (parent).** Strength, where the child will grow fastest, and average thinking time. Framed as a snapshot, not a grade.
5. **Daily missions (child, about 20 seconds each).** One puzzle unlocks the next piece. The number scales with the wait:
   - 0 to 1 days: one pre-demo mission on demo day.
   - 2 to 3 days: two missions.
   - 4 to 7 days: three missions, spaced one to three days apart.
   A missed day just waits and a try always counts. The parent gets a gentle nudge, never guilt.
6. **Demo day.** The teacher unlocks the full trick live. A short repeat round uses the same kinds of questions with new numbers.
7. **Level-up card.** Before and after, in the child's own answers. The headline only claims "faster" when accuracy did not drop.
8. **Counsellor view.** A Family Brief with the worry, seat confirmation, numbers, streak and a suggested call opener.

## The one early signal (first 3 days)

**The share of children who finish the Speed Run within 24 hours of booking.** Target 35 to 45%. Below about 20%, the entry is too hard or the link is not being opened, and that should be fixed before judging the idea. For gaps of 3+ days, a second signal is the share who come back for mission 2 within 48 hours (target 50%).

It is a leading indicator only, because families who finish are probably keener to begin with. The real test is a randomised holdout: half of new bookings get the pass, half do not, compared on seat confirmation, counsellor connect rate, attendance and enrolments per 100 bookings.

## Assumptions and what is simulated

- The booking page can be changed to add the pass link, a confirm button and a worry question.
- The demo teacher can run a short repeat round within the 60-minute class. This needs confirming with the business.
- Teachers and counsellors will actually read the Family Brief. If they do not, the personal lines must not be sent.
- Questions are generated in the browser. The teacher (Ms. Kavya) and counsellor (Ritu) are placeholders.
- Message links such as `pass.example/...` are placeholders. In production, messages go on the channel the booking collects, with a text fallback.
- The pass starts from a simulated "now". Reviewer tools move that clock so nothing needs real waiting.

## Tech

Next.js (App Router) and TypeScript, plain CSS, no database. State lives in a small React context persisted to `localStorage`. The visual style follows bhanzu.com today (Quicksand, warm orange, peach and sand surfaces, rounded cards and pill buttons) but uses no Bhanzu logos or artwork.

```
app/            pages: home, book, booked, pass, speed-run, mission/[n], demo-day, messages, counsellor
components/     Header, ReviewerTools, Quiz, PassCard, Gate
lib/content.ts  question generators, puzzles, tricks, mission schedule by gap
lib/store.tsx   simulated state, derived values, formatting
```
