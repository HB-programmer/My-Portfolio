import type { CSSProperties } from "react";
import { projects } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section className="projects section-pad" id="projects">
      <SectionHeading eyebrow="Garage" title="Projects Under The Shutter" />
      <div className="garage-grid">
        {projects.map((project, index) => (
          <article className="project-door" key={project.number} data-reveal style={{ "--i": index } as CSSProperties}>
            <span className="garage-number">{project.number}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-row">
              {project.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            {project.link && (
              <a className="door-link mono" href={project.link} target="_blank" rel="noreferrer">
                Visit live site →
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
