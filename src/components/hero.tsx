"use client";

import { profile } from "@/lib/data";
import { Reveal } from "./animated";
import { usePref } from "./providers";

const techChips = [
  { label: "React", x: 96, y: 168, r: -6 },
  { label: "TS", x: 168, y: 152, r: 4 },
  { label: "Next", x: 236, y: 170, r: -3 },
  { label: "Node", x: 112, y: 214, r: 5 },
  { label: "Laravel", x: 196, y: 210, r: -4 },
  { label: "PHP", x: 272, y: 204, r: 6 },
  { label: "MySQL", x: 150, y: 254, r: -5 },
  { label: "JS", x: 232, y: 252, r: 3 },
];

export function Hero() {
  const { t, lang } = usePref();

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-[86rem] scroll-mt-16 px-5 pt-24 pb-8 md:scroll-mt-24 md:px-16 md:pt-32 lg:px-20"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] font-bold tracking-[0.25em] text-ink-soft uppercase">
          {t.hero.portfolio} ★ № 2026
        </p>
        <p className="font-mono text-[10px] font-bold tracking-[0.25em] text-ink-soft uppercase">
          {profile.location}
        </p>
      </div>

      <Reveal y={40}>
        <h1 className="font-display mt-8 text-[21vw] leading-[0.86] uppercase sm:text-[19vw] lg:text-[min(11.6vw,12.5rem)]">
        <span className="block">{profile.name.split(" ")[0]}</span>
        <span className="relative block text-transparent [-webkit-text-stroke:2px_var(--ink)]">
          {profile.name.split(" ").slice(1).join(" ")}
          <svg
            aria-hidden
            viewBox="0 0 320 20"
            fill="none"
            className="absolute -bottom-2 left-0 w-[60%] md:-bottom-4"
          >
            <path
              d="M4 13 C 60 5, 120 17, 180 9 S 290 6, 316 11"
              stroke="var(--signal)"
              strokeWidth="7"
              strokeLinecap="round"
              filter="url(#wobble)"
            />
          </svg>
        </span>
      </h1>
      </Reveal>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative">
          <Reveal delay={0.1}>
          <div
            role="note"
            className="max-w-xl border-2 border-ink bg-surface p-4 font-mono text-[11px] leading-relaxed tracking-wide text-ink-soft shadow-[3px_3px_0_var(--ink)]"
          >
            <span className="mr-2 bg-signal px-1.5 py-0.5 font-bold text-white">
              ★
            </span>
            {t.hero.explorer}
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">
            {profile.tagline[lang]}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="border-2 border-ink bg-signal px-5 py-2.5 font-mono text-[11px] font-bold tracking-[0.18em] text-white uppercase shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              {t.contact.channels.availability.split(".")[0]} →
            </a>
            <a
              href="#projects"
              className="border-2 border-ink bg-surface px-5 py-2.5 font-mono text-[11px] font-bold tracking-[0.18em] uppercase shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              {t.sections.projects.title} →
            </a>
          </div>
        </Reveal>
        </div>

        <div className="relative">
          <Reveal delay={0.2}>
          <span className="absolute -top-6 right-0 z-10 rotate-6 border-2 border-ink bg-signal px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.18em] text-white uppercase shadow-[3px_3px_0_var(--ink)]">
            {t.hero.openToWork}
          </span>

          <svg
            viewBox="0 0 800 520"
            className="w-full"
            role="img"
            aria-label="Illustration of my workshop — click the door, the window or the mailbox"
          >
            <rect x="0" y="0" width="800" height="520" fill="var(--paper-2)" rx="18" />
            <g filter="url(#wobble-lg)" stroke="var(--ink)" strokeWidth="4">
              <circle cx="688" cy="92" r="46" fill="var(--signal)" />
              <path d="M0 420 Q 140 340 300 400 T 800 380 L 800 520 L 0 520 Z" fill="var(--surface)" />
              <path d="M40 460 Q 240 400 460 450 T 800 440" fill="none" strokeDasharray="10 14" />
            </g>

            <g filter="url(#wobble)" stroke="var(--ink)" strokeWidth="4">
              <path d="M250 240 L 400 140 L 550 240 Z" fill="var(--signal)" />
              <rect x="280" y="240" width="240" height="180" fill="var(--surface)" />
              <rect x="330" y="176" width="26" height="60" fill="var(--paper-2)" />
              <path d="M330 176 q 8 -26 26 -18" fill="none" className="animate-steam" />
              <path d="M344 172 q 10 -22 24 -14" fill="none" className="animate-steam delay" />
            </g>

            <g className="group cursor-pointer">
              <a href="#projects" aria-label={t.hero.openDoor}>
                <rect
                  x="310"
                  y="300"
                  width="70"
                  height="120"
                  rx="4"
                  fill="var(--paper-2)"
                  stroke="var(--ink)"
                  strokeWidth="4"
                  className="transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-[85%]"
                  style={{ transformOrigin: "345px 300px" }}
                />
                <circle cx="368" cy="362" r="5" fill="var(--ink)" className="group-hover:opacity-0" />
                <g className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {techChips.map((c) => (
                    <g key={c.label} transform={`translate(${c.x} ${c.y}) rotate(${c.r})`}>
                      <rect
                        width="78"
                        height="30"
                        rx="6"
                        fill="var(--surface)"
                        stroke="var(--ink)"
                        strokeWidth="3"
                      />
                      <text
                        x="39"
                        y="20"
                        textAnchor="middle"
                        fontFamily="var(--font-jetbrains)"
                        fontSize="13"
                        fontWeight="700"
                        fill="var(--ink)"
                      >
                        {c.label}
                      </text>
                    </g>
                  ))}
                  <text
                    x="196"
                    y="306"
                    textAnchor="middle"
                    fontFamily="var(--font-caveat)"
                    fontSize="30"
                    fill="var(--signal)"
                  >
                    work →
                  </text>
                </g>
              </a>
            </g>

            <g>
              <a href="#about" aria-label={t.hero.windowLabel} className="cursor-pointer">
                <rect x="420" y="286" width="72" height="72" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="4" />
                <line x1="456" y1="286" x2="456" y2="358" stroke="var(--ink)" strokeWidth="4" />
                <line x1="420" y1="322" x2="492" y2="322" stroke="var(--ink)" strokeWidth="4" />
              </a>
            </g>

            <g>
              <a href="#contact" aria-label={t.hero.mailboxLabel} className="cursor-pointer">
                <rect x="596" y="330" width="76" height="52" rx="8" fill="var(--signal)" stroke="var(--ink)" strokeWidth="4" />
                <rect x="630" y="382" width="8" height="52" fill="var(--ink)" />
                <path d="M672 330 l 0 -34 l 20 0 l 0 34" fill="var(--surface)" stroke="var(--ink)" strokeWidth="4" />
                <text x="640" y="364" textAnchor="middle" fontFamily="var(--font-jetbrains)" fontSize="16" fill="white">✉</text>
              </a>
            </g>

            <g filter="url(#wobble)">
              <rect x="446" y="196" width="168" height="56" rx="6" fill="var(--surface)" stroke="var(--ink)" strokeWidth="4" />
              <line x1="530" y1="252" x2="530" y2="286" stroke="var(--ink)" strokeWidth="4" />
            </g>
            <text
              x="530"
              y="232"
              textAnchor="middle"
              fontFamily="var(--font-anton)"
              fontSize="24"
              fill="var(--ink)"
              className="animate-swing"
              style={{ transformOrigin: "530px 196px" }}
            >
              FULL-STACK ENGINEER
            </text>

            <g filter="url(#wobble)" stroke="var(--ink)" strokeWidth="4">
              <rect x="90" y="330" width="64" height="90" fill="var(--paper-2)" />
              <path d="M122 330 c -30 -40 30 -60 0 -96" fill="none" stroke="var(--signal)" />
              <path d="M122 322 c 34 -30 -6 -66 22 -78" fill="none" />
              <circle cx="312" cy="356" r="5" fill="var(--signal)" stroke="none" />
            </g>

            <text
              x="236"
              y="486"
              fontFamily="var(--font-caveat)"
              fontSize="34"
              fill="var(--signal)"
              transform="rotate(-4 236 486)"
            >
              {t.hero.doorHint} ↗
            </text>
            <rect
              x="620"
              y="452"
              width="150"
              height="40"
              rx="6"
              fill="none"
              stroke="var(--signal)"
              strokeWidth="4"
              transform="rotate(-7 695 472)"
              filter="url(#wobble)"
            />
            <text
              x="695"
              y="479"
              textAnchor="middle"
              fontFamily="var(--font-jetbrains)"
              fontSize="13"
              fontWeight="700"
              fill="var(--signal)"
              transform="rotate(-7 695 472)"
            >
              OPEN TO WORK
            </text>
          </svg>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
