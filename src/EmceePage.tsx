import { useEffect } from "react";
import "./emcee.css";

const packages = [
  {
    number: "01",
    name: "Church Wedding",
    detail: "For your wedding ceremony",
    price: "RM400",
    description: "Thoughtful, warm hosting to help your ceremony flow smoothly and meaningfully.",
    includes: ["English & Bahasa Malaysia hosting", "Programme announcements and transitions", "Coordination with the programme flow"],
  },
  {
    number: "02",
    name: "Wedding Night Reception",
    detail: "For your evening celebration",
    price: "RM450",
    description: "A lively and welcoming host to guide your guests through the celebration.",
    includes: ["Guest welcome and key introductions", "Dinner programme and announcements", "Guest engagement and entertainment segments"],
  },
  {
    number: "03",
    name: "Full-Day Wedding",
    detail: "Ceremony + evening reception",
    price: "RM700",
    description: "One emcee throughout your wedding day, from the ceremony to the evening celebration.",
    includes: ["Church ceremony and night reception", "Consistent programme coordination", "Pre-event discussion and preparation"],
    featured: true,
  },
];

const whatsappLink = (message: string) => `https://wa.me/60178095010?text=${encodeURIComponent(message)}`;
const generalEnquiry = whatsappLink("Hi Jay! I'm interested in engaging you as an emcee. I'd like to discuss my event details and availability.");

export default function EmceePage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Emcee & Event Hosting | Jaymaxcklien";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="emcee-page">
      <header className="emcee-topbar">
        <a className="emcee-brand" href="/" aria-label="Back to Jaymaxcklien's portfolio">
          <span className="emcee-brand-mark">J.</span>
          <span>JAYMAXCKLIEN</span>
        </a>
        <a className="emcee-back" href="/">Main portfolio <span aria-hidden="true">↗</span></a>
      </header>

      <section className="emcee-hero">
        <div className="emcee-hero-inner">
          <p className="emcee-eyebrow"><span /> BILINGUAL EVENT HOSTING</p>
          <h1>Every moment<br /><em>deserves a voice.</em></h1>
          <p className="emcee-lead">
            Bringing people together and keeping every programme flowing — with the right energy, clarity and presence for every occasion.
          </p>
          <div className="emcee-language">
            <span>ENGLISH</span><i /> <span>BAHASA MALAYSIA</span>
          </div>
          <div className="emcee-hero-actions">
            <a className="emcee-primary-cta" href={generalEnquiry} target="_blank" rel="noopener noreferrer">Check availability <span aria-hidden="true">↗</span></a>
            <a className="emcee-secondary-cta" href="#packages">Explore packages <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="emcee-hero-orbit" aria-hidden="true">
          <div className="emcee-orbit-ring emcee-ring-one" />
          <div className="emcee-orbit-ring emcee-ring-two" />
          <div className="emcee-orbit-core">J<span>.</span></div>
          <span className="emcee-orbit-tag emcee-tag-one">CONNECT</span>
          <span className="emcee-orbit-tag emcee-tag-two">ENGAGE</span>
          <span className="emcee-orbit-tag emcee-tag-three">CELEBRATE</span>
        </div>
      </section>

      <section className="emcee-experience">
        <p className="emcee-eyebrow">VERSATILE BY NATURE</p>
        <h2>One host. <em>Many occasions.</em></h2>
        <p className="emcee-experience-copy">From professional functions to personal celebrations, I adapt my hosting style to the atmosphere, audience and purpose of your event.</p>
        <div className="emcee-event-types">
          {["Corporate functions", "Dinners & gala nights", "Church programmes", "Weddings", "Concerts", "Community events"].map((item, index) => (
            <div className="emcee-event-type" key={item}><span>0{index + 1}</span>{item}<b aria-hidden="true">↗</b></div>
          ))}
        </div>
        <div className="emcee-experience-note">
          <span className="emcee-note-mark">“</span>
          <p>Experience hosting events across corporate, church, concert, community and dinner settings, including engagements with Bintulu Port Holdings Berhad.</p>
        </div>
      </section>

      <section className="emcee-pricing" id="packages">
        <div className="emcee-section-heading">
          <p className="emcee-eyebrow">WEDDING HOSTING PACKAGES</p>
          <h2>Clear packages.<br /><em>Meaningful moments.</em></h2>
          <p>Choose the hosting arrangement that best fits your celebration.</p>
        </div>
        <div className="emcee-package-list">
          {packages.map((item) => (
            <article className={`emcee-package${item.featured ? " emcee-package-featured" : ""}`} key={item.number}>
              <div className="emcee-package-top">
                <span className="emcee-package-number">{item.number} / PACKAGE</span>
                {item.featured && <span className="emcee-best-value">BEST VALUE</span>}
              </div>
              <p className="emcee-package-detail">{item.detail}</p>
              <h3>{item.name}</h3>
              <div className="emcee-price">{item.price}<span> / event</span></div>
              <p className="emcee-package-description">{item.description}</p>
              <ul>{item.includes.map((line) => <li key={line}><span aria-hidden="true">✓</span>{line}</li>)}</ul>
              <a className="emcee-package-cta" href={whatsappLink("Hi Jay! I'm interested in the " + item.name + " package (" + item.price + "). My event date is [date] and the venue is [location]. Could you let me know your availability and the next steps?")} target="_blank" rel="noopener noreferrer">Enquire about this package <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        <p className="emcee-pricing-note">All rates are quoted in Malaysian Ringgit (RM). Final arrangements are subject to event schedule, location and programme requirements. Travel or accommodation for outstation events, if required, will be quoted separately.</p>
      </section>

      <section className="emcee-process">
        <p className="emcee-eyebrow">LET'S MAKE IT FLOW</p>
        <h2>From first hello<br /><em>to the final applause.</em></h2>
        <div className="emcee-process-steps">
          <div><span>01</span><h3>Share your plans</h3><p>Tell me your event date, location, type and programme.</p></div>
          <div><span>02</span><h3>Align the details</h3><p>We'll discuss the hosting style, programme flow and expectations.</p></div>
          <div><span>03</span><h3>Make it memorable</h3><p>Let's create a smooth, welcoming experience for you and your guests.</p></div>
        </div>
      </section>

      <footer className="emcee-footer">
        <p className="emcee-eyebrow">HAVE AN EVENT COMING UP?</p>
        <h2>Let's make your<br /><em>occasion memorable.</em></h2>
        <p>Share a few details about your event and let's talk.</p>
        <a className="emcee-primary-cta" href={generalEnquiry} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <span aria-hidden="true">↗</span></a>
        <div className="emcee-footer-bottom">
          <a className="emcee-brand" href="/"><span className="emcee-brand-mark">J.</span><span>JAYMAXCKLIEN</span></a>
          <span>EVENT HOST & EMCEE · ENGLISH / BAHASA MALAYSIA</span>
          <a href="/">Back to portfolio ↑</a>
        </div>
      </footer>
      <div className="emcee-mobile-cta" role="region" aria-label="Booking enquiry">
        <div><strong>Have an event coming up?</strong><span>Let's check availability.</span></div>
        <a href={generalEnquiry} target="_blank" rel="noopener noreferrer">Enquire <span aria-hidden="true">↗</span></a>
      </div>
    </main>
  );
}
