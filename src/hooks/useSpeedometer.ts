import { useEffect, useMemo, useState } from "react";

export function useSpeedometer() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateSpeedometer = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable <= 0 ? 0 : window.scrollY / scrollable);
    };

    updateSpeedometer();
    document.addEventListener("scroll", updateSpeedometer, { passive: true });
    window.addEventListener("resize", updateSpeedometer);

    return () => {
      document.removeEventListener("scroll", updateSpeedometer);
      window.removeEventListener("resize", updateSpeedometer);
    };
  }, []);

  return useMemo(
    () => ({
      angle: -120 + scrollProgress * 240,
      speed: Math.round(scrollProgress * 220),
    }),
    [scrollProgress],
  );
}
