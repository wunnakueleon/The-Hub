import { useState } from "react";
import type { User, BookingStatus } from "../../../types";
import { formatDateRange } from "../../../lib/format";
import { Avatar, Button, Card, Field, Input, Textarea, StatusBadge } from "../../../components/ui";
import { Icon } from "../../../components/icons/Icon";
import { useMyBookings } from "../../booking/hooks/useMyBookings";
import { useProfile } from "../hooks/useProfile";

export function ProfileForm({ user }: { user: User }) {
  const { update, saving, saved, error, clearSaved } = useProfile();
  const { bookings } = useMyBookings();

  const [form, setForm] = useState({
    name: user.name,
    github: user.github ?? "",
    skills: user.skills.join(", "),
    bio: user.bio ?? "",
  });

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    clearSaved();
  };

  const skills = form.skills.split(",").map((s) => s.trim()).filter(Boolean);
  const attended = bookings.filter((b) => b.status !== "cancelled");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await update({
        name: form.name,
        bio: form.bio.trim() || undefined,
        github: form.github.trim() || undefined,
        skills,
      });
    } catch {
      // error surfaced by the hook
    }
  }

  return (
    <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[300px_1fr]">
      {/* Live preview */}
      <Card className="p-7 text-center lg:sticky lg:top-[88px]">
        <Avatar name={form.name || "You"} hue={user.hue} size={96} className="mx-auto" />
        <h3 className="mt-4 font-display text-2xl text-jade-900">{form.name || "Your name"}</h3>
        <p className="mt-0.5 text-sm text-ink-400">{user.email}</p>
        {form.github && (
          <div className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-jade-700">
            <Icon name="github" size={15} /> {form.github.replace("github.com/", "")}
          </div>
        )}
        {skills.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {skills.map((s, i) => (
              <span
                key={i}
                className="rounded-pill border border-sand-300 bg-sand-200 px-2.5 py-1 text-xs font-medium text-ink-700"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </Card>

      {/* Edit + retreats */}
      <div className="grid gap-6">
        <Card className="p-7">
          <h3 className="mb-4 font-display text-xl text-jade-900">Edit details</h3>
          <form onSubmit={onSubmit} className="grid gap-4">
            <Field label="Full name">
              {(id) => <Input id={id} icon="user" value={form.name} onChange={set("name")} required />}
            </Field>
            <Field label="GitHub / portfolio">
              {(id) => <Input id={id} icon="github" value={form.github} onChange={set("github")} placeholder="github.com/you" />}
            </Field>
            <Field label="Tech stack / skills" hint="Comma-separated">
              {(id) => <Input id={id} icon="settings" value={form.skills} onChange={set("skills")} placeholder="Rust, TypeScript, Postgres" />}
            </Field>
            <Field label="Short bio">
              {(id) => <Textarea id={id} value={form.bio} onChange={set("bio")} placeholder="What do you like to build?" />}
            </Field>

            {error && <p className="text-sm font-medium text-coral-600">{error}</p>}

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving…" : "Save changes"}
              </Button>
              {saved && (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-jade-700">
                  <Icon name="check" size={16} /> Saved
                </span>
              )}
            </div>
          </form>
        </Card>

        <Card className="p-7">
          <h3 className="font-display text-xl text-jade-900">Your retreats</h3>
          <p className="mb-4 mt-1 text-sm text-ink-500">Upcoming and past stays.</p>
          {attended.length === 0 ? (
            <p className="text-sm text-ink-400">No retreats booked yet.</p>
          ) : (
            <div className="grid gap-2.5">
              {attended.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center gap-3.5 rounded-md border border-sand-200 bg-sand-50 px-3.5 py-3"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-jade-100 text-jade-700">
                    <Icon name="map-pin" size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-jade-900">{b.event.name}</div>
                    <div className="text-xs text-ink-400">
                      {formatDateRange(b.event.startDate, b.event.endDate)}
                    </div>
                  </div>
                  <StatusBadge status={b.status as BookingStatus} />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
