import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { getDictionary } from "./dictionaries";
import { getDocumentation } from "@/docs/documentation";
import { OpenInNew } from "@/icons";
import TopBar from "@/components/TopBar";
import HeroTyping from "@/components/HeroTyping";
import TimelineScroller from "@/components/TimelineScroller";
import type {
  EducationItem,
  ExperienceCompany,
  ProjectItem,
} from "@/models/content";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Portfolio",
  };
}

export default async function Home(props: Props) {
  const params = await props.params;
  const locale = params.lang;
  const dict = await getDictionary(locale);

  const experienceCompanies = Object.values(
    (await getDocumentation("experience", locale)) as Record<string, ExperienceCompany>
  );

  const education = Object.values(
    (await getDocumentation("education", locale)) as Record<string, EducationItem>
  );
  const projects = Object.values(
    (await getDocumentation("projects", locale)) as Record<string, ProjectItem>
  );

  const buildTimestamp = process.env.BUILD_TIMESTAMP || new Date().toISOString();
  const buildDate = new Date(buildTimestamp);
  const formattedBuildDate = Number.isNaN(buildDate.getTime())
    ? buildTimestamp
    : new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        timeZone: "UTC",
      }).format(buildDate);

  return (
    <main className="site-frame">
      <div className="grid-bg" />
      <div className="spotlight one" />
      <div className="spotlight two" />

      <TopBar
        locale={locale}
        switchTo={dict.controls.switchTo}
        switchLang={dict.controls.switchLang}
        labels={{
          about: dict.section.about,
          experience: dict.section.experience,
          projects: dict.section.projects,
          education: dict.section.education,
        }}
      />

      <section id="about" className="shell hero-v2">
        <div className="hero-copy fade-up delay-1 hero-full">
          <HeroTyping prefix={dict.hero.typingPrefix} words={dict.hero.typingWords} />
          <p className="mono eyebrow">{dict.hero.introKicker}</p>
          <p className="hero-lead">{dict.hero.lead}</p>
          <p className="now-pill mono">
            {dict.hero.nowLabel}: {dict.hero.nowValue}
          </p>
        </div>
      </section>

      <section id="experience" className="shell section-block fade-up delay-2">
        <div className="section-header">
          <h2>{dict.section.experience}</h2>
        </div>

        <div className="company-timeline" id="experience-timeline">
          <TimelineScroller timelineId="experience-timeline" />
          {experienceCompanies.map((company, index) => {
            const imageSrc = company.image?.src;
            const hasImage = typeof imageSrc === "string" && imageSrc.length > 0;

            return (
              <article
                key={`${company.company}-${index}`}
                className="company-track"
                data-company-track
                data-logo-src={hasImage ? imageSrc : ""}
                data-logo-alt={company.image?.alt || `${company.company} logo`}
                data-logo-fallback={company.company.slice(0, 2).toUpperCase()}
                style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}
              >
                <div className="company-headline">
                  <div className="company-title-block">
                    <h3>{company.company}</h3>
                    <p>{company.location}</p>
                  </div>
                  <span className="mono event-duration">{company.duration}</span>
                </div>

                <div className="projects-stack">
                  {company.projects.map((project, projectIndex) => (
                    <article
                      key={`${company.company}-${project.role}-${projectIndex}`}
                      className="project-node"
                      data-project-node
                      style={{ "--reveal-delay": `${index * 140 + projectIndex * 90}ms` } as CSSProperties}
                    >
                      <div className="checkpoint-col">
                        <span className="project-node-date mono">{project.dates}</span>
                      </div>
                      <div className="event-card">
                        <h4>{project.role}</h4>
                        <ul>
                          {project.description.map((item, itemIndex) => (
                            <li key={`${project.role}-desc-${itemIndex}`}>{item}</li>
                          ))}
                        </ul>
                        <p className="skills-line-v2">
                          <span className="mono">{dict.education.skills}:</span> {project.skills.join(" · ")}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="projects" className="shell section-block fade-up delay-3">
        <div className="section-header">
          <h2>{dict.section.projects}</h2>
        </div>

        <div className="projects-ribbon" role="list">
          {projects.map((project, index) => {
            const external = typeof project.url === "string" && project.url.trim().length > 0;
            return (
              <article className="project-v2" role="listitem" key={`${project.name}-${index}`}>
                <div className="project-v2-top">
                  <h3>{project.name}</h3>
                  <span className="mono project-status" style={{ backgroundColor: project.statusType }}>
                    {project.status}
                  </span>
                </div>

                <ul>
                  {project.description.map((line, lineIndex) => (
                    <li key={`${project.name}-line-${lineIndex}`}>{line}</li>
                  ))}
                </ul>

                <div className="project-tech-v2">
                  {Object.entries(project.technologies).map(([name, color], techIndex) => (
                    <span key={`${project.name}-tech-${techIndex}`} className="mono tech-v2" style={{ backgroundColor: color }}>
                      {name}
                    </span>
                  ))}
                </div>

                <div className="project-v2-foot">
                  <span className="mono">{dict.projects.builtWith}</span>
                  {external ? (
                    <Link href={project.url as string} target="_blank" className="chip" aria-label={dict.tooltip.newtab}>
                      <OpenInNew fontSize="small" />
                    </Link>
                  ) : (
                    <span className="mono private-note">{dict.tooltip.private}</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="education" className="shell section-block fade-up delay-4">
        <div className="section-header">
          <h2>{dict.section.education}</h2>
        </div>

        <div className="edu-grid-v2">
          {education.map((item, index) => (
            <article key={`${item.title}-${index}`} className="edu-card-v2">
              <div className="edu-card-top">
                <span className="mono edu-prefix">{item.type}</span>
                <span className="mono edu-date-tag">{item.date}</span>
              </div>
              <div className="edu-institution-row">
                <p>
                  {item.where} · {item.country}
                </p>
                <Link href={item.link} target="_blank" className="chip" aria-label={dict.tooltip.newtab}>
                  <OpenInNew fontSize="small" />
                </Link>
              </div>
              <div className="edu-main">
                <h3>{item.title}</h3>
                <p>{item.score}</p>
                <p className="edu-thesis-v2">{item.thesis}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="shell footer-v2 mono">
        <p>{dict.footer.byline}</p>
        <p>
          {dict.footer.lastUpdated}: {formattedBuildDate}
        </p>
      </footer>
    </main>
  );
}
