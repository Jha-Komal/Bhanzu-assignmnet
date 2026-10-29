"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { missionsFor, TOTAL_PIECES, type Answer, type Band } from "./content";

// All data lives in this browser only (localStorage). Nothing is sent anywhere.

export type Booking = {
  parent: string;
  phone: string;
  child: string;
  band: Band;
  bookedAt: number;
  gap: number;
  demoAt: number;
};

export type State = {
  booking?: Booking;
  dayOffset: number; // simulated days since booking, moved by the reviewer tools
  confirmed?: boolean;
  worry?: string;
  speed?: Answer[];
  missions: Record<string, { ok: boolean; day: number }>;
  round2?: Answer[];
};

const EMPTY: State = { dayOffset: 0, missions: {} };
const KEY = "bhanzu-mission-pass-v1";

type Ctx = {
  ready: boolean;
  state: State;
  book: (b: Booking) => void;
  setDay: (n: number) => void;
  confirm: () => void;
  setWorry: (w: string) => void;
  saveSpeed: (a: Answer[]) => void;
  saveMission: (n: number, ok: boolean) => void;
  saveRound2: (a: Answer[]) => void;
  reset: () => void;
};

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* storage can be blocked; the app still works for this visit */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, ready]);

  const book = useCallback((b: Booking) => setState({ ...EMPTY, booking: b }), []);
  const setDay = useCallback((n: number) => setState((s) => ({ ...s, dayOffset: Math.max(0, n) })), []);
  const confirm = useCallback(() => setState((s) => ({ ...s, confirmed: true })), []);
  const setWorry = useCallback((w: string) => setState((s) => ({ ...s, worry: w })), []);
  const saveSpeed = useCallback((a: Answer[]) => setState((s) => ({ ...s, speed: a })), []);
  const saveMission = useCallback(
    (n: number, ok: boolean) =>
      setState((s) => ({ ...s, missions: { ...s.missions, [String(n)]: { ok, day: s.dayOffset } } })),
    [],
  );
  const saveRound2 = useCallback((a: Answer[]) => setState((s) => ({ ...s, round2: a })), []);
  const reset = useCallback(() => setState(EMPTY), []);

  const value = useMemo(
    () => ({ ready, state, book, setDay, confirm, setWorry, saveSpeed, saveMission, saveRound2, reset }),
    [ready, state, book, setDay, confirm, setWorry, saveSpeed, saveMission, saveRound2, reset],
  );
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

// ---- Derived values ---------------------------------------------------------

export function derive(state: State) {
  const b = state.booking;
  const missions = b ? missionsFor(b.gap) : [];
  const doneMissions = missions.filter((m) => state.missions[String(m.n)]);
  const pieces = (state.speed ? 1 : 0) + doneMissions.length;
  const steps = (state.speed ? 1 : 0) + doneMissions.length;
  const allMissionsDone = missions.length > 0 && doneMissions.length === missions.length;
  const nextMission = missions.find((m) => !state.missions[String(m.n)]);
  const demoDay = b ? state.dayOffset >= b.gap : false;
  const daysLeft = b ? Math.max(0, b.gap - state.dayOffset) : 0;
  const badges = [
    { id: "starter", label: "Speed Starter", earned: !!state.speed },
    { id: "roll", label: "On a roll", earned: steps >= 2 },
    { id: "ready", label: "Demo Ready", earned: !!state.speed && allMissionsDone },
  ];
  return { missions, doneMissions, pieces: Math.min(pieces, TOTAL_PIECES), steps, allMissionsDone, nextMission, demoDay, daysLeft, badges };
}

export function fmtDay(ms: number) {
  return new Date(ms).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}
export function fmtTime(ms: number) {
  return new Date(ms).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase();
}
export function fmtWhen(ms: number) {
  return `${fmtDay(ms)}, ${fmtTime(ms)}`;
}
