import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Field, Input, Textarea } from "../../../components/ui";
import { isApiClientError } from "../../../lib/api-client";
import { ROUTES } from "../../../lib/constants";
import { useAuth } from "../hooks/useAuth";
import { PasswordInput } from "./PasswordInput";

export function SignUpForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    github: "",
    skills: "",
    bio: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        github: form.github.trim() || undefined,
        bio: form.bio.trim() || undefined,
        skills: form.skills
          ? form.skills.split(",").map((s) => s.trim()).filter(Boolean)
          : undefined,
      });
      navigate(ROUTES.events, { replace: true });
    } catch (err) {
      setError(isApiClientError(err) ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Field label="Full name">
        {(id) => (
          <Input id={id} icon="user" autoComplete="name" placeholder="Mei Tan"
            value={form.name} onChange={set("name")} required />
        )}
      </Field>

      <Field label="Email">
        {(id) => (
          <Input id={id} icon="mail" type="email" autoComplete="email" placeholder="you@hey.dev"
            value={form.email} onChange={set("email")} required />
        )}
      </Field>

      <Field label="Password" hint="At least 8 characters">
        {(id) => (
          <PasswordInput id={id} autoComplete="new-password" placeholder="••••••••"
            value={form.password} onChange={set("password")} required minLength={8} />
        )}
      </Field>

      <div className="my-1 flex items-center gap-2.5">
        <hr className="h-px flex-1 border-0 bg-sand-300" />
        <span className="text-xs font-medium text-ink-400">Optional — helps others find you</span>
        <hr className="h-px flex-1 border-0 bg-sand-300" />
      </div>

      <Field label="GitHub / portfolio">
        {(id) => (
          <Input id={id} icon="github" placeholder="github.com/you"
            value={form.github} onChange={set("github")} />
        )}
      </Field>

      <Field label="Tech stack / skills" hint="Comma-separated">
        {(id) => (
          <Input id={id} icon="settings" placeholder="Rust, TypeScript, Postgres"
            value={form.skills} onChange={set("skills")} />
        )}
      </Field>

      <Field label="Short bio">
        {(id) => (
          <Textarea id={id} placeholder="What do you like to build?"
            value={form.bio} onChange={set("bio")} />
        )}
      </Field>

      {error && <p className="text-sm font-medium text-coral-600">{error}</p>}

      <Button type="submit" size="lg" fullWidth disabled={loading}>
        {loading ? "Creating account…" : "Create account & continue"}
      </Button>
    </form>
  );
}
