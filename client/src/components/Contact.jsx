import { useState } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { sendContactMessage } from "../lib/api";
import Reveal from "./Reveal";

const initialForm = {
  name: "",
  email: "",
  message: "",
  website: ""
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await sendContactMessage(form);

      setStatus({
        type: "success",
        message: "Thanks — your message has been sent. I’ll get back to you soon."
      });

      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Your message could not be sent. Please try again."
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="contact-outer">
      <div className="wrap">
        <Reveal>
          <div className="contact-section">
            <span className="eyebrow contact-eyebrow">Get In Touch</span>

            <h2>Let&apos;s build something together.</h2>

            <p>
              Open to freelance work, internships, and collaboration. Reach out
              on whichever channel is easiest for you.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  Name
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>

              <label>
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me a little about what you want to build."
                  rows="5"
                  required
                />
              </label>

              <div className="honeypot-field" aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </label>
              </div>

              <button
                className="btn-pill contact-submit"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send Message"}
              </button>

              {status.message && (
                <p className={`form-status ${status.type}`} aria-live="polite">
                  {status.message}
                </p>
              )}
            </form>

            <div className="contact-social">
              <a
                href="https://www.facebook.com/swarup.ghorsaine"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <FaFacebookF />
                Facebook
              </a>

              <a
                href="https://www.instagram.com/swarupp_g/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <FaInstagram />
                Instagram
              </a>

              <a
                href="https://wa.me/9779765958726"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <FaWhatsapp />
                WhatsApp
              </a>

              <a
                href="https://github.com/ghorsaineswarup"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <FaGithub />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/swarup-ghorsaine-7397712b7/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedinIn />
                LinkedIn
              </a>

              <a
                href="mailto:ghorsaineswarup25@gmail.com"
                aria-label="Email"
                title="Email"
              >
                <HiOutlineMail />
                Email
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
