import type { Metadata } from "next";
import { Anton, Caveat_Brush, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PrefProvider } from "@/components/providers";
import { WobbleDefs } from "@/components/section";
import { Nav } from "@/components/nav";
import { profile } from "@/lib/data";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat_Brush({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const url = "https://taha-ben-romdhane.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: `${profile.name} | Software Engineer — Mobile & Web`,
  description: profile.tagline.en,
  openGraph: {
    title: `${profile.name} | Software Engineer`,
    description: profile.tagline.en,
    url,
    siteName: profile.name,
    locale: "en_US",
    type: "website",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("tbr-theme");var d=t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark");var l=localStorage.getItem("tbr-lang");if(l==="fr")document.documentElement.lang="fr";}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url,
  jobTitle: "Software Engineer",
  address: { "@type": "PostalAddress", addressLocality: "Zaghouan", addressCountry: "TN" },
  sameAs: [profile.github, profile.linkedin, profile.facebook],
  knowsAbout: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Laravel",
    "Node.js",
    "Mobile Application Development",
    "Full Stack Development",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${caveat.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <PrefProvider>
          <WobbleDefs />
          <Nav />
          <main className="relative min-h-svh w-full overflow-x-clip">{children}</main>
        </PrefProvider>
      </body>
    </html>
  );
}
