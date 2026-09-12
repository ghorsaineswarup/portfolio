import { FaGithub } from "react-icons/fa";
import Reveal from "./Reveal";

const learningItems = [
  ["Mathematics", "Probability & statistics"],
  ["AI", "Machine learning / deep learning"],
  ["Engineering", "Backend architecture & production systems"],
  ["Current Project", "Norhta"]
];

export default function Learning() {
  return (
    <section className="learning-section">
      <div className="wrap split">
        <Reveal>
          <article className="split-panel">
            <span className="eyebrow">Currently Learning</span>
            <h2>Live, not static.</h2>

            <div className="learning-list">
              {learningItems.map(([label, value]) => (
                <div className="learning-item" key={label}>
                  <span className="k">{label}</span>
                  <p className="v">{value}</p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={120}>
          <article className="split-panel">
            <span className="eyebrow">Building In Public</span>
            <h2>I document as I work.</h2>

            <p className="panel-copy">
              Projects, experiments, and mistakes — tracked on GitHub as I work
              toward becoming an AI engineer.
            </p>

            <a
              className="btn-pill github-btn"
              href="https://github.com/ghorsaineswarup"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
              View GitHub
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}