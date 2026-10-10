import type { CSSProperties } from "react";
import { journey } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function Journey() {
  return (
    <section className="journey section-pad" id="journey">
      <SectionHeading eyebrow="Roadmap" title="Engineering Journey" />
      <div className="roadmap" data-reveal>
        {journey.map((stop, index) => (
          <article key={stop.title} data-reveal style={{ "--i": index } as CSSProperties}>
            <span className="year">{stop.year}</span>
            <h3>{stop.title}</h3>
            <small>{stop.period}</small>
            <p>{stop.description}</p>
            <ul>
              {stop.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
