"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

const NameSchema = z.string().trim().max(60);

// Edits the display name on the user's own profile row (RLS enforces id = auth.uid()).
export function ProfileForm({ userId, initialName }: { userId: string; initialName: string }) {
  const [name, setName] = useState(initialName);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = NameSchema.safeParse(name);
    if (!parsed.success) {
      setError("Keep your name under 60 characters.");
      setStatus("error");
      return;
    }
    setStatus("saving");
    setError("");
    const { error } = await createClient()
      .from("profiles")
      .update({ display_name: parsed.data.length > 0 ? parsed.data : null })
      .eq("id", userId);
    if (error) {
      setError("Couldn't save. Try again.");
      setStatus("error");
      return;
    }
    setStatus("saved");
    router.refresh();
  };

  return (
    <form onSubmit={save} className="flex flex-col gap-4">
      <Field
        label="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={60}
        placeholder="Your name"
      />
      {error && (
        <p className="text-sm text-gap-ink" role="alert">
          {error}
        </p>
      )}
      <div className="flex items-center gap-3">
        <Button type="submit" variant="signal" disabled={status === "saving"}>
          {status === "saving" ? "Saving…" : "Save"}
        </Button>
        {status === "saved" && <span className="text-sm text-signal-ink">Saved</span>}
      </div>
    </form>
  );
}
