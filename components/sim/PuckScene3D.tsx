"use client";

import { Arrow3D } from "./Arrow3D";
import { PALETTE } from "./palette";
import type { PuckState } from "@/lib/physics/kinematics";

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

// 3D renderer for the Newton's-first-law puck (§6.2). The puck glows teal while
// moving (your measurement); velocity arrow teal, friction force neutral.
export function PuckScene3D({ state }: { state: PuckState }) {
  const px = clamp(state.x * 0.3, -10, 10); // true displacement shown in the readout
  const vDir: [number, number, number] = [state.v >= 0 ? 1 : -1, 0, 0];
  const fDir: [number, number, number] = [state.frictionForce >= 0 ? 1 : -1, 0, 0];
  const vLen = clamp(Math.abs(state.v) * 0.12, 0, 3);
  const fMag = Math.abs(state.frictionForce);

  return (
    <group>
      <mesh position={[px, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 40]} />
        <meshStandardMaterial
          color={state.moving ? PALETTE.signal : PALETTE.labText}
          emissive={state.moving ? PALETTE.signal : "#000000"}
          emissiveIntensity={state.moving ? 0.6 : 0}
        />
      </mesh>
      {vLen > 0.01 && <Arrow3D origin={[px, 0.5, 0]} dir={vDir} length={vLen} color={PALETTE.signal} />}
      {fMag > 0.01 && (
        <Arrow3D origin={[px, 0.9, 0]} dir={fDir} length={clamp(fMag * 0.1, 0.2, 3)} color={PALETTE.labText} />
      )}
    </group>
  );
}
