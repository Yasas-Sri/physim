"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

// Auth call (signUp) is the official Supabase Next.js template pattern.
// Email confirmation is currently disabled in the Supabase project, so signUp
// returns a session immediately and we can go straight to the app. When
// confirmation is turned on for the deploy, add options.emailRedirectTo and an
// /auth/confirm route (see the official template).
export function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const name = username.trim();
    // Store the username in user metadata (resilient) and on the profile row.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ display_name: name })
        .eq("id", data.user.id);
      // Non-fatal: metadata already carries the name; the user can also edit it
      // later on their profile. Log rather than block the signup.
      if (profileError) console.warn("Couldn't save username to profile:", profileError.message);
    }
    router.push("/");
    router.refresh();
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-xl font-semibold text-ink">
          Create your account
        </h1>
        <p className="text-sm text-graphite">
          Start teaching a concept and see what you actually understand.
        </p>
      </div>
      <Field
        label="Username"
        type="text"
        required
        minLength={2}
        maxLength={30}
        placeholder="e.g. ada"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Field
        label="Email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Field
        label="Password"
        type="password"
        required
        minLength={6}
        placeholder="At least 6 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <p className="text-sm text-ink" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating your account…" : "Create account"}
      </Button>
      <p className="text-sm text-graphite">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-ink underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </form>
  );
}
