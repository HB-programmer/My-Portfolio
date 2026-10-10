import { useState, type CSSProperties } from "react";
import headshot from "../assets/photos/headshot.jpg";
import { experienceGlance, links, recruiterFacts, skillGroups, telemetry } from "../data/portfolio";

type RecruiterBriefProps = {
  ignited: boolean;
  onSwitchMode: () => void;
};

const email = links.email.replace("mailto:", "");

export function RecruiterBrief({ ignited, onSwitchMode }: RecruiterBriefProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = links.email;
    }
  };

  return (
    <section className={`brief ${ignited ? "is-ignited" : ""}`} id="brief">
      <div className="brief-head">
        <p className="eyebrow mono">Fast Lane · Recruiter Brief</p>
        <h1>Harshit Bhardwaj</h1>
        <p className="brief-role">Software Engineer (AI / GenAI) · 4+ years · Python, FastAPI, LLMs, AWS</p>
      </div>

      <div className="brief-grid">
        <aside className="license" style={{ "--d": 0 } as CSSProperties}>
          <div className="license-top mono">
            <span>Rider Licence</span>
            <span>Class: AI / Backend</span>
          </div>
          <div className="license-id">
            <img src={headshot} alt="Harshit Bhardwaj" width={240} height={240} />
            <div>
              <strong>Harshit Bhardwaj</strong>
              <span className="mono">Software Engineer (AI)</span>
            </div>
          </div>
          <dl className="license-facts">
            {recruiterFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="mono">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="license-actions">
            <a className="primary-action" href={links.resume} download={links.resumeFileName}>
              Download Resume
            </a>
            <button className="secondary-action" type="button" onClick={copyEmail}>
              {copied ? "Email copied ✓" : "Copy Email"}
            </button>
            <a className="secondary-action" href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="secondary-action" href={links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <div className="license-barcode" aria-hidden="true" />
        </aside>

        <div className="brief-main">
          <div className="brief-block" style={{ "--d": 1 } as CSSProperties}>
            <h2 className="brief-label mono">Lap records · impact</h2>
            <div className="brief-stats">
              {telemetry.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="brief-block" style={{ "--d": 2 } as CSSProperties}>
            <h2 className="brief-label mono">Core skills</h2>
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.label}>
                  <span className="mono">{group.label}</span>
                  <div className="chips">
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="brief-block" style={{ "--d": 3 } as CSSProperties}>
            <h2 className="brief-label mono">Experience at a glance</h2>
            <div className="glance">
              {experienceGlance.map((job) => (
                <article key={job.company}>
                  <div className="glance-head">
                    <strong>{job.role}</strong>
                    <span className="mono">{job.period}</span>
                  </div>
                  <span className="glance-company">{job.company}</span>
                  <ul>
                    {job.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="brief-footer">
        <a className="secondary-action" href="#projects">
          See projects ↓
        </a>
        <button className="brief-switch mono" type="button" onClick={onSwitchMode}>
          Prefer the scenic route? Switch to Road Trip mode →
        </button>
      </div>
    </section>
  );
}
