"use client";

import { useState } from "react";
import { useSimulation } from "@/hooks/useSimulation";
import { buildVerifiedState } from "@/lib/physics/verified-state";
import { Simulation3D } from "./Simulation3D";
import { PuckScene3D } from "./PuckScene3D";
import { SimControls } from "./SimControls";
import { ReadoutPanel, type ReadoutRow } from "./ReadoutPanel";
import { PredictionCard } from "./PredictionCard";
import { RevealOverlay } from "./RevealOverlay";
import type { LabStatus } from "./LabCanvas";

// Flagship Concept Lab in 3D with the Reveal (§8.1). The prediction and the
// measured "stops at" animate onto one track; a divergence lights amber.
export function NewtonsFirstLab3D() {
  const [v0, setV0] = useState(10);
  const [mu, setMu] = useState(0.15);
  const params = { v0, mu, mass: 1 };
  const { state, playing, play, pause, reset } = useSimulation(params);
  const vs = buildVerifiedState(params, state.t);

  // Locked prediction + reveal state (presentation only).
  const [prediction, setPrediction] = useState<{ text: string; stops: boolean } | null>(null);
  const [revealShown, setRevealShown] = useState(false);

  const realityStops = Number.isFinite(vs.stopTime);
  const measuredLabel = realityStops ? `stops at ${vs.stopTime.toFixed(1)} s` : "stops at — never";

  const rows: ReadoutRow[] = [
    { label: "time", value: vs.now.t.toFixed(2), unit: "s" },
    { label: "velocity", value: vs.now.v.toFixed(2), unit: "m/s" },
    { label: "friction force", value: vs.now.frictionForce.toFixed(2), unit: "N" },
    {
      label: "stops at",
      value: realityStops ? vs.stopTime.toFixed(2) : "never",
      unit: realityStops ? "s" : undefined,
      tone: realityStops ? "teal" : "amber",
    },
    {
      label: "stop distance",
      value: vs.stopDistance === Infinity ? "never" : vs.stopDistance.toFixed(2),
      unit: vs.stopDistance === Infinity ? undefined : "m",
      tone: vs.stopDistance === Infinity ? "amber" : "teal",
    },
  ];

  const status: LabStatus = !realityStops
    ? { label: "● never stops", tone: "amber" }
    : state.moving
      ? { label: "● running", tone: "teal" }
      : { label: "● stopped", tone: "dim" };

  const onRun = () => {
    if (playing) {
      pause();
      return;
    }
    play();
    if (prediction && !revealShown) setRevealShown(true);
  };
  const onReset = () => {
    reset();
    setRevealShown(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <PredictionCard
        onLock={(text, stops) => setPrediction({ text, stops })}
        onEdit={() => {
          setPrediction(null);
          setRevealShown(false);
        }}
      />

      <div className="relative">
        <Simulation3D camera={[6, 4, 9]} target={[0, 0.5, 0]} status={status}>
          <PuckScene3D state={state} />
        </Simulation3D>
        {revealShown && prediction && (
          <RevealOverlay
            predictsStop={prediction.stops}
            realityStops={realityStops}
            measuredLabel={measuredLabel}
            onClose={onReset}
          />
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-panel border border-lab-line bg-lab-panel p-4">
          <SimControls
            v0={v0}
            mu={mu}
            playing={playing}
            onV0={setV0}
            onMu={setMu}
            onPlayPause={onRun}
            onReset={onReset}
          />
        </div>
        <ReadoutPanel title="Readout" rows={rows} />
      </div>
    </div>
  );
}
