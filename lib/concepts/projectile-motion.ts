import { ConceptModelSchema, type ConceptModel } from "@/lib/types/concept";

// Misconceptions grounded in the Force Concept Inventory (FCI) — projectile items.
// Parsed at import so a malformed edit fails fast.
export const projectileMotion: ConceptModel = ConceptModelSchema.parse({
  id: "projectile-motion",
  title: "Projectile Motion",
  domain: "Classical Mechanics",
  core_principle:
    "The horizontal and vertical motions of a projectile are independent. Horizontal velocity is constant (no horizontal force); vertical velocity changes under gravity alone. x = v·cosθ·t, y = v·sinθ·t − ½g t².",
  claims: [
    { id: "independent-axes", text: "Horizontal and vertical motion are independent of each other.", dimension: "conceptual" },
    { id: "vx-constant", text: "Horizontal velocity stays constant; only the vertical velocity changes.", dimension: "causal" },
    { id: "same-fall-time", text: "A horizontally launched object and a dropped object from the same height hit the ground at the same time.", dimension: "causal" },
  ],
  misconceptions: [
    {
      id: "coupled-motion",
      belief: "The horizontal and vertical motions affect each other (e.g. it must slow horizontally before it can fall).",
      correction: "They are independent: gravity changes only the vertical motion, while the horizontal velocity is unchanged the whole flight.",
      signals: ["has to slow down to fall", "horizontal affects vertical", "stops moving forward then drops", "forward motion delays the fall"],
      probe: "While the ball is in the air, does its forward (horizontal) speed change? Does that affect how fast it falls?",
    },
    {
      id: "different-fall-times",
      belief: "A ball fired horizontally stays up longer than one simply dropped from the same height.",
      correction: "Both hit the ground at the same time — the vertical motion is identical because horizontal velocity doesn't change the fall.",
      signals: ["fired ball lands later", "horizontal one stays up longer", "shooting keeps it up", "faster forward means longer flight"],
      probe: "One ball is dropped and another is fired horizontally from the same height at the same instant. Which lands first?",
    },
  ],
  prerequisites: ["vectors", "free fall", "velocity components"],
  transfer_scenarios: [
    {
      id: "bullet-drop",
      prompt: "A bullet is fired perfectly horizontally at the same instant an identical bullet is dropped from the same height. Which reaches the ground first?",
      expected_reasoning: "They land at the same time. Vertical motion is governed by gravity alone and is identical; the fired bullet's horizontal speed doesn't change its fall.",
    },
  ],
  simulation: { params: { speed: 8, angle: 45, g: 9.81, y0: 0.3 } },
});
