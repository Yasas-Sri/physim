import { ConceptModelSchema, type ConceptModel } from "@/lib/types/concept";

// Misconceptions grounded in the Force Concept Inventory (FCI) — free-fall items.
// Parsed at import so a malformed edit fails fast.
export const freeFall: ConceptModel = ConceptModelSchema.parse({
  id: "free-fall",
  title: "Free Fall & Independence of Mass",
  domain: "Classical Mechanics",
  core_principle:
    "In free fall all objects accelerate at the same rate g regardless of mass: y(t) = y0 − ½g t². Two different masses dropped in a vacuum land together. Only air resistance can make a lighter object lag.",
  claims: [
    { id: "same-accel", text: "In a vacuum every object falls with the same acceleration g, independent of mass.", dimension: "conceptual" },
    { id: "land-together", text: "Two different masses dropped from the same height in a vacuum land at the same time.", dimension: "causal" },
    { id: "air-is-the-difference", text: "When a feather falls slower than a coin, air resistance is the cause — not weight.", dimension: "causal" },
  ],
  misconceptions: [
    {
      id: "heavier-falls-faster",
      belief: "Heavier objects fall faster than lighter ones.",
      correction: "In a vacuum they fall identically (same g). Weight also scales the inertia, so the acceleration is the same; only air resistance separates them.",
      signals: ["heavier falls faster", "more weight falls quicker", "heavy hits first", "mass makes it drop faster"],
      probe: "You drop a bowling ball and a golf ball from the same height in a vacuum. Which lands first?",
    },
  ],
  prerequisites: ["acceleration", "gravity", "mass vs. weight"],
  transfer_scenarios: [
    {
      id: "moon-hammer-feather",
      prompt: "On the airless Moon an astronaut drops a hammer and a feather together. What happens, and why?",
      expected_reasoning: "They land together: with no air, both accelerate at the Moon's g regardless of mass. On Earth the feather lags only because of air resistance.",
    },
  ],
  simulation: { params: { y0: 6, massA: 1, massB: 5, g: 9.81, drag: 0.8 } },
});
