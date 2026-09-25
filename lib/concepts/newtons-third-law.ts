import { ConceptModelSchema, type ConceptModel } from "@/lib/types/concept";

// FCI-grounded. Parsed at import so a malformed edit fails fast.
export const newtonsThirdLaw: ConceptModel = ConceptModelSchema.parse({
  id: "newtons-third-law",
  title: "Newton's Third Law",
  domain: "Classical Mechanics",
  core_principle:
    "When one body exerts a force on a second, the second exerts an equal and opposite force on the first. The two forces act on different bodies, so they don't cancel.",
  claims: [
    { id: "equal-opposite", text: "When A pushes B, B pushes A with an equal and opposite force.", dimension: "conceptual" },
    { id: "different-accel", text: "The paired forces are equal, but the accelerations differ because a = F/m.", dimension: "causal" },
    { id: "pairs-different-bodies", text: "Action and reaction act on different bodies, so they don't cancel each other.", dimension: "conceptual" },
  ],
  misconceptions: [
    {
      id: "bigger-pushes-more",
      belief: "The heavier or bigger object exerts a larger force in an interaction.",
      correction: "The forces are exactly equal and opposite regardless of mass; only the accelerations differ, because the lighter body has less mass.",
      signals: ["heavier pushes harder", "bigger exerts more force", "truck pushes car harder", "more massive means more force"],
      probe: "A truck collides with a small car. Which one exerts the larger force on the other during the collision?",
    },
    {
      id: "wall-doesnt-push",
      belief: "The mover exerts a force, but a passive object like a wall doesn't push back.",
      correction: "The wall pushes back with an equal and opposite force; that reaction is exactly what your hand feels.",
      signals: ["wall doesn't push", "only the mover exerts force", "passive object exerts nothing", "wall just sits there"],
      probe: "You push on a wall and it doesn't move. Is the wall pushing back on you — and if so, how hard?",
    },
  ],
  prerequisites: ["force as a vector", "net force", "mass"],
  transfer_scenarios: [
    {
      id: "rocket",
      prompt: "A rocket in empty space expels gas backward and accelerates forward. Explain this with action and reaction.",
      expected_reasoning: "The rocket pushes gas backward; the gas pushes the rocket forward with an equal and opposite force. No ground or air is needed — the reaction force does it.",
    },
  ],
  simulation: { params: { force: 8, massA: 1, massB: 4 } },
});
