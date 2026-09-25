import { ConceptModelSchema, type ConceptModel } from "@/lib/types/concept";

// Misconceptions grounded in the Rotational and Rolling Motion Conceptual Survey
// (RRMCS) and related rotational-motion inventories. Parsed at import.
export const angularMomentum: ConceptModel = ConceptModelSchema.parse({
  id: "angular-momentum",
  title: "Conservation of Angular Momentum",
  domain: "Classical Mechanics",
  core_principle:
    "With no external torque, angular momentum L = I·ω is conserved. Pulling mass inward lowers the moment of inertia I, so the angular speed ω rises to keep L constant.",
  claims: [
    { id: "l-conserved", text: "With no external torque, L = I·ω stays constant.", dimension: "conceptual" },
    { id: "i-omega-tradeoff", text: "Reducing I (mass pulled in) increases ω, and vice versa.", dimension: "causal" },
    { id: "not-energy", text: "The spin-up follows from conserved angular momentum, not from angular momentum being created.", dimension: "conceptual" },
  ],
  misconceptions: [
    {
      id: "speedup-from-nowhere",
      belief: "The skater speeds up out of nowhere — angular momentum (or 'spin energy') is created by pulling the arms in.",
      correction: "Angular momentum is conserved, not created. ω rises only because I falls; nothing is added. (Rotational KE does rise, supplied by the work the skater does pulling in.)",
      signals: ["speed comes from nowhere", "creates angular momentum", "gains momentum for free", "spin energy appears"],
      probe: "When the skater pulls their arms in and spins faster, where does the extra spin come from?",
    },
  ],
  prerequisites: ["moment of inertia", "angular velocity", "torque"],
  transfer_scenarios: [
    {
      id: "neutron-star",
      prompt: "A large slow-spinning star collapses into a tiny neutron star that spins hundreds of times per second. Why does it spin so fast?",
      expected_reasoning: "Angular momentum is conserved; as the radius (and thus I) shrinks enormously, ω must rise to keep L = I·ω constant.",
    },
  ],
  simulation: { params: { L: 8, coreI: 1, pointMass: 1, radius: 2 } },
});
