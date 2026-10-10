import { Fragment, useRef, type PointerEvent } from "react";
import bikePhoto from "../assets/photos/bike.jpg";

type HeroProps = {
  ignited: boolean;
};

const name = "Harshit Bhardwaj";

export function Hero({ ignited }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero || event.pointerType !== "mouse") return;
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--tilt-x", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
    hero.style.setProperty("--tilt-y", ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
  };

  return (
    <section className={`hero ${ignited ? "is-ignited" : ""}`} id="garage" ref={heroRef} onPointerMove={handlePointerMove}>
      <div className="hero-backdrop" aria-hidden="true">
        <div className="moon" />
        <div className="rain" />
        <div className="road-lines" />
      </div>
      <div className="hero-content">
        <p className="eyebrow mono hero-rise">Backend systems on a neon highway</p>
        <h1 aria-label={name}>
          {name.split(" ").map((word, wordIndex) => (
            <Fragment key={word}>
              {wordIndex > 0 && " "}
              <span className="hero-word" aria-hidden="true">
                {word.split("").map((letter, letterIndex) => (
                  <span
                    className="hero-letter"
                    key={`${letter}-${letterIndex}`}
                    style={{ animationDelay: `${(wordIndex * 7 + letterIndex) * 45}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </h1>
        <p className="hero-copy hero-rise">Rider. Backend Engineer. AI Engineer. System Designer.</p>
        <p className="tagline hero-rise">I build machines. Some run on roads. Some run the internet.</p>
        <div className="hero-actions hero-rise">
          <a className="primary-action" href="#projects">
            Open Garage
          </a>
          <a className="secondary-action" href="#contact">
            Start Conversation
          </a>
        </div>
      </div>
      <figure className="hero-photo" aria-hidden="true">
        <div className="hero-photo-frame">
          <img src={bikePhoto} alt="" />
          <div className="headlight-sweep" />
        </div>
        <figcaption className="mono">YEZDI // ROADSTER</figcaption>
      </figure>
    </section>
  );
}
