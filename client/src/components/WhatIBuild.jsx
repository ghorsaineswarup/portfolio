import Reveal from "./Reveal";

const services = [
  {
    icon: "🤖",
    title: "AI & Machine Learning",
    text: "Building toward intelligent systems using math, classical ML, deep learning, and modern AI tooling."
  },
  {
    icon: "⚙️",
    title: "Full-Stack Applications",
    text: "Complete products — frontend, backend, APIs, databases, authentication, and deployment, end to end."
  },
  {
    icon: "✨",
    title: "AI Products & Automation",
    text: "Practical AI-powered products combining deterministic logic with model-driven personalization."
  }
];

export default function WhatIBuild() {
  return (
    <section className="build-section">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">What I Build</span>
          <h2>Three areas, one direction.</h2>
          <p>
            Everything feeds the same goal — real, deployable systems while
            going deeper into AI.
          </p>
        </Reveal>

        <div className="build-grid">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 120}>
              <article className="build-card">
                <div className="icon-circ">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}