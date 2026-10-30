// Small hand-drawn line icons on a tinted tile. Used as the pictures in the slide decks.
const P: Record<string, string> = {
  megaphone: "M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z M15 9a4 4 0 0 1 0 6 M18 6.5a8 8 0 0 1 0 11",
  calendar: "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M3 10h18 M8 3v4 M16 3v4",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2",
  laptop: "M5 5h14v11H5z M2 19h20",
  phone: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M11 18h2",
  coin: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M9 8h6 M9 11h6 M10 8c4 0 4 5 0 5l4 4",
  ruler: "M3 15L15 3l6 6L9 21z M7 11l2 2 M10 8l2 2 M13 5l2 2",
  bars: "M5 20V10 M12 20V4 M19 20v-7",
  people: "M9 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M17 6a3 3 0 0 1 0 5 M21 20c0-2.5-1.5-4.5-4-5",
  mail: "M3 6h18v12H3z M3 7l9 6 9-6",
  up: "M12 20V6 M6 12l6-6 6 6",
  chat: "M4 5h16v11H9l-5 4z",
  search: "M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M16 16l5 5",
  ban: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M5.6 5.6l12.8 12.8",
  list: "M9 4h6v3H9z M6 5h12v16H6z M9 12h6 M9 16h4",
  question: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7 M12 17h.01",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  trend: "M3 17l6-6 4 4 8-8 M15 7h6v6",
  flag: "M5 21V4 M5 4h12l-2 4 2 4H5",
};

export function Icon({ name, size = 36, tone = "orange" }: { name: keyof typeof P | string; size?: number; tone?: "orange" | "green" | "blue" | "red" | "gold" }) {
  const c = { orange: ["#fdeee8", "#c04a1b"], green: ["#dcf5ea", "#0b6e49"], blue: ["#eef4ff", "#2c5bc2"], red: ["#fde4e4", "#a52d2d"], gold: ["#fff0c9", "#8a5a00"] }[tone];
  return (
    <span className="icon" style={{ width: size, height: size, background: c[0] }} aria-hidden>
      <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58} fill="none" stroke={c[1]} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
        <path d={P[name]} />
      </svg>
    </span>
  );
}
