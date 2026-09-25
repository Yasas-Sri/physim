import { ConceptModelSchema, type ConceptModel } from "@/lib/types/concept";

// Misconceptions grounded in the Force and Motion Conceptual Evaluation (FMCE)
// and oscillation-concept research. Parsed at import so a malformed edit fails fast.
export const simpleHarmonicMotion: ConceptModel = ConceptModelSchema.parse({
  id: "simple-harmonic-motion",
  title: "Simple Harmonic Motion",
  domain: "Classical Mechanics",
  core_principle:
    "A mass on a spring oscillates as x = A·cos(ωt), ω = √(k/m). Speed is greatest at the equilibrium point (x = 0) and zero at the turning points; the restoring force F = −kx is greatest at the turning points, where the speed is zero.",
  claims: [
    { id: "fastest-at-center", text: "Speed is greatest at the equilibrium point and zero at the extremes.", dimension: "causal" },
    { id: "force-at-extremes", text: "The restoring force is largest at the turning points and zero at the centre.", dimension: "causal" },
    { id: "energy-exchange", text: "Kinetic and potential energy trade off while the total stays constant.", dimension: "conceptual" },
  ],
  misconceptions: [
    {
      id: "fastest-at-ends",
      belief: "The mass moves fastest at the turning points (the ends of the motion).",
      correction: "It is momentarily at rest at the turning points and fastest at the centre, where all the energy is kinetic.",
      signals: ["fastest at the ends", "quickest at the extremes", "top speed at the turning points", "slowest in the middle"],
      probe: "At which point in its swing is the mass moving fastest — at the ends, or in the middle?",
    },
    {
      id: "force-tracks-speed",
      belief: "The restoring force is largest where the mass moves fastest.",
      correction: "The force F = −kx is largest where the displacement is largest (the turning points), exactly where the speed is zero.",
      signals: ["force largest where fastest", "most force in the middle", "force and speed peak together"],
      probe: "Where is the spring's pull on the mass strongest — where it moves fastest, or where it momentarily stops?",
    },
  ],
  prerequisites: ["restoring force", "Hooke's law", "energy conservation"],
  transfer_scenarios: [
    {
      id: "pendulum-bob",
      prompt: "A pendulum swings back and forth. Where is it moving fastest, and where is the restoring force on it greatest?",
      expected_reasoning: "Fastest at the bottom (equilibrium); the restoring force is greatest at the extremes of the swing, where it is momentarily at rest — the same pattern as a mass on a spring.",
    },
  ],
  simulation: { params: { amplitude: 2, k: 8, mass: 1 } },
});
