"use client";

import Link from "next/link";
import { Doodle } from "./Doodle";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  slides: ReactNode[];
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
};

// A one-slide-at-a-time reader: arrow keys, swipe, buttons, and #n in the address bar.
export function Deck({ slides, prev, next }: Props) {
  const [i, setI] = useState(0);
  const last = slides.length - 1;
  const touch = useRef<{ x: number; y: number } | null>(null);
  const body = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (n: number) => {
      const c = Math.max(0, Math.min(last, n));
      setI(c);
      try {
        window.history.replaceState(null, "", `#${c + 1}`);
      } catch {
        /* ignore */
      }
    },
    [last],
  );

  useEffect(() => {
    const n = parseInt(window.location.hash.slice(1), 10);
    if (n >= 1 && n <= slides.length) setI(n - 1);
  }, [slides.length]);

  useEffect(() => {
    const onHash = () => {
      const n = parseInt(window.location.hash.slice(1), 10);
      if (n >= 1 && n <= slides.length) setI(n - 1);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [slides.length]);

  useEffect(() => {
    body.current?.scrollTo({ top: 0 });
  }, [i]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") go(i + 1);
      if (e.key === "ArrowLeft" || e.key === "PageUp") go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, i]);

  return (
    <div className="deck">
      <div className="deck-bar" role="tablist" aria-label="Slides">
        {slides.map((_, n) => (
          <button
            key={n}
            role="tab"
            aria-selected={n === i}
            aria-label={`Slide ${n + 1} of ${slides.length}`}
            className={n < i ? "done" : n === i ? "now" : ""}
            onClick={() => go(n)}
          />
        ))}
      </div>

      <div
        className="deck-body"
        ref={body}
        onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          const t = touch.current;
          touch.current = null;
          if (!t) return;
          const dx = e.changedTouches[0].clientX - t.x;
          const dy = e.changedTouches[0].clientY - t.y;
          if (Math.abs(dx) > 70 && Math.abs(dy) < 50) go(dx < 0 ? i + 1 : i - 1);
        }}
      >
        <div className="slide enter" key={i} aria-live="polite">
          {slides[i]}
        </div>
      </div>

      <div className="deck-foot">
        {i === 0 && prev ? (
          <Link className="btn ghost" href={prev.href}>← {prev.label}</Link>
        ) : (
          <button className="btn ghost" onClick={() => go(i - 1)} disabled={i === 0}>← Back</button>
        )}
        <div className="mid">
          <Doodle name="symbols" />
          <span className="deck-count">
            {i + 1} <span>/ {slides.length}</span>
          </span>
          <Doodle name="pencil" />
        </div>
        {i === last && next ? (
          <Link className="btn" href={next.href}>{next.label} →</Link>
        ) : (
          <button className="btn" onClick={() => go(i + 1)} disabled={i === last}>Next →</button>
        )}
      </div>
    </div>
  );
}
