"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";
import { dict, type Dict, type Lang } from "@/lib/i18n";

type Theme = "light" | "dark";
export type View = "classic" | "hall";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  theme: Theme;
  toggleTheme: () => void;
  view: View;
  setView: (v: View) => void;
};

const EVENT = "tbr-pref-change";
const LANG_KEY = "tbr-lang";
const THEME_KEY = "tbr-theme";
const VIEW_KEY = "tbr-view";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

function emit() {
  window.dispatchEvent(new Event(EVENT));
}

function readLang(): string {
  try {
    return window.localStorage.getItem(LANG_KEY) || "en";
  } catch {
    return "en";
  }
}

function readTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* ignore */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readDarkClass(): boolean {
  return document.documentElement.classList.contains("dark");
}

function readView(): View {
  try {
    return window.localStorage.getItem(VIEW_KEY) === "hall" ? "hall" : "classic";
  } catch {
    return "classic";
  }
}

const PrefContext = createContext<Ctx | null>(null);

export function PrefProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(
    subscribe,
    readLang,
    () => "en",
  ) as Lang;
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    readTheme,
    () => "light",
  );
  const dark = useSyncExternalStore(subscribe, readDarkClass, () => false);
  const view = useSyncExternalStore<View>(subscribe, readView, () => "classic");

  const setLang = useCallback((l: Lang) => {
    try {
      window.localStorage.setItem(LANG_KEY, l);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = l;
    emit();
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
    emit();
  }, []);

  const setView = useCallback((v: View) => {
    try {
      window.localStorage.setItem(VIEW_KEY, v);
    } catch {
      /* ignore */
    }
    emit();
  }, []);

  void dark;

  const value: Ctx = { lang, setLang, t: dict[lang], theme, toggleTheme, view, setView };
  return (
    <PrefContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </PrefContext.Provider>
  );
}

export function usePref() {
  const ctx = useContext(PrefContext);
  if (!ctx) throw new Error("usePref must be used inside PrefProvider");
  return ctx;
}
