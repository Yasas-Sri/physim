"use client";

import { useState } from "react";
import { Line } from "@react-three/drei";
import { useClock } from "@/hooks/useClock";
import { Simulation3D } from "./Simulation3D";
import { Arrow3D } from "./Arrow3D";
import { PlaybackControls } from "./PlaybackControls";
import { InstrumentSlider } from "./InstrumentSlider";
import { ReadoutPanel } from "./ReadoutPanel";
import { PALETTE } from "./palette";
import { projectileMotion } from "@/lib/concepts/projectile-motion";
import { projectileSetup, stepProjectile, sampleTrail } from "@/lib/physics/projectile";

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

// Projectile motion: parabolic trail, constant vx, changing vy — the two axes
// are independent.
export function ProjectileLab() {
  const d = projectileSetup(projectileMotion);
  const [speed, setSpeed] = useState(d.speed);
  const [angle, setAngle] = useState(d.angleDeg);
  const { t, playing, play, pause, reset } = useClock(true, [speed, angle]);

  const setup = { speed, angleDeg: angle, g: d.g, y0: d.y0 };
  const st = stepProjectile(setup, t);
  const trail = sampleTrail(setup, t);
  const pos: [number, number, number] = [st.x, st.y, 0];

  return (
    <div className="flex flex-col gap-4">
      <Simulation3D camera={[4, 4, 12]} target={[3, 1, 0]}>
        {trail.length > 1 && <Line points={trail} color={PALETTE.graphite} lineWidth={1.5} />}
        <mesh position={pos} castShadow>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color={PALETTE.signal} />
        </mesh>
        {!st.grounded && (
          <>
            <Arrow3D origin={pos} dir={[1, 0, 0]} length={clamp(Math.abs(st.vx) * 0.2, 0.2, 3)} color={PALETTE.labText} />
            <Arrow3D origin={pos} dir={[0, st.vy >= 0 ? 1 : -1, 0]} length={clamp(Math.abs(st.vy) * 0.2, 0.05, 3)} color={PALETTE.labText} />
          </>
        )}
      </Simulation3D>

      <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-4 rounded-panel border border-lab-line bg-lab-panel p-4">
          <InstrumentSlider label="Launch speed" value={speed} min={3} max={14} step={0.5} unit="m/s" onChange={setSpeed} />
          <InstrumentSlider label="Launch angle" value={angle} min={10} max={80} step={5} unit="°" onChange={setAngle} />
          <PlaybackControls playing={playing} onPlayPause={playing ? pause : play} onReset={reset} />
        </div>
        <ReadoutPanel
          title="Horizontal steady, vertical changes"
          rows={[
            { label: "vx (constant)", value: st.vx.toFixed(2), unit: "m/s" },
            { label: "vy", value: st.vy.toFixed(2), unit: "m/s" },
            { label: "height", value: st.y.toFixed(2), unit: "m" },
          ]}
        />
      </div>
    </div>
  );
}
