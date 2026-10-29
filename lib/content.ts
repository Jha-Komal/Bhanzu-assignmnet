// Content and rules for the Mission Pass. Everything here is simulated and generated in the browser.

export type Band = "A" | "B" | "C";

export const BANDS: Record<Band, { label: string; short: string }> = {
  A: { label: "6 to 8 years", short: "6–8" },
  B: { label: "9 to 11 years", short: "9–11" },
  C: { label: "12 to 14 years", short: "12–14" },
};

export type Answer = { cat: string; ok: boolean; ms: number; q: string };
export type Question = { q: string; a: number; opts: number[]; cat: string };

const rnd = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const shuffle = <T,>(arr: T[]): T[] => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = rnd(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

type Gen = () => { q: string; a: number };

const GEN: Record<Band, Record<string, Gen>> = {
  A: {
    "Make 10": () => {
      const a = rnd(2, 9);
      const c = rnd(2, 6);
      return { q: `${a} + ${10 - a} + ${c}`, a: 10 + c };
    },
    Subtraction: () => {
      const a = rnd(11, 19);
      const b = rnd(3, 9);
      return { q: `${a} − ${b}`, a: a - b };
    },
    Addition: () => {
      const a = rnd(13, 48);
      const b = rnd(10, 40);
      return { q: `${a} + ${b}`, a: a + b };
    },
    "Skip counting": () => {
      const s = [2, 5, 10][rnd(0, 2)];
      const a = rnd(2, 5);
      return { q: `${a} × ${s}`, a: a * s };
    },
  },
  B: {
    "Times tables": () => {
      const a = rnd(6, 9);
      const b = rnd(6, 9);
      return { q: `${a} × ${b}`, a: a * b };
    },
    Addition: () => {
      const a = rnd(23, 68);
      const b = rnd(21, 39);
      return { q: `${a} + ${b}`, a: a + b };
    },
    Division: () => {
      const b = rnd(4, 9);
      const a = b * rnd(6, 12);
      return { q: `${a} ÷ ${b}`, a: a / b };
    },
    "Subtraction with borrowing": () => {
      const a = rnd(52, 94);
      const b = rnd(17, 39);
      return { q: `${a} − ${b}`, a: a - b };
    },
  },
  C: {
    Squares: () => {
      const a = rnd(12, 19);
      return { q: `${a} × ${a}`, a: a * a };
    },
    Percentages: () => {
      const p = [10, 20, 25, 50][rnd(0, 3)];
      const n = [40, 60, 80, 120, 200][rnd(0, 4)];
      return { q: `${p}% of ${n}`, a: (p * n) / 100 };
    },
    "Multiplying by 11": () => {
      const a = rnd(23, 89);
      return { q: `${a} × 11`, a: a * 11 };
    },
    "Three-digit addition": () => {
      const a = rnd(125, 486);
      const b = rnd(137, 399);
      return { q: `${a} + ${b}`, a: a + b };
    },
  },
};

const CAT_ORDER: Record<Band, string[]> = {
  A: ["Make 10", "Subtraction", "Addition", "Skip counting", "Make 10"],
  B: ["Times tables", "Addition", "Division", "Subtraction with borrowing", "Times tables"],
  C: ["Squares", "Percentages", "Multiplying by 11", "Three-digit addition", "Squares"],
};

function withOptions(q: string, a: number, cat: string): Question {
  const set = new Set<number>([a]);
  const opts = [a];
  for (const off of shuffle([1, -1, 10, -10, 2, -2, 5, 11, -11])) {
    const v = a + off;
    if (v > 0 && !set.has(v) && opts.length < 4) {
      set.add(v);
      opts.push(v);
    }
  }
  return { q, a, cat, opts: shuffle(opts) };
}

// The same five question types are used for the Speed Run and the demo-day round,
// with new numbers, so the before and after compare like with like.
export function genQuestions(band: Band): Question[] {
  return CAT_ORDER[band].map((cat) => {
    const { q, a } = GEN[band][cat]();
    return withOptions(q, a, cat);
  });
}

export function stats(answers: Answer[]) {
  const n = answers.length || 1;
  const ok = answers.filter((a) => a.ok).length;
  const avg = answers.reduce((s, a) => s + a.ms, 0) / n / 1000;
  const fastest = answers.filter((a) => a.ok).sort((a, b) => a.ms - b.ms)[0];
  const missed = answers.find((a) => !a.ok) ?? answers.slice().sort((a, b) => b.ms - a.ms)[0];
  return {
    ok,
    total: answers.length,
    avg,
    strong: fastest?.cat ?? "Giving every question a go",
    grow: missed?.cat ?? "Speed on two-step problems",
    grewFromMiss: !!answers.find((a) => !a.ok),
  };
}

// ---- Missions ----------------------------------------------------------------

export type Puzzle = { q: string; hint: string; a: number; opts: number[]; why: string };

export const PUZZLES: Record<Band, Puzzle[]> = {
  A: [
    { q: "7 + 8 = ?", hint: "7 + 3 makes 10. How many are left to add?", a: 15, opts: [13, 14, 15, 16], why: "7 + 3 = 10, and 5 more makes 15." },
    { q: "5, 10, 15, … what comes next?", hint: "Count in jumps of 5.", a: 20, opts: [18, 20, 25, 30], why: "Each step adds 5, so 15 + 5 = 20." },
    { q: "You have 12 sweets and eat 5. How many are left?", hint: "Count back from 12.", a: 7, opts: [6, 7, 8, 17], why: "12 − 5 = 7." },
  ],
  B: [
    { q: "If 9 × 5 = 45, what is 9 × 6?", hint: "One more group of 9.", a: 54, opts: [51, 52, 54, 56], why: "45 + 9 = 54." },
    { q: "What is 99 + 47?", hint: "Think 100 + 47, then step back 1.", a: 146, opts: [136, 145, 146, 156], why: "100 + 47 = 147, minus 1 is 146." },
    { q: "What is half of 86?", hint: "Half of 80, plus half of 6.", a: 43, opts: [33, 42, 43, 44], why: "40 + 3 = 43." },
  ],
  C: [
    { q: "What is 25 × 12?", hint: "Think 25 × 4 × 3.", a: 300, opts: [250, 275, 300, 325], why: "25 × 4 = 100, and 100 × 3 = 300." },
    { q: "What is 15 × 15?", hint: "1 × 2 = 2, then write 25.", a: 225, opts: [215, 225, 235, 250], why: "Numbers ending in 5: 1 × 2 = 2, then 25. So 225." },
    { q: "What is 20% of 350?", hint: "10% is 35.", a: 70, opts: [35, 60, 70, 75], why: "10% is 35, so 20% is 70." },
  ],
};

// Mission days after booking. The last mission is always the pre-demo one on demo day.
// Gaps of 4+ days get three missions, spaced about 1 to 3 days apart.
const MISSION_DAYS: Record<number, number[]> = {
  0: [0],
  1: [1],
  2: [1, 2],
  3: [1, 3],
  4: [1, 2, 4],
  5: [2, 3, 5],
  6: [2, 4, 6],
  7: [2, 4, 7],
};

export type Mission = { n: number; day: number; preDemo: boolean };

export function missionsFor(gap: number): Mission[] {
  const days = MISSION_DAYS[Math.max(0, Math.min(7, gap))];
  return days.map((day, i) => ({ n: i + 2, day, preDemo: i === days.length - 1 }));
}

// ---- The locked trick --------------------------------------------------------

export type Trick = { teaser: string; answer: string; steps: string[]; tryIt: string };

export const TRICKS: Record<Band, Trick> = {
  A: {
    teaser: "48 + 9",
    answer: "57",
    steps: [
      "Look at the 9. It is almost a 10.",
      "Add 10 instead: 48 + 10 = 58.",
      "You added 1 too many, so step back 1.",
      "58 − 1 = 57. Done in one breath.",
    ],
    tryIt: "Now try 36 + 9 without counting.",
  },
  B: {
    teaser: "47 × 11",
    answer: "517",
    steps: [
      "Pull the two digits apart: 4 _ 7.",
      "Add them: 4 + 7 = 11.",
      "Put the 1 in the middle and carry the other 1 to the left: 4 + 1 = 5.",
      "So 47 × 11 = 517.",
    ],
    tryIt: "Now try 53 × 11 in your head.",
  },
  C: {
    teaser: "35 × 35",
    answer: "1225",
    steps: [
      "Both numbers end in 5. That is the key.",
      "Take the first digit, 3, and multiply by the next number up, 4: 3 × 4 = 12.",
      "Always write 25 at the end.",
      "So 35 × 35 = 1225.",
    ],
    tryIt: "Now try 65 × 65 on your own.",
  },
};

export const WORRIES = [
  "Word problems",
  "Afraid of maths",
  "Careless mistakes",
  "Slow at tables",
  "Falling behind at school",
  "Something else",
];

export const TOTAL_PIECES = 5;
