import type { CSSProperties } from "react";
import { backendFlow } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function EngineRoom() {
  return (
    <section className="engine-room section-pad" id="engine">
      <SectionHeading eyebrow="Engine Room" title="Backend Flow" />
      <div className="architecture" data-reveal aria-label="Backend system architecture">
        {backendFlow.map((step, index) => (
          <div className="flow-step" key={step} style={{ "--i": index } as CSSProperties}>
            <span>{step}</span>
            {index < backendFlow.length - 1 && <i />}
          </div>
        ))}
      </div>
    </section>
  );
}
