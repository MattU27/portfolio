import { assetPath } from "@/lib/asset-path";
import { profile, projects, skills } from "@/lib/content";
import { Arrow, Lock, SectionHeading } from "@/components/ui";
import { CopyEmail } from "@/components/copy-email";
import Image from "next/image";
import { FullWalkthrough } from "@/components/full-walkthrough";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a
            className="wordmark"
            href="#home"
            aria-label="Matt Banto, back to top"
          >
            Matt Banto<span className="wordmark-dot">.</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#contact">
              Contact <Arrow diagonal />
            </a>
          </nav>
        </div>
      </header>
      <main id="main">
        <section id="home" className="shell hero">
          <div className="hero-meta">
            <p className="availability">
              <span aria-hidden="true" /> Seeking fully remote developer roles
            </p>
            <p>{profile.location}</p>
          </div>
          <div className="hero-grid">
            <div>
              <p className="eyebrow">
                John Matthew Banto · Full-stack developer
              </p>
              <h1>
                Thoughtful software.
                <br />
                <em>A backend focus.</em>
              </h1>
              <p className="hero-copy">
                I’m Matt. I build and maintain internal business systems, from
                requirements through deployment.
              </p>
              <p className="hero-detail">
                My work includes bidding and shipment-tracking applications. I
                enjoy working through the logic behind a workflow and turning it
                into something people can use.
              </p>
              <div className="hero-actions">
                <a href="#work" className="button">
                  Explore my work <Arrow direction="down" />
                </a>
                <a href={assetPath(profile.resume)} className="text-link" download>
                  Résumé (PDF) <Arrow direction="down" />
                </a>
              </div>
            </div>
            <div className="hero-portrait">
              <Image
                src={assetPath(profile.portrait)}
                alt="John Matthew Banto in his graduation attire"
                width={1080}
                height={1564}
                sizes="(max-width: 700px) 112px, (max-width: 1000px) 220px, 280px"
                preload
              />
            </div>
          </div>
        </section>
        <section id="work" className="shell section work-section">
          <SectionHeading
            number="01"
            label="Selected work"
            title="Built for the way people work."
          >
            Two internal business systems I worked on as the sole full-stack
            developer.
          </SectionHeading>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project" key={project.number}>
                <div className="project-index">
                  {project.number}
                  <span aria-hidden="true"> /</span>
                </div>
                <div className="project-body">
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>

                </div>
                <div className="project-contribution">
                  <p className="project-stack">{project.stack}</p>
                  <h4>My contribution</h4>
                  <p>{project.contribution}</p>
                  <p className="private-note">
                    <Lock /> {project.note}
                  </p>
                </div>
                <div className="project-proof">
                  <figure>
                    <a href={assetPath(project.preview.image)} target="_blank" rel="noopener noreferrer" aria-label={`Open larger screenshot: ${project.preview.caption} (new tab)`}>
                      <Image
                        src={assetPath(project.preview.image)}
                        alt={project.preview.alt}
                        width={1280}
                        height={720}
                        sizes="(max-width: 700px) calc(100vw - 76px), (max-width: 1000px) 55vw, 600px"
                        loading="lazy"
                      />
                    </a>
                    <figcaption>
                      <span>{project.preview.caption}</span>
                      <span>Fictional test data · Select image to enlarge <Arrow diagonal /></span>
                    </figcaption>
                  </figure>
                  <div className="project-proof-copy">
                    <h4>What the system supports</h4>
                    <ul>{project.preview.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
                    <p>{project.preview.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <FullWalkthrough />
          <div className="work-note">
            <p className="eyebrow">A lesson I carried forward</p>
            <p>
              Working on E-Bidding taught me to define development stages and
              goals more clearly before using AI tools. I brought that fuller
              workflow planning into the shipment-tracking project.
            </p>
            <a className="text-link" href={profile.github}>
              More about my work on GitHub <Arrow diagonal />
            </a>
          </div>
        </section>
        <section id="about" className="about-section">
          <div className="shell section">
            <SectionHeading
              number="02"
              label="About & toolkit"
              title="Full stack, with a pull toward the backend."
            />
            <div className="about-grid">
              <div className="about-copy">
                <p>
                  I’m a Philippines-based developer interested in the systems
                  behind everyday work: how information moves, how users get
                  things done, and where software can make a process clearer.
                </p>
                <p>
                  I’ve worked across requirements, interfaces, databases and
                  maintenance. I’m looking for a fully remote development role
                  with a Philippine or international company that hires
                  developers based here.
                </p>
              </div>
              <div className="skills-grid">
                {skills.map((skill) => (
                  <div className="skill" key={skill.title}>
                    <h3>{skill.title}</h3>
                    <p className="skill-tools">{skill.items}</p>
                    <p>{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="experience" className="shell section">
          <SectionHeading
            number="03"
            label="Experience & education"
            title="The path so far."
          />
          <div className="experience-grid">
            <div>
              <article className="timeline-item">
                <p className="eyebrow">Paid employment · June–August 2026</p>
                <h3>Management Information Systems (MIS) Assistant</h3>
                <p className="experience-company">GAKKEN Philippines</p>
                <p>
                  Full-stack work on internal business systems, including
                  development, pre-production QA, deployment, maintenance and
                  user-requested improvements.
                </p>
              </article>
              <article className="timeline-item">
                <p className="eyebrow">Internship · November 2025–May 2026</p>
                <h3>MIS Assistant Intern</h3>
                <p className="experience-company">GAKKEN Philippines</p>
                <p>
                  Supported employees with hands-on technical concerns, while
                  spending most of my internship developing systems.
                </p>
              </article>
            </div>
            <article className="education">
              <p className="eyebrow">Education · Graduated September 2026</p>
              <h3>BS Information Technology</h3>
              <p className="education-focus">Mobile & Web Applications</p>
              <p>National University Manila</p>
            </article>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="shell contact-inner">
            <div>
              <p className="eyebrow">04 · Get in touch</p>
              <h2>
                Let’s build
                <br />
                <em>something useful.</em>
              </h2>
              <p>
                I’m looking for fully remote developer opportunities.
                <br />
                Have a role or a project in mind? I’d like to hear about it.
              </p>
            </div>
            <div className="contact-details">
              <a className="email-link" href={`mailto:${profile.email}`}>
                {profile.email}
                <Arrow diagonal />
              </a>
              <CopyEmail email={profile.email} />
              <a href={assetPath(profile.resume)} className="resume-link" download>
                Download résumé (PDF) <Arrow direction="down" />
              </a>
              <div className="social-links">
                <a href={profile.github}>
                  GitHub <Arrow diagonal />
                </a>
                <a href={profile.linkedin}>
                  LinkedIn <Arrow diagonal />
                </a>
              </div>
              <p className="location">{profile.location}</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="shell footer">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#home">
          Back to top <Arrow direction="up" />
        </a>
      </footer>
    </>
  );
}


