import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="bg-blob about-blob-one" />
      <div className="bg-blob about-blob-two" />

      <Reveal className="wrap about-grid">
        <div className="about-copy">
          <span className="eyebrow">About Me</span>
          <h2>Early-career, seriously building.</h2>

          <p>
            I&apos;m a second-year BSc (Hons) Computer Science with Artificial
            Intelligence student, studying through Sunway College Kathmandu and
            Birmingham City University. I learn by building complete products,
            deploying them, and increasing the difficulty each time — not by
            watching tutorials.
          </p>

          <p>
            My path runs from mathematics through machine learning and deep
            learning toward AI engineering and production AI systems. Three
            portfolio projects mark the progress so far.
          </p>
        </div>

        <div className="fact-cards">
          <div className="fact-card">
            <span className="k">Studying</span>
            <p className="v">BSc (Hons) Computer Science with AI</p>
          </div>

          <div className="fact-card">
            <span className="k">Based In</span>
            <p className="v">Kathmandu, Nepal — working remote</p>
          </div>

          <div className="fact-card">
            <span className="k">Focused On</span>
            <p className="v">Full-stack engineering → AI/ML engineering</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}