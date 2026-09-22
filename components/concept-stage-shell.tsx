import Link from "next/link";
import { notFound } from "next/navigation";
import { getConcept } from "@/lib/concepts";
import { STAGES, type StageSlug } from "@/lib/concepts/stages";
import { ProgressRail } from "./concept/ProgressRail";

// The notebook chrome around every step: light paper, the progress rail, and a
// Fraunces step title. The dark lab lives *inside* the children (Explore only).
export function ConceptStageShell({
  conceptId,
  stage,
  children,
}: {
  conceptId: string;
  stage: StageSlug;
  children: React.ReactNode;
}) {
  const concept = getConcept(conceptId);
  if (!concept) notFound();
  const label = STAGES.find((s) => s.slug === stage)!.label;

  return (
    <div className="min-h-svh">
      <main className="mx-auto flex w-full max-w-[1040px] flex-col gap-6 px-6 py-8">
        <div className="flex items-center justify-between">
          <Link
            href="/concepts"
            className="text-sm font-medium text-ink-soft underline underline-offset-2 hover:text-ink"
          >
            Back to concepts
          </Link>
          <span className="text-sm text-ink-soft">{concept.domain}</span>
        </div>

        <h1 className="font-display text-h2 font-semibold text-ink">{concept.title}</h1>

        <ProgressRail conceptId={conceptId} active={stage} />

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-h4 font-medium text-ink">{label}</h2>
          {children}
        </section>
      </main>
    </div>
  );
}
