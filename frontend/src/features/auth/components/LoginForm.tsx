import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Field, Input } from "../../../components/ui";
import { isApiClientError } from "../../../lib/api-client";
import { ROUTES } from "../../../lib/constants";
import { useAuth } from "../hooks/useAuth";
import { PasswordInput } from "./PasswordInput";

export function LoginForm({ onForgot }: { onForgot: () => void }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? ROUTES.events;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(isApiClientError(err) ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Field label="Email">
        {(id) => (
          <Input
            id={id}
            icon="mail"
            type="email"
            autoComplete="email"
            placeholder="you@hey.dev"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
      </Field>

      <Field label="Password">
        {(id) => (
          <PasswordInput
            id={id}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}
      </Field>

      {error && <p className="text-sm font-medium text-coral-600">{error}</p>}

      <button
        type="button"
        onClick={onForgot}
        className="justify-self-end text-sm font-semibold text-jade-700"
      >
        Forgot password?
      </button>

      <Button type="submit" size="lg" fullWidth disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
