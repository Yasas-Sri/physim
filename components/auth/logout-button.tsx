"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    await createClient().auth.signOut();
    router.push("/login");
    router.refresh();
  };
  return (
    <button
      onClick={logout}
      className="text-sm font-medium text-graphite underline underline-offset-2 hover:text-ink"
    >
      Sign out
    </button>
  );
}
