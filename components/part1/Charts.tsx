// Part 1 charts, drawn as plain SVG from the eight attendance rates in the case.
export const ATTEND = [66, 66, 64, 62, 57, 57, 63, 55];
export const LABELS = ["Same day", "1", "2", "3", "4", "5", "6", "7"];

const GREEN = "#1f9d6b";
const RED = "#d64545";
const INK = "#292622";
const ORANGE = "#f15d22";

const L = 50;
const R = 740;
const px = (i: number) => L + 45 + i * ((R - L - 90) / 7);

export function Chart1() {
  const T = 20;
  const B = 270;
  const bw = 50;
  const py = (v: number) => B - (v * (B - T)) / 100;
  return (
    <div className="chart">
      <svg viewBox="0 0 760 330" role="img" aria-label="Stacked bars of attended and no-show percentages for days 0 to 7, on a full 0 to 100 scale">
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={L} x2={R} y1={py(v)} y2={py(v)} stroke="#eee7e0" />
            <text x={L - 8} y={py(v) + 4} textAnchor="end">{v}%</text>
          </g>
        ))}
        {ATTEND.map((v, i) => {
          const hot = i === 4 || i === 5 || i === 7;
          return (
            <g key={i}>
              <rect x={px(i) - bw / 2} y={py(v)} width={bw} height={B - py(v)} fill={GREEN} rx={4} />
              <rect x={px(i) - bw / 2} y={py(100)} width={bw} height={py(v) - py(100) - 2} fill={RED} opacity={hot ? 1 : 0.6} rx={4} />
              <text className="v" x={px(i)} y={py(v) + 22} textAnchor="middle" style={{ fill: "#fff" }}>{v}</text>
              <text className="v" x={px(i)} y={py(100) + 22} textAnchor="middle" style={{ fill: "#fff" }}>{100 - v}</text>
              <text x={px(i)} y={B + 20} textAnchor="middle">{LABELS[i]}</text>
            </g>
          );
        })}
        <line x1={L} x2={R} y1={py(65)} y2={py(65)} stroke={INK} strokeWidth={2} strokeDasharray="5 5" />
        <text x={(L + R) / 2} y={B + 46} textAnchor="middle">days between booking and session</text>
      </svg>
      <div className="legend">
        <span><i style={{ background: GREEN }} />Attended</span>
        <span><i style={{ background: RED }} />No-show</span>
        <span><i style={{ background: "transparent", borderTop: `2px dashed ${INK}`, borderRadius: 0, height: 0, width: 16, verticalAlign: 4 }} />65% benchmark</span>
      </div>
    </div>
  );
}

export function Chart2() {
  const T = 30;
  const B = 270;
  const py = (v: number) => B - ((v - 50) * (B - T)) / 20;
  const pts = ATTEND.map((v, i) => `${px(i)},${py(v)}`).join(" ");
  const Mark = ({ n, x, y }: { n: number; x: number; y: number }) => (
    <g>
      <circle cx={x} cy={y} r={12} fill={ORANGE} />
      <text x={x} y={y + 4} textAnchor="middle" style={{ fill: "#fff", fontWeight: 700, fontSize: 12.5 }}>{n}</text>
    </g>
  );
  return (
    <div className="chart">
      <svg viewBox="0 0 760 330" role="img" aria-label="Line chart of attendance by day, zoomed to 50 to 70 percent, with numbered pattern markers">
        {[50, 55, 60, 65, 70].map((v) => (
          <g key={v}>
            <line x1={L} x2={R} y1={py(v)} y2={py(v)} stroke="#eee7e0" />
            <text x={L - 8} y={py(v) + 4} textAnchor="end">{v}%</text>
          </g>
        ))}
        <line x1={L} x2={R} y1={py(65)} y2={py(65)} stroke="#746558" strokeDasharray="4 5" />
        <text x={R} y={py(65) - 6} textAnchor="end">65% benchmark</text>
        <rect x={px(4) - 30} y={T} width={px(5) - px(4) + 60} height={B - T} fill="#fde4e4" opacity={0.8} rx={8} />
        <polyline points={pts} fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
        {ATTEND.map((v, i) => (
          <g key={i}>
            <circle cx={px(i)} cy={py(v)} r={6} fill="#fff" stroke={INK} strokeWidth={3} />
            <text className="v" x={px(i)} y={py(v) + (i === 3 ? 26 : -14)} textAnchor="middle">{v}</text>
            <text x={px(i)} y={B + 20} textAnchor="middle">{LABELS[i]}</text>
          </g>
        ))}
        <Mark n={1} x={px(0) + 34} y={py(66) + 30} />
        <Mark n={2} x={(px(3) + px(4)) / 2 + 22} y={py(59.5) - 22} />
        <Mark n={3} x={(px(0) + px(1)) / 2} y={py(66) - 34} />
        <Mark n={4} x={px(6) + 26} y={py(63) - 26} />
        <Mark n={5} x={px(7) + 4} y={py(55) + 30} />
        <Mark n={7} x={px(5) + 36} y={py(65) - 18} />
        <text x={(L + R) / 2} y={B + 46} textAnchor="middle">days between booking and session</text>
      </svg>
    </div>
  );
}
