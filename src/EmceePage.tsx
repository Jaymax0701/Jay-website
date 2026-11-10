import { useEffect, useState } from "react";
import "./emcee.css";

const packages = [
  { number: "01", name: "Church Wedding", detail: "Wedding ceremony", originalPrice: "RM400", price: "RM300", savings: "RM100" },
  { number: "02", name: "Wedding Night Reception", detail: "Evening celebration", originalPrice: "RM450", price: "RM400", savings: "RM50" },
  { number: "03", name: "Full-Day Wedding", detail: "Church ceremony + evening reception · full day", originalPrice: "RM700", price: "RM650", savings: "RM50", addOn: "Optional rehearsal session: +RM100 (one session)", featured: true },
  { number: "04", name: "Corporate Event", detail: "Dinner, launch & formal events · 4–5 hours", originalPrice: "RM700", price: "RM650", savings: "RM50" },
  { number: "05", name: "Concert & Entertainment", detail: "Concerts, showcases & entertainment events", originalPrice: "From RM700", price: "From RM650", savings: "RM50" },
  { number: "06", name: "Event Coordination", detail: "2-person team · up to 8 hours", inclusions: "Timeline preparation · vendor coordination · programme flow", price: "From RM1,500" },
];

const experiences = [
  {
    number: "01",
    category: "Festival · Large-scale audience",
    title: "Festival of Youth (FOY)",
    detail: "Emcee for two consecutive years, hosting an event with more than 5,000 attendees.",
    proof: "5,000+ attendees",
    meta: "2 consecutive years",
    style: "experience-featured",
  },
  {
    number: "02",
    category: "Corporate · Stakeholder engagement",
    title: "Bintulu Port",
    detail: "Corporate emcee for a Bintulu Port event featuring stakeholders, with a focus on clear communication and professional programme flow.",
    proof: "Corporate hosting",
    meta: "Stakeholder event",
    style: "",
  },
  {
    number: "03",
    category: "Wedding · Large reception",
    title: "Wedding Reception",
    detail: "Hosted a wedding celebration with more than 1,000 guests, balancing programme flow and audience engagement.",
    proof: "1,000+ guests",
    meta: "Wedding emcee",
    style: "",
  },
  {
    number: "04",
    category: "Celebration · Community",
    title: "Christmas & Church Dinners",
    detail: "Hosted Christmas dinner and church dinner programmes, creating a warm and engaging atmosphere for guests.",
    proof: "Community & celebrations",
    meta: "Dinner events",
    style: "",
  },
];

const whatsappLink = (message: string) =>
  `https://wa.me/60178095010?text=${encodeURIComponent(message)}`;

const generalEnquiry = whatsappLink(
  "Hi Jay! I'm interested in engaging you as an emcee. I'd like to discuss my event details and availability.",
);

export default function EmceePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Emcee & Event Hosting | Jaymaxcklien";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <main className="emcee-page" id="top">
        <header className="emcee-topbar">
          <a className="emcee-brand" href="/" aria-label="Go to home page">
            <span className="emcee-brand-mark">J.</span>
            <span>JAYMAXCKLIEN <i>/ HOST</i></span>
          </a>
          <nav className={`emcee-nav${menuOpen ? " is-open" : ""}`} aria-label="Emcee page navigation">
            <a href="/" onClick={closeMenu}>Main site</a>
            <a href="#experience" onClick={closeMenu}>Experience</a>
            <a href="#packages" onClick={closeMenu}>Packages</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>
          <a className="emcee-nav-cta" href={generalEnquiry} target="_blank" rel="noopener noreferrer">
            Book Jay <span aria-hidden="true">↗︎</span>
          </a>
          <button
            className="emcee-menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </header>

        <section className="emcee-hero" aria-label="Emcee and event hosting">
          <div className="emcee-hero-copy">
            <p className="emcee-eyebrow"><span /> BILINGUAL EVENT HOST · ENGLISH & BAHASA MALAYSIA</p>
            <h1>Own the<br /><em>moment.</em></h1>
            <p className="emcee-hero-intro">
              Confident hosting. Natural connection. A programme that flows.
              Bringing people together, one stage at a time.
            </p>
            <div className="emcee-hero-actions">
              <a className="emcee-primary-cta" href={generalEnquiry} target="_blank" rel="noopener noreferrer">
                Enquire about your event <span aria-hidden="true">↗︎</span>
              </a>
              <a className="emcee-text-link" href="#experience">Explore experience <span aria-hidden="true">↓︎</span></a>
            </div>
            <div className="emcee-hero-proof">
              <div><strong>5,000+</strong><span>FOY audience</span></div>
              <div><strong>1,000+</strong><span>Wedding guests</span></div>
              <div><strong>EN / BM</strong><span>Bilingual hosting</span></div>
            </div>
          </div>
          <div className="emcee-hero-visual">
            <div className="emcee-portrait-frame">
              <img src="/images/Profile-Photo.jpeg" alt="Jaymaxcklien portrait" />
              <div className="emcee-portrait-overlay">
                <span>THE VOICE</span>
                <strong>Behind<br />the moment.</strong>
              </div>
            </div>
            <span className="emcee-visual-index">01 — 04 / ON STAGE</span>
            <span className="emcee-vertical-note">BINTULU · SARAWAK · MALAYSIA</span>
          </div>
          <div className="emcee-hero-bottom"><span>PROFESSIONAL · APPROACHABLE · ENGAGING</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section className="emcee-intro">
          <p className="emcee-eyebrow">THE APPROACH</p>
          <div>
            <h2>Every event has a story.<br /><em>Let's give it a voice.</em></h2>
            <p>
              From large-scale youth festivals and corporate stakeholder events to weddings
              and community celebrations, I bring versatility, clear communication and
              attentive programme management to every hosting opportunity.
            </p>
          </div>
        </section>

        <section className="emcee-experience" id="experience">
          <div className="emcee-section-heading">
            <div><p className="emcee-eyebrow">SELECTED EXPERIENCE</p><h2>Moments <em>hosted.</em></h2></div>
            <p>Different rooms. Different audiences.<br />One commitment to a memorable event.</p>
          </div>
          <div className="emcee-experience-grid">
            {experiences.map((item) => (
              <article className={`emcee-experience-card ${item.style}`} key={item.number}>
                <div className="emcee-experience-card-top"><span>{item.number} / EXPERIENCE</span><span aria-hidden="true">↗︎</span></div>
                <div className="emcee-experience-card-content">
                  <p className="emcee-experience-category">{item.category}</p>
                  <h3>{item.title}</h3>
                  <p className="emcee-experience-detail">{item.detail}</p>
                </div>
                <div className="emcee-experience-proof"><strong>{item.proof}</strong><span>{item.meta}</span></div>
              </article>
            ))}
          </div>
          <p className="emcee-experience-note">Experience highlights are presented by event type. Additional event photographs and video highlights can be added as approved media becomes available.</p>
        </section>

        <section className="emcee-services">
          <div className="emcee-services-heading">
            <p className="emcee-eyebrow">HOSTING THAT FITS THE ROOM</p>
            <h2>One host.<br /><em>Many occasions.</em></h2>
          </div>
          <div className="emcee-service-list">
            <div><span>01</span><strong>Corporate & stakeholder events</strong><span>Formal · Professional</span></div>
            <div><span>02</span><strong>Weddings & receptions</strong><span>Personal · Celebratory</span></div>
            <div><span>03</span><strong>Festivals & concerts</strong><span>Energetic · Engaging</span></div>
            <div><span>04</span><strong>Church & community programmes</strong><span>Warm · Inclusive</span></div>
            <div><span>05</span><strong>Dinners & special occasions</strong><span>Relaxed · Memorable</span></div>
          </div>
        </section>

        <section className="emcee-pricing" id="packages">
          <div className="emcee-section-heading">
            <div><p className="emcee-eyebrow">WEDDING & EVENT HOSTING RATES</p><h2>Choose your <em>occasion.</em></h2></div>
            <p>Clear starting rates for your event.<br />Let's talk about the details.</p>
          </div>
          <div className="emcee-package-list">
            {packages.map((item) => (
              <article className={`emcee-package${item.featured ? " emcee-package-featured" : ""}`} key={item.number}>
                <div className="emcee-package-top">
                  <span className="emcee-package-number">{item.number} / PACKAGE</span>
                  {item.featured && <span className="emcee-best-value">POPULAR</span>}
                </div>
                <p className="emcee-package-detail">{item.detail}</p>
                <h3>{item.name}</h3>
                {"inclusions" in item && <p className="emcee-package-inclusions">{item.inclusions}</p>}
                <div className="emcee-price-block">
                  {"originalPrice" in item && <span className="emcee-original-price">Was {item.originalPrice}</span>}
                  <div className="emcee-price">{item.price}<span> / event</span></div>
                  {"savings" in item && <span className="emcee-special-rate">SPECIAL RATE · SAVE {item.savings}</span>}
                  {"addOn" in item && <p className="emcee-package-inclusions">{item.addOn}</p>}
                </div>
                <a
                  className="emcee-package-cta"
                  href={whatsappLink(
                    "originalPrice" in item
                      ? `Hi Jay! I'm interested in the ${item.name} package (${item.price}, reduced from ${item.originalPrice}).${"addOn" in item ? " I would also like to ask about the optional RM100 rehearsal session." : ""} My event date is [date] and the venue is [location]. Could you let me know your availability?`
                      : `Hi Jay! I'm interested in Event Coordination at ${item.price}. My event date is [date] and the venue is [location]. Could you share more details and let me know your availability?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquire about package <span aria-hidden="true">↗︎</span>
                </a>
              </article>
            ))}
          </div>
          <p className="emcee-pricing-note">
            Wedding emcee promotional rates: Church Wedding RM300 (was RM400), Wedding Night Reception RM400 (was RM450), and Full-Day Wedding RM650 (was RM700) — save RM100, RM50 and RM50 respectively. The Full-Day Wedding package covers both the church ceremony and evening reception. One optional rehearsal session is RM100; additional sessions are quoted separately. Corporate, concert and entertainment rates retain their RM50 promotional reduction; concert rates may vary with event duration and scope. Event Coordination is offered as one package from RM1,500, with a two-person team for up to 8 hours, covering timeline preparation, vendor coordination and programme flow. Additional hours, travel or accommodation, if required, will be quoted separately.
          </p>
        </section>

        <footer className="emcee-footer" id="contact">
          <p className="emcee-eyebrow">HAVE AN EVENT COMING UP?</p>
          <h2>Make it a moment<br /><em>worth remembering.</em></h2>
          <p>Tell me what you're planning. Let's make sure the programme, the people and the energy come together.</p>
          <a className="emcee-primary-cta" href={generalEnquiry} target="_blank" rel="noopener noreferrer">
            Let's talk about your event <span aria-hidden="true">↗︎</span>
          </a>
          <div className="emcee-footer-bottom">
            <a className="emcee-brand" href="/"><span className="emcee-brand-mark">J.</span><span>JAYMAXCKLIEN <i>/ HOST</i></span></a>
            <span>EVENT HOST & EMCEE · ENGLISH / BAHASA MALAYSIA</span>
            <a href="#top">Back to top ↑︎</a>
          </div>
        </footer>
      </main>
      <a className="emcee-floating-book" href={generalEnquiry} target="_blank" rel="noopener noreferrer" aria-label="Book Jay as an emcee on WhatsApp">
        <span>BOOK JAY</span><span className="emcee-floating-book-arrow" aria-hidden="true">↗︎</span>
      </a>
    </>
  );
}
