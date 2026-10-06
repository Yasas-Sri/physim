"use client";

import { useState } from "react";
import { useClock } from "@/hooks/useClock";
import { Simulation3D } from "./Simulation3D";
import { PlaybackControls } from "./PlaybackControls";
import { InstrumentSlider } from "./InstrumentSlider";
import { ReadoutPanel } from "./ReadoutPanel";
import { PALETTE } from "./palette";
import { angularMomentum } from "@/lib/concepts/angular-momentum";
import { spinSetup, stepSpin, inertia } from "@/lib/physics/angular-momentum";

// Angular momentum conservation: pull the masses in (radius slider) → ω rises,
// L stays constant.
export function AngularMomentumLab() {
  const d = spinSetup(angularMomentum);
  const [radius, setRadius] = useState(d.radius);
  const { t, playing, play, pause, reset } = useClock(true, [radius]);

  const setup = { L: d.L, coreI: d.coreI, pointMass: d.pointMass, radius };
  const st = stepSpin(setup, t);

  return (
    <div className="flex flex-col gap-4">
      <Simulation3D camera={[5, 5, 6]} target={[0, 0.4, 0]}>
        {/* platform */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.6, 0.2, 40]} />
          <meshStandardMaterial color={PALETTE.graphite} />
        </mesh>
        {/* arms + movable masses */}
        {st.masses.map((p, i) => (
          <group key={i}>
            <mesh position={p} castShadow>
              <sphereGeometry args={[0.3, 24, 24]} />
              <meshStandardMaterial color={PALETTE.signal} />
            </mesh>
          </group>
        ))}
      </Simulation3D>

      <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-4 rounded-panel border border-lab-line bg-lab-panel p-4">
          <InstrumentSlider label="Arm radius (pull in / out)" value={radius} min={0.4} max={3} step={0.1} unit="m" onChange={setRadius} />
          <PlaybackControls playing={playing} onPlayPause={playing ? pause : play} onReset={reset} />
        </div>
        <ReadoutPanel
          title="L constant, ω rises as I falls"
          rows={[
            { label: "angular momentum L", value: st.L.toFixed(2), unit: "kg·m²/s" },
            { label: "moment of inertia I", value: inertia(setup).toFixed(2), unit: "kg·m²" },
            { label: "angular speed ω", value: st.omega.toFixed(2), unit: "rad/s" },
          ]}
        />
      </div>
    </div>
  );
}
