// Hand-drawn style doodles: a child, books, maths symbols, a bulb, a pencil, stars.
// Decorative only. They sit in spare space; they never carry content.
const INK = "#292622";
const O = "#f26a21";
const T = "#1b84a3";
const Y = "#f5b72c";
const SKIN = "#ffd9b3";

const common = { fill: "none", stroke: INK, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Child() {
  return (
    <svg viewBox="0 0 170 196" aria-hidden {...{ focusable: false }}>
      <g {...common}>
        <path d="M66 164v24M104 164v24" />
        <path d="M58 190h18M98 190h18" />
        <path d="M52 108q-24-6-30-40" />
        <path d="M118 108q24-6 30-40" />
        <path d="M54 104q31-12 62 0l8 62H46z" fill={O} />
        <path d="M70 108q15 10 30 0" />
        <circle cx="85" cy="58" r="36" fill={SKIN} />
        <path d="M49 54c-2-34 74-34 72 0-16-14-52-14-72 0z" fill="#3b2a20" />
        <circle cx="72" cy="62" r="3" fill={INK} />
        <circle cx="98" cy="62" r="3" fill={INK} />
        <path d="M72 76q13 12 26 0" />
        <circle cx="22" cy="62" r="8" fill={SKIN} />
        <circle cx="148" cy="62" r="8" fill={SKIN} />
        <path d="M148 56l10-30" stroke={Y} strokeWidth="7" />
        <path d="M148 56l10-30" strokeWidth="1.5" />
        <path d="M22 54l-6-22M10 40l12 4M30 34l-4 10" stroke={O} strokeWidth="3" />
      </g>
    </svg>
  );
}

function Books() {
  return (
    <svg viewBox="0 0 150 150" aria-hidden focusable="false">
      <g {...common}>
        <rect x="14" y="112" width="116" height="26" rx="5" fill={T} />
        <path d="M26 125h92" stroke="#fff" strokeWidth="2.5" />
        <rect x="24" y="84" width="100" height="28" rx="5" fill={O} transform="rotate(-3 74 98)" />
        <path d="M36 98h76" stroke="#fff" strokeWidth="2.5" transform="rotate(-3 74 98)" />
        <rect x="18" y="58" width="104" height="26" rx="5" fill={Y} transform="rotate(2 70 71)" />
        <path d="M30 71h80" stroke="#fff" strokeWidth="2.5" transform="rotate(2 70 71)" />
        <path d="M98 50l30-34 8 8-30 34z" fill={Y} />
        <path d="M98 50l-3 11 11-3z" fill={SKIN} />
      </g>
    </svg>
  );
}

function Symbols() {
  return (
    <svg viewBox="0 0 260 60" aria-hidden focusable="false">
      <g {...common} strokeWidth="2.5">
        <circle cx="30" cy="30" r="26" fill={T} />
        <circle cx="90" cy="30" r="26" fill={O} />
        <circle cx="150" cy="30" r="26" fill={Y} />
        <circle cx="210" cy="30" r="26" fill="#fff" />
      </g>
      <g fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round">
        <path d="M30 16v28M16 30h28" />
        <path d="M78 18l24 24M102 18L78 42" />
      </g>
      <g fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round">
        <path d="M136 30h28" />
        <path d="M196 24h28M196 36h28" />
      </g>
      <circle cx="150" cy="19" r="3.5" fill={INK} />
      <circle cx="150" cy="41" r="3.5" fill={INK} />
    </svg>
  );
}

function Bulb() {
  return (
    <svg viewBox="0 0 90 110" aria-hidden focusable="false">
      <g {...common}>
        <path d="M45 8a30 30 0 0 0-16 55c4 4 5 8 5 14h22c0-6 1-10 5-14A30 30 0 0 0 45 8z" fill="#ffe08a" />
        <path d="M35 86h20M38 96h14" />
        <path d="M38 52l7-10 7 10" />
        <path d="M45 2v-0M8 24l8 5M82 24l-8 5M2 52h9M79 52h9" stroke={O} />
      </g>
    </svg>
  );
}

function Pencil() {
  return (
    <svg viewBox="0 0 150 44" aria-hidden focusable="false">
      <g {...common}>
        <rect x="30" y="10" width="86" height="24" rx="3" fill={Y} />
        <path d="M30 10L6 22l24 12z" fill={SKIN} />
        <path d="M6 22l-3 0" strokeWidth="6" />
        <rect x="116" y="10" width="22" height="24" rx="4" fill={O} />
        <path d="M30 22h86" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function Stars() {
  const star = "M12 2l3 7 7 .6-5.4 4.6 1.8 7.2L12 17.6 5.6 21.4l1.8-7.2L2 9.6 9 9z";
  return (
    <svg viewBox="0 0 110 44" aria-hidden focusable="false">
      <g {...common} strokeWidth="2">
        <path d={star} fill={Y} transform="translate(2 8) scale(1.3)" />
        <path d={star} fill={O} transform="translate(44 0) scale(0.9)" />
        <path d={star} fill={T} transform="translate(72 14) scale(1.1)" />
      </g>
    </svg>
  );
}

const MAP = { child: Child, books: Books, symbols: Symbols, bulb: Bulb, pencil: Pencil, stars: Stars };

export type DoodleName = keyof typeof MAP;

export function Doodle({ name, className }: { name: DoodleName; className?: string }) {
  const D = MAP[name];
  return (
    <span className={`doodle ${className ?? ""}`} aria-hidden>
      <D />
    </span>
  );
}

// Fills whatever vertical space is left in a flex-column panel. If there is too little space, the doodle hides itself.
export function Spot({ name, side = "right" }: { name: DoodleName; side?: "left" | "right" }) {
  return (
    <div className={`spot ${side}`} aria-hidden>
      <Doodle name={name} />
    </div>
  );
}
