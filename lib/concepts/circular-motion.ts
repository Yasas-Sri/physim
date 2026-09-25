import { ConceptModelSchema, type ConceptModel } from "@/lib/types/concept";

// Misconceptions grounded in the Force Concept Inventory (FCI) — circular-motion
// items. Parsed at import so a malformed edit fails fast.
export const circularMotion: ConceptModel = ConceptModelSchema.parse({
  id: "uniform-circular-motion",
  title: "Uniform Circular Motion",
  domain: "Classical Mechanics",
  core_principle:
    "An object moving in a circle at constant speed is accelerating toward the centre. The net force is centripetal (inward), of magnitude m·v²/r. Remove it and the object continues in a straight line along the tangent.",
  claims: [
    { id: "centripetal-inward", text: "The net force on a body in circular motion points toward the centre.", dimension: "conceptual" },
    { id: "a-v2-r", text: "The centripetal acceleration is v²/r.", dimension: "calculation" },
    { id: "tangential-release", text: "If the force is removed, the body flies off along the tangent, not radially outward.", dimension: "causal" },
  ],
  misconceptions: [
    {
      id: "centrifugal-force",
      belief: "An outward (centrifugal) force acts on the ball as it goes around.",
      correction: "There is no outward force; the only net force is inward (centripetal). The outward feeling is inertia, not a force.",
      signals: ["centrifugal force", "outward force", "flung outward by a force", "force pushing it out"],
      probe: "As the ball circles on the string, name every force on it and the direction each points.",
    },
    {
      id: "flies-out-radially",
      belief: "When the string is released the ball flies straight outward along the radius.",
      correction: "With no force it obeys inertia and moves along the tangent — the direction it was already going — not along the radius.",
      signals: ["flies straight out", "shoots outward", "goes out along the radius", "outward in a straight line"],
      probe: "The instant you let go of the string, which way does the ball travel — outward along the radius, or off to the side?",
    },
  ],
  prerequisites: ["velocity as a vector", "net force", "Newton's first law"],
  transfer_scenarios: [
    {
      id: "hammer-throw",
      prompt: "A hammer thrower spins and releases the hammer. Which way does it go the instant it is released, and why?",
      expected_reasoning: "Along the tangent to the circle at the release point — inertia carries it in the direction it was already moving; no outward force acts once the cable is gone.",
    },
  ],
  simulation: { params: { radius: 2, speed: 3, mass: 1 } },
});
