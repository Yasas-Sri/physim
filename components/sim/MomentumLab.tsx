"use client";

import { useState } from "react";
import { useClock } from "@/hooks/useClock";
import { Simulation3D } from "./Simulation3D";
import { Arrow3D } from "./Arrow3D";
import { PlaybackControls } from "./PlaybackControls";
import { InstrumentSlider } from "./InstrumentSlider";
import { ReadoutPanel } from "./ReadoutPanel";
import { PALETTE } from "./palette";
import { conservationOfMomentum } from "@/lib/concepts/momentum";
import { momentumSetup, stepCollision } from "@/lib/physics/momentum";

const X = 1;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const radiusFor = (mass: number, base: number) => base * Math.cbrt(mass);

// Conservation of momentum: elastic collision, total momentum unchanged.
export function MomentumLab() {
  const d = momentumSetup(conservationOfMomentum);
  const [m1, setM1] = useState(d.m1);
  const [m2, setM2] = useState(d.m2);
  const [u1, setU1] = useState(d.u1);
  const [u2, setU2] = useState(d.u2);
  const { t, playing, play, pause, reset } = useClock(true, [m1, m2, u1, u2]);

  const setup = { m1, m2, u1, u2, radius: d.radius, x1: d.x1, x2: d.x2 };
  const st = stepCollision(setup, t);
  const r1 = radiusFor(m1, d.radius);
  const r2 = radiusFor(m2, d.radius);
  const momLen = (p: number) => clamp(Math.abs(p) * 0.3, 0.001, 3);
  const dir = (v: number): [number, number, number] => [v >= 0 ? 1 : -1, 0, 0];

  return (
    <div className="flex flex-col gap-4">
      <Simulation3D camera={[0, 5, 12]} target={[0, 0.5, 0]}>
        <mesh position={[st.x1 * X, r1, 0]} castShadow>
          <sphereGeometry args={[r1, 32, 32]} />
          <meshStandardMaterial color={PALETTE.labText} />
        </mesh>
        <Arrow3D origin={[st.x1 * X, r1 * 2 + 0.3, 0]} dir={dir(st.v1)} length={momLen(st.p1)} color={PALETTE.signal} />
        <mesh position={[st.x2 * X, r2, 0]} castShadow>
          <sphereGeometry args={[r2, 32, 32]} />
          <meshStandardMaterial color={PALETTE.graphite} />
        </mesh>
        <Arrow3D origin={[st.x2 * X, r2 * 2 + 0.3, 0]} dir={dir(st.v2)} length={momLen(st.p2)} color={PALETTE.signal} />
      </Simulation3D>

      <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-4 rounded-panel border border-lab-line bg-lab-panel p-4">
          <InstrumentSlider label="Mass 1" value={m1} min={0.5} max={6} step={0.5} unit="kg" onChange={setM1} />
          <InstrumentSlider label="Velocity 1" value={u1} min={-4} max={4} step={0.5} unit="m/s" onChange={setU1} />
          <InstrumentSlider label="Mass 2" value={m2} min={0.5} max={6} step={0.5} unit="kg" onChange={setM2} />
          <InstrumentSlider label="Velocity 2" value={u2} min={-4} max={4} step={0.5} unit="m/s" onChange={setU2} />
          <PlaybackControls playing={playing} onPlayPause={playing ? pause : play} onReset={reset} />
        </div>
        <ReadoutPanel
          title={st.collided ? "After the collision" : "Before the collision"}
          rows={[
            { label: "momentum p₁", value: st.p1.toFixed(2), unit: "kg·m/s" },
            { label: "momentum p₂", value: st.p2.toFixed(2), unit: "kg·m/s" },
            { label: "total", value: st.total.toFixed(2), unit: "kg·m/s" },
          ]}
        />
      </div>
    </div>
  );
}
