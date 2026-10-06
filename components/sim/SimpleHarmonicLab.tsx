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
import { simpleHarmonicMotion } from "@/lib/concepts/simple-harmonic-motion";
import { springSetup, stepSpring } from "@/lib/physics/shm";

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const Y = 0.5;

// Simple harmonic motion: restoring force largest at the extremes (speed zero),
// speed largest at the centre.
export function SimpleHarmonicLab() {
  const d = springSetup(simpleHarmonicMotion);
  const [amplitude, setAmplitude] = useState(d.amplitude);
  const [k, setK] = useState(d.k);
  const [mass, setMass] = useState(d.mass);
  const { t, playing, play, pause, reset } = useClock(true, [amplitude, k, mass]);

  const st = stepSpring({ amplitude, k, mass }, t);
  const wallX = -(amplitude + 1.5);
  const block: [number, number, number] = [st.x, Y, 0];

  return (
    <div className="flex flex-col gap-4">
      <Simulation3D camera={[0, 3, 9]} target={[0, Y, 0]}>
        {/* wall */}
        <mesh position={[wallX, Y, 0]} castShadow>
          <boxGeometry args={[0.2, 1.2, 1.2]} />
          <meshStandardMaterial color={PALETTE.graphite} />
        </mesh>
        {/* spring */}
        <Line points={[[wallX, Y, 0], block]} color={PALETTE.graphite} lineWidth={2} />
        {/* mass */}
        <mesh position={block} castShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color={PALETTE.labText} />
        </mesh>
        {Math.abs(st.force) > 0.01 && (
          <Arrow3D origin={[block[0], Y + 0.6, 0]} dir={[st.force >= 0 ? 1 : -1, 0, 0]} length={clamp(Math.abs(st.force) * 0.12, 0.2, 3)} color={PALETTE.signal} />
        )}
        {Math.abs(st.v) > 0.01 && (
          <Arrow3D origin={[block[0], Y + 1.0, 0]} dir={[st.v >= 0 ? 1 : -1, 0, 0]} length={clamp(Math.abs(st.v) * 0.15, 0.2, 3)} color={PALETTE.labText} />
        )}
      </Simulation3D>

      <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-4 rounded-panel border border-lab-line bg-lab-panel p-4">
          <InstrumentSlider label="Amplitude" value={amplitude} min={0.5} max={3} step={0.25} unit="m" onChange={setAmplitude} />
          <InstrumentSlider label="Stiffness k" value={k} min={2} max={20} step={1} unit="N/m" onChange={setK} />
          <InstrumentSlider label="Mass" value={mass} min={0.5} max={5} step={0.5} unit="kg" onChange={setMass} />
          <PlaybackControls playing={playing} onPlayPause={playing ? pause : play} onReset={reset} />
        </div>
        <ReadoutPanel
          title="Force peaks at the ends; speed peaks at centre"
          rows={[
            { label: "displacement x", value: st.x.toFixed(2), unit: "m" },
            { label: "restoring force", value: st.force.toFixed(2), unit: "N" },
            { label: "kinetic (KE)", value: st.ke.toFixed(2), unit: "J" },
            { label: "potential (PE)", value: st.pe.toFixed(2), unit: "J" },
            { label: "total", value: st.total.toFixed(2), unit: "J" },
          ]}
        />
      </div>
    </div>
  );
}
