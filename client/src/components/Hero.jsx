import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import profilePhoto from "../assets/profile.jpeg";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";

function Stat({ target, label }) {
  const [ref, isVisible] = useInView({ threshold: 0.5, once: true });
  const count = useCountUp(target, 850, isVisible);

  return (
    <div className="stat" ref={ref}>
      <div className="num">{count}</div>
      <div className="lab">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <div className="wrap hero-grid">
        <div className="hero-content">
          <div className="hero-greeting">
            <span className="wave">👋</span>
            Hi, I&apos;m Swarup Ghorsaine
          </div>

          <h1>
            Full-Stack Builder <br />
            &amp; <span className="accent">AI Engineer</span> in Progress
          </h1>

          <p className="hero-sub">
            Computer Science student in Nepal building complete, working
            software products — while going deeper into machine learning and AI
            engineering, one project at a time.
          </p>

          <div className="hero-actions">
            <a className="btn-pill" href="#contact">
              Get In Touch
            </a>

            <a className="btn-ghost" href="#projects">
              <span className="arrow-circ">↓</span>
              View My Work
            </a>
          </div>

          <div className="hero-social">
            <p>Find me on:</p>

            <div className="social-row">
              <a
                className="social-icon"
                href="https://www.facebook.com/swarup.ghorsaine"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                className="social-icon"
                href="https://www.instagram.com/swarupp_g/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                className="social-icon"
                href="https://wa.me/9779765958726"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <FaWhatsapp />
              </a>

              <a
                className="social-icon"
                href="https://github.com/ghorsaineswarup"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <FaGithub />
              </a>

              <a
                className="social-icon"
                href="https://www.linkedin.com/in/swarup-ghorsaine-7397712b7/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

              <a
                className="social-icon"
                href="mailto:ghorsaineswarup25@gmail.com"
                aria-label="Email"
                title="Email"
              >
                <HiOutlineMail />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="floating-badge badge-left">
            <span className="pulse-dot" />
            Open to freelance work
          </div>

          <div className="floating-badge badge-right">
            🎓 2nd Year, CS + AI
          </div>

          <div className="hero-orbit-label" aria-hidden="true">
            BUILD
            <br />•<br />
            LEARN
          </div>

          <div className="blob-ring" />

          <div className="photo-frame">
            <img src={profilePhoto} alt="Swarup Ghorsaine" />
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="stats-strip">
          <Stat target={3} label="Projects Shipped" />

          <div className="stat">
            <div className="num">2nd</div>
            <div className="lab">Year, CS with AI</div>
          </div>

          <div className="stat">
            <div className="num">1–2h</div>
            <div className="lab">Built Daily, Remote</div>
          </div>

          <div className="stat">
            <div className="num">NPR</div>
            <div className="lab">Open for Freelance</div>
          </div>
        </div>
      </div>
    </section>
  );
}
