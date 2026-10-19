"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";
import { usePref } from "./providers";
import { Squiggle } from "./section";

type Phase = "entrance" | "rooms";

const SPRING = { type: "spring", stiffness: 55, damping: 18 } as const;

const MOTES = [
  { x: 12, y: 22, s: 8, d: 0 },
  { x: 78, y: 18, s: 6, d: 2.5 },
  { x: 30, y: 70, s: 10, d: 1.2 },
  { x: 88, y: 62, s: 7, d: 3.8 },
  { x: 55, y: 85, s: 5, d: 1.8 },
];

function useRooms() {
  const { t, lang } = usePref();
  return [
    {
      id: "top",
      n: "00",
      label: t.hero.portfolio,
      title: profile.name,
      sub: profile.tagline[lang],
    },
    { id: "about", n: "01", label: t.sections.about.label, title: t.sections.about.title },
    { id: "skills", n: "02", label: t.sections.skills.label, title: t.sections.skills.title },
    {
      id: "certificates",
      n: "03",
      label: t.sections.certificates.label,
      title: t.sections.certificates.title,
    },
    { id: "projects", n: "04", label: t.sections.projects.label, title: t.sections.projects.title },
    { id: "github", n: "05", label: t.sections.github.label, title: t.sections.github.title },
    { id: "contact", n: "06", label: t.sections.contact.label, title: t.sections.contact.title },
  ];
}

export function Walkthrough() {
  const { view } = usePref();
  return (
    <>
      <ViewToggle />
      <AnimatePresence>{view === "hall" && <Hall />}</AnimatePresence>
    </>
  );
}

function ViewToggle() {
  const { view, setView, t } = usePref();
  return (
    <button
      type="button"
      onClick={() => setView(view === "hall" ? "classic" : "hall")}
      className="fixed top-3 right-3 z-[120] inline-flex min-h-11 cursor-pointer items-center border-2 border-ink bg-paper px-3 py-2 font-mono text-[10px] font-bold tracking-wider text-ink uppercase shadow-[3px_3px_0_var(--ink)] transition-colors hover:bg-signal sm:top-5 sm:right-5 sm:text-xs"
      style={{
        marginTop: "env(safe-area-inset-top)",
        marginRight: "env(safe-area-inset-right)",
      }}
    >
      {view === "hall" ? t.walkthrough.close : "Walk-through view"}
    </button>
  );
}

function Hall() {
  const { setView, t, lang } = usePref();
  const rooms = useRooms();
  const [phase, setPhase] = useState<Phase>("entrance");
  const [index, setIndex] = useState(0);
  const lock = useRef(0);

  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, SPRING);
  const my = useSpring(myRaw, SPRING);
  const camRotateY = useTransform(mx, [-1, 1], [-4, 4]);
  const camX = useTransform(mx, [-1, 1], [-22, 22]);
  const camY = useTransform(my, [-1, 1], [-12, 12]);

  useEffect(() => {
    const el = document.documentElement;
    const prevOverflow = el.style.overflow;
    const prevOverscroll = el.style.overscrollBehavior;
    el.style.overflow = "hidden";
    el.style.overscrollBehavior = "none";
    document.body.style.overscrollBehavior = "none";
    return () => {
      el.style.overflow = prevOverflow;
      el.style.overscrollBehavior = prevOverscroll;
      document.body.style.overscrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mxRaw.set((e.clientX / window.innerWidth) * 2 - 1);
      myRaw.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mxRaw, myRaw]);

  const go = useCallback(
    (next: number, d: number) => {
      const now = Date.now();
      if (now < lock.current) return;
      lock.current = now + 700;
      setIndex(Math.max(0, Math.min(rooms.length - 1, next)));
      void d;
    },
    [rooms.length],
  );

  const enter = useCallback((i = 0) => {
    setIndex(i);
    setPhase("rooms");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setView("classic");
        return;
      }
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (phase === "entrance") {
        if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
          e.preventDefault();
          enter(0);
        }
        return;
      }
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(index + 1, 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1, -1);
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (phase === "entrance") {
        if (e.deltaY > 12) enter(0);
        return;
      }
      if (e.deltaY > 20) go(index + 1, 1);
      else if (e.deltaY < -20) go(index - 1, -1);
    };
    let touchY = 0;
    const onTS = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTE = (e: TouchEvent) => {
      const d = touchY - e.changedTouches[0].clientY;
      if (phase === "entrance") {
        if (d > 50) enter(0);
        return;
      }
      if (d > 50) go(index + 1, 1);
      else if (d < -50) go(index - 1, -1);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTS, { passive: true });
    window.addEventListener("touchend", onTE, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTS);
      window.removeEventListener("touchend", onTE);
    };
  }, [phase, index, go, enter, setView]);

  const exitTo = (id: string) => {
    setView("classic");
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const room = rooms[Math.min(index, rooms.length - 1)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.25,
        transition: { duration: 0.6, ease: [0.7, 0, 0.3, 1] },
      }}
      className="fixed inset-0 z-[60] overflow-hidden bg-paper"
      aria-label="Walk-through view"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="animate-mote absolute rounded-full bg-ink/15"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              width: m.s,
              height: m.s,
              animationDelay: `${m.d}s`,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === "entrance" ? (
          <motion.div
            key="entrance"
            exit={{ opacity: 0, scale: 1.25, transition: { duration: 0.6, ease: [0.7, 0, 0.3, 1] } }}
            className="flex h-full flex-col items-center justify-center overflow-y-auto px-6 py-16 text-center"
          >
            <p className="font-mono text-[10px] font-bold tracking-[0.25em] text-ink-soft uppercase">
              Portfolio ★ № 2026
            </p>
            <h2 className="font-display mt-4 text-[16vw] leading-none uppercase sm:text-7xl md:text-8xl">
              {t.walkthrough.enterTitle}
            </h2>
            <Squiggle className="mt-2 w-44 md:w-56" />
            <p className="mt-6 max-w-md font-hand text-2xl text-ink-soft">
              {t.walkthrough.enterSub}
            </p>

            <p className="mt-10 font-mono text-[10px] font-bold tracking-[0.2em] text-ink-soft uppercase">
              {t.walkthrough.jump}
            </p>
            <ul className="mt-4 grid max-w-2xl gap-2 sm:grid-cols-2">
              {rooms.map((r, i) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => enter(i)}
                    className="w-full cursor-pointer border-2 border-ink bg-surface px-4 py-2.5 text-left font-mono text-[10px] font-bold tracking-[0.14em] uppercase shadow-[3px_3px_0_var(--ink)] transition-colors hover:bg-signal hover:text-white"
                  >
                    № {r.n} — {r.title}
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-10 flex animate-pulse items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-signal uppercase">
              <ArrowDown className="h-4 w-4" /> {t.walkthrough.enterHint}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="rooms"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-full"
            style={{ perspective: 1400 }}
          >
            <div
              className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-[96rem] items-center justify-between px-5 pt-5 font-mono text-[10px] font-semibold tracking-[0.2em] text-ink-soft uppercase sm:text-xs"
              style={{ marginTop: "env(safe-area-inset-top)" }}
            >
              <span>Portfolio ★ № 2026</span>
              <span className="text-signal">Walk-through</span>
            </div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                rotateY: camRotateY,
                x: camX,
                y: camY,
                transformStyle: "preserve-3d",
              }}
            >
              {rooms.map((r, i) => {
                const d = i - index;
                const abs = Math.abs(d);
                return (
                  <motion.button
                    key={r.id}
                    type="button"
                    onClick={() => (d === 0 ? exitTo(r.id) : go(i, d > 0 ? 1 : -1))}
                    initial={false}
                    animate={{
                      x: d * 470,
                      z: d * -320,
                      rotateY: d * -15,
                      opacity: abs === 0 ? 1 : abs > 2 ? 0 : 0.3,
                      scale: abs === 0 ? 1 : 0.86,
                    }}
                    transition={SPRING}
                    className="absolute w-[min(86vw,42rem)] cursor-pointer border-[3px] border-ink bg-surface p-7 text-left shadow-[8px_8px_0_var(--ink)] md:p-9"
                    style={{
                      transformStyle: "preserve-3d",
                      zIndex: 20 - abs,
                      pointerEvents: abs > 1 ? "none" : "auto",
                    }}
                  >
                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-ink-soft uppercase">
                      № {r.n} · {r.label}
                    </span>
                    <h3 className="font-display mt-2 text-4xl uppercase leading-none md:text-6xl">
                      {r.title}
                    </h3>
                    {r.sub && <p className="mt-2 font-hand text-2xl text-signal">{r.sub}</p>}
                    <span className="mt-6 inline-block border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.16em] uppercase shadow-[3px_3px_0_var(--ink)]">
                      {d === 0 ? `↗ ${t.walkthrough.enterRoom}` : `№ ${r.n}`}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>

            <div
              className="absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-[96rem] items-center justify-between gap-4 px-5 pb-5"
              style={{ marginBottom: "env(safe-area-inset-bottom)" }}
            >
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-ink-soft uppercase sm:text-xs">
                № {room.n} / {String(rooms.length).padStart(2, "0")} — {room.label}
              </span>
              <span className="hidden font-mono text-[10px] font-bold tracking-[0.2em] text-ink-soft uppercase sm:block">
                {t.walkthrough.keys}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous room"
                  onClick={() => go(index - 1, -1)}
                  disabled={index === 0}
                  className="inline-flex min-h-11 cursor-pointer items-center border-2 border-ink bg-paper px-3 py-2 shadow-[3px_3px_0_var(--ink)] transition-colors hover:bg-signal hover:text-white disabled:pointer-events-none disabled:opacity-40"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next room"
                  onClick={() => go(index + 1, 1)}
                  disabled={index === rooms.length - 1}
                  className="inline-flex min-h-11 cursor-pointer items-center border-2 border-ink bg-paper px-3 py-2 shadow-[3px_3px_0_var(--ink)] transition-colors hover:bg-signal hover:text-white disabled:pointer-events-none disabled:opacity-40"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
            </div>
            <span className="sr-only">{lang}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
