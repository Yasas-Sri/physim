import { ConceptModelSchema, type ConceptModel } from "@/lib/types/concept";

/** Flagship concept. Parsed through the schema so a malformed edit fails at import. */
export const newtonsFirstLaw: ConceptModel = ConceptModelSchema.parse({
  id: "newtons-first-law",
  title: "Newton's First Law",
  domain: "Classical Mechanics",
  core_principle:
    "An object's velocity stays constant unless a net external force acts on it. Motion does not require a force to continue; force is required to change motion.",
  claims: [
    { id: "inertia", text: "A body at constant velocity keeps that velocity with zero net force.", dimension: "conceptual" },
    { id: "friction-cause", text: "A puck slows because friction is a net force opposing motion, not because motion runs out.", dimension: "causal" },
    { id: "zero-friction", text: "With zero friction and no other force, the puck never stops.", dimension: "causal" },
    { id: "net-force", text: "Balanced forces (net zero) produce no change in velocity.", dimension: "conceptual" },
  ],
  misconceptions: [
    {
      id: "motion-needs-force",
      belief: "Motion requires a continuous force; when the force is 'used up' the object stops.",
      correction: "Force changes motion; constant motion needs no force. The puck slows only because friction acts on it.",
      signals: ["runs out of force", "uses up energy to move", "needs a push to keep going", "loses its force"],
    },
    {
      id: "heavier-stops-faster",
      belief: "Heavier objects stop sooner because they need more force to stay moving.",
      correction: "With the same friction coefficient, deceleration is independent of mass (a = μg).",
      signals: ["heavier stops faster", "mass makes it stop", "too heavy to keep moving"],
    },
  ],
  prerequisites: ["velocity vs. speed", "force as a vector", "net force"],
  transfer_scenarios: [
    {
      id: "spacecraft",
      prompt: "A spacecraft in deep space cuts its engines. What happens to its motion, and why?",
      expected_reasoning: "No net force (negligible friction/gravity) means constant velocity forever; it coasts, engines are not needed to keep moving.",
    },
    {
      id: "car-braking",
      prompt: "A car moving at constant speed on a flat road. The driver lifts off the gas but doesn't brake. Why does it eventually slow?",
      expected_reasoning: "Friction and air resistance are the net force; without the engine countering them the net force is nonzero, so velocity decreases. Not because motion 'runs out'.",
    },
  ],
  speechHints: [
    "Newton's first law",
    "inertia",
    "net force",
    "friction",
    "velocity",
    "constant velocity",
    "at rest",
    "in motion",
    "balanced forces",
  ],
});
