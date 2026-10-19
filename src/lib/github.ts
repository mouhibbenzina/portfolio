import { GITHUB_USER } from "./data";

export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  topics: string[];
  updated_at: string;
  pushed_at: string;
};

export type GithubUser = {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  name: string | null;
};

const API = "https://api.github.com";

const headers = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

export async function fetchRepos(): Promise<GithubRepo[] | null> {
  try {
    const res = await fetch(
      `${API}/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    return (await res.json()) as GithubRepo[];
  } catch {
    return null;
  }
}

export async function fetchGithubUser(): Promise<GithubUser | null> {
  try {
    const res = await fetch(`${API}/users/${GITHUB_USER}`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as GithubUser;
  } catch {
    return null;
  }
}
