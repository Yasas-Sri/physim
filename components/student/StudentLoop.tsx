"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EvaluationSchema, type Evaluation } from "@/lib/ai/schemas";
import { MAX_QUESTIONS } from "@/lib/planner/types";
import { LearnerStateSchema, type LearnerState } from "@/lib/types/learner";
import type { Misconception } from "@/lib/types/concept";
import { Button } from "@/components/ui/button";
import { MasterySummary } from "./MasterySummary";
import { StudentTurn } from "./StudentTurn";
import { GapCard, GapClosedChip } from "./GapCard";

const ProbeSchema = z.object({ kind: z.string(), targetId: z.string() });
const NextSchema = z.union([
  z.object({ done: z.literal(true), reason: z.string() }),
  z.object({
    done: z.literal(false),
    questionEventId: z.string(),
    question: z.string(),
    probe: ProbeSchema,
  }),
]);
const EvalRespSchema = z.object({ evaluation: EvaluationSchema, learnerState: LearnerStateSchema });

type Phase = "loading" | "question" | "evaluating" | "feedback" | "done" | "error";
type ClosedGap = { id: string; label: string };

export function StudentLoop({
  sessionId,
  conceptId,
  misconceptions,
}: {
  sessionId: string;
  conceptId: string;
  misconceptions: Misconception[];
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("loading");
  const [question, setQuestion] = useState("");
  const [questionEventId, setQuestionEventId] = useState("");
  const [probe, setProbe] = useState<{ kind: string; targetId: string } | null>(null);
  const [answer, setAnswer] = useState("");
  const [asked, setAsked] = useState(0);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [state, setState] = useState<LearnerState | null>(null);
  const [doneReason, setDoneReason] = useState("");
  const [closedGaps, setClosedGaps] = useState<ClosedGap[]>([]);
  const [error, setError] = useState("");
  const started = useRef(false);

  // The confirmed misconception this turn (if any) → render its AUTHORED gap card.
  const activeGap =
    phase === "feedback" && evaluation?.misconception_confirmed && probe?.kind === "misconception"
      ? misconceptions.find((m) => m.id === probe.targetId) ?? null
      : null;

  const loadNext = useCallback(async () => {
    setPhase("loading");
    setError("");
    try {
      const res = await fetch("/api/questions/next", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setError((body?.error as string) ?? "Couldn't load the next question.");
        setPhase("error");
        return;
      }
      const parsed = NextSchema.safeParse(body);
      if (!parsed.success) {
        setError("The loop returned an unexpected response.");
        setPhase("error");
        return;
      }
      if (parsed.data.done) {
        setDoneReason(parsed.data.reason);
        setPhase("done");
        return;
      }
      setQuestion(parsed.data.question);
      setQuestionEventId(parsed.data.questionEventId);
      setProbe(parsed.data.probe);
      setAnswer("");
      setAsked((n) => n + 1);
      setPhase("question");
    } catch {
      setError("Couldn't reach the loop. Check your connection.");
      setPhase("error");
    }
  }, [sessionId]);

  const submitAnswer = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setPhase("evaluating");
      setError("");
      try {
        const res = await fetch("/api/answers/evaluate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ questionEventId, answer }),
        });
        const body = await res.json().catch(() => null);
        if (!res.ok) {
          setError((body?.error as string) ?? "Couldn't evaluate that answer.");
          setPhase("error");
          return;
        }
        const parsed = EvalRespSchema.safeParse(body);
        if (!parsed.success) {
          setError("The evaluator returned an unexpected response.");
          setPhase("error");
          return;
        }
        setEvaluation(parsed.data.evaluation);
        setState(parsed.data.learnerState);
        setPhase("feedback");
      } catch {
        setError("Couldn't reach the evaluator. Check your connection.");
        setPhase("error");
      }
    },
    [questionEventId, answer],
  );

  const closeGap = () => {
    if (probe) {
      const m = misconceptions.find((x) => x.id === probe.targetId);
      setClosedGaps((g) =>
        g.some((x) => x.id === probe.targetId)
          ? g
          : [...g, { id: probe.targetId, label: m?.belief.split(";")[0] ?? probe.targetId }],
      );
    }
    void loadNext();
  };

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void loadNext();
  }, [loadNext]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-ink-soft">
          Question {Math.min(asked, MAX_QUESTIONS)} of up to {MAX_QUESTIONS}
        </p>
        {closedGaps.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {closedGaps.map((g) => (
              <GapClosedChip key={g.id} label={g.label} />
            ))}
          </div>
        )}
      </div>

      {phase === "loading" && <p className="text-sm text-ink-soft">Thinking of a question…</p>}

      {phase === "error" && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-ink" role="alert">
            {error}
          </p>
          <Button variant="secondary" onClick={() => void loadNext()}>
            Try again
          </Button>
        </div>
      )}

      {(phase === "question" || phase === "evaluating") && (
        <form onSubmit={submitAnswer} className="flex flex-col gap-4">
          <StudentTurn role="student" text={question} />
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            required
            maxLength={5000}
            placeholder="Answer in your own words — reasoning matters more than the right keyword."
            className="w-full rounded-control border border-paper-line bg-paper-panel p-3 text-base text-ink placeholder:text-ink-soft"
          />
          <div>
            <Button type="submit" variant="signal" disabled={phase === "evaluating" || answer.trim().length === 0}>
              {phase === "evaluating" ? "Weighing your answer…" : "Answer"}
            </Button>
          </div>
        </form>
      )}

      {phase === "feedback" && evaluation && (
        <div className="flex flex-col gap-4">
          <StudentTurn role="student" text={question} />
          <StudentTurn role="learner" text={answer} />

          {activeGap ? (
            <GapCard
              evidence={evaluation.evidence}
              probe={activeGap.probe ?? question}
              correction={activeGap.correction}
              onRevise={() => router.push(`/concept/${conceptId}/teach`)}
              onClose={closeGap}
            />
          ) : (
            <div className="rounded-panel border border-paper-line border-l-4 border-l-signal bg-signal-wash p-4">
              <p className="text-sm text-ink">{evaluation.evidence}</p>
              <p className="tabular mt-1 font-mono text-mono-sm text-ink-soft">
                evidence strength {evaluation.score.toFixed(2)}
              </p>
            </div>
          )}

          {state && <MasterySummary state={state} />}
          {!activeGap && (
            <div>
              <Button variant="signal" onClick={() => void loadNext()}>
                Continue
              </Button>
            </div>
          )}
        </div>
      )}

      {phase === "done" && (
        <div className="flex flex-col gap-4">
          <p className="font-display text-lead text-ink">
            {doneReason === "mastery"
              ? "You reasoned this out consistently. That's enough probing here."
              : "That's the question budget for this round."}
          </p>
          {state && <MasterySummary state={state} />}
          <div className="flex flex-wrap gap-3">
            <Link href={`/concept/${conceptId}/transfer`}>
              <Button variant="signal">Try a transfer task</Button>
            </Link>
            <Link href={`/concept/${conceptId}/report`}>
              <Button variant="secondary">See the report</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
