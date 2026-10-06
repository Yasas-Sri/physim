"use client";

import { useState } from "react";
import { Line } from "@react-three/drei";
import { useClock } from "@/hooks/useClock";
import { Simulation3D } from "./Simulation3D";
import { PlaybackControls } from "./PlaybackControls";
import { InstrumentSlider } from "./InstrumentSlider";
import { ReadoutPanel } from "./ReadoutPanel";
import { PALETTE } from "./palette";
import { conservationOfEnergy } from "@/lib/concepts/energy";
import { pendulumSetup, stepPendulum } from "@/lib/physics/energy";

// Conservation of energy: an undamped pendulum, KE ⇄ PE, total constant.
export function EnergyLab() {
  const d = pendulumSetup(conservationOfEnergy);
  const [length, setLength] = useState(d.length);
  const [theta0, setTheta0] = useState(d.theta0);
  const [gravity, setGravity] = useState(d.gravity);
  const { t, playing, play, pause, reset } = useClock(true, [length, theta0, gravity]);

  const setup = { length, theta0, gravity, mass: d.mass };
  const st = stepPendulum(setup, t);
  const pivot: [number, number, number] = [0, length + 1.2, 0];
  const bob: [number, number, number] = [pivot[0] + st.bob[0], pivot[1] + st.bob[1], 0];

  return (
    <div className="flex flex-col gap-4">
      <Simulation3D camera={[0, 3, 9]} target={[0, length, 0]}>
        <mesh position={pivot}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={PALETTE.graphite} />
        </mesh>
        <Line points={[pivot, bob]} color={PALETTE.graphite} lineWidth={2} />
        <mesh position={bob} castShadow>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color={PALETTE.signal} />
        </mesh>
      </Simulation3D>

      <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-4 rounded-panel border border-lab-line bg-lab-panel p-4">
          <InstrumentSlider label="Length" value={length} min={1} max={4} step={0.25} unit="m" onChange={setLength} />
          <InstrumentSlider label="Release angle" value={theta0} min={0.2} max={1.4} step={0.05} unit="rad" onChange={setTheta0} />
          <InstrumentSlider label="Gravity" value={gravity} min={1.6} max={20} step={0.1} unit="m/s²" onChange={setGravity} />
          <PlaybackControls playing={playing} onPlayPause={playing ? pause : play} onReset={reset} />
        </div>
        <ReadoutPanel
          title="Kinetic ⇄ potential, total constant"
          rows={[
            { label: "kinetic (KE)", value: st.ke.toFixed(2), unit: "J" },
            { label: "potential (PE)", value: st.pe.toFixed(2), unit: "J" },
            { label: "total", value: st.total.toFixed(2), unit: "J" },
          ]}
        />
      </div>
    </div>
  );
}
