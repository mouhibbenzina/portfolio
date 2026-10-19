"use client";

import { skills } from "@/lib/data";
import { usePref } from "./providers";
import { SectionShell } from "./section";

export function Skills() {
  const { t } = usePref();

  return (
    <SectionShell
      id="skills"
      n={t.sections.skills.n}
      label={t.sections.skills.label}
      title={t.sections.skills.title}
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {skills.map((s, i) => (
          <div
            key={s.full}
            className={`group flex aspect-square flex-col items-center justify-center rounded-[1.4rem] border-[3px] border-ink bg-surface shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-1 hover:rotate-0 ${
              s.hot ? "!bg-signal" : ""
            }`}
            style={{
              transform: `rotate(${((i % 5) - 2) * 1.4}deg)`,
            }}
          >
            <span
              className={`font-display text-2xl uppercase transition-colors md:text-3xl ${
                s.hot ? "text-white" : "group-hover:text-signal"
              }`}
            >
              {s.short}
            </span>
            <span
              className={`mt-1 px-2 text-center font-mono text-[9px] font-bold tracking-[0.12em] uppercase ${
                s.hot ? "text-white/90" : "text-ink-soft"
              }`}
            >
              {s.full}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-8 font-hand text-xl text-ink-soft">{t.skills.note}</p>
    </SectionShell>
  );
}
