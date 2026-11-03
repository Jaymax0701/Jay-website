import { useState, type MouseEventHandler, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown, ArrowUpRight, Menu, X
} from "lucide-react";
import SectionHeading from "./components/SectionHeading";
import ProjectCard from "./components/ProjectCard";
import RepositoryGrid from "./components/RepositoryGrid";
import {
  profile, pillars, featuredProjects, experience, speakingCategories, skills
} from "./data/profile";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

function NavLink({ href, children, onClick }: NavLinkProps) {
  return <a href={href} onClick={onClick}>{children}</a>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const navItems = [
    ["About", "#about"], ["Technology", "#technology"], ["Leadership", "#leadership"],
    ["Speaking", "#speaking"], ["Contact", "#contact"],
  ];

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Jaymaxcklien home">
          <span className="wordmark-mark">J.</span><span>JAYMAXCKLIEN</span>
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {navItems.map(([label, href]) => <NavLink href={href} key={href} onClick={closeMenu}>{label}</NavLink>)}
          <a className="nav-cta" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="status-dot" /> {profile.location} · PERSONAL PORTFOLIO
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>
              Technology.<br /><em>Leadership.</em><br />Communication.
            </motion.h1>
            <motion.p className="hero-description" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.18 }}>
              {profile.intro}
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <a className="button button-primary" href="#technology">Explore my work <ArrowUpRight size={16} /></a>
              <a className="button button-quiet" href="#about">A little about me <ArrowDown size={15} /></a>
            </motion.div>
          </div>
          <motion.aside className="hero-aside" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.18 }}>
            <div className="hero-aside-top"><span>THREE DIMENSIONS</span><span>EST. 2026</span></div>
            <div className="orbit-art" aria-hidden="true">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="orbit-core">J<span>.</span></div>
              <span className="orbit-label label-one">SYSTEMS</span><span className="orbit-label label-two">PEOPLE</span><span className="orbit-label label-three">IDEAS</span>
            </div>
            <div className="hero-aside-bottom"><span>CURIOUS BY NATURE</span><span>IMPACT BY DESIGN</span></div>
          </motion.aside>
          <div className="hero-bottomline"><span>SCROLL TO EXPLORE</span><span>01 / 03</span></div>
        </section>

        <section className="intro-strip" id="about">
          <div className="section-wrap intro-grid">
            <p className="eyebrow">A MULTIDIMENSIONAL PROFILE</p>
            <div>
              <h2>Different disciplines.<br /><span>One shared purpose.</span></h2>
              <p className="body-large">I enjoy understanding how things work, helping people move in the same direction and communicating ideas with clarity. This portfolio brings those parts of my journey together.</p>
              <p className="intro-signature">{profile.fullName} <span>· {profile.role}</span></p>
            </div>
          </div>
        </section>

        <section className="section-wrap pillar-section">
          <SectionHeading number="01" eyebrow="THE THREE PILLARS" title="What I bring to the table." description="A combination of analytical thinking, people leadership and confident communication." />
          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.number}>
                <div className="pillar-top"><span>{pillar.number}</span></div>
                <h3>{pillar.title}</h3><p className="pillar-subtitle">{pillar.subtitle}</p><p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="dark-section" id="technology">
          <div className="section-wrap">
            <SectionHeading number="02" eyebrow="TECHNOLOGY & PROJECTS" title="Turning complexity into clarity." description="Business applications, systems thinking and hands-on software projects." />
            <div className="featured-projects">
              {featuredProjects.map((project) => <ProjectCard project={project} key={project.name} />)}
              <div className="tech-note">
                <span className="note-index">PRACTICE & EXPLORATION</span>
                <h3>Always learning.<br /><em>Always building.</em></h3>
                <p>From business process analysis to software experiments, I keep exploring how technology can solve practical problems.</p>
                <div className="tag-list">{["ERP", "APIs", "Power BI", "Python", "Cybersecurity"].map((x) => <span className="tag tag-dark" key={x}>{x}</span>)}</div>
              </div>
            </div>
            <div className="repo-heading">
              <div><p className="eyebrow">FROM THE WORKBENCH</p><h3>Public GitHub repositories</h3></div>
              <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">All repositories <ArrowUpRight size={15} /></a>
            </div>
            <RepositoryGrid />
          </div>
        </section>

        <section className="section-wrap leadership-section" id="leadership">
          <SectionHeading number="03" eyebrow="LEADERSHIP & IMPACT" title="Good leadership moves people forward." description="Leadership is more than a title. It is the work of bringing people together, creating clarity and following through." />
          <div className="leadership-layout">
            <div className="leadership-statement">
              <div className="quote-mark">“</div>
              <blockquote>Leadership is measured not only by what gets done, but by who grows along the way.</blockquote>
              <span className="eyebrow">A PERSONAL LEADERSHIP BELIEF</span>
            </div>
            <div className="experience-list">
              {experience.filter((item) => item.category === "Leadership").map((item) => (
                <article className="experience-item" key={item.title}>
                  <span className="experience-period">{item.period}</span>
                  <div><h3>{item.title}</h3><p className="experience-org">{item.organisation}</p><p>{item.description}</p></div>
                </article>
              ))}
            </div>
          </div>
          <div className="leadership-footnote"><span>People · Purpose · Participation · Progress</span></div>
        </section>

        <section className="speaking-section" id="speaking">
          <div className="section-wrap">
            <SectionHeading number="04" eyebrow="EMCEE & COMMUNICATION" title="A voice that brings people together." description="From formal corporate settings to community gatherings, I enjoy creating a welcoming atmosphere and helping every programme flow with purpose." />
            <div className="speaking-grid">
              {speakingCategories.map((item, index) => (
                <article className="speaking-card" key={item.title}>
                  <div className="speaking-card-top"><span>0{index + 1}</span></div>
                  <span className="eyebrow">{item.tag}</span>
                  <h3>{item.title}</h3><p>{item.description}</p>
                  <span className="speaking-status">SELECTED HIGHLIGHTS TO BE ADDED</span>
                </article>
              ))}
            </div>
            <div className="media-note"><p>Event photographs and video highlights will be added here after selecting media that is approved for public sharing.</p></div>
          </div>
        </section>

        <section className="section-wrap journey-section" id="experience">
          <SectionHeading number="05" eyebrow="THE JOURNEY" title="A journey still in progress." description="A snapshot of the experiences shaping how I think, work and contribute." />
          <div className="journey-list">
            {experience.map((item) => (
              <article className="journey-item" key={item.title}>
                <span className="journey-period">{item.period}</span>
                <div><span className="eyebrow">{item.category}</span><h3>{item.title}</h3><p className="experience-org">{item.organisation}</p><p>{item.description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-wrap skills-section">
          <div className="skills-copy"><p className="eyebrow">CAPABILITIES</p><h2>Curiosity keeps<br /><em>the toolkit growing.</em></h2><p>Skills are tools. The real value comes from knowing when and how to use them.</p></div>
          <div className="skills-list">{skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
            <h2>Let's make<br /><em>something meaningful.</em></h2>
            <p>For professional conversations, project collaborations, speaking and emcee enquiries. I'd be glad to connect.</p>
            <div className="contact-actions">
              <a className="button button-primary" href={profile.github} target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={15} /></a>
              {profile.linkedin && <a className="button button-outline" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
              {profile.email && <a className="button button-outline" href={`mailto:${profile.email}`}>Email me</a>}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#top"><span className="wordmark-mark">J.</span><span>JAYMAXCKLIEN</span></a>
        <span>Technology. Leadership. Communication.</span>
        <span>© {new Date().getFullYear()} · Built with intention.</span>
      </footer>
    </div>
  );
}
