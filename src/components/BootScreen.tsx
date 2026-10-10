import { useCallback, useEffect, useRef, useState } from "react";
import { rideModes } from "../data/portfolio";
import { playEngineSequence } from "../lib/engineSound";
import type { VisitorMode } from "../types/portfolio";
import { RideScene } from "./RideScene";

type BootScreenProps = {
  visible: boolean;
  mode: VisitorMode | null;
  onModeChange: (mode: VisitorMode) => void;
  onComplete: () => void;
};

type Phase = "ready" | "cranking" | "idling" | "riding";

// Fast Lane gets a quicker, sportier start so recruiters reach the brief sooner.
const timings: Record<VisitorMode, { crank: number; idle: number; ride: number }> = {
  explorer: { crank: 1200, idle: 1100, ride: 3600 },
  recruiter: { crank: 800, idle: 600, ride: 2300 },
};

const headlines: Record<Phase, string> = {
  ready: "Choose Your Ride",
  cranking: "Cranking Engine",
  idling: "Engine Running",
  riding: "Engine Running",
};

function ModeIcon({ mode }: { mode: VisitorMode }) {
  return mode === "explorer" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 18 9 8l4 6 3-4 5 8Z" />
      <circle cx="17" cy="6" r="1.6" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2 5 13h6l-1 9 8-11h-6Z" />
    </svg>
  );
}

export function BootScreen({ visible, mode, onModeChange, onComplete }: BootScreenProps) {
  const [phase, setPhase] = useState<Phase>("ready");
  const timers = useRef<number[]>([]);
  const stopSound = useRef<() => void>(() => undefined);
  const timing = timings[mode ?? "explorer"];
  const express = mode === "recruiter";

  const finish = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    stopSound.current();
    onComplete();
  }, [onComplete]);

  const ignite = useCallback(() => {
    if (phase !== "ready" || !mode) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    setPhase("cranking");
    stopSound.current = playEngineSequence({
      crank: timing.crank / 1000,
      idle: timing.idle / 1000,
      ride: timing.ride / 1000,
      sport: express,
    });
    navigator.vibrate?.(express ? [50, 40, 50, 40, 150] : [70, 50, 70, 50, 70, 50, 70, 50, 200]);

    const schedule = (delay: number, action: () => void) => timers.current.push(window.setTimeout(action, delay));
    schedule(timing.crank, () => setPhase("idling"));
    schedule(timing.crank + timing.idle, () => setPhase("riding"));
    schedule(timing.crank + timing.idle + timing.ride, finish);
  }, [phase, mode, timing, express, finish]);

  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !(event.target instanceof HTMLButtonElement)) ignite();
      if (event.key === "Escape" && phase !== "ready") finish();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, ignite, finish, phase]);

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      stopSound.current();
    },
    [],
  );

  const running = phase !== "ready";
  const hint = running
    ? "Engine on · sound up"
    : mode
      ? `${rideModes.find((item) => item.id === mode)?.label} selected · push to start`
      : "Select a ride mode to unlock ignition";

  return (
    <div className={`boot-screen phase-${phase} ${visible ? "" : "hidden"}`} id="bootScreen">
      <div className="boot-panel">
        <p className="mono signal">RIDER.DEVELOPER // HARSHIT BHARDWAJ</p>
        <h1>{headlines[phase]}</h1>
        <div className="boot-checks">
          {["Fuel", "Engine", "AI modules"].map((check, index) => (
            <div className="boot-check" key={check}>
              <span>{check}</span>
              <div className={`meter ${index === 1 ? "delay-one" : index === 2 ? "delay-two" : ""}`}>
                <i />
              </div>
            </div>
          ))}
        </div>
        <div className="ride-modes" role="radiogroup" aria-label="Who is visiting?">
          {rideModes.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={mode === item.id}
              className={`ride-mode ${mode === item.id ? "is-selected" : ""}`}
              onClick={() => onModeChange(item.id)}
              disabled={running}
            >
              <span className="ride-mode-led" />
              <span className="ride-mode-icon">
                <ModeIcon mode={item.id} />
              </span>
              <strong>{item.label}</strong>
              <span className="ride-mode-audience">{item.audience}</span>
              <span className="ride-mode-perk mono">{item.perk}</span>
            </button>
          ))}
        </div>
        <div className="ignition-wrap">
          <button
            className={`ignition ${running ? "is-running" : ""} ${mode ? "" : "is-locked"}`}
            type="button"
            onClick={ignite}
            disabled={running || !mode}
            aria-label="Start engine"
          >
            <span className="ignition-cap">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v8" />
                <path d="M6.3 6.8a8 8 0 1 0 11.4 0" />
              </svg>
              <span>Start</span>
            </span>
          </button>
          <p className="ignition-hint mono" aria-live="polite">
            {hint}
          </p>
        </div>
      </div>
      {phase === "riding" && <RideScene express={express} durationMs={timing.ride} />}
      {running && (
        <button className="skip-intro mono" type="button" onClick={finish}>
          Skip intro →
        </button>
      )}
    </div>
  );
}
