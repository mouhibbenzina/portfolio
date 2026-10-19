"use client";

import { Award } from "lucide-react";
import { certificates } from "@/lib/data";
import { usePref } from "./providers";
import { SectionShell } from "./section";

export function Certificates() {
  const { t, lang } = usePref();

  return (
    <SectionShell
      id="certificates"
      n={t.sections.certificates.n}
      label={t.sections.certificates.label}
      title={t.sections.certificates.title}
    >
      <div className="relative ml-1 border-l-2 border-ink pl-6 md:ml-3 md:pl-10">
        <div className="grid gap-8 md:grid-cols-2">
          {certificates.map((c) => (
            <div key={c.title} className="relative">
              <span className="absolute -left-[calc(1.5rem+9px)] top-7 h-4 w-4 rounded-full border-2 border-ink bg-signal shadow-[2px_2px_0_var(--ink)] md:-left-[calc(2.5rem+9px)]" />
              <article
                className="border-[3px] border-ink bg-surface p-5 shadow-[6px_6px_0_var(--ink)] transition-transform hover:rotate-0"
                style={{ transform: `rotate(${c.tilt})` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink bg-signal text-white">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-ink-soft uppercase">
                    {c.date[lang]}
                  </span>
                </div>

                <h3 className="font-display mt-4 text-2xl uppercase leading-tight md:text-3xl">
                  {c.title}
                </h3>

                <div className="mt-4 border-t-2 border-dashed border-ink/30 pt-3">
                  <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-ink-soft uppercase">
                    {t.certificates.issuedBy}
                  </p>
                  <p className="mt-1 font-hand text-xl">{c.provider}</p>
                  <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-ink-soft uppercase">
                    {c.duration[lang]}
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.16em] uppercase shadow-[3px_3px_0_var(--ink)]">
                    {t.certificates.view} ↗
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
