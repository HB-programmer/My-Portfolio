import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section className="education section-pad" id="education">
      <div className="education-panel" data-reveal>
        <SectionHeading eyebrow="Mission Control" title="Education And Leadership" />
        <div className="education-grid">
          <article>
            <span>Kurukshetra University</span>
            <strong>Jul 2019 - May 2023</strong>
            <p>B.Tech. CGPA 9.31. Scholar student in all semesters.</p>
          </article>
          <article>
            <span>Campus Leadership</span>
            <strong>CR and President</strong>
            <p>Led student coordination and community work as CR and President of Void Main Club.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
