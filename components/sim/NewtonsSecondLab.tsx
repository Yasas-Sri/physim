"use client";

import { useState } from "react";
import { useClock } from "@/hooks/useClock";
import { Simulation3D } from "./Simulation3D";
import { Arrow3D } from "./Arrow3D";
import { PlaybackControls } from "./PlaybackControls";
import { InstrumentSlider } from "./InstrumentSlider";
import { ReadoutPanel } from "./ReadoutPanel";
import { PALETTE } from "./palette";
import { newtonsSecondLaw } from "@/lib/concepts/newtons-second-law";
import { secondLawSetup, stepCart } from "@/lib/physics/second-law";

const X = 0.5; // world→scene scale
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const size = (mass: number) => 0.4 + 0.25 * Math.cbrt(mass);

// Newton's 2nd law: same force on two masses → different accelerations. Sliders
// (seeded from the ConceptModel) feed the same pure stepper.
export function NewtonsSecondLab() {
  const defaults = secondLawSetup(newtonsSecondLaw);
  const [force, setForce] = useState(defaults.force);
  const [massA, setMassA] = useState(defaults.massA);
  const [massB, setMassB] = useState(defaults.massB);
  const { t, playing, play, pause, reset } = useClock(true, [force, massA, massB]);

  const A = stepCart(force, massA, t);
  const B = stepCart(force, massB, t);
  const carts = [
    { st: A, mass: massA, z: -1.3 },
    { st: B, mass: massB, z: 1.3 },
  ];
  const forceLen = clamp(force * 0.15, 0.4, 3);

  return (
    <div className="flex flex-col gap-4">
      <Simulation3D camera={[7, 5, 10]} target={[2, 0.5, 0]}>
        {carts.map((c, i) => {
          const sz = size(c.mass);
          const px = c.st.x * X;
          return (
            <group key={i}>
              <mesh position={[px, sz / 2, c.z]} castShadow>
                <boxGeometry args={[sz, sz, sz]} />
                <meshStandardMaterial color={PALETTE.labText} />
              </mesh>
              <Arrow3D origin={[px, sz + 0.25, c.z]} dir={[1, 0, 0]} length={forceLen} color={PALETTE.signal} />
              <Arrow3D origin={[px, sz + 0.7, c.z]} dir={[1, 0, 0]} length={clamp(c.st.a * 0.12, 0.2, 3)} color={PALETTE.ink} />
            </group>
          );
        })}
      </Simulation3D>

      <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-4 rounded-panel border border-lab-line bg-lab-panel p-4">
          <InstrumentSlider label="Force (both carts)" value={force} min={1} max={20} step={0.5} unit="N" onChange={setForce} />
          <InstrumentSlider label="Mass A" value={massA} min={0.5} max={6} step={0.5} unit="kg" onChange={setMassA} />
          <InstrumentSlider label="Mass B" value={massB} min={0.5} max={8} step={0.5} unit="kg" onChange={setMassB} />
          <PlaybackControls playing={playing} onPlayPause={playing ? pause : play} onReset={reset} />
        </div>
        <ReadoutPanel
          title="Same force, different mass"
          rows={[
            { label: "force (both)", value: force.toFixed(1), unit: "N" },
            { label: "accel A", value: A.a.toFixed(2), unit: "m/s²" },
            { label: "accel B", value: B.a.toFixed(2), unit: "m/s²" },
          ]}
        />
      </div>
    </div>
  );
}
