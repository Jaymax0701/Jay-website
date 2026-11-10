import { useEffect, useRef, useState, type PointerEvent } from "react";
import "./emcee.css";

const packages = [
  {
    number: "01",
    name: "Church Wedding",
    detail: "Wedding ceremony",
    originalPrice: "RM400",
    price: "RM250",
    savings: "RM150",
  },
  {
    number: "02",
    name: "Wedding Night Reception",
    detail: "Evening celebration",
    originalPrice: "RM450",
    price: "RM300",
    savings: "RM150",
  },
  {
    number: "03",
    name: "Full-Day Wedding",
    detail: "Church ceremony + evening reception · full day",
    originalPrice: "RM700",
    price: "RM550",
    savings: "RM150",
    addOn: "Optional rehearsal session: +RM100 (one session)",
    featured: true,
  },
  {
    number: "04",
    name: "Corporate Event",
    detail: "Dinner, launch & formal events · 4–5 hours",
    originalPrice: "RM700",
    price: "RM650",
    savings: "RM50",
  },
  {
    number: "05",
    name: "Concert & Entertainment",
    detail: "Concerts, showcases & entertainment events",
    originalPrice: "From RM700",
    price: "From RM650",
    savings: "RM50",
  },
  {
    number: "06",
    name: "Wedding Day Coordination",
    detail: "2-person team · up to 8 hours",
    inclusions: "Timeline preparation · vendor coordination · programme flow",
    price: "RM1,200",
  },
];

const whatsappLink = (message: string) =>
  `https://wa.me/60178095010?text=${encodeURIComponent(message)}`;

const generalEnquiry = whatsappLink(
  "Hi Jay! I'm interested in engaging you as an emcee. I'd like to discuss my event details and availability.",
);

export default function EmceePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orbitRotation, setOrbitRotation] = useState({ x: -8, y: 0 });
  const orbitDrag = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startRotationX: number;
    startRotationY: number;
  } | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Emcee & Event Hosting | Jaymaxcklien";
    return () => {
      document.title = previousTitle;
    };
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
    <main className="emcee-page" id="top">
      <header className="emcee-topbar">
        <a className="emcee-brand" href="/" aria-label="Go to home page">
          <span className="emcee-brand-mark">J.</span>
          <span>JAYMAXCKLIEN</span>
        </a>

        <nav className={`emcee-nav${menuOpen ? " is-open" : ""}`} aria-label="Emcee page navigation">
          <a href="/" onClick={closeMenu}>Home</a>
          <a href="#packages" onClick={closeMenu}>Packages</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <a className="emcee-nav-cta" href={generalEnquiry} target="_blank" rel="noopener noreferrer">
          Book an emcee <span aria-hidden="true">↗︎</span>
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
          <p className="emcee-eyebrow"><span /> BILINGUAL EVENT HOSTING</p>
          <h1>Emcee &<br /><em>Event Hosting.</em></h1>
          <p className="emcee-hero-subtitle">English · Bahasa Malaysia</p>
          <a className="emcee-primary-cta" href="#packages">
            View packages <span aria-hidden="true">↓︎</span>
          </a>
        </div>

        <div className="emcee-sphere-wrap">
          <div
            className="orbit-art emcee-sphere"
            role="group"
            aria-label="Interactive three-dimensional sphere. Move your pointer to tilt it, or drag to rotate."
            onPointerDown={handleOrbitPointerDown}
            onPointerMove={handleOrbitPointerMove}
            onPointerUp={handleOrbitPointerUp}
            onPointerCancel={handleOrbitPointerUp}
            onPointerLeave={handleOrbitPointerLeave}
            style={{ transform: `perspective(900px) rotateX(${orbitRotation.x}deg) rotateY(${orbitRotation.y}deg)` }}
          >
            <div className="orbit-depth">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit-core">J<span>.</span></div>
              <span className="orbit-label label-one">SYSTEMS</span>
              <span className="orbit-label label-two">PEOPLE</span>
              <span className="orbit-label label-three">IDEAS</span>
            </div>
            <span className="orbit-hint">DRAG TO EXPLORE · MOVE TO TILT</span>
          </div>
        </div>
      </section>

      <section className="emcee-pricing" id="packages">
        <div className="emcee-section-heading">
          <p className="emcee-eyebrow">WEDDING & EVENT HOSTING RATES</p>
          <h2>Packages & <em>pricing.</em></h2>
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
              {"inclusions" in item && (
                <p className="emcee-package-inclusions">{item.inclusions}</p>
              )}
              <div className="emcee-price-block">
                {"originalPrice" in item && (
                  <span className="emcee-original-price">Was {item.originalPrice}</span>
                )}
                <div className="emcee-price">{item.price}<span> / event</span></div>
                {"savings" in item && (
                  <span className="emcee-special-rate">SPECIAL RATE · SAVE {item.savings}</span>
                )}
                {"addOn" in item && (
                  <p className="emcee-package-inclusions">{item.addOn}</p>
                )}
              </div>
              <a
                className="emcee-package-cta"
                href={whatsappLink(
                  "originalPrice" in item
                    ? `Hi Jay! I'm interested in the ${item.name} package (${item.price}, reduced from ${item.originalPrice}).${"addOn" in item ? " I would also like to ask about the optional RM100 rehearsal session." : ""} My event date is [date] and the venue is [location]. Could you let me know your availability?`
                    : `Hi Jay! I'm interested in Wedding Day Coordination at ${item.price}. My event date is [date] and the venue is [location]. Could you share more details and let me know your availability?`,
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
          Wedding emcee promotional rates: Church Wedding RM250 (was RM400), Wedding Night Reception RM300 (was RM450), and Full-Day Wedding RM550 (was RM700) — save RM150 on each package. The Full-Day Wedding package covers both the church ceremony and evening reception. One optional rehearsal session is RM100; additional sessions are quoted separately. Corporate, concert and entertainment rates retain their RM50 promotional reduction; concert rates may vary with event duration and scope. Wedding Day Coordination is a separate service with a two-person team for up to 8 hours, covering timeline preparation, vendor coordination and programme flow. Additional hours, travel or accommodation, if required, will be quoted separately.
        </p>
      </section>

      <footer className="emcee-footer" id="contact">
        <div>
          <p className="emcee-eyebrow">HAVE AN EVENT COMING UP?</p>
          <h2>Let's make it <em>memorable.</em></h2>
        </div>
        <a className="emcee-primary-cta" href={generalEnquiry} target="_blank" rel="noopener noreferrer">
          Enquire on WhatsApp <span aria-hidden="true">↗︎</span>
        </a>
        <div className="emcee-footer-bottom">
          <a className="emcee-brand" href="/"><span className="emcee-brand-mark">J.</span><span>JAYMAXCKLIEN</span></a>
          <span>EVENT HOST & EMCEE · ENGLISH / BAHASA MALAYSIA</span>
          <a href="#top">Back to top ↑︎</a>
        </div>
      </footer>
    </main>
    <a className="emcee-floating-book" href={generalEnquiry} target="_blank" rel="noopener noreferrer" aria-label="Book an emcee on WhatsApp">
      <span>BOOK AN EMCEE</span><span className="emcee-floating-book-arrow" aria-hidden="true">↗︎</span>
    </a>
    </>
  );
}
