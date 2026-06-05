import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../lib/constants";
import { LoginForm } from "../../features/auth/components/LoginForm";
import { ResetForm } from "../../features/auth/components/ResetForm";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "reset">("signin");

  if (mode === "reset") {
    return (
      <div>
        <h1 className="font-display text-4xl text-jade-900">Reset password</h1>
        <p className="mb-7 mt-2.5 text-sm text-ink-500">
          We'll email you a link to set a new password.
        </p>
        <ResetForm onBack={() => setMode("signin")} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-4xl text-jade-900">Welcome back</h1>
      <p className="mb-7 mt-2.5 text-sm text-ink-500">Sign in to manage your retreats.</p>

      <LoginForm onForgot={() => setMode("reset")} />

      <p className="mt-6 text-center text-sm text-ink-500">
        New here?{" "}
        <Link to={ROUTES.signup} className="font-bold text-jade-700">
          Create an account
        </Link>
      </p>
    </div>
  );
}
