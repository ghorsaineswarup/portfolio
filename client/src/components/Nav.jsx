import { useEffect, useState } from "react";

const links = [
  ["about", "About"],
  ["projects", "Projects"],
  ["journey", "Journey"],
  ["skills", "Skills"],
  ["contact", "Contact"]
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    function updateActiveSection() {
      const current = links.find(([id]) => {
        const section = document.getElementById(id);
        if (!section) return false;

        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.45 && rect.bottom >= 120;
      });

      if (current) setActiveSection(current[0]);
    }

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();

    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-brand" href="#hero" onClick={closeMenu}>
          <span className="dot-logo">S</span>
          Swarup
        </a>

        <div className="nav-links">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "active" : ""}
            >
              {label}
            </a>
          ))}
        </div>

        <a className="nav-cta" href="#contact">
          Let&apos;s talk
        </a>

        <button
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}