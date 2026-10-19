"use client";

import { profile } from "@/lib/data";
import { usePref } from "./providers";
import { SectionShell } from "./section";

export function About() {
  const { t, lang } = usePref();
  const a = t.about;

  return (
    <SectionShell
      id="about"
      n={t.sections.about.n}
      label={t.sections.about.label}
      title={t.sections.about.title}
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="font-display text-4xl uppercase leading-[1.05] md:text-6xl">
            {a.heading[0]}{" "}
            <span className="text-transparent [-webkit-text-stroke:2px_var(--ink)]">
              {a.heading[1]}
            </span>{" "}
            {a.heading[2]}
          </h3>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80 md:text-lg">
            {a.body} <mark className="bg-signal/30 px-1">{a.highlight}</mark>
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {a.chips.map((chip, i) => (
              <span
                key={chip}
                className="border-2 border-dashed border-ink px-3 py-1.5 font-mono text-[11px] font-bold tracking-wide"
                style={{
                  transform: `rotate(${((i % 3) - 1) * 3}deg)`,
                  background: i === 0 || i === 4 ? "var(--signal)" : "transparent",
                  color: i === 0 || i === 4 ? "#fffdf8" : undefined,
                }}
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 border-2 border-ink md:grid-cols-4">
            {a.stats.map((s, i) => (
              <div
                key={s.label}
                className={`bg-surface p-5 ${i % 2 === 0 ? "border-r-2" : ""} ${
                  i < 2 ? "border-b-2 md:border-b-0" : ""
                } ${i === 2 ? "md:border-r-2" : ""} border-ink`}
              >
                <p className="font-display text-5xl md:text-6xl">
                  {s.value}
                  <span className="text-signal">+</span>
                </p>
                <p className="mt-1 font-mono text-[10px] font-bold tracking-[0.16em] uppercase">
                  {s.label}
                </p>
                <p className="mt-2 font-hand text-lg text-ink-soft">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="justify-self-center lg:justify-self-end">
          <figure className="relative w-64 rotate-[-3deg] border-2 border-ink bg-surface p-3 pb-6 shadow-[6px_6px_0_var(--ink)] transition-transform hover:rotate-0">
            <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-2deg] bg-signal/80" />
            <div className="aspect-[4/5] w-full overflow-hidden border-2 border-ink bg-paper-2">
              <svg viewBox="0 0 200 250" className="h-full w-full" role="img" aria-label={a.portraitAlt}>
                <rect width="200" height="250" fill="var(--paper-2)" />
                <circle cx="100" cy="96" r="52" fill="var(--surface)" stroke="var(--ink)" strokeWidth="4" />
                <text
                  x="100"
                  y="114"
                  textAnchor="middle"
                  fontFamily="var(--font-anton)"
                  fontSize="44"
                  fill="var(--signal)"
                >
                  {profile.monogram.replace(".", "")}
                </text>
                <path d="M40 250 Q 100 160 160 250" fill="var(--ink)" opacity="0.9" />
                <path d="M20 40 q 30 18 60 0" fill="none" stroke="var(--ink)" strokeWidth="3" filter="url(#wobble)" />
              </svg>
            </div>
            <figcaption className="mt-3 text-center font-hand text-xl">
              {a.polaroidCaption}
            </figcaption>
          </figure>

          <p className="mt-6 max-w-xs text-center font-mono text-[10px] leading-relaxed tracking-[0.14em] text-ink-soft uppercase">
            {profile.location} · {lang === "en" ? "Remote-friendly" : "Remote-friendly"}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
