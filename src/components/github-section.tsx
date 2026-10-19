import { GITHUB_USER, profile } from "@/lib/data";
import { fetchGithubUser, fetchRepos, type GithubRepo } from "@/lib/github";
import { dict } from "@/lib/i18n";
import { SectionShell } from "./section";

export async function GithubSection() {
  const [user, repos] = await Promise.all([fetchGithubUser(), fetchRepos()]);
  const t = dict.en;
  const top = (repos || [])
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 4);

  return (
    <SectionShell
      id="github"
      n={t.sections.github.n}
      label={t.sections.github.label}
      title={t.sections.github.title}
    >
      <div className="grid grid-cols-3 border-2 border-ink">
        {[
          { value: user?.public_repos ?? "—", label: t.github.repos },
          { value: user?.followers ?? "—", label: t.github.followers },
          { value: user?.following ?? "—", label: t.github.following },
        ].map((s, i) => (
          <div
            key={s.label}
            className={`bg-surface p-5 text-center md:p-7 ${i < 2 ? "border-r-2 border-ink" : ""}`}
          >
            <p className="font-display text-4xl md:text-6xl">{s.value}</p>
            <p className="mt-1 font-mono text-[10px] font-bold tracking-[0.16em] text-ink-soft uppercase">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-right font-hand text-lg text-ink-soft">
        {t.github.statsNote}
      </p>

      {repos === null ? (
        <p className="mt-6 border-2 border-dashed border-ink/40 p-6 font-mono text-[11px] tracking-wide text-ink-soft">
          {t.github.error}
        </p>
      ) : (
        <>
          <h3 className="font-display mt-10 text-2xl uppercase md:text-3xl">
            {t.github.topRepos}
          </h3>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {top.map((r: GithubRepo) => (
              <a
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col border-[3px] border-ink bg-surface p-5 shadow-[5px_5px_0_var(--ink)] transition-all hover:-translate-y-1 hover:shadow-[5px_5px_0_var(--signal)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-display text-xl uppercase md:text-2xl">
                    {r.name}
                  </h4>
                  <span className="font-mono text-[11px] font-bold text-signal">
                    ★ {r.stargazers_count}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink/70">
                  {r.description || "—"}
                </p>
                <div className="mt-4 flex items-center justify-between font-mono text-[10px] font-bold tracking-[0.14em] text-ink-soft uppercase">
                  <span className="text-signal">{r.language || "—"}</span>
                  <span>⑂ {r.fork ? t.projects.fork : "source"}</span>
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      <div className="mt-8">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-2 border-ink bg-signal px-5 py-2.5 font-mono text-[11px] font-bold tracking-[0.18em] text-white uppercase shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
        >
          {t.projects.viewAll}
        </a>
      </div>
      <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-ink-soft uppercase">
        @{GITHUB_USER}
      </p>
    </SectionShell>
  );
}
