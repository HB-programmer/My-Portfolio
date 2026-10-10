import summitPhoto from "../assets/photos/summit.jpg";
import { links } from "../data/portfolio";

export function Contact() {
  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-panel" data-reveal>
        <img className="contact-bg" src={summitPhoto} alt="" aria-hidden="true" loading="lazy" />
        <p className="eyebrow mono">Pit Stop · Gurugram, India</p>
        <h2>Start A Conversation</h2>
        <p>Have a backend problem, AI workflow, or system design challenge that needs horsepower?</p>
        <div className="contact-actions">
          <a className="contact-primary" href={links.resume} download>
            Download Resume
          </a>
          <a href={links.email}>Email</a>
          <a href={links.phone}>Phone</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={links.medium} target="_blank" rel="noreferrer">
            Medium
          </a>
        </div>
      </div>
    </section>
  );
}
