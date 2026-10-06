"use client";

import { useState } from "react";
import { useClock } from "@/hooks/useClock";
import { Simulation3D } from "./Simulation3D";
import { Arrow3D } from "./Arrow3D";
import { PlaybackControls } from "./PlaybackControls";
import { InstrumentSlider } from "./InstrumentSlider";
import { ReadoutPanel } from "./ReadoutPanel";
import { PALETTE } from "./palette";
import { newtonsThirdLaw } from "@/lib/concepts/newtons-third-law";
import { thirdLawSetup, stepPair } from "@/lib/physics/third-law";

const X = 1;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const size = (mass: number) => 0.4 + 0.25 * Math.cbrt(mass);

// Newton's 3rd law: two bodies push apart with equal-and-opposite forces.
export function NewtonsThirdLab() {
  const defaults = thirdLawSetup(newtonsThirdLaw);
  const [force, setForce] = useState(defaults.force);
  const [massA, setMassA] = useState(defaults.massA);
  const [massB, setMassB] = useState(defaults.massB);
  const { t, playing, play, pause, reset } = useClock(true, [force, massA, massB]);

  const st = stepPair({ force, massA, massB }, t);
  const forceLen = clamp(force * 0.15, 0.4, 3);
  const szA = size(massA);
  const szB = size(massB);
  const ax = st.ax * X;
  const bx = st.bx * X;

  return (
    <div className="flex flex-col gap-4">
      <Simulation3D camera={[0, 5, 11]} target={[0, 0.5, 0]}>
        <mesh position={[ax, szA / 2, 0]} castShadow>
          <boxGeometry args={[szA, szA, szA]} />
          <meshStandardMaterial color={PALETTE.labText} />
        </mesh>
        <Arrow3D origin={[ax, szA + 0.3, 0]} dir={[-1, 0, 0]} length={forceLen} color={PALETTE.signal} />
        <mesh position={[bx, szB / 2, 0]} castShadow>
          <boxGeometry args={[szB, szB, szB]} />
          <meshStandardMaterial color={PALETTE.labText} />
        </mesh>
        <Arrow3D origin={[bx, szB + 0.3, 0]} dir={[1, 0, 0]} length={forceLen} color={PALETTE.signal} />
      </Simulation3D>

      <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-4 rounded-panel border border-lab-line bg-lab-panel p-4">
          <InstrumentSlider label="Interaction force" value={force} min={1} max={20} step={0.5} unit="N" onChange={setForce} />
          <InstrumentSlider label="Mass A" value={massA} min={0.5} max={6} step={0.5} unit="kg" onChange={setMassA} />
          <InstrumentSlider label="Mass B" value={massB} min={0.5} max={10} step={0.5} unit="kg" onChange={setMassB} />
          <PlaybackControls playing={playing} onPlayPause={playing ? pause : play} onReset={reset} />
        </div>
        <ReadoutPanel
          title="Equal and opposite"
          rows={[
            { label: "force on A", value: st.forceMag.toFixed(1), unit: "N" },
            { label: "force on B", value: st.forceMag.toFixed(1), unit: "N" },
            { label: "accel A", value: Math.abs(st.aAccel).toFixed(2), unit: "m/s²" },
            { label: "accel B", value: Math.abs(st.bAccel).toFixed(2), unit: "m/s²" },
          ]}
        />
      </div>
    </div>
  );
}
