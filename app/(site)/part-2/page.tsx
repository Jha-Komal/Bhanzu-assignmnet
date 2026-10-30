import type { Metadata } from "next";
import { Deck } from "@/components/Deck";

export const metadata: Metadata = { title: "Part 2 · Diagnose the drop · Bhanzu Growth PM case study" };

const slides = [
  <>
    <span className="kicker">Growth PM case study · Part 2</span>
    <h1>Diagnose the drop</h1>
    <p className="lede">This part is being added.</p>
  </>,
];

export default function Part2() {
  return <Deck slides={slides} prev={{ href: "/part-1", label: "Part 1" }} next={{ href: "/part-3", label: "Part 3" }} />;
}
