import { ConceptModelSchema, type ConceptModel } from "@/lib/types/concept";

// FCI-grounded. Parsed at import so a malformed edit fails fast.
export const conservationOfMomentum: ConceptModel = ConceptModelSchema.parse({
  id: "conservation-of-momentum",
  title: "Conservation of Momentum",
  domain: "Classical Mechanics",
  core_principle:
    "With no external force, the total momentum of a system is the same before and after a collision. Momentum is transferred between bodies, never used up.",
  claims: [
    { id: "p-conserved", text: "With no external force, total momentum before a collision equals total after.", dimension: "conceptual" },
    { id: "exchange", text: "Momentum is transferred between the bodies, not destroyed.", dimension: "causal" },
    { id: "vector-sum", text: "Total momentum is the vector sum m₁v₁ + m₂v₂.", dimension: "calculation" },
  ],
  misconceptions: [
    {
      id: "momentum-used-up",
      belief: "Momentum is used up or lost during a collision.",
      correction: "In an isolated collision the total momentum is conserved; it is redistributed between the bodies, never used up.",
      signals: ["momentum is used up", "momentum lost in collision", "collision destroys momentum", "momentum runs out"],
      probe: "Before the collision the two carts have some total momentum. Immediately after, is the total more, less, or the same?",
    },
  ],
  prerequisites: ["velocity as a vector", "mass", "Newton's third law"],
  transfer_scenarios: [
    {
      id: "skaters",
      prompt: "Two stationary ice skaters push off each other. What can you say about their momenta afterward?",
      expected_reasoning: "Total momentum stays zero: they move apart with equal and opposite momenta (the lighter skater faster). Momentum is conserved, not created or used up.",
    },
  ],
  simulation: { params: { m1: 1, m2: 2, u1: 2.5, u2: 0, radius: 0.5, x1: -3, x2: 1 } },
});
