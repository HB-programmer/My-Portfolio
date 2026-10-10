import type { CSSProperties } from "react";
import { telemetry } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function TelemetrySection() {
  return (
    <section className="telemetry section-pad" id="telemetry">
      <SectionHeading eyebrow="Telemetry" title="Resume Metrics On The Dash" />
      <div className="telemetry-grid">
        {telemetry.map((item, index) => (
          <article className="telemetry-card" key={item.label} data-reveal style={{ "--i": index } as CSSProperties}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
