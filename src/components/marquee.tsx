"use client";

import { usePref } from "./providers";

export function Marquee() {
  const { t } = usePref();
  const items = t.marquee;

  return (
    <div
      role="marquee"
      aria-label={items.join(", ")}
      className="my-6 -rotate-[1.2deg] overflow-hidden border-y-2 border-ink bg-ink py-3"
    >
      <div className="animate-marquee flex w-max items-center gap-6 whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-6" aria-hidden={dup === 1}>
            {items.map((item, i) => (
              <span key={`${dup}-${i}`} className="flex items-center gap-6">
                <span className="font-display text-xl text-paper uppercase sm:text-3xl">
                  {item}
                </span>
                <span className="text-signal">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
