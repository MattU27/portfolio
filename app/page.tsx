import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { profile, projects, skills } from "@/lib/content";
import { Arrow, Lock, SectionHeading } from "@/components/ui";
import { CopyEmail } from "@/components/copy-email";
import { FullWalkthrough } from "@/components/full-walkthrough";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#home" aria-label={`${profile.name}, back to top`}>
            {profile.name}
          </a>
          <nav aria-label="Main navigation">
            <a href="#work">Work</a><a href="#about">About</a>
            <a href="#experience">Experience</a><a href="#contact">Contact <Arrow diagonal /></a>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <section id="home" className="shell hero" aria-labelledby="hero-title">
          <p className="eyebrow hero-eyebrow"><span className="accent-dot" aria-hidden="true" />Full-stack developer · Backend focus</p>
          <div className="hero-grid">
            <div className="hero-main">
              <h1 id="hero-title">Business workflows. <span>Thoughtfully built.</span></h1>
              <p className="hero-copy">I’m Matt, a Philippines-based developer building and maintaining internal business systems. My work includes bidding and shipment-tracking applications, from requirements and interfaces to databases, testing and maintenance.</p>
              <div className="hero-actions">
                <a href="#work" className="button">Explore my work <Arrow direction="down" /></a>
                <a href={assetPath(profile.resume)} className="text-link" download>Résumé (PDF) <Arrow direction="down" /></a>
              </div>
            </div>
            <figure className="hero-portrait">
              <Image src={assetPath(profile.portrait)} alt="John Matthew Banto in his graduation attire" width={560} height={811} sizes="(max-width: 700px) 112px, 200px" preload />
              <figcaption><span>Hi, I’m Matt.</span>Developer. Always learning.</figcaption>
            </figure>
          </div>
          <div className="hero-meta"><p>{profile.location}</p><p>Seeking fully remote developer roles</p><a href="#work" aria-label="Scroll to selected work"><Arrow direction="down" /></a></div>
        </section>
        <section id="work" className="shell section work-section" aria-labelledby="work-title">
          <SectionHeading number="01" label="Selected work" title="Real systems for everyday work." id="work-title">Two internal business systems I worked on as the sole full-stack developer.</SectionHeading>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project" key={project.number} aria-labelledby={`project-${project.number}`}>
                <div className="project-heading">
                  <div><p className="eyebrow"><span>{project.number} /</span> {project.category}</p><h3 id={`project-${project.number}`}>{project.title}</h3></div>
                  <p className="project-lead">{project.lead}</p>
                </div>
                <div className="project-proof">
                  <figure>
                    <a className="project-image-link" href={assetPath(project.preview.image)} target="_blank" rel="noopener noreferrer" aria-label={`Open larger screenshot: ${project.preview.caption} (new tab)`}>
                      <Image src={assetPath(project.preview.image)} alt={project.preview.alt} width={1280} height={720} sizes="(max-width: 700px) calc(100vw - 64px), (max-width: 1280px) calc(100vw - 112px), 1136px" loading="lazy" />
                    </a>
                    <figcaption><span>{project.preview.caption}. Demonstration using fictional test data.</span><a href={assetPath(project.preview.image)} target="_blank" rel="noopener noreferrer">Full-size image <span className="sr-only">of {project.title} (new tab)</span><Arrow diagonal /></a></figcaption>
                  </figure>
                </div>
                <div className="project-details">
                  <div className="project-capabilities"><h4>What the system supports</h4><ul>{project.preview.highlights.map((item) => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul><p className="evidence-detail">{project.preview.detail}</p></div>
                  <div className="project-contribution"><h4>My contribution</h4><p>{project.contribution}</p><p className="project-context">{project.summary}</p><p className="project-stack">{project.stack}</p><p className="private-note"><Lock />{project.note}</p></div>
                </div>
              </article>
            ))}
          </div>
          <FullWalkthrough />
          <aside className="work-note" aria-labelledby="lesson-title"><p className="eyebrow">A lesson I carried forward</p><div><h3 id="lesson-title">Better planning before building.</h3><p>Working on E-Bidding taught me to define development stages and goals more clearly before using AI tools. I brought that fuller workflow planning into the shipment-tracking project.</p></div></aside>
        </section>
        <div className="paper-band">
          <section id="about" className="shell section" aria-labelledby="about-title">
            <SectionHeading number="02" label="About and toolkit" title="Full stack, with a pull toward the backend." id="about-title" />
            <div className="about-grid"><div className="about-copy"><p>I’m interested in the systems behind everyday work: how information moves, how people complete tasks, and where software can make a process clearer.</p><p>I’ve worked across requirements, interfaces, databases and maintenance, and I want to keep developing those skills in a guided engineering team.</p></div>
              <div className="skills-grid">{skills.map((skill, index) => <div className="skill" key={skill.title}><span className="skill-index" aria-hidden="true">0{index + 1}</span><div><h3>{skill.title}</h3><p className="skill-tools">{skill.items}</p><p>{skill.description}</p></div></div>)}</div>
            </div>
          </section>
          <section id="experience" className="shell section experience-section" aria-labelledby="experience-title">
            <SectionHeading number="03" label="Experience and education" title="The path so far." id="experience-title" />
            <div className="timeline">
              <article className="timeline-item"><p className="eyebrow">Paid employment<span>June–August 2026</span></p><div><h3>Management Information Systems (MIS) Assistant</h3><p className="experience-company">GAKKEN Philippines</p><p>Full-stack work on internal business systems, including development, pre-production QA, maintenance and user-requested improvements.</p></div></article>
              <article className="timeline-item"><p className="eyebrow">Internship<span>November 2025–May 2026</span></p><div><h3>MIS Assistant Intern</h3><p className="experience-company">GAKKEN Philippines</p><p>Supported employees with hands-on technical concerns, while spending most of the internship developing systems.</p></div></article>
              <article className="timeline-item"><p className="eyebrow">Education<span>Graduated September 2026</span></p><div><h3>BS Information Technology</h3><p className="experience-company">National University Manila</p><p>Mobile and Web Applications</p></div></article>
            </div>
          </section>
        </div>
        <section id="contact" className="shell section contact-section" aria-labelledby="contact-title">
          <p className="eyebrow">04 · Get in touch</p>
          <div className="contact-grid"><div><h2 id="contact-title">Let’s build <span>something useful.</span></h2><p>I’m looking for fully remote developer opportunities with teams hiring Philippines-based developers. If my work fits your team, I’d like to hear from you.</p></div>
            <div className="contact-details"><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a><CopyEmail email={profile.email} /><a href={assetPath(profile.resume)} className="text-link" download>Download résumé (PDF) <Arrow direction="down" /></a><div className="social-links"><a href={profile.github}>GitHub <Arrow diagonal /></a><a href={profile.linkedin}>LinkedIn <Arrow diagonal /></a></div><p className="location">{profile.location}</p></div>
          </div>
        </section>
      </main>
      <footer className="shell footer"><p>© {new Date().getFullYear()} {profile.name}</p><a href="#home">Back to top <Arrow direction="up" /></a></footer>
    </>
  );
}
