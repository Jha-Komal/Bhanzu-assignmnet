import type { Metadata } from "next";
import { Deck } from "@/components/Deck";

export const metadata: Metadata = { title: "Part 3 · Propose ideas · Bhanzu Growth PM case study" };

const slides = [
  <>
    <span className="kicker">Growth PM case study · Part 3</span>
    <h1>Propose ideas</h1>
    <p className="lede">This part is being added.</p>
  </>,
];

export default function Part3() {
  return <Deck slides={slides} prev={{ href: "/part-2", label: "Part 2" }} next={{ href: "/part-4", label: "Part 4" }} />;
}
