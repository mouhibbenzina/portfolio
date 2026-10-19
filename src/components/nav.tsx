"use client";

import { Moon, Sun } from "lucide-react";
import { BrandGithub, BrandLinkedin } from "./icons";
import { navLinks, profile } from "@/lib/data";
import { usePref } from "./providers";

export function Nav() {
  const { t, theme, toggleTheme, lang, setLang } = usePref();

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4">
      <nav
        aria-label="Primary navigation"
        className="flex w-full max-w-[86rem] items-stretch overflow-x-auto rounded-full border-2 border-ink bg-paper shadow-[3px_3px_0_var(--ink)] [scrollbar-width:none] no-scrollbar"
      >
        <a
          href="#top"
          className="flex shrink-0 items-center px-4 py-2.5 font-display text-lg tracking-tight"
          aria-label={t.nav.backToTop}
        >
          {profile.monogram.replace(".", "")}
          <span className="text-signal">.</span>
        </a>
        <ul className="flex items-stretch">
          {navLinks.map((l) => (
            <li key={l.id} className="flex">
              <a
                href={`#${l.id}`}
                className="flex items-center border-l-2 border-ink px-3 py-2.5 font-mono text-[10px] font-bold tracking-[0.18em] uppercase transition-colors hover:bg-ink hover:text-paper md:px-4"
              >
                {l.label[lang]}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex shrink-0 items-stretch">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
            aria-label={t.nav.lang}
            className="border-l-2 border-ink px-3 font-mono text-[10px] font-bold tracking-[0.18em] uppercase transition-colors hover:bg-ink hover:text-paper"
          >
            {lang === "en" ? "FR" : "EN"}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.theme}
            className="flex items-center border-l-2 border-ink px-3 transition-colors hover:bg-ink hover:text-paper"
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </button>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden items-center border-l-2 border-ink px-3 transition-colors hover:bg-ink hover:text-paper sm:flex"
          >
            <BrandGithub className="h-3.5 w-3.5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden items-center border-l-2 border-ink px-3 transition-colors hover:bg-ink hover:text-paper lg:flex"
          >
            <BrandLinkedin className="h-3.5 w-3.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
