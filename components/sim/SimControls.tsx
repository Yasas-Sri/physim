"use client";

import { InstrumentSlider } from "./InstrumentSlider";
import { PlaybackControls } from "./PlaybackControls";

// Newton's-first-law dials + playback, on the dark lab panel (§6.4).
export function SimControls({
  v0,
  mu,
  playing,
  onV0,
  onMu,
  onPlayPause,
  onReset,
}: {
  v0: number;
  mu: number;
  playing: boolean;
  onV0: (v: number) => void;
  onMu: (v: number) => void;
  onPlayPause: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <InstrumentSlider label="Initial velocity" value={v0} min={0} max={20} step={0.5} unit="m/s" onChange={onV0} />
      <InstrumentSlider label="Friction (μ)" value={mu} min={0} max={0.5} step={0.01} onChange={onMu} />
      <PlaybackControls playing={playing} onPlayPause={onPlayPause} onReset={onReset} />
    </div>
  );
}
