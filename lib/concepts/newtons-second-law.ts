import { ConceptModelSchema, type ConceptModel } from "@/lib/types/concept";

// FCI-grounded. Parsed at import so a malformed edit fails fast.
export const newtonsSecondLaw: ConceptModel = ConceptModelSchema.parse({
  id: "newtons-second-law",
  title: "Newton's Second Law",
  domain: "Classical Mechanics",
  core_principle:
    "The net force on a body equals its mass times its acceleration (F = ma). A constant net force produces a constant acceleration, and acceleration points along the net force.",
  claims: [
    { id: "f-eq-ma", text: "Net force equals mass times acceleration; a = F/m.", dimension: "conceptual" },
    { id: "force-accel", text: "A constant net force produces constant acceleration, so speed keeps increasing — it does not settle at a top speed.", dimension: "causal" },
    { id: "mass-inverse", text: "For the same force, a larger mass gets a smaller acceleration.", dimension: "conceptual" },
    { id: "accel-dir", text: "Acceleration points along the net force, not along the current velocity.", dimension: "causal" },
  ],
  misconceptions: [
    {
      id: "force-means-speed",
      belief: "A bigger force gives a bigger (constant) speed.",
      correction: "Force sets acceleration, not speed. A steady force means the speed keeps rising at a steady rate.",
      signals: ["more force means faster", "force gives speed", "bigger push bigger speed", "force keeps it at speed"],
      probe: "If you keep pushing a cart with the same steady force, does it settle at a top speed or keep speeding up?",
    },
    {
      id: "accel-along-motion",
      belief: "Acceleration is in the direction the object is moving, not the direction of the net force.",
      correction: "Acceleration always points along the net force; it can oppose the motion (slowing it) or turn it.",
      signals: ["acceleration follows motion", "accelerates in the direction it moves", "speeding means accelerating forward"],
      probe: "A cart is moving to the right but you push it to the left — which way does its acceleration point?",
    },
  ],
  prerequisites: ["net force", "velocity vs. acceleration", "mass"],
  transfer_scenarios: [
    {
      id: "elevator",
      prompt: "An elevator cable pulls up with a force greater than the car's weight. Describe the car's motion.",
      expected_reasoning: "Net upward force gives upward acceleration: the car speeds up going up (or slows going down). A constant net force means constant acceleration, not a fixed speed.",
    },
  ],
  simulation: { params: { force: 6, massA: 1, massB: 3 } },
});
