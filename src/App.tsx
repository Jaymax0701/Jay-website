import { useEffect, useRef, useState, type PointerEvent } from "react";
import SectionHeading from "./components/SectionHeading";
import ProjectCard from "./components/ProjectCard";
import RepositoryGrid from "./components/RepositoryGrid";
import {
  profile, pillars, featuredProjects, experience, speakingCategories, skills
} from "./data/profile";


const leadershipPhotos = [
  {
    src: "/images/leadership/elc-leadership.jpg",
    alt: "Official Emerging Leader Club leadership photograph",
    title: "Emerging Leader Club",
    label: "LEADERSHIP",
  },
  {
    src: "/images/leadership/leadership-in-action.jpg",
    alt: "Leading and facilitating an event",
    title: "Leadership in Action",
    label: "COLLABORATION",
  },
  {
    src: "/images/leadership/public-speaking.jpg",
    alt: "Public speaking and event hosting",
    title: "Public Speaking",
    label: "COMMUNICATION",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLeadershipPhoto, setActiveLeadershipPhoto] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const schedulerRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef(0);
  const stepRef = useRef(0);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [glider, setGlider] = useState({ left: 0, width: 0, visible: false });
  const navRef = useRef<HTMLElement>(null);
  const [flippedPillars, setFlippedPillars] = useState<string[]>([]);
  const [orbitRotation, setOrbitRotation] = useState({ x: -8, y: 0 });
  const orbitDrag = useRef<{ pointerId: number; startX: number; startY: number; startRotationX: number; startRotationY: number } | null>(null);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 80);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const sectionIds = ["about", "technology", "leadership", "speaking", "contact"];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => section !== null);
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-32% 0px -52% 0px", threshold: [0, 0.15, 0.35, 0.6] });
    sections.forEach((section) => observer.observe(section));
    const handleTop = () => { if (window.scrollY < 120) setActiveSection("about"); };
    window.addEventListener("scroll", handleTop, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", handleTop); };
  }, []);

  useEffect(() => {
    const updateGlider = () => {
      const nav = navRef.current;
      const activeLink = nav?.querySelector<HTMLAnchorElement>(`a[data-section="${activeSection}"]`);
      if (!nav || !activeLink || window.matchMedia("(max-width: 850px)").matches) {
        setGlider((current) => ({ ...current, visible: false }));
        return;
      }

      // Measure both elements in the same viewport coordinate system.
      // This avoids offsetLeft including the nav's own padding and shifting the glider.
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setGlider({
        left: linkRect.left - navRect.left - nav.clientLeft,
        width: linkRect.width,
        visible: true,
      });
    };
    updateGlider();
    window.addEventListener("resize", updateGlider);
    return () => window.removeEventListener("resize", updateGlider);
  }, [activeSection]);

  useEffect(() => {
    const revealTargets = document.querySelectorAll(
      ".hero .eyebrow, .hero h1, .hero-description, .hero-actions, .hero-aside, .section-heading, .intro-grid > div, .intro-portrait-wrap, .pillar-card, .project-card, .tech-note, .repo-card, .leadership-statement, .experience-item, .speaking-card, .journey-item, .skills-copy, .skills-list, .contact-inner > *"
    );

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-revealed", entry.isIntersecting);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    revealTargets.forEach((element) => {
      element.classList.add("scroll-reveal");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
  const closeMenu = () => setMenuOpen(false);
  const stopMusic = () => {
    if (schedulerRef.current !== null) window.clearInterval(schedulerRef.current);
    schedulerRef.current = null;
    void audioContextRef.current?.suspend();
    setMusicPlaying(false);
  };
  const toggleMusic = async () => {
    if (musicPlaying) {
      stopMusic();
      return;
    }

    const AudioContextConstructor = window.AudioContext;
    if (!AudioContextConstructor) return;
    const context = audioContextRef.current ?? new AudioContextConstructor();
    audioContextRef.current = context;
    await context.resume();

    if (!noiseBufferRef.current) {
      const buffer = context.createBuffer(1, context.sampleRate, context.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
      noiseBufferRef.current = buffer;
    }

    const bpm = 140;
    const stepDuration = 60 / bpm / 4;
    const noise = noiseBufferRef.current;
    if (!noise) return;
    const masterGain = context.createGain();
    masterGain.gain.value = 0.58;
    masterGain.connect(context.destination);
    const makeKick = (time: number) => {
      const osc = context.createOscillator();
      const amp = context.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(145, time);
      osc.frequency.exponentialRampToValueAtTime(48, time + 0.13);
      amp.gain.setValueAtTime(0.82, time);
      amp.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
      osc.connect(amp).connect(masterGain);
      osc.start(time);
      osc.stop(time + 0.23);
    };
    const makeNoiseHit = (time: number, highpass: number, level: number, decay: number) => {
      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const amp = context.createGain();
      source.buffer = noise;
      filter.type = "highpass";
      filter.frequency.value = highpass;
      amp.gain.setValueAtTime(level, time);
      amp.gain.exponentialRampToValueAtTime(0.001, time + decay);
      source.connect(filter).connect(amp).connect(masterGain);
      source.start(time);
      source.stop(time + decay + 0.01);
    };
    const makeBass = (time: number, note: number) => {
      const osc = context.createOscillator();
      const filter = context.createBiquadFilter();
      const amp = context.createGain();
      osc.type = "sawtooth";
      osc.frequency.value = 55 * Math.pow(2, note / 12);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(520, time);
      filter.frequency.exponentialRampToValueAtTime(145, time + 0.16);
      amp.gain.setValueAtTime(0.0001, time);
      amp.gain.linearRampToValueAtTime(0.2, time + 0.012);
      amp.gain.exponentialRampToValueAtTime(0.001, time + 0.19);
      osc.connect(filter).connect(amp).connect(masterGain);
      osc.start(time);
      osc.stop(time + 0.2);
    };
    const makeStab = (time: number) => {
      [0, 3, 7].forEach((semitone) => {
        const osc = context.createOscillator();
        const filter = context.createBiquadFilter();
        const amp = context.createGain();
        osc.type = "square";
        osc.frequency.value = 110 * Math.pow(2, semitone / 12);
        filter.type = "lowpass";
        filter.frequency.value = 1250;
        amp.gain.setValueAtTime(0.0001, time);
        amp.gain.linearRampToValueAtTime(0.045, time + 0.012);
        amp.gain.exponentialRampToValueAtTime(0.001, time + 0.24);
        osc.connect(filter).connect(amp).connect(masterGain);
        osc.start(time);
        osc.stop(time + 0.25);
      });
    };

    const scheduleStep = (step: number, time: number) => {
      if (step % 4 === 0) makeKick(time);
      if (step === 4 || step === 12) makeNoiseHit(time, 1500, 0.2, 0.16);
      if (step % 2 === 0) makeNoiseHit(time, step === 14 ? 6500 : 8200, step === 14 ? 0.13 : 0.055, step === 14 ? 0.22 : 0.045);
      const bassNotes: (number | null)[] = [0, null, 0, 7, 3, null, 10, null, 0, null, 0, 7, 3, null, 5, null];
      const note = bassNotes[step];
      if (note !== null) makeBass(time, note);
      if (step === 0 || step === 8) makeStab(time);
    };

    stepRef.current = 0;
    nextNoteTimeRef.current = context.currentTime + 0.06;
    const scheduler = () => {
      while (nextNoteTimeRef.current < context.currentTime + 0.12) {
        scheduleStep(stepRef.current, nextNoteTimeRef.current);
        nextNoteTimeRef.current += stepDuration;
        stepRef.current = (stepRef.current + 1) % 16;
      }
    };
    scheduler();
    schedulerRef.current = window.setInterval(scheduler, 25);
    setMusicPlaying(true);
  };
  useEffect(() => () => {
    if (schedulerRef.current !== null) window.clearInterval(schedulerRef.current);
    void audioContextRef.current?.close();
  }, []);
  const handleOrbitPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    orbitDrag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startRotationX: orbitRotation.x,
      startRotationY: orbitRotation.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handleOrbitPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = orbitDrag.current;
    if (drag && drag.pointerId === event.pointerId) {
      setOrbitRotation({
        x: Math.max(-32, Math.min(32, drag.startRotationX - (event.clientY - drag.startY) * 0.35)),
        y: Math.max(-38, Math.min(38, drag.startRotationY + (event.clientX - drag.startX) * 0.35)),
      });
      return;
    }
    if (event.pointerType === "mouse") {
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      setOrbitRotation({ x: -y * 18, y: x * 22 });
    }
  };
  const handleOrbitPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (orbitDrag.current?.pointerId === event.pointerId) orbitDrag.current = null;
  };
  const handleOrbitPointerLeave = () => {
    if (!orbitDrag.current) setOrbitRotation({ x: -8, y: 0 });
  };
  const navItems = [
    ["About", "#about"], ["Technology", "#technology"], ["Leadership", "#leadership"],
    ["Speaking", "#speaking"], ["Contact", "#contact"],
  ];

  return (
    <>
    <div className="site-shell">
      <header className={`site-header${isScrolled || menuOpen ? " is-visible" : ""}`}>
        <a className="wordmark" href="#top" aria-label="Jaymaxcklien home">
          <span className="wordmark-mark">J.</span><span>JAYMAXCKLIEN</span>
        </a>
        <nav ref={navRef} className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <span
            className={`nav-glider${glider.visible ? " is-ready" : ""}`}
            style={{ width: `${glider.width}px`, transform: `translateX(${glider.left}px)` }}
            aria-hidden="true"
          />
          {navItems.map(([label, href]) => {
            const section = href.slice(1);
            const isActive = activeSection === section;
            return (
              <a
                href={href}
                key={href}
                data-section={section}
                className={isActive ? "is-active" : undefined}
                onClick={closeMenu}
                aria-current={isActive ? "location" : undefined}
              >
                {label}
              </a>
            );
          })}
          <a className="nav-cta" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <button
          className={`music-toggle${musicPlaying ? " is-playing" : ""}`}
          type="button"
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Pause website music" : "Play website music"}
          aria-pressed={musicPlaying}
          title={musicPlaying ? "Pause 140 BPM techno" : "Play 140 BPM techno"}
        >
          <span aria-hidden="true">{musicPlaying ? "Ⅱ" : "▶"}</span>
        </button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> {profile.location} · PERSONAL PORTFOLIO
            </p>
            <h1>
              Technology.<br /><em>Leadership.</em><br />Communication.
            </h1>
            <p className="hero-description">
              {profile.intro}
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#technology">Explore my work</a>
              <a className="button button-quiet" href="#about">A little about me</a>
            </div>
          </div>
          <aside className="hero-aside">
            <div className="hero-aside-top"><span>THREE DIMENSIONS</span><span>EST. 2026</span></div>
            <div
              className="orbit-art"
              role="group"
              aria-label="Interactive three-dimensional orbit. Move your pointer to tilt it, or drag to rotate."
              onPointerDown={handleOrbitPointerDown}
              onPointerMove={handleOrbitPointerMove}
              onPointerUp={handleOrbitPointerUp}
              onPointerCancel={handleOrbitPointerUp}
              onPointerLeave={handleOrbitPointerLeave}
              style={{ transform: `perspective(900px) rotateX(${orbitRotation.x}deg) rotateY(${orbitRotation.y}deg)` }}
            >
              <div className="orbit-depth">
                <div className="orbit orbit-one" /><div className="orbit orbit-two" />
                <div className="orbit-core">J<span>.</span></div>
                <span className="orbit-label label-one" title="Systems thinking and technology">SYSTEMS</span>
                <span className="orbit-label label-two" title="Leadership and people">PEOPLE</span>
                <span className="orbit-label label-three" title="Ideas, creativity and communication">IDEAS</span>
              </div>
              <span className="orbit-hint">DRAG TO EXPLORE · MOVE TO TILT</span>
            </div>
            <div className="hero-aside-bottom"><span>CURIOUS BY NATURE</span><span>IMPACT BY DESIGN</span></div>
          </aside>
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
            <div className="intro-portrait-wrap">
              <img className="intro-portrait" src="/images/Profile-Photo.jpeg" alt="Portrait photograph" loading="lazy" />
              <span className="intro-portrait-glow" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="section-wrap pillar-section">
          <SectionHeading number="01" eyebrow="THE THREE PILLARS" title="What I bring to the table." description="A combination of analytical thinking, people leadership and confident communication." />
          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.number}>
                <div className={`pillar-card-inner${flippedPillars.includes(pillar.number) ? " is-flipped" : ""}`}>
                  <div className="pillar-face pillar-front">
                    <div className="pillar-top"><span>{pillar.number} / 03</span><span>01</span></div>
                    <div className="pillar-face-content">
                      <h3>{pillar.title}</h3>
                      <p className="pillar-subtitle">{pillar.subtitle}</p>
                      <p className="pillar-summary">{pillar.description}</p>
                    </div>
                    <button
                      className="pillar-flip-button"
                      type="button"
                      aria-pressed={flippedPillars.includes(pillar.number)}
                      aria-label={`Read more about ${pillar.title}`}
                      onClick={() => setFlippedPillars((current) => current.includes(pillar.number) ? current.filter((number) => number !== pillar.number) : [...current, pillar.number])}
                    >Read more <span aria-hidden="true">↗</span></button>
                  </div>
                  <div className="pillar-face pillar-back">
                    <div className="pillar-top"><span>{pillar.number} / 03</span><span>DETAILS</span></div>
                    <div className="pillar-face-content">
                      <h3>{pillar.title}</h3>
                      <p className="pillar-subtitle">{pillar.subtitle}</p>
                      <p className="pillar-detail">
                        {pillar.number === "01" && "Connecting business needs with technology through system analysis, enterprise applications, process improvement, data and digital solutions."}
                        {pillar.number === "02" && "Building alignment, organising initiatives and helping people contribute their strengths towards a shared purpose."}
                        {pillar.number === "03" && "Making ideas clear and engaging through event hosting, public speaking, interviews and meaningful conversations."}
                      </p>
                    </div>
                    <button
                      className="pillar-flip-button"
                      type="button"
                      aria-pressed={flippedPillars.includes(pillar.number)}
                      onClick={() => setFlippedPillars((current) => current.filter((number) => number !== pillar.number))}
                    >Back <span aria-hidden="true">↶</span></button>
                  </div>
                </div>
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
              <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">All repositories</a>
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
          <div className="leadership-carousel" aria-label="Leadership photo carousel">
            <div className="leadership-carousel-track">
              {[-1, 0, 1].map((offset, position) => {
                const photoIndex = (activeLeadershipPhoto + offset + leadershipPhotos.length) % leadershipPhotos.length;
                const photo = leadershipPhotos[photoIndex];
                return (
                  <button
                    className={`leadership-photo-card${position === 1 ? " is-active" : ""}`}
                    type="button"
                    key={photo.src}
                    onClick={() => setActiveLeadershipPhoto(photoIndex)}
                    aria-label={`Show ${photo.title}`}
                    aria-pressed={position === 1}
                  >
                    <img src={photo.src} alt={photo.alt} loading="lazy" />
                    <span className="leadership-photo-shade" />
                    <span className="leadership-photo-caption">
                      <span>{photo.label}</span>
                      <strong>{photo.title}</strong>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="leadership-carousel-controls">
              <button
                type="button"
                className="leadership-carousel-arrow"
                onClick={() => setActiveLeadershipPhoto((current) => (current - 1 + leadershipPhotos.length) % leadershipPhotos.length)}
                aria-label="Previous leadership photo"
              >←</button>
              <div className="leadership-carousel-dots" aria-label="Choose a leadership photo">
                {leadershipPhotos.map((photo, index) => (
                  <button
                    type="button"
                    key={photo.src}
                    className={index === activeLeadershipPhoto ? "is-active" : ""}
                    onClick={() => setActiveLeadershipPhoto(index)}
                    aria-label={`Go to ${photo.title}`}
                    aria-pressed={index === activeLeadershipPhoto}
                  />
                ))}
              </div>
              <span className="leadership-carousel-count">{String(activeLeadershipPhoto + 1).padStart(2, "0")} / 03</span>
              <button
                type="button"
                className="leadership-carousel-arrow"
                onClick={() => setActiveLeadershipPhoto((current) => (current + 1) % leadershipPhotos.length)}
                aria-label="Next leadership photo"
              >→</button>
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
              <a className="button button-primary" href="https://wa.me/60178095010" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
              {profile.linkedin && <a className="button button-outline" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
              {profile.instagram && <a className="button button-outline" href={profile.instagram} target="_blank" rel="noreferrer">Instagram</a>}
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
    </>
  );
}
