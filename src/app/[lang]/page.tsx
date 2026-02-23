import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { getDictionary } from "./dictionaries";
import { getDocumentation } from "@/docs/documentation";
import { GitHub, LinkedIn, OpenInNew } from "@/icons";
import TopBar from "@/components/TopBar";
import HeroTyping from "@/components/HeroTyping";
import TimelineScroller from "@/components/TimelineScroller";
import RevealOnScroll from "@/components/RevealOnScroll";
import type {
  EducationItem,
  ExperienceCompany,
  ProjectItem,
} from "@/models/content";

type Props = {
  params: Promise<{ lang: string }>;
};

const expandHexColor = (value: string) => {
  const hex = value.trim().toLowerCase();
  if (!hex.startsWith("#")) {
    return null;
  }

  if (hex.length === 4 || hex.length === 5) {
    const chars = hex.slice(1).split("");
    const expanded = chars.map((char) => char + char).join("");
    return `#${expanded.slice(0, 6)}`;
  }

  if (hex.length === 7 || hex.length === 9) {
    return `#${hex.slice(1, 7)}`;
  }

  return null;
};

const resolveBadgeColor = (value: string) => {
  const normalized = value.trim().toLowerCase();
  if (normalized === "var(--next)") {
    return "var(--next)";
  }

  return value;
};

const getBadgeTextColor = (badgeColor: string) => {
  const normalizedColor = resolveBadgeColor(badgeColor);
  if (normalizedColor.trim().toLowerCase() === "var(--next)") {
    return "var(--next-on)";
  }

  const hex = expandHexColor(normalizedColor);

  if (!hex) {
    return "#ecf9f9";
  }

  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);

  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6 ? "#0b1d22" : "#ecf9f9";
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
  const isCertification = (item: EducationItem) => {
    const fingerprint = `${item.type} ${item.title}`.toLowerCase();
    return (
      fingerprint.includes("certif") ||
      fingerprint.includes("scrum") ||
      fingerprint.includes("pcap")
    );
  };
  const certificationItems = education.filter(isCertification);
  const academicItems =
    certificationItems.length === education.length
      ? education
      : education.filter((item) => !isCertification(item));

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
      <RevealOnScroll selector="[data-reveal-node]" />
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

      <section id="about" className="shell hero">
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
                data-reveal-node
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
                      data-reveal-node
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
                        <p className="skills-line">
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
              <article
                className="project-card"
                role="listitem"
                key={`${project.name}-${index}`}
                data-reveal-node
                style={{ "--reveal-delay": `${120 + index * 80}ms` } as CSSProperties}
              >
                <div className="project-card-top">
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

                <div className="project-card-foot">
                  <div className="project-tech">
                    <span className="mono project-tech-label">{dict.projects.builtWith}</span>
                    {Object.entries(project.technologies).map(([name, color], techIndex) => (
                      <span
                        key={`${project.name}-tech-${techIndex}`}
                        className="mono tech-pill"
                        style={{ backgroundColor: color, color: getBadgeTextColor(color) }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                  <div className="project-card-action">
                    {external ? (
                      <Link href={project.url as string} target="_blank" className="chip" aria-label={dict.tooltip.newtab}>
                        <OpenInNew fontSize="small" />
                      </Link>
                    ) : (
                      <span className="mono private-note">{dict.tooltip.private}</span>
                    )}
                  </div>
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

        <div className={`education-layout ${certificationItems.length === 0 ? "education-layout-single" : ""}`}>
          <div className="education-journey" role="list">
            {academicItems.map((item, index) => {
              const hasThesis = item.thesis.trim().length > 0 && !/^lorem ipsum$/i.test(item.thesis.trim());
              return (
                <article
                  key={`${item.title}-${index}`}
                  className="education-journey-card"
                  role="listitem"
                  data-reveal-node
                  style={{ "--reveal-delay": `${140 + index * 85}ms` } as CSSProperties}
                >
                  <div className="education-journey-head">
                    <span className="mono education-type-pill">{item.type}</span>
                    <span className="mono education-date-tag">{item.date}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="education-where">
                    {item.where} · {item.country}
                  </p>
                  <p className="education-score">{item.score}</p>
                  {hasThesis ? <p className="education-thesis">{item.thesis}</p> : null}
                  <div className="education-card-foot">
                    <Link href={item.link} target="_blank" className="chip" aria-label={dict.tooltip.newtab}>
                      <OpenInNew fontSize="small" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {certificationItems.length > 0 ? (
            <aside className="education-certifications">
              <div className="education-cert-grid" role="list">
                {certificationItems.map((item, index) => (
                  <article
                    key={`${item.title}-cert-${index}`}
                    className="education-cert-card"
                    role="listitem"
                    data-reveal-node
                    style={{ "--reveal-delay": `${220 + index * 90}ms` } as CSSProperties}
                  >
                    <div className="education-cert-head">
                      <span className="mono education-type-pill">{item.type}</span>
                      <span className="mono education-date-tag">{item.date}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p className="education-where">
                      {item.where} · {item.country}
                    </p>
                    <div className="education-cert-foot">
                      <span className="mono education-score">{item.score}</span>
                      <Link href={item.link} target="_blank" className="chip" aria-label={dict.tooltip.newtab}>
                        <OpenInNew fontSize="small" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </aside>
          ) : null}
        </div>
      </section>

      <section className="shell contact-section fade-up">
        <h2 className="contact-title">{dict.contact.title}</h2>
        <p className="contact-lead">{dict.contact.lead}</p>
        <div className="contact-links">
          <Link
            href="https://github.com/amarqz"
            target="_blank"
            rel="noreferrer"
            className="contact-link mono"
            aria-label="GitHub profile"
          >
            <GitHub fontSize="small" />
            <span>{dict.contact.github}</span>
            <OpenInNew fontSize="inherit" />
          </Link>
          <Link
            href="https://linkedin.com/in/antoniomarquezpicon"
            target="_blank"
            rel="noreferrer"
            className="contact-link mono"
            aria-label="LinkedIn profile"
          >
            <LinkedIn fontSize="small" />
            <span>{dict.contact.linkedin}</span>
            <OpenInNew fontSize="inherit" />
          </Link>
        </div>
      </section>

      <footer className="shell footer mono">
        <p>{dict.footer.byline}</p>
        <p>
          {dict.footer.lastUpdated}: {formattedBuildDate}
        </p>
      </footer>
    </main>
  );
}
