"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { Mail, MessageCircle, Pin } from "lucide-react";
import { BrandGithub, BrandLinkedin } from "./icons";
import { profile, WHATSAPP_NUMBER } from "@/lib/data";
import { usePref } from "./providers";
import { SectionShell } from "./section";

const projectTypes = ["web", "mobile", "api", "other"] as const;
const budgets = ["small", "medium", "large", "discuss"] as const;
const timelines = ["asap", "month", "quarter", "flexible"] as const;
const techOptions = ["React", "Next.js", "Laravel", "Node.js", "Flutter", "Angular"];

export function Contact() {
  const { t, lang } = usePref();
  const c = t.contact;
  const [sent, setSent] = useState(false);
  const [tech, setTech] = useState<string[]>([]);
  const year = useSyncExternalStore(
    () => () => {},
    () => String(new Date().getFullYear()),
    () => "",
  );

  const labelCls = "block font-mono text-[10px] font-bold tracking-[0.18em] uppercase";
  const inputCls =
    "mt-2 w-full border-2 border-ink bg-paper px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-signal";

  function buildBrief(fd: FormData) {
    const typeKey = fd.get("type") as keyof typeof c.form.typeOptions;
    const budgetKey = fd.get("budget") as keyof typeof c.form.budgetOptions;
    const timelineKey = fd.get("timeline") as keyof typeof c.form.timelineOptions;
    const lines: string[] = [
      lang === "fr" ? "📋 NOUVEAU BRIEF CLIENT" : "📋 NEW CLIENT BRIEF",
      "",
      `${c.form.name}: ${fd.get("name")}`,
      `${c.form.email}: ${fd.get("email")}`,
      `${c.form.type}: ${c.form.typeOptions[typeKey]}`,
      `${c.form.budget}: ${c.form.budgetOptions[budgetKey]}`,
      `${c.form.timeline}: ${c.form.timelineOptions[timelineKey]}`,
      `${c.form.tech}: ${tech.length ? tech.join(", ") : "—"}`,
      "",
      `${c.form.message}:`,
      String(fd.get("message") || "—"),
    ];
    return lines.join("\n");
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const brief = buildBrief(new FormData(e.currentTarget));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(brief)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const mailHref = () => {
    const subject = encodeURIComponent(lang === "fr" ? "Brief de projet" : "Project brief");
    return `mailto:?subject=${subject}`;
  };

  return (
    <SectionShell
      id="contact"
      n={t.sections.contact.n}
      label={t.sections.contact.label}
      title={t.sections.contact.title}
    >
      <h3 className="font-display text-[15vw] leading-[0.9] uppercase sm:text-8xl lg:text-[9rem]">
        {c.heading[0]}{" "}
        <span className="text-transparent [-webkit-text-stroke:2px_var(--ink)]">
          {c.heading[1]}
        </span>
      </h3>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="max-w-md text-base leading-relaxed text-ink/80 md:text-lg">
            {c.intro}
          </p>

          <div className="mt-6 border-2 border-ink bg-surface p-4 font-hand text-xl shadow-[3px_3px_0_var(--ink)]">
            ★ {c.channels.availability}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-2 border-ink bg-signal px-4 py-3 font-mono text-[11px] font-bold tracking-[0.16em] text-white uppercase shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" /> {c.channels.whatsapp} ↗
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-2 border-ink bg-surface px-4 py-3 font-mono text-[11px] font-bold tracking-[0.16em] uppercase shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              <BrandGithub className="h-4 w-4" /> {c.channels.github} ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-2 border-ink bg-surface px-4 py-3 font-mono text-[11px] font-bold tracking-[0.16em] uppercase shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              <BrandLinkedin className="h-4 w-4" /> {c.channels.linkedin} ↗
            </a>
            <p className="flex items-center gap-3 px-1 font-mono text-[10px] tracking-[0.14em] text-ink-soft uppercase">
              <Pin className="h-4 w-4" /> {c.channels.location}
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="border-[3px] border-ink bg-surface p-5 shadow-[8px_8px_0_var(--ink)] md:p-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={labelCls}>{c.form.name} *</span>
              <input
                required
                name="name"
                placeholder={c.form.namePh}
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className={labelCls}>{c.form.email} *</span>
              <input
                required
                type="email"
                name="email"
                placeholder={c.form.emailPh}
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className={labelCls}>{c.form.type}</span>
              <select name="type" className={inputCls} defaultValue="web">
                {projectTypes.map((k) => (
                  <option key={k} value={k}>
                    {c.form.typeOptions[k]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={labelCls}>{c.form.budget}</span>
              <select name="budget" className={inputCls} defaultValue="discuss">
                {budgets.map((k) => (
                  <option key={k} value={k}>
                    {c.form.budgetOptions[k]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className={labelCls}>{c.form.timeline}</span>
              <select name="timeline" className={inputCls} defaultValue="flexible">
                {timelines.map((k) => (
                  <option key={k} value={k}>
                    {c.form.timelineOptions[k]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <fieldset className="mt-5">
            <legend className={labelCls}>{c.form.tech}</legend>
            <p className="mt-1 font-hand text-lg text-ink-soft">{c.form.techHint}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {techOptions.map((opt) => {
                const active = tech.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setTech((prev) =>
                        active ? prev.filter((x) => x !== opt) : [...prev, opt],
                      )
                    }
                    aria-pressed={active}
                    className={`border-2 border-ink px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.14em] uppercase transition-colors ${
                      active
                        ? "bg-signal text-white shadow-[3px_3px_0_var(--ink)]"
                        : "bg-paper hover:bg-ink hover:text-paper"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="mt-5 block">
            <span className={labelCls}>{c.form.message} *</span>
            <textarea
              required
              name="message"
              rows={4}
              placeholder={c.form.messagePh}
              className={`${inputCls} resize-y`}
            />
          </label>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 border-2 border-ink bg-signal px-5 py-3 font-mono text-[11px] font-bold tracking-[0.16em] text-white uppercase shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" /> {c.form.submit}
            </button>
            <a
              href={mailHref()}
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.16em] text-ink-soft uppercase underline decoration-signal decoration-2 underline-offset-4 hover:text-signal"
            >
              <Mail className="h-3.5 w-3.5" /> {c.form.submitAlt}
            </a>
          </div>

          {sent && (
            <p
              role="status"
              className="mt-4 border-2 border-ink bg-paper px-3 py-2 font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
            >
              ✓ {c.success}
            </p>
          )}
        </form>
      </div>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-6">
        <p className="font-hand text-xl">{c.credits}</p>
        <p className="font-mono text-[10px] tracking-[0.18em] text-ink-soft uppercase">
          © {year || "—"} {profile.name} — {c.copyright}
        </p>
      </footer>
    </SectionShell>
  );
}
