"use client";

import { useMemo } from "react";
import { ArrowHelper, Vector3 } from "three";

// A single force/velocity vector, drawn with three's ArrowHelper. Presentational
// only — direction/length/origin come from the pure physics state each frame.
export function Arrow3D({
  origin,
  dir,
  length,
  color,
}: {
  origin: [number, number, number];
  dir: [number, number, number];
  length: number;
  color: string;
}) {
  const arrow = useMemo(() => new ArrowHelper(), []);
  const d = new Vector3(dir[0], dir[1], dir[2]);
  if (d.lengthSq() > 0) d.normalize();
  const len = Math.max(0.001, length);
  arrow.position.set(origin[0], origin[1], origin[2]);
  arrow.setDirection(d);
  arrow.setLength(len, Math.min(0.4, len * 0.35), Math.min(0.25, len * 0.2));
  arrow.setColor(color);
  return <primitive object={arrow} />;
}
