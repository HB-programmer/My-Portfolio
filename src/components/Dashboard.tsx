import type { CSSProperties } from "react";
import { metrics } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function Dashboard() {
  return (
    <section className="dashboard section-pad" id="about">
      <SectionHeading eyebrow="Dashboard" title="Built Like A Performance Machine" />
      <div className="dashboard-grid">
        {metrics.map((metric, index) => (
          <article className="dash-card" key={metric.label} data-reveal style={{ "--i": index } as CSSProperties}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <div className="bar">
              <i style={{ width: `${metric.fill}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
