import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { getProjects } from "../lib/api";
import Reveal from "./Reveal";

function projectStatus(status) {
  if (status === "live") {
    return { label: "Live & Complete", className: "status-live" };
  }

  return { label: "In Progress", className: "status-progress" };
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(Array.isArray(data) ? data : data.projects || []);
      } catch (err) {
        setError(err.message || "Could not load projects.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Featured Projects</span>
          <h2>What I&apos;ve shipped so far.</h2>
          <p>Each project is a step up in complexity from the last.</p>
        </Reveal>

        {loading && (
          <div className="projects-message">Loading projects…</div>
        )}

        {error && (
          <div className="projects-message error-message">
            {error} Ensure the backend is running on port 4000.
          </div>
        )}

        {!loading &&
          !error &&
          projects.map((project, index) => {
            const status = projectStatus(project.status);

            return (
              <Reveal key={project.id} delay={index * 100}>
                <article className="project-card">
                  <div className="project-top">
                    <h3 className="project-title">{project.title}</h3>

                    <span className={`status-pill ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  <p className="project-desc">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  {project.features?.length > 0 && (
                    <ul className="project-features">
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  )}

                  {project.links?.length > 0 && (
                    <div className="project-links">
                      {project.links.map((link) => {
                        const isGitHub = link.label
                          .toLowerCase()
                          .includes("github");

                        return (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {isGitHub ? <FaGithub /> : <FiExternalLink />}
                            {link.label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
      </div>
    </section>
  );
}