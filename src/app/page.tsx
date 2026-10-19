import { About } from "@/components/about";
import { Certificates } from "@/components/certificates";
import { Contact } from "@/components/contact";
import { GithubSection } from "@/components/github-section";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { fetchRepos } from "@/lib/github";

export default async function Home() {
  const repos = await fetchRepos();

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Certificates />
      <Projects repos={repos} />
      <GithubSection />
      <Contact />
    </>
  );
}
