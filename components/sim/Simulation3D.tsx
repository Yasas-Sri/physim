"use client";

import { LabCanvas, type LabStatus } from "./LabCanvas";

// Thin alias kept so the topic sims can keep importing Simulation3D. The dark
// instrument frame lives in LabCanvas (§6.2); this just forwards to it.
export function Simulation3D(props: {
  children: React.ReactNode;
  camera?: [number, number, number];
  target?: [number, number, number];
  status?: LabStatus;
}) {
  return <LabCanvas {...props} />;
}
