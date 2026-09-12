import Reveal from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Mathematics",
    text: "Linear algebra, calculus, probability, statistics, optimization"
  },
  {
    number: "02",
    title: "Machine Learning",
    text: "Supervised & unsupervised learning, model evaluation"
  },
  {
    number: "03",
    title: "Deep Learning",
    text: "Neural networks, PyTorch, TensorFlow, transformers — here now",
    current: true
  },
  {
    number: "04",
    title: "AI Engineering",
    text: "LLM apps, RAG, AI agents, tool use, MLOps"
  },
  {
    number: "05",
    title: "Production AI",
    text: "Scalable, reliable, monitored AI systems"
  }
];

export default function Journey() {
  return (
    <section id="journey" className="journey-section">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Building Toward AI Engineering</span>
          <h2>The road ahead.</h2>
          <p>This is direction, not a finished destination — I&apos;m partway through.</p>
        </Reveal>

        <div className="journey-grid">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 80}>
              <article className={`journey-step ${step.current ? "current" : ""}`}>
                <span className="step-num">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}