"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

// Auth call (signInWithPassword) is the official Supabase Next.js template pattern.
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/");
    router.refresh();
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-xl font-semibold text-ink">
          Sign in to PhysiQuest
        </h1>
        <p className="text-sm text-graphite">
          Pick up your sessions where you left them.
        </p>
      </div>
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
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <p className="text-sm text-ink" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-sm text-graphite">
        New here?{" "}
        <Link href="/signup" className="font-medium text-ink underline underline-offset-2">
          Create an account
        </Link>
      </p>
    </form>
  );
}
