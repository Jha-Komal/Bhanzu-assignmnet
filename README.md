# Bhanzu Growth PM case study

A Next.js site that presents the four parts of the case study.

- `/part-1` Read the data (3 slides)
- `/part-2` Diagnose the drop (3 slides)
- `/part-3` Propose ideas (3 slides)
- `/part-4` Build a micro-experience (slide 1 explains it, slide 2 is the working prototype)

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Part 4 prototype: the maths mystery (picture puzzles)

Switch between Parent, Child, Teacher and Counsellor at the top of slide 2. The parent sees the booking confirmation with an optional invitation, the child gets an age-matched picture puzzle (6–8, 9–11 or 12–14) with an optional harder second one, the teacher sees the responses and a simulated explanation and can record an observation, and the counsellor sees pre-demo attempts and teacher observations separately. "Reset demo" starts again.

Everything is simulated in the browser (localStorage). No real Bhanzu booking, messages, teacher integration or data collection.

## Tech

Next.js (App Router), TypeScript and plain CSS. Slides use `components/Deck.tsx`; the prototype is `components/MathsMystery.tsx`.
