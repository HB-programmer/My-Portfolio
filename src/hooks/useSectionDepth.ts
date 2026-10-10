import { useEffect } from "react";
import type { VisitorMode } from "../types/portfolio";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

// Drives --enter / --exit (0 to 1) on each section so it rises into view and sinks away as you scroll.
// Uses layout offsets rather than getBoundingClientRect so the section's own transform never feeds back.
export function useSectionDepth(mode: VisitorMode) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section:not(.hero):not(.brief)"));
    sections.forEach((section) => section.classList.add("depth-section"));

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const scrollY = window.scrollY;
      const progress = sections.map((section) => {
        const top = section.offsetTop - scrollY;
        const bottom = top + section.offsetHeight;
        return {
          enter: clamp((viewport - top) / (viewport * 0.55)),
          exit: clamp((viewport * 0.35 - bottom) / (viewport * 0.35)),
        };
      });
      sections.forEach((section, index) => {
        section.style.setProperty("--enter", progress[index].enter.toFixed(3));
        section.style.setProperty("--exit", progress[index].exit.toFixed(3));
      });
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("load", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("load", requestUpdate);
      sections.forEach((section) => {
        section.classList.remove("depth-section");
        section.style.removeProperty("--enter");
        section.style.removeProperty("--exit");
      });
    };
  }, [mode]);
}
