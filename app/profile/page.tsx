import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { concepts } from "@/lib/concepts";
import { getMasteryMap } from "@/lib/db/mastery";
import { getProfile } from "@/lib/db/profile";
import { conceptStatus } from "@/lib/report/status";
import { LogoutButton } from "@/components/auth/logout-button";
import { ProfileForm } from "@/components/profile/ProfileForm";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

export default async function ProfilePage() {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null; // middleware guards; defensive

  const profile = await getProfile(supabase, user.id);
  const mastery = await getMasteryMap(supabase, user.id);

  const all = Object.values(concepts);
  const statuses = all.map((c) => ({ concept: c, status: conceptStatus(mastery[c.id]) }));
  const started = statuses.filter((s) => s.status !== "not-started").length;
  const mastered = statuses.filter((s) => s.status === "mastered").length;
  const memberSince = fmtDate(profile?.created_at ?? user.created_at);

  return (
    <div className="min-h-svh">
      <header className="mx-auto flex w-full max-w-[1040px] items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-semibold text-ink">
          PhysiQuest
        </Link>
        <LogoutButton />
      </header>

      <main className="mx-auto flex w-full max-w-[720px] flex-col gap-10 px-6 pb-16">
        <h1 className="pt-6 font-display text-h2 font-semibold text-ink">Profile</h1>

        <section className="rounded-panel border border-paper-line bg-paper-panel p-6">
          <ProfileForm userId={user.id} initialName={profile?.display_name ?? ""} />
          <dl className="mt-6 flex flex-col gap-2 border-t border-paper-line pt-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Email</dt>
              <dd className="text-ink">{user.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Member since</dt>
              <dd className="text-ink">{memberSince}</dd>
            </div>
          </dl>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-ink-soft">Progress</h2>
          <div className="grid grid-cols-3 gap-4">
            <Stat value={all.length} label="experiments" />
            <Stat value={started} label="started" />
            <Stat value={mastered} label="mastered" tone />
          </div>

          {mastered > 0 && (
            <ul className="flex flex-wrap gap-2">
              {statuses
                .filter((s) => s.status === "mastered")
                .map((s) => (
                  <li key={s.concept.id}>
                    <Link
                      href={`/concept/${s.concept.id}/report`}
                      className="flex items-center gap-1.5 rounded-pill border border-signal bg-signal-wash px-3 py-1 text-sm text-signal-ink"
                    >
                      <span aria-hidden>✓</span> {s.concept.title}
                    </Link>
                  </li>
                ))}
            </ul>
          )}

          <Link href="/concepts" className="text-sm font-medium text-signal-ink underline underline-offset-2">
            Browse experiments
          </Link>
        </section>
      </main>
    </div>
  );
}

function Stat({ value, label, tone }: { value: number; label: string; tone?: boolean }) {
  return (
    <div className="rounded-panel border border-paper-line bg-paper-panel p-4">
      <p className={"font-mono text-h3 " + (tone ? "text-signal-ink" : "text-ink")}>{value}</p>
      <p className="text-sm text-ink-soft">{label}</p>
    </div>
  );
}
