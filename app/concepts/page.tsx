import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { concepts } from "@/lib/concepts";
import { getMasteryMap } from "@/lib/db/mastery";
import { getProfile, resolveDisplayName } from "@/lib/db/profile";
import { conceptStatus, masteryPercent } from "@/lib/report/status";
import { LogoutButton } from "@/components/auth/logout-button";
import { ConceptRow } from "@/components/catalogue/ConceptRow";

// The experiment catalogue (NewDesign.md §6.9). Per-concept status comes from the
// user's persisted mastery.
export default async function ConceptsPage() {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const mastery = user ? await getMasteryMap(supabase, user.id) : {};
  const name = user ? resolveDisplayName(user, await getProfile(supabase, user.id)) : undefined;

  return (
    <div className="min-h-svh">
      <header className="mx-auto flex w-full max-w-[1040px] items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-semibold text-ink">
          PhysiQuest
        </Link>
        <div className="flex items-center gap-4">
          {name && <span className="text-sm text-ink-soft">{name}</span>}
          <Link href="/profile" className="text-sm font-medium text-ink underline underline-offset-2">
            Profile
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1040px] flex-col gap-8 px-6 pb-16">
        <div className="flex flex-col gap-2 pt-6">
          <h1 className="font-display text-h2 font-semibold text-ink">Experiments</h1>
          <p className="max-w-[60ch] text-lead text-ink-soft">
            Pick a concept, run it, then teach it back. Your status on each is saved as you go.
          </p>
        </div>

        <section className="flex flex-col gap-3">
          {Object.values(concepts).map((c) => {
            const state = mastery[c.id];
            return (
              <ConceptRow
                key={c.id}
                id={c.id}
                title={c.title}
                description={c.core_principle}
                status={conceptStatus(state)}
                percent={masteryPercent(state)}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
}
