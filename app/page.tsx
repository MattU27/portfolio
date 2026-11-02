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
        <section id="home" className="masthead paper-band" aria-labelledby="hero-title">
          <div className="shell">
            <div className="masthead-kicker"><p className="eyebrow">Developer portfolio</p><p>Manila, Philippines · UTC+8</p></div>
            <h1 id="hero-title"><span>John Matthew</span>{" "}<span>Banto<span className="name-period">.</span></span></h1>
            <div className="masthead-bottom"><p><strong>Full-stack developer.</strong><br />A focus on the backend. An eye on the whole workflow.</p><div className="masthead-actions"><a href="#work" className="button">Explore my work <Arrow direction="down" /></a><a href={assetPath(profile.resume)} className="text-link" download>Résumé (PDF) <Arrow direction="down" /></a></div></div>
          </div>
        </section>
        <section id="work" className="work-section" aria-labelledby="work-title">
          <div className="shell work-index"><h2 id="work-title">Selected work</h2><p>Two internal systems. From requirements to maintenance.</p><span aria-hidden="true">01—02</span></div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className={`project project-${project.number}`} key={project.number} aria-labelledby={`project-${project.number}`}>
                <div className="shell project-stage">
                  <div className="project-rail">
                    <p className="project-number" aria-hidden="true">{project.number}</p>
                    <p className="eyebrow">{project.category}</p>
                    <h3 id={`project-${project.number}`}>{project.title}</h3>
                    <p className="project-lead">{project.lead}</p>
                    <p className="project-role">Sole full-stack developer</p>
                    <a className="text-link" href={`#story-${project.number}`}>Inside the project <Arrow direction="down" /></a>
                  </div>
                  <figure className="project-visual">
                    <a className="project-image-link" href={assetPath(project.preview.image)} target="_blank" rel="noopener noreferrer" aria-label={`Open larger screenshot: ${project.preview.caption} (new tab)`}>
                      <Image src={assetPath(project.preview.image)} alt={project.preview.alt} width={1280} height={720} sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1400px) 70vw, 940px" preload={index === 0} />
                    </a>
                    <figcaption><span>{project.preview.caption}. Demonstration using fictional test data.</span><a href={assetPath(project.preview.image)} target="_blank" rel="noopener noreferrer">View full size <span className="sr-only">of {project.title} (new tab)</span><Arrow diagonal /></a></figcaption>
                  </figure>
                </div>
                <div id={`story-${project.number}`} className="shell project-story">
                  <p className="eyebrow story-label">Behind the system</p>
                  <div className="project-contribution"><h4>My contribution</h4><p>{project.contribution}</p><p className="project-context">{project.summary}</p><p className="project-stack">{project.stack}</p><p className="private-note"><Lock />{project.note}</p></div>
                  <div className="project-capabilities"><h4>What the system supports</h4><ul>{project.preview.highlights.map((item) => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul><p className="evidence-detail">{project.preview.detail}</p></div>
                </div>
              </article>
            ))}
          </div>
          <div className="shell screening-room">
          <FullWalkthrough />
          <aside className="work-note" aria-labelledby="lesson-title"><p className="eyebrow">A lesson I carried forward</p><div><h3 id="lesson-title">Better planning before building.</h3><p>Working on E-Bidding taught me to define development stages and goals more clearly before using AI tools. I brought that fuller workflow planning into the shipment-tracking project.</p></div></aside>
          </div>
        </section>
        <div className="paper-band">
          <section id="about" className="shell section" aria-labelledby="about-title">
            <div className="profile-spread">
              <figure className="profile-portrait"><Image src={assetPath(profile.portrait)} alt="John Matthew Banto in his graduation attire" width={560} height={811} sizes="(max-width: 700px) 60vw, 320px" /><figcaption>Matt Banto<br /><span>Developer. Always learning.</span></figcaption></figure>
              <div className="profile-story"><p className="eyebrow">02 / The person behind the work</p><h2 id="about-title">Curious about<br />what happens<br /><em>under the surface.</em></h2><div className="about-copy"><p>I’m interested in the systems behind everyday work: how information moves, how people complete tasks, and where software can make a process clearer.</p><p>I’ve worked across requirements, interfaces, databases and maintenance, and I want to keep developing those skills in a guided engineering team.</p></div></div>
            </div>
            <div className="toolkit-spread"><h3>What I work with<span>Tools, not the whole story.</span></h3><div className="skills-grid">{skills.map((skill, index) => <div className="skill" key={skill.title}><span className="skill-index" aria-hidden="true">0{index + 1}</span><div><h4>{skill.title}</h4><p className="skill-tools">{skill.items}</p><p>{skill.description}</p></div></div>)}</div></div>
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
          <div className="contact-grid"><div><h2 id="contact-title">Good work starts<br />with a <span>conversation.</span></h2><p>I’m looking for fully remote developer opportunities with teams hiring Philippines-based developers. If my work fits your team, I’d like to hear from you.</p></div>
            <div className="contact-details"><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a><CopyEmail email={profile.email} /><a href={assetPath(profile.resume)} className="text-link" download>Download résumé (PDF) <Arrow direction="down" /></a><div className="social-links"><a href={profile.github}>GitHub <Arrow diagonal /></a><a href={profile.linkedin}>LinkedIn <Arrow diagonal /></a></div><p className="location">{profile.location}</p></div>
          </div>
        </section>
      </main>
      <footer className="shell footer"><p>© {new Date().getFullYear()} {profile.name}</p><a href="#home">Back to top <Arrow direction="up" /></a></footer>
    </>
  );
}
