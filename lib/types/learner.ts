import { z } from "zod";

/**
 * LearnerState — the seven mastery dimensions tracked per (user, concept).
 * Each score is 0..1 (0 = no evidence yet, 1 = strong evidence of mastery).
 * misconception_risk is inverted: high = the misconception is likely present.
 */
export const MasteryDimension = z.enum([
  "conceptual",
  "causal",
  "transfer",
  "explanation",
  "calculation",
  "misconception_risk",
  "confidence_calibration",
]);
export type MasteryDimension = z.infer<typeof MasteryDimension>;

export const LearnerStateSchema = z.object({
  conceptual: z.number().min(0).max(1),
  causal: z.number().min(0).max(1),
  transfer: z.number().min(0).max(1),
  explanation: z.number().min(0).max(1),
  calculation: z.number().min(0).max(1),
  misconception_risk: z.number().min(0).max(1),
  confidence_calibration: z.number().min(0).max(1),
});
export type LearnerState = z.infer<typeof LearnerStateSchema>;

/** A fresh learner: no evidence either way. */
export const initialLearnerState = (): LearnerState => ({
  conceptual: 0,
  causal: 0,
  transfer: 0,
  explanation: 0,
  calculation: 0,
  misconception_risk: 0.5,
  confidence_calibration: 0.5,
});
