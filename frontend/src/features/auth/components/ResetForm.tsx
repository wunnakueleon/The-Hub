import { useState } from "react";
import { Button, Card, Field, Input } from "../../../components/ui";
import { Icon } from "../../../components/icons/Icon";
import { isApiClientError } from "../../../lib/api-client";
import { resetPassword } from "../api";

export function ResetForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(isApiClientError(err) ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <Card className="p-7 text-center">
        <span className="mx-auto mb-3.5 flex h-13 w-13 items-center justify-center rounded-full bg-jade-100 text-jade-700">
          <Icon name="mail" size={26} />
        </span>
        <h3 className="font-display text-2xl text-jade-900">Check your inbox</h3>
        <p className="mt-2 text-sm text-ink-500">
          If an account exists for <b>{email || "that email"}</b>, a reset link is on its way.
        </p>
        <Button variant="ghost" fullWidth className="mt-5" onClick={onBack}>
          Back to sign in
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Field label="Email">
        {(id) => (
          <Input id={id} icon="mail" type="email" autoComplete="email" placeholder="you@hey.dev"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
        )}
      </Field>

      {error && <p className="text-sm font-medium text-coral-600">{error}</p>}

      <Button type="submit" size="lg" fullWidth disabled={loading}>
        {loading ? "Sending…" : "Send reset link"}
      </Button>

      <button type="button" onClick={onBack} className="text-sm font-semibold text-jade-700">
        Back to sign in
      </button>
    </form>
  );
}
