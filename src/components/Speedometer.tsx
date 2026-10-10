type SpeedometerProps = {
  speed: number;
  angle: number;
};

export function Speedometer({ speed, angle }: SpeedometerProps) {
  return (
    <aside className="speedometer" aria-label="Scroll progress">
      <div className="speed-value">{String(speed).padStart(3, "0")}</div>
      <span>KM/H</span>
      <div className="needle" style={{ transform: `rotate(${angle}deg)` }} />
    </aside>
  );
}
