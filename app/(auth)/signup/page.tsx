import { SignUpForm } from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-paper p-6">
      <div className="w-full max-w-sm rounded border border-line bg-surface p-8">
        <SignUpForm />
      </div>
    </main>
  );
}
