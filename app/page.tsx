import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { STAGES } from "@/lib/concepts/stages";
import { getProfile, resolveDisplayName } from "@/lib/db/profile";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";

// Landing page shown after sign in. Hero + how-it-works, then into the catalogue.
export default async function Landing() {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const name = user ? resolveDisplayName(user, await getProfile(supabase, user.id)) : undefined;

  return (
    <div className="min-h-svh">
      <header className="mx-auto flex w-full max-w-[1040px] items-center justify-between px-6 py-5">
        <span className="text-sm font-semibold text-ink">PhysiQuest</span>
        <div className="flex items-center gap-4">
          {name && <span className="text-sm text-ink-soft">{name}</span>}
          <Link href="/profile" className="text-sm font-medium text-ink underline underline-offset-2">
            Profile
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1040px] flex-col gap-16 px-6 pb-20">
        <section className="flex flex-col gap-6 pt-12">
          <h1 className="max-w-[16ch] font-display text-hero font-semibold leading-none text-ink">
            Learn physics by teaching it.
          </h1>
          <p className="max-w-[60ch] text-lead text-ink-soft">
            Run a simulation, explain what you see in your own words, then let an AI
            student probe the gaps until you can reason it out — not just recite it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/concepts">
              <Button variant="signal">Browse experiments</Button>
            </Link>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-sm font-medium text-ink-soft">How it works</h2>
          <ol className="grid gap-4 sm:grid-cols-5">
            {STAGES.map((s, i) => (
              <li key={s.slug} className="flex flex-col gap-2 rounded-panel border border-paper-line bg-paper-panel p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-signal font-mono text-sm text-ink">
                  {i + 1}
                </span>
                <span className="font-display text-h4 text-ink">{s.label}</span>
                <span className="text-sm text-ink-soft">{HOW_IT_WORKS[s.slug]}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}

const HOW_IT_WORKS: Record<string, string> = {
  lab: "Observe the motion in the lab and predict what happens.",
  teach: "Explain why it behaves that way, in your own words.",
  student: "An AI student probes your explanation for gaps.",
  transfer: "Apply the idea to a fresh situation.",
  report: "See what changed, with the evidence.",
};
