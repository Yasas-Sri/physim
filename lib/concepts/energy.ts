import { ConceptModelSchema, type ConceptModel } from "@/lib/types/concept";

// FCI-grounded. Parsed at import so a malformed edit fails fast.
export const conservationOfEnergy: ConceptModel = ConceptModelSchema.parse({
  id: "conservation-of-energy",
  title: "Conservation of Energy",
  domain: "Classical Mechanics",
  core_principle:
    "Without friction, kinetic and potential energy trade back and forth while their sum stays constant. A frictionless pendulum returns to exactly its starting height — never higher, never lower.",
  claims: [
    { id: "total-constant", text: "Without friction, kinetic + potential energy stays constant.", dimension: "conceptual" },
    { id: "exchange-ke-pe", text: "Energy converts between KE and PE: all KE at the bottom, all PE at the extremes.", dimension: "causal" },
    { id: "return-height", text: "A frictionless pendulum returns to exactly its starting height, never higher.", dimension: "causal" },
  ],
  misconceptions: [
    {
      id: "energy-used-up",
      belief: "Energy gets used up as the object moves, so it should gradually lose height.",
      correction: "Without friction no energy leaves the system; KE and PE trade off and the total is constant, so it returns to the same height each swing.",
      signals: ["energy is used up", "energy runs out", "loses energy each swing", "should slow down and stop"],
      probe: "A frictionless pendulum is released from a height. After many swings, how high does it rise on each side?",
    },
    {
      id: "returns-higher",
      belief: "A swinging or rolling object can return higher than it started.",
      correction: "It can at most return to its starting height; going higher would create energy from nothing.",
      signals: ["comes back higher", "gains height", "swings higher than the start"],
      probe: "Could the pendulum ever swing higher than the point you released it from? Why or why not?",
    },
  ],
  prerequisites: ["kinetic energy", "potential energy", "gravity"],
  transfer_scenarios: [
    {
      id: "ramp",
      prompt: "A frictionless ball rolls down a ramp and up another. How high does it reach on the far side compared with its start?",
      expected_reasoning: "The same height. PE converts to KE and back with a constant total, so it can reach — but not exceed — its starting height.",
    },
  ],
  simulation: { params: { length: 2, gravity: 9.81, mass: 1, theta0: 1.0 } },
});
