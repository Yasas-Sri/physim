"use client";

import { useState } from "react";
import { useClock } from "@/hooks/useClock";
import { Simulation3D } from "./Simulation3D";
import { PlaybackControls } from "./PlaybackControls";
import { InstrumentSlider } from "./InstrumentSlider";
import { ReadoutPanel } from "./ReadoutPanel";
import { Button } from "@/components/ui/button";
import { PALETTE } from "./palette";
import { freeFall } from "@/lib/concepts/free-fall";
import { fallSetup, stepFall } from "@/lib/physics/free-fall";

const size = (mass: number) => 0.25 + 0.12 * Math.cbrt(mass);

// Free fall: two masses drop together in a vacuum; the air toggle makes the
// lighter one lag — showing air, not weight, is the difference.
export function FreeFallLab() {
  const d = fallSetup(freeFall);
  const [massA, setMassA] = useState(d.massA);
  const [massB, setMassB] = useState(d.massB);
  const [y0, setY0] = useState(d.y0);
  const [air, setAir] = useState(false);
  const { t, playing, play, pause, reset } = useClock(true, [massA, massB, y0, air]);

  const st = stepFall({ y0, massA, massB, g: d.g, drag: d.drag }, air, t);
  const rA = size(massA);
  const rB = size(massB);

  return (
    <div className="flex flex-col gap-4">
      <Simulation3D camera={[6, 3.5, 9]} target={[0, y0 / 2, 0]}>
        <mesh position={[-1, st.yA + rA, 0]} castShadow>
          <sphereGeometry args={[rA, 32, 32]} />
          <meshStandardMaterial color={PALETTE.labText} />
        </mesh>
        <mesh position={[1, st.yB + rB, 0]} castShadow>
          <sphereGeometry args={[rB, 32, 32]} />
          <meshStandardMaterial color={PALETTE.signal} />
        </mesh>
      </Simulation3D>

      <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-4 rounded-panel border border-lab-line bg-lab-panel p-4">
          <InstrumentSlider label="Mass A (dark)" value={massA} min={0.5} max={8} step={0.5} unit="kg" onChange={setMassA} />
          <InstrumentSlider label="Mass B (amber)" value={massB} min={0.5} max={8} step={0.5} unit="kg" onChange={setMassB} />
          <InstrumentSlider label="Drop height" value={y0} min={3} max={10} step={0.5} unit="m" onChange={setY0} />
          <div className="flex gap-2">
            <Button variant={air ? "signal" : "ghost-lab"} onClick={() => setAir((a) => !a)}>
              {air ? "Air: on" : "Air: off (vacuum)"}
            </Button>
          </div>
          <PlaybackControls playing={playing} onPlayPause={playing ? pause : play} onReset={reset} />
        </div>
        <ReadoutPanel
          title={air ? "With air — lighter lags" : "Vacuum — they fall together"}
          rows={[
            { label: "height A", value: st.yA.toFixed(2), unit: "m" },
            { label: "height B", value: st.yB.toFixed(2), unit: "m" },
          ]}
        />
      </div>
    </div>
  );
}
