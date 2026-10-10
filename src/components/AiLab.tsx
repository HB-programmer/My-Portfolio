import { aiStack } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function AiLab() {
  return (
    <section className="ai-lab section-pad" id="ai">
      <div className="lab-panel" data-reveal>
        <SectionHeading eyebrow="AI Lab" title="Onboard Intelligence" />
        <div className="chips">
          {aiStack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
