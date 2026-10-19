export const GITHUB_USER = "TrafiTaha";
export const WHATSAPP_NUMBER = "21629119181";

export const profile = {
  name: "Taha Ben Romdhane",
  firstName: "Taha",
  monogram: "TBR.",
  role: { en: "Software Engineer", fr: "Ingénieur Logiciel" },
  roleLong: { en: "Full-Stack Engineer", fr: "Ingénieur Full-Stack" },
  location: "Tunis, Tunisia",
  tagline: {
    en: "Engineering digital tools that simplify human complexity. I design and build performant web platforms and mobile experiences end-to-end — from database schema to pixel.",
    fr: "Je conçois des outils numériques qui simplifient la complexité humaine. Je bâtis des plateformes web performantes et des expériences mobiles de bout en bout — du schéma de base de données au pixel.",
  },
  github: "https://github.com/TrafiTaha",
  linkedin: "https://www.linkedin.com/in/taha-ben-romdhane-765b09371",
  facebook: "https://www.facebook.com/share/14i4KyFYUsi/",
  instagram: "https://www.instagram.com/txha_br",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
};

export type FeaturedProject = {
  slug: string;
  repo: string;
  title: string;
  subtitle: { en: string; fr: string };
  description: { en: string; fr: string };
  tags: string[];
  cover: "docs" | "farm" | "board";
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "alphadocTN",
    repo: "AlphaDocTN",
    title: "AlphaDocTN",
    subtitle: { en: "Enterprise Document Engine", fr: "Moteur Documentaire d'Entreprise" },
    description: {
      en: "Enterprise-level document architect built around a strict permission model, so teams only see and sign what they are meant to.",
      fr: "Architecte documentaire d'entreprise bâti autour d'un modèle de permissions strict : les équipes ne voient et ne signent que ce qui les concerne.",
    },
    tags: ["Laravel", "PHP", "MySQL", "RBAC"],
    cover: "docs",
  },
  {
    slug: "agrisdol",
    repo: "Agrisdol",
    title: "Agrisdol",
    subtitle: { en: "Agricultural Intelligence Platform", fr: "Plateforme d'Intelligence Agricole" },
    description: {
      en: "A smart-farming platform that turns field data into decisions — tracking parcels, inputs and yields for growers.",
      fr: "Une plateforme d'agriculture intelligente qui transforme les données de terrain en décisions — parcelles, intrants et rendements.",
    },
    tags: ["Node.js", "Laravel", "SQLite"],
    cover: "farm",
  },
  {
    slug: "worksphere",
    repo: "WorkSphere",
    title: "WorkSphere",
    subtitle: { en: "Team Productivity Engine", fr: "Moteur de Productivité d'Équipe" },
    description: {
      en: "A team synchronization engine designed for high-performance collaboration — tasks, ownership and progress in one place.",
      fr: "Un moteur de synchronisation d'équipe pensé pour la collaboration haute performance — tâches, responsabilités et progrès au même endroit.",
    },
    tags: ["Laravel", "Blade", "MySQL"],
    cover: "board",
  },
];

export const skills = [
  { short: "React", full: "React", hot: false },
  { short: "Next", full: "Next.js", hot: false },
  { short: "TS", full: "TypeScript", hot: true },
  { short: "JS", full: "JavaScript", hot: false },
  { short: "TW", full: "Tailwind CSS", hot: false },
  { short: "Motion", full: "Framer Motion", hot: false },
  { short: "Node", full: "Node.js", hot: false },
  { short: "Laravel", full: "Laravel", hot: true },
  { short: "PHP", full: "PHP", hot: false },
  { short: "MySQL", full: "MySQL", hot: false },
  { short: "SQLite", full: "SQLite", hot: false },
  { short: "REST", full: "REST APIs", hot: false },
  { short: "Git", full: "Git", hot: true },
  { short: "CI/CD", full: "GitHub Actions", hot: false },
  { short: "DevOps", full: "DevOps", hot: false },
  { short: "AI", full: "Artificial Intelligence", hot: false },
  { short: "Angular", full: "Angular", hot: false },
  { short: "MongoDB", full: "MongoDB", hot: true },
];

export const certificates = [
  {
    title: "DevOps",
    provider: "9antra — The Bridge",
    duration: { en: "2 Months", fr: "2 Mois" },
    date: { en: "March 2026", fr: "Mars 2026" },
    tilt: "-2.2deg",
  },
  {
    title: "AI — Recommendation System",
    provider: "9antra — The Bridge",
    duration: { en: "1 Month", fr: "1 Mois" },
    date: { en: "May 2026", fr: "Mai 2026" },
    tilt: "1.6deg",
  },
  {
    title: "AITD Participation",
    provider: "ISET Sidi Bouzid",
    duration: { en: "1 Day", fr: "1 Jour" },
    date: { en: "December 2025", fr: "Décembre 2025" },
    tilt: "-1.2deg",
  },
  {
    title: "License in Web Development & Multimedia",
    provider: "ISET Sidi Bouzid",
    duration: { en: "Academic year 2025–2026", fr: "Année universitaire 2025–2026" },
    date: { en: "July 2026", fr: "Juillet 2026" },
    tilt: "2.4deg",
  },
];

export const navLinks = [
  { id: "about", label: { en: "About", fr: "À propos" } },
  { id: "skills", label: { en: "Skills", fr: "Compétences" } },
  { id: "certificates", label: { en: "Certs", fr: "Diplômes" } },
  { id: "projects", label: { en: "Work", fr: "Projets" } },
  { id: "github", label: { en: "GitHub", fr: "GitHub" } },
  { id: "contact", label: { en: "Contact", fr: "Contact" } },
];
