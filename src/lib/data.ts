export const GITHUB_USER = "mouhibbenzina";
export const WHATSAPP_NUMBER = "21625568735";
export const EMAIL = "mouhib.benzina@zaghouan.r-iset.tn";

export const profile = {
  name: "Mouhib Ben Zina",
  firstName: "Mouhib",
  monogram: "MBZ.",
  role: { en: "Software Engineer", fr: "Ingénieur Logiciel" },
  roleLong: { en: "Full-Stack Engineer", fr: "Ingénieur Full-Stack" },
  location: "Zaghouan, Tunisia",
  tagline: {
    en: "Building performant web and mobile products end-to-end — from database schema to pixel. Currently open to new opportunities and collaborations.",
    fr: "Je construis des produits web et mobiles performants de bout en bout — du schéma de base de données au pixel. Actuellement ouvert à de nouvelles opportunités et collaborations.",
  },
  github: "https://github.com/mouhibbenzina",
  linkedin: "https://www.linkedin.com/in/mouhib-benzina-5b8700402",
  facebook: "https://www.facebook.com/mouhib.benzina.2025/",
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
    slug: "zribaiq",
    repo: "ZribaIQ",
    title: "ZribaIQ",
    subtitle: { en: "AI Quiz Platform", fr: "Plateforme de Quiz IA" },
    description: {
      en: "AI-powered quiz application (NexaQuiz) — generates questions on any subject with Claude AI.",
      fr: "Application de quiz propulsée par l'IA (NexaQuiz) — génère des questions sur n'importe quel sujet avec Claude AI.",
    },
    tags: ["Symfony", "PHP", "Claude AI"],
    cover: "docs",
  },
  {
    slug: "cleantun",
    repo: "cleantun",
    title: "CleanTun",
    subtitle: { en: "Citizen Waste Reporting", fr: "Signalement Citoyen des Déchets" },
    description: {
      en: "Citizen waste-reporting platform for Tunisia — photo + GPS, interactive map, status tracking and admin dashboard.",
      fr: "Plateforme citoyenne de signalement des déchets en Tunisie — photo + GPS, carte interactive, suivi des statuts et dashboard admin.",
    },
    tags: ["React", "Leaflet", "Express", "SQLite"],
    cover: "farm",
  },
  {
    slug: "club-africain-app",
    repo: "club-africain-app",
    title: "Club Africain App",
    subtitle: { en: "Official Supporters App", fr: "Application Officielle des Supporters" },
    description: {
      en: "Official mobile app for Club Africain (CATV) supporters — built with React Native (Expo) and TypeScript.",
      fr: "Application mobile officielle des supporters du Club Africain (CATV) — React Native (Expo) et TypeScript.",
    },
    tags: ["React Native", "Expo", "TypeScript"],
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
    title: "Basics of Python (CR641)",
    provider: "UniAthena — Cambridge International Qualifications",
    duration: { en: "Online · Level 7", fr: "En ligne · Niveau 7" },
    date: { en: "August 15, 2026", fr: "15 Août 2026" },
    tilt: "-2.2deg",
  },
  {
    title: "Basics of Machine Learning Algorithms (CR640)",
    provider: "UniAthena — Cambridge International Qualifications",
    duration: { en: "Online · Level 7", fr: "En ligne · Niveau 7" },
    date: { en: "August 15, 2026", fr: "15 Août 2026" },
    tilt: "1.6deg",
  },
  {
    title: "Basics in Machine Learning (CR642)",
    provider: "UniAthena — Cambridge International Qualifications",
    duration: { en: "Online · Level 7", fr: "En ligne · Niveau 7" },
    date: { en: "August 15, 2026", fr: "15 Août 2026" },
    tilt: "-1.2deg",
  },
  {
    title: "Basics of Data Science (CR1061)",
    provider: "UniAthena — Cambridge International Qualifications",
    duration: { en: "Online · Level 7", fr: "En ligne · Niveau 7" },
    date: { en: "August 15, 2026", fr: "15 Août 2026" },
    tilt: "2.4deg",
  },
  {
    title: "Basics of SQL Statements & Indexes (CR1260)",
    provider: "UniAthena — Cambridge International Qualifications",
    duration: { en: "Online · Level 7", fr: "En ligne · Niveau 7" },
    date: { en: "August 15, 2026", fr: "15 Août 2026" },
    tilt: "-1.6deg",
  },
  {
    title: "Basics of Microsoft Power BI (CR920)",
    provider: "UniAthena — Cambridge International Qualifications",
    duration: { en: "Online · Level 7", fr: "En ligne · Niveau 7" },
    date: { en: "August 15, 2026", fr: "15 Août 2026" },
    tilt: "2.2deg",
  },
  {
    title: "Basics of Agents & Environments in AI (CR1272)",
    provider: "UniAthena — Cambridge International Qualifications",
    duration: { en: "Online · Level 7", fr: "En ligne · Niveau 7" },
    date: { en: "August 14, 2026", fr: "14 Août 2026" },
    tilt: "-2.4deg",
  },
  {
    title: "Master ChatGPT (CR1198)",
    provider: "UniAthena",
    duration: { en: "Online · Level 5", fr: "En ligne · Niveau 5" },
    date: { en: "August 14, 2026", fr: "14 Août 2026" },
    tilt: "1.2deg",
  },
  {
    title: "Building with Artificial Intelligence (CS205)",
    provider: "UniAthena",
    duration: { en: "48 hours · 88%", fr: "48 heures · 88%" },
    date: { en: "August 15, 2026", fr: "15 Août 2026" },
    tilt: "-2deg",
  },
  {
    title: "Software Engineering (CS302)",
    provider: "UniAthena",
    duration: { en: "36 hours · 79%", fr: "36 heures · 79%" },
    date: { en: "July 5, 2026", fr: "5 Juillet 2026" },
    tilt: "1.8deg",
  },
  {
    title: "Fundamentals of Machine Learning (CS207)",
    provider: "UniAthena",
    duration: { en: "19 hours · 96%", fr: "19 heures · 96%" },
    date: { en: "August 15, 2026", fr: "15 Août 2026" },
    tilt: "-1.4deg",
  },
  {
    title: "EF SET English Certificate",
    provider: "EF SET",
    duration: { en: "B2 Upper Intermediate · 60/100", fr: "B2 Intermédiaire · 60/100" },
    date: { en: "2026", fr: "2026" },
    tilt: "2deg",
  },
  {
    title: "International Computer Science Competition 2026",
    provider: "ICSC — Qualification Round",
    duration: { en: "Participation", fr: "Participation" },
    date: { en: "July 20, 2026", fr: "20 Juillet 2026" },
    tilt: "-1.8deg",
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
