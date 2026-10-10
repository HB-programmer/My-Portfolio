import riderPhoto from "../assets/photos/rider.jpg";
import { riderSpecs } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function RiderProfile() {
  return (
    <section className="rider section-pad" id="rider">
      <div className="rider-grid">
        <figure className="rider-photo" data-reveal>
          <img src={riderPhoto} alt="Harshit Bhardwaj in riding gear standing beside his Yezdi Roadster" loading="lazy" />
          <figcaption className="mono">
            <span>REC</span> Off-duty mode
          </figcaption>
        </figure>
        <div className="rider-card" data-reveal>
          <SectionHeading eyebrow="Rider Profile" title="The Human Behind The Machine" />
          <p>
            I spend my weekdays building backend and AI systems, and my weekends on mountain roads. Both teach the
            same lessons: read the terrain, plan for failure, and keep the machine tuned for the long haul.
          </p>
          <dl className="spec-sheet">
            {riderSpecs.map((spec) => (
              <div key={spec.label}>
                <dt className="mono">{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
