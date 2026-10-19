import type { ReactNode } from "react";
import { AnimatedHeading, Reveal } from "./animated";

export function WobbleDefs() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        <filter id="wobble">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" />
        </filter>
        <filter id="wobble-lg">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </defs>
    </svg>
  );
}

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 18"
      fill="none"
      className={`sketch ${className}`}
    >
      <path
        d="M3 12 C 30 4, 55 16, 85 10 S 150 4, 180 11 S 210 8, 217 9"
        stroke="var(--signal)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#wobble)"
      />
    </svg>
  );
}

export function SectionShell({
  id,
  n,
  label,
  title,
  children,
}: {
  id: string;
  n: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-[86rem] scroll-mt-16 px-5 py-16 md:scroll-mt-24 md:px-16 md:py-24 lg:px-20"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t-2 border-ink pt-4">
        <span className="bg-ink px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-paper uppercase">
          № {n}
        </span>
        <span className="font-mono text-[10px] font-bold tracking-[0.22em] text-ink-soft uppercase">
          {label}
        </span>
      </div>
      <AnimatedHeading
        text={title}
        className="font-display mt-6 text-[17vw] leading-[0.95] tracking-tight uppercase sm:text-7xl md:text-8xl lg:text-9xl"
      />
      <Squiggle className="mt-1 w-40 md:w-56" />
      <Reveal className="mt-10 md:mt-14">{children}</Reveal>
    </section>
  );
}
