// Synthesized single-cylinder engine: starter crank, catch, idle thump, then revs as the bike rides off.
// Built with Web Audio so there is no audio file to download or license.

type EngineTimeline = {
  crank: number;
  idle: number;
  ride: number;
  sport?: boolean;
};

type Point = [time: number, value: number, kind?: "set" | "ramp"];

function automate(params: AudioParam[], points: Point[]) {
  params.forEach((param) => {
    points.forEach(([time, value, kind = "ramp"]) => {
      if (kind === "set") param.setValueAtTime(value, time);
      else param.linearRampToValueAtTime(value, time);
    });
  });
}

function softClipCurve(amount: number) {
  const curve = new Float32Array(1024);
  for (let i = 0; i < curve.length; i += 1) {
    const x = (i / (curve.length - 1)) * 2 - 1;
    curve[i] = Math.tanh(amount * x);
  }
  return curve;
}

function noiseBuffer(ctx: AudioContext) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

export function playEngineSequence({ crank, idle, ride, sport = false }: EngineTimeline): () => void {
  const AudioCtor =
    window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtor) return () => undefined;

  const ctx = new AudioCtor();
  const t0 = ctx.currentTime + 0.05;
  const catchAt = t0 + crank;
  const rideAt = catchAt + idle;
  const end = rideAt + ride;

  const master = ctx.createGain();
  master.gain.value = 0.7;
  const compressor = ctx.createDynamicsCompressor();
  master.connect(compressor).connect(ctx.destination);

  // Starter motor: a buzzy whine that surges on each compression stroke.
  const starter = ctx.createOscillator();
  starter.type = "sawtooth";
  automate([starter.frequency], [
    [t0, 60, "set"],
    [catchAt, 95],
  ]);
  const starterTone = ctx.createBiquadFilter();
  starterTone.type = "bandpass";
  starterTone.frequency.value = 850;
  starterTone.Q.value = 1.4;
  const starterGain = ctx.createGain();
  starterGain.gain.setValueAtTime(0, t0);
  for (let t = t0; t < catchAt - 0.12; t += 0.13) {
    starterGain.gain.linearRampToValueAtTime(0.4, t + 0.04);
    starterGain.gain.linearRampToValueAtTime(0.08, t + 0.13);
  }
  starterGain.gain.linearRampToValueAtTime(0, catchAt + 0.05);
  starter.connect(starterTone).connect(starterGain).connect(master);
  starter.start(t0);
  starter.stop(catchAt + 0.2);

  // Engine core: firing pulses (Hz) shape every oscillator and the exhaust bark.
  // Sport mode revs harder: a sharper blip, higher idle, and a higher redline on the ride out.
  const rev = sport ? 1.3 : 1;
  const firing: Point[] = [
    [catchAt, 14, "set"],
    [catchAt + 0.22, 62 * rev],
    [catchAt + Math.min(0.75, idle * 0.8), 24 * (sport ? 1.15 : 1)],
    [rideAt, 26 * (sport ? 1.15 : 1)],
    [rideAt + ride * 0.4, 58 * rev],
    [rideAt + ride * 0.48, 40 * rev],
    [rideAt + ride * 0.85, 92 * rev],
    [end, 70 * rev],
  ];

  const body = ctx.createOscillator();
  body.type = "sawtooth";
  const sub = ctx.createOscillator();
  sub.type = "square";
  const subLevel = ctx.createGain();
  subLevel.gain.value = 0.6;
  automate([body.frequency], firing);
  automate([sub.frequency], firing.map(([time, value, kind]) => [time, value / 2, kind] as Point));

  const shaper = ctx.createWaveShaper();
  shaper.curve = softClipCurve(3);
  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.Q.value = 3;
  automate([tone.frequency], [
    [catchAt, 380, "set"],
    [catchAt + 0.22, 1300],
    [catchAt + Math.min(0.75, idle * 0.8), 480],
    [rideAt, 480],
    [rideAt + ride * 0.85, 1900],
    [end, 900],
  ]);

  // Exhaust: filtered noise for the gritty edge of each thump.
  const exhaust = ctx.createBufferSource();
  exhaust.buffer = noiseBuffer(ctx);
  exhaust.loop = true;
  const exhaustTone = ctx.createBiquadFilter();
  exhaustTone.type = "bandpass";
  exhaustTone.frequency.value = 280;
  const exhaustLevel = ctx.createGain();
  exhaustLevel.gain.value = 0.35;

  // Amplitude pulse at the firing rate turns the drone into a "thump-thump".
  const pulse = ctx.createOscillator();
  pulse.type = "sine";
  automate([pulse.frequency], firing);
  const pulseDepth = ctx.createGain();
  pulseDepth.gain.value = 0.45;
  const thump = ctx.createGain();
  thump.gain.value = 0.55;
  pulse.connect(pulseDepth).connect(thump.gain);

  body.connect(shaper);
  sub.connect(subLevel).connect(shaper);
  shaper.connect(tone).connect(thump);
  exhaust.connect(exhaustTone).connect(exhaustLevel).connect(thump);

  const engineOut = ctx.createGain();
  automate([engineOut.gain], [
    [t0, 0, "set"],
    [catchAt, 0, "set"],
    [catchAt + 0.05, 0.9],
    [rideAt + ride * 0.6, 0.9],
    [end, 0],
  ]);
  thump.connect(engineOut).connect(master);

  [body, sub, pulse].forEach((osc) => {
    osc.start(catchAt);
    osc.stop(end + 0.1);
  });
  exhaust.start(catchAt);
  exhaust.stop(end + 0.1);

  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    void ctx.close();
  };
  const autoClose = window.setTimeout(close, (end - ctx.currentTime + 0.5) * 1000);

  return () => {
    window.clearTimeout(autoClose);
    if (closed) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
    window.setTimeout(close, 250);
  };
}
