"use client";

import { useEffect, useState } from "react";
import { Award } from "lucide-react";
import { certificates } from "@/lib/data";
import { Fade } from "./animated";
import { usePref } from "./providers";
import { SectionShell } from "./section";

const btn =
  "inline-flex cursor-pointer items-center gap-1.5 border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.16em] uppercase shadow-[3px_3px_0_var(--ink)] transition-colors hover:bg-signal hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

export function Certificates() {
  const { t, lang } = usePref();
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const cert = active === null ? null : certificates[active];

  return (
    <SectionShell
      id="certificates"
      n={t.sections.certificates.n}
      label={t.sections.certificates.label}
      title={t.sections.certificates.title}
    >
      <div className="relative ml-1 border-l-2 border-ink pl-6 md:ml-3 md:pl-10">
        <div className="grid gap-8 md:grid-cols-2">
          {certificates.map((c, i) => (
            <Fade key={c.title} delay={(i % 2) * 0.1} className="relative">
              <div className="relative">
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
                    {c.file ? (
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`${t.certificates.view} — ${c.title}`}
                        className={btn}
                      >
                        {t.certificates.view} ↗
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 border-2 border-dashed border-ink/50 px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.16em] text-ink-soft uppercase">
                        {lang === "en" ? "No file" : "Sans fichier"}
                      </span>
                    )}
                  </div>
                </article>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      {cert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={cert.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/80 p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full w-full max-w-4xl flex-col border-[3px] border-ink bg-paper shadow-[8px_8px_0_var(--ink)]"
          >
            <div className="flex items-center justify-between gap-3 border-b-2 border-ink bg-surface px-4 py-3">
              <p className="truncate font-mono text-[10px] font-bold tracking-[0.14em] uppercase">
                {cert.title}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label={t.certificates.close}
                className="cursor-pointer border-2 border-ink bg-paper px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase shadow-[2px_2px_0_var(--ink)] transition-colors hover:bg-signal hover:text-white"
              >
                ✕
              </button>
            </div>
            <iframe src={cert.file} title={cert.title} className="h-[70vh] w-full border-0 bg-paper-2" />
            <div className="flex justify-end border-t-2 border-ink bg-surface px-4 py-3">
              <a href={cert.file} target="_blank" rel="noopener noreferrer" className={btn}>
                {t.certificates.openPdf} ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </SectionShell>
  );
}
