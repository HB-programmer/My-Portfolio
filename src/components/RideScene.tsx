import type { CSSProperties } from "react";

const poles = Array.from({ length: 12 }, (_, index) => index);
const spokes = [0, 45, 90, 135];

function Wheel({ cx }: { cx: number }) {
  return (
    <g className="ride-wheel">
      <circle cx={cx} cy={112} r={32} fill="none" stroke="#070707" strokeWidth={9} />
      <circle cx={cx} cy={112} r={23} fill="none" stroke="#ff6a00" strokeWidth={1.5} opacity={0.75} />
      {spokes.map((angle) => (
        <line
          key={angle}
          x1={cx - 23}
          y1={112}
          x2={cx + 23}
          y2={112}
          stroke="#3a3a3a"
          strokeWidth={1.6}
          transform={`rotate(${angle} ${cx} 112)`}
        />
      ))}
      <circle cx={cx} cy={112} r={4} fill="#8a8a8a" />
    </g>
  );
}

type RideSceneProps = {
  express: boolean;
  durationMs: number;
};

export function RideScene({ express, durationMs }: RideSceneProps) {
  return (
    <div
      className={`ride-scene ${express ? "ride-express" : ""}`}
      style={{ "--ride-ms": `${durationMs}ms` } as CSSProperties}
      aria-hidden="true"
    >
      <div className="ride-stars" />
      <div className="ride-moon" />
      <div className="ride-mountains" />
      <div className="ride-hills" />
      <div className="ride-lights">
        {poles.map((pole) => (
          <div className="ride-pole" key={pole}>
            <i />
            <b />
          </div>
        ))}
      </div>
      <div className="ride-road" />
      <p className="ride-caption mono">
        {express ? "Fast lane // express to the recruiter brief" : "Night ride // en route to the garage"}
      </p>
      <div className="ride-bike">
        <div className="ride-beam" />
        <div className="ride-tail" />
        <svg viewBox="0 0 260 150" role="presentation">
          <path d="M26 104 Q40 74 80 84" fill="none" stroke="#121212" strokeWidth={7} strokeLinecap="round" />
          <line x1={58} y1={112} x2={112} y2={100} stroke="#1c1c1c" strokeWidth={6} strokeLinecap="round" />
          <Wheel cx={58} />
          <Wheel cx={205} />
          <path d="M70 120 L142 113" stroke="#5c5c5c" strokeWidth={7} strokeLinecap="round" />
          <path d="M72 117 L140 111" stroke="#9a9a9a" strokeWidth={1.2} strokeLinecap="round" />
          <rect x={108} y={82} width={44} height={30} rx={5} fill="#151515" />
          <path d="M114 90 H146 M114 96 H146 M114 102 H146" stroke="#2c2c2c" strokeWidth={2} />
          <line x1={178} y1={50} x2={205} y2={112} stroke="#2a2a2a" strokeWidth={6} strokeLinecap="round" />
          <path d="M186 92 Q205 78 228 92" fill="none" stroke="#121212" strokeWidth={5} strokeLinecap="round" />
          <path
            d="M40 80 Q60 70 100 72 L118 66 Q130 52 160 54 Q176 56 177 68 L150 82 L110 86 L60 90 Z"
            fill="#111"
            stroke="#ff6a00"
            strokeWidth={1}
          />
          <rect x={30} y={78} width={10} height={6} rx={2} fill="#e63946" />
          <path d="M170 46 L178 38 L167 33" fill="none" stroke="#2a2a2a" strokeWidth={4} strokeLinecap="round" />
          <circle cx={186} cy={57} r={7} fill="#ffe2b0" />
          <path d="M106 70 Q130 72 136 88 L128 106" fill="none" stroke="#0c0c0c" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M126 34 Q112 52 104 72" fill="none" stroke="#0c0c0c" strokeWidth={17} strokeLinecap="round" />
          <path d="M128 40 Q150 45 169 39" fill="none" stroke="#0c0c0c" strokeWidth={7} strokeLinecap="round" />
          <circle cx={132} cy={22} r={13} fill="#0e0e0e" stroke="#ff6a00" strokeWidth={1} />
          <path d="M137 17 L146 21 L140 27 Z" fill="#3a3a3a" />
        </svg>
      </div>
    </div>
  );
}
