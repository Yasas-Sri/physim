"use client";

import { useEffect, useState } from "react";
import { Line } from "@react-three/drei";
import { useClock } from "@/hooks/useClock";
import { Simulation3D } from "./Simulation3D";
import { Arrow3D } from "./Arrow3D";
import { PlaybackControls } from "./PlaybackControls";
import { InstrumentSlider } from "./InstrumentSlider";
import { ReadoutPanel } from "./ReadoutPanel";
import { Button } from "@/components/ui/button";
import { PALETTE } from "./palette";
import { circularMotion } from "@/lib/concepts/circular-motion";
import { circularSetup, stepCircular } from "@/lib/physics/circular";

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const CENTER: [number, number, number] = [0, 0.5, 0];

// Uniform circular motion: centripetal force inward; release sends it off tangentially.
export function CircularMotionLab() {
  const d = circularSetup(circularMotion);
  const [radius, setRadius] = useState(d.radius);
  const [speed, setSpeed] = useState(d.speed);
  const [releaseAt, setReleaseAt] = useState<number>(Infinity);
  const { t, playing, play, pause, reset } = useClock(true, [radius, speed]);

  // A parameter change restarts the orbit, so clear any prior release.
  useEffect(() => setReleaseAt(Infinity), [radius, speed]);

  const st = stepCircular({ radius, speed, mass: d.mass }, t, releaseAt);
  const onReset = () => {
    setReleaseAt(Infinity);
    reset();
  };

  return (
    <div className="flex flex-col gap-4">
      <Simulation3D camera={[6, 6, 7]} target={CENTER}>
        <mesh position={CENTER}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={PALETTE.graphite} />
        </mesh>
        {!st.released && <Line points={[CENTER, st.pos]} color={PALETTE.graphite} lineWidth={1.5} />}
        <mesh position={st.pos} castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color={PALETTE.signal} />
        </mesh>
        {!st.released && (
          <Arrow3D origin={st.pos} dir={st.inward} length={clamp(st.centripetalForce * 0.12, 0.3, 3)} color={PALETTE.signal} />
        )}
        <Arrow3D origin={st.pos} dir={st.vel} length={clamp(speed * 0.2, 0.3, 3)} color={PALETTE.labText} />
      </Simulation3D>

      <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-4 rounded-panel border border-lab-line bg-lab-panel p-4">
          <InstrumentSlider label="Radius" value={radius} min={1} max={4} step={0.25} unit="m" onChange={setRadius} />
          <InstrumentSlider label="Speed" value={speed} min={1} max={7} step={0.5} unit="m/s" onChange={setSpeed} />
          <div className="flex gap-2">
            <Button variant="signal" onClick={() => setReleaseAt(t)} disabled={st.released}>
              Release the string
            </Button>
          </div>
          <PlaybackControls playing={playing} onPlayPause={playing ? pause : play} onReset={onReset} />
        </div>
        <ReadoutPanel
          title={st.released ? "Released — no force, straight line" : "Orbiting"}
          rows={[
            { label: "centripetal force", value: st.centripetalForce.toFixed(2), unit: "N" },
            { label: "accel v²/r", value: (speed * speed / radius).toFixed(2), unit: "m/s²" },
            { label: "speed", value: speed.toFixed(2), unit: "m/s" },
          ]}
        />
      </div>
    </div>
  );
}
