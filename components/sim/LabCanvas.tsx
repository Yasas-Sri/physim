"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PALETTE } from "./palette";

export type LabStatus = { label: string; tone?: "teal" | "amber" | "dim" };

const dotColor: Record<NonNullable<LabStatus["tone"]>, string> = {
  teal: "bg-signal",
  amber: "bg-gap",
  dim: "bg-lab-text-dim",
};

// The dark instrument frame (NewDesign.md §6.2): the simulation is the glowing
// hero. Purely presentational — draws whatever meshes it's handed, computes
// nothing. Reading/writing never happens here (§2 anti-flattening guardrail).
export function LabCanvas({
  children,
  camera = [6, 5, 9],
  target = [0, 1, 0],
  status,
}: {
  children: React.ReactNode;
  camera?: [number, number, number];
  target?: [number, number, number];
  status?: LabStatus;
}) {
  return (
    <div
      className="relative h-[440px] w-full overflow-hidden rounded-canvas border border-lab-line bg-lab-void"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.05)" }}
    >
      {status && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-pill border border-lab-line bg-lab-panel/80 px-2.5 py-1 font-mono text-mono-sm text-lab-text">
          <span className={`h-1.5 w-1.5 rounded-pill ${dotColor[status.tone ?? "dim"]}`} />
          {status.label}
        </div>
      )}
      <Canvas camera={{ position: camera, fov: 50 }} dpr={[1, 2]} shadows>
        <color attach="background" args={[PALETTE.labVoid]} />
        <ambientLight intensity={0.55} />
        <hemisphereLight args={[PALETTE.labText, PALETTE.labVoid, 0.35]} />
        <directionalLight position={[6, 10, 6]} intensity={1.0} castShadow />
        <gridHelper args={[24, 24, PALETTE.labLine, PALETTE.labLine]} />
        <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[24, 24]} />
          <meshStandardMaterial color={PALETTE.labPanel} />
        </mesh>
        {children}
        <OrbitControls target={target} makeDefault enablePan={false} minDistance={3} maxDistance={30} />
      </Canvas>
      {/* Vignette toward the edges to focus the centre (§6.2). */}
      <div
        className="pointer-events-none absolute inset-0 rounded-canvas"
        style={{ boxShadow: "inset 0 0 120px 24px rgba(0,0,0,.5)" }}
      />
    </div>
  );
}
