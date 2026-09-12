import Reveal from "./Reveal";

const skills = [
  ["Programming", ["Python", "JavaScript", "TypeScript"]],
  ["AI / ML", ["NumPy", "Pandas", "Matplotlib", "PyTorch", "TensorFlow"]],
  ["Frontend", ["HTML", "CSS", "React", "Next.js"]],
  ["Backend", ["Node.js", "Express", "REST APIs"]],
  ["Database", ["MongoDB", "PostgreSQL"]],
  ["Tools", ["Git", "GitHub", "Vercel", "Figma", "n8n"]]
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Skills</span>
          <h2>What I actually use.</h2>
          <p>No fake percentage bars — just technologies backed by real project evidence.</p>
        </Reveal>

        <div className="skills-grid">
          {skills.map(([category, items], index) => (
            <Reveal key={category} delay={index * 80}>
              <article className="skill-cat">
                <h3>{category}</h3>

                <div className="skill-list">
                  {items.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}