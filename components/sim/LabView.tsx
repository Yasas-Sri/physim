"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// Sim registry. Adding a topic = one entry here + its sim component + its model.
// ssr:false because R3F/WebGL is client-only; dynamic import keeps <Canvas> out
// of SSR. (This lives in a client component — ssr:false isn't allowed in RSC.)
const loading = () => (
  <div className="flex h-[440px] items-center justify-center rounded border border-line bg-surface text-sm text-graphite">
    Loading simulation…
  </div>
);

const sims: Record<string, ComponentType> = {
  "newtons-first-law": dynamic(() => import("./NewtonsFirstLab3D").then((m) => m.NewtonsFirstLab3D), { ssr: false, loading }),
  "newtons-second-law": dynamic(() => import("./NewtonsSecondLab").then((m) => m.NewtonsSecondLab), { ssr: false, loading }),
  "newtons-third-law": dynamic(() => import("./NewtonsThirdLab").then((m) => m.NewtonsThirdLab), { ssr: false, loading }),
  "conservation-of-momentum": dynamic(() => import("./MomentumLab").then((m) => m.MomentumLab), { ssr: false, loading }),
  "conservation-of-energy": dynamic(() => import("./EnergyLab").then((m) => m.EnergyLab), { ssr: false, loading }),
  "uniform-circular-motion": dynamic(() => import("./CircularMotionLab").then((m) => m.CircularMotionLab), { ssr: false, loading }),
  "angular-momentum": dynamic(() => import("./AngularMomentumLab").then((m) => m.AngularMomentumLab), { ssr: false, loading }),
  "free-fall": dynamic(() => import("./FreeFallLab").then((m) => m.FreeFallLab), { ssr: false, loading }),
  "projectile-motion": dynamic(() => import("./ProjectileLab").then((m) => m.ProjectileLab), { ssr: false, loading }),
  "simple-harmonic-motion": dynamic(() => import("./SimpleHarmonicLab").then((m) => m.SimpleHarmonicLab), { ssr: false, loading }),
};

export function LabView({ conceptId }: { conceptId: string }) {
  const Sim = sims[conceptId];
  if (!Sim) {
    return (
      <div className="rounded border border-line bg-surface p-6">
        <p className="text-base text-ink">No simulation here yet.</p>
        <p className="mt-2 text-sm text-graphite">
          This concept doesn&apos;t have a lab built yet.
        </p>
      </div>
    );
  }
  return <Sim />;
}
