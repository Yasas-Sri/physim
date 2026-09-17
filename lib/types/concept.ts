import { z } from "zod";
import { MasteryDimension } from "./learner";

/**
 * ConceptModel — the schema-driven definition of one physics concept.
 * Adding a concept = author one of these (+ one sim component). The AI engine,
 * planner, and report read this; they are never edited to add a concept.
 */

export const ClaimSchema = z.object({
  id: z.string(),
  text: z.string(),
  /** Which mastery dimension answering around this claim gives evidence for. */
  dimension: MasteryDimension,
});
export type Claim = z.infer<typeof ClaimSchema>;

export const MisconceptionSchema = z.object({
  id: z.string(),
  /** The false belief, stated plainly (never shown to the learner first). */
  belief: z.string(),
  /** Why it's wrong — the correct reasoning the learner should reach. */
  correction: z.string(),
  /** Phrases in an explanation that hint this misconception is present. */
  signals: z.array(z.string()),
  /**
   * Canonical Force-Concept-Inventory-style probing question that surfaces this
   * misconception. Optional documentation of the intended probe; the runtime
   * still generates questions from belief/correction (engine unchanged).
   */
  probe: z.string().optional(),
});
export type Misconception = z.infer<typeof MisconceptionSchema>;

export const TransferScenarioSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  /** What correct transfer reasoning looks like — the evaluator's rubric. */
  expected_reasoning: z.string(),
});
export type TransferScenario = z.infer<typeof TransferScenarioSchema>;

/**
 * Numeric scenario parameters for a concept's 3D simulation. The sim's PURE
 * /lib physics functions are driven entirely by these — the ConceptModel stays
 * the ground truth, no black-box physics engine. Free-form numeric bag so the
 * schema stays topic-agnostic; each topic's /lib reader gives them meaning.
 */
export const SimulationSchema = z.object({
  params: z.record(z.string(), z.number()),
});
export type Simulation = z.infer<typeof SimulationSchema>;

export const ConceptModelSchema = z.object({
  id: z.string(),
  title: z.string(),
  domain: z.string(),
  core_principle: z.string(),
  claims: z.array(ClaimSchema).min(1),
  misconceptions: z.array(MisconceptionSchema).min(1),
  prerequisites: z.array(z.string()),
  transfer_scenarios: z.array(TransferScenarioSchema).min(1),
  simulation: SimulationSchema.optional(),
  /**
   * Canonical physics terms used to prime the speech-to-text vocabulary so words
   * like "inertia"/"centripetal" come back spelled correctly. Optional and
   * backward-compatible (defaults to []) — presentation/input concern only.
   */
  speechHints: z.array(z.string()).default([]),
});
export type ConceptModel = z.infer<typeof ConceptModelSchema>;
