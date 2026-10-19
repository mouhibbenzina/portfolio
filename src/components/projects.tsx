"use client";

import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { BrandGithub } from "./icons";
import { featuredProjects, GITHUB_USER, profile } from "@/lib/data";
import type { GithubRepo } from "@/lib/github";
import { usePref } from "./providers";
import { SectionShell } from "./section";

function Cover({ kind, alt }: { kind: "docs" | "farm" | "board"; alt: string }) {
  return (
    <svg viewBox="0 0 480 280" className="h-full w-full" role="img" aria-label={alt}>
      <rect width="480" height="280" fill="var(--paper-2)" className="blueprint-grid" />
      <g filter="url(#wobble)" stroke="var(--ink)" strokeWidth="4" fill="var(--surface)">
        {kind === "docs" && (
          <>
            <rect x="54" y="70" width="120" height="150" transform="rotate(-6 114 145)" />
            <rect x="74" y="60" width="120" height="150" transform="rotate(-2 134 135)" />
            <rect x="96" y="52" width="120" height="150" transform="rotate(3 156 127)" />
            <rect x="300" y="88" width="86" height="70" rx="8" fill="var(--signal)" />
            <path d="M322 88 v -20 a 21 21 0 0 1 42 0 v 20" fill="none" />
            <circle cx="343" cy="118" r="9" fill="white" stroke="none" />
            <line x1="343" y1="124" x2="343" y2="140" stroke="white" strokeWidth="6" />
            <circle cx="318" cy="212" r="14" />
            <circle cx="368" cy="212" r="14" />
            <circle cx="343" cy="246" r="14" />
            <line x1="330" y1="204" x2="356" y2="204" />
            <line x1="343" y1="226" x2="343" y2="232" />
          </>
        )}
        {kind === "farm" && (
          <>
            <circle cx="392" cy="62" r="34" fill="var(--signal)" />
            <path d="M40 236 Q 240 210 440 236" fill="none" />
            <path d="M40 254 Q 240 230 440 254" fill="none" />
            <path d="M130 236 v -46 M130 190 c -26 -8 -30 -34 -4 -44 c 8 26 22 30 4 44" fill="none" />
            <rect x="236" y="140" width="10" height="96" fill="var(--ink)" />
            <rect x="222" y="118" width="38" height="28" rx="6" fill="var(--surface)" />
            <circle cx="241" cy="132" r="5" fill="var(--signal)" stroke="none" />
            <rect x="310" y="196" width="24" height="40" />
            <rect x="344" y="166" width="24" height="70" />
            <rect x="378" y="140" width="24" height="96" />
            <path d="M316 180 L 356 152 L 390 124" fill="none" stroke="var(--signal)" strokeWidth="6" />
          </>
        )}
        {kind === "board" && (
          <>
            <rect x="44" y="58" width="180" height="170" rx="8" />
            <rect x="64" y="82" width="60" height="44" rx="5" fill="var(--signal)" />
            <rect x="134" y="82" width="70" height="44" rx="5" />
            <rect x="64" y="140" width="70" height="44" rx="5" />
            <rect x="144" y="140" width="60" height="44" rx="5" />
            <circle cx="356" cy="146" r="70" fill="none" />
            <ellipse cx="356" cy="146" rx="30" ry="70" fill="none" />
            <line x1="286" y1="146" x2="426" y2="146" />
            <circle cx="356" cy="76" r="10" fill="var(--signal)" />
            <circle cx="412" cy="128" r="10" fill="var(--surface)" />
            <circle cx="330" cy="208" r="10" fill="var(--surface)" />
            <circle cx="300" cy="118" r="10" fill="var(--surface)" />
            <line x1="356" y1="86" x2="300" y2="118" />
            <line x1="404" y1="134" x2="340" y2="202" />
          </>
        )}
      </g>
    </svg>
  );
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  const { t, lang } = usePref();
  const updated = new Date(repo.pushed_at).toLocaleDateString(
    lang === "fr" ? "fr-TN" : "en-US",
    { month: "short", year: "numeric" },
  );

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col border-[3px] border-ink bg-surface p-5 shadow-[5px_5px_0_var(--ink)] transition-all hover:-translate-y-1 hover:shadow-[5px_5px_0_var(--signal)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-xl uppercase md:text-2xl">{repo.name}</h4>
        <BrandGithub className="h-4 w-4 shrink-0 text-ink-soft transition-colors group-hover:text-signal" />
      </div>
      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink/70">
        {repo.description || "—"}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold tracking-[0.14em] text-ink-soft uppercase">
        {repo.language && <span className="text-signal">{repo.language}</span>}
        <span>★ {repo.stargazers_count} {t.projects.stars}</span>
        <span className="ml-auto">
          {t.projects.updated} {updated}
        </span>
      </div>
    </a>
  );
}

export function Projects({ repos }: { repos: GithubRepo[] | null }) {
  const { t, lang } = usePref();
  const [open, setOpen] = useState<string | null>(null);

  const featuredNames = featuredProjects.map((p) => p.repo.toLowerCase());
  const rest = (repos || [])
    .filter((r) => !r.fork && !featuredNames.includes(r.name.toLowerCase()))
    .slice(0, 8);

  return (
    <SectionShell
      id="projects"
      n={t.sections.projects.n}
      label={t.sections.projects.label}
      title={t.sections.projects.title}
    >
      <div className="space-y-10">
        {featuredProjects.map((p, i) => {
          const live = repos?.find(
            (r) => r.name.toLowerCase() === p.repo.toLowerCase(),
          );
          const isOpen = open === p.slug;
          return (
            <article
              key={p.slug}
              className="border-[3px] border-ink bg-surface shadow-[8px_8px_0_var(--ink)] lg:sticky"
              style={{ top: `${6 + i * 0.9}rem` }}
            >
              <div className="flex items-center justify-between border-b-[3px] border-ink bg-paper-2 px-4 py-2">
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
                  {t.projects.sheet} {String(i + 1).padStart(2, "0")} /{" "}
                  {String(featuredProjects.length).padStart(2, "0")}
                </span>
                <span className="font-hand text-lg text-signal">{p.title}</span>
              </div>

              <div className="grid lg:grid-cols-2">
                <div className="aspect-[12/7] border-b-[3px] border-ink lg:aspect-auto lg:border-r-[3px] lg:border-b-0">
                  <Cover kind={p.cover} alt={t.projects.coverAlts[p.cover]} />
                </div>

                <div className="flex flex-col p-6 md:p-8">
                  <h3 className="font-display text-4xl uppercase md:text-5xl">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-hand text-2xl text-signal">
                    {p.subtitle[lang]}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-ink/80">
                    {p.description[lang]}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(live?.topics.length ? live.topics.slice(0, 6) : p.tags).map((tag) => (
                      <span
                        key={tag}
                        className="border-2 border-ink px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.12em] uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={`https://github.com/${GITHUB_USER}/${p.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-ink bg-signal px-4 py-2 font-mono text-[11px] font-bold tracking-[0.16em] text-white uppercase shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
                    >
                      <BrandGithub className="h-4 w-4" /> {t.projects.viewSource}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    {live?.homepage && (
                      <a
                        href={live.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-2 border-ink bg-surface px-4 py-2 font-mono text-[11px] font-bold tracking-[0.16em] uppercase shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
                      >
                        {t.projects.liveDemo} <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : p.slug)}
                      aria-expanded={isOpen}
                      aria-controls={`details-${p.slug}`}
                      className="inline-flex items-center gap-2 border-2 border-ink px-4 py-2 font-mono text-[11px] font-bold tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-paper"
                    >
                      <Plus
                        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-45" : ""}`}
                      />
                      {t.projects.details}
                    </button>
                  </div>

                  <div
                    id={`details-${p.slug}`}
                    hidden={!isOpen}
                    className="mt-4 border-2 border-dashed border-ink/40 bg-paper p-4 font-mono text-[11px] leading-relaxed tracking-wide text-ink-soft"
                  >
                    {live ? (
                      <>
                        ★ {live.stargazers_count} {t.projects.stars} ·{" "}
                        {t.projects.updated}{" "}
                        {new Date(live.pushed_at).toLocaleDateString(
                          lang === "fr" ? "fr-TN" : "en-US",
                        )}
                        <br />
                        {live.description || p.description[lang]}
                      </>
                    ) : (
                      <>
                        {p.tags.join(" · ")}
                        <br />
                        {p.description[lang]}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-16 border-t-2 border-ink pt-8">
        <h3 className="font-display text-3xl uppercase md:text-4xl">
          {t.projects.moreFromGithub}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70 md:text-base">
          {t.projects.moreFromGithubSub}
        </p>

        {repos === null ? (
          <p className="mt-6 border-2 border-dashed border-ink/40 p-6 font-mono text-[11px] tracking-wide text-ink-soft">
            {t.projects.fallback}
          </p>
        ) : rest.length === 0 ? (
          <p className="mt-6 animate-pulse border-2 border-dashed border-ink/40 p-6 font-mono text-[11px] tracking-wide text-ink-soft">
            {t.projects.empty}
          </p>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {rest.map((r) => (
              <RepoCard key={r.id} repo={r} />
            ))}
          </div>
        )}

        <div className="mt-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-ink bg-surface px-4 py-2 font-mono text-[11px] font-bold tracking-[0.16em] uppercase shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
          >
            {t.projects.viewAll}
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
