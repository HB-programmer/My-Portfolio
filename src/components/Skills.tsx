import type { CSSProperties } from "react";
import { parts } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section className="skills section-pad" id="skills">
      <SectionHeading eyebrow="Bike Parts" title="Tech Stack" />
      <div className="parts-grid">
        {parts.map((part, index) => (
          <article key={part.label} data-reveal style={{ "--i": index } as CSSProperties}>
            <span>{part.label}</span>
            <strong>{part.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
