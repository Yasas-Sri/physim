import type { ConceptModel } from "@/lib/types/concept";
import { newtonsFirstLaw } from "./newtons-first-law";
import { newtonsSecondLaw } from "./newtons-second-law";
import { newtonsThirdLaw } from "./newtons-third-law";
import { conservationOfMomentum } from "./momentum";
import { conservationOfEnergy } from "./energy";
import { circularMotion } from "./circular-motion";
import { angularMomentum } from "./angular-momentum";
import { freeFall } from "./free-fall";
import { projectileMotion } from "./projectile-motion";
import { simpleHarmonicMotion } from "./simple-harmonic-motion";

/** Concept registry. Add a concept = one entry here + its model file + a sim component. */
const all: ConceptModel[] = [
  newtonsFirstLaw,
  newtonsSecondLaw,
  newtonsThirdLaw,
  conservationOfMomentum,
  conservationOfEnergy,
  circularMotion,
  angularMomentum,
  freeFall,
  projectileMotion,
  simpleHarmonicMotion,
];

export const concepts: Record<string, ConceptModel> = Object.fromEntries(
  all.map((c) => [c.id, c]),
);

export const getConcept = (id: string): ConceptModel | undefined => concepts[id];
