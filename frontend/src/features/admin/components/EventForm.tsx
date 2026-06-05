import { useEffect, useState } from "react";
import type { AdminEventRow, EventInput } from "../types";
import { Button, Field, Input, Select, Textarea } from "../../../components/ui";
import { Modal } from "../../../components/ui";

interface EventFormProps {
  open: boolean;
  editing: AdminEventRow | null;
  onClose: () => void;
  onSubmit: (input: EventInput) => Promise<void> | void;
  saving?: boolean;
  error?: string | null;
}

const EMPTY = {
  name: "",
  island: "",
  villa: "",
  startDate: "",
  endDate: "",
  season: "",
  tagline: "",
  desc: "",
  capacity: 20,
  published: false,
};

export function EventForm({ open, editing, onClose, onSubmit, saving, error }: EventFormProps) {
  const [form, setForm] = useState({ ...EMPTY });

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setForm({
        name: editing.name,
        island: editing.island,
        villa: editing.villa,
        startDate: editing.startDate.slice(0, 10),
        endDate: editing.endDate.slice(0, 10),
        season: editing.season,
        tagline: editing.tagline,
        desc: editing.desc,
        capacity: editing.capacity,
        published: editing.published,
      });
    } else {
      setForm({ ...EMPTY });
    }
  }, [open, editing]);

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({
        ...f,
        [key]: key === "capacity" ? Number(e.target.value) : e.target.value,
      }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit({ ...form });
  }

  return (
    <Modal open={open} onClose={onClose} title={editing ? "Edit event" : "Create event"} size="lg">
      <form onSubmit={submit} className="grid gap-4">
        <Field label="Event name">
          {(id) => <Input id={id} value={form.name} onChange={set("name")} placeholder="Koh Tao — Reef Retreat" required />}
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Island / region">
            {(id) => <Input id={id} icon="map-pin" value={form.island} onChange={set("island")} placeholder="Koh Tao, Surat Thani" required />}
          </Field>
          <Field label="Villa">
            {(id) => <Input id={id} icon="leaf" value={form.villa} onChange={set("villa")} placeholder="Coral House" required />}
          </Field>
          <Field label="Start date">
            {(id) => <Input id={id} type="date" value={form.startDate} onChange={set("startDate")} required />}
          </Field>
          <Field label="End date">
            {(id) => <Input id={id} type="date" value={form.endDate} onChange={set("endDate")} required />}
          </Field>
          <Field label="Season">
            {(id) => <Input id={id} value={form.season} onChange={set("season")} placeholder="Spring 2027" required />}
          </Field>
          <Field label="Total capacity (beds)">
            {(id) => <Input id={id} type="number" min={1} value={form.capacity} onChange={set("capacity")} required />}
          </Field>
        </div>

        <Field label="Tagline">
          {(id) => <Input id={id} value={form.tagline} onChange={set("tagline")} placeholder="A short, evocative line." required />}
        </Field>

        <Field label="Description">
          {(id) => <Textarea id={id} value={form.desc} onChange={set("desc")} placeholder="What the week is like." required />}
        </Field>

        <Field label="Status">
          {(id) => (
            <Select
              id={id}
              value={form.published ? "pub" : "draft"}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.value === "pub" }))}
            >
              <option value="draft">Draft (hidden)</option>
              <option value="pub">Published (live)</option>
            </Select>
          )}
        </Field>

        {error && <p className="text-sm font-medium text-coral-600">{error}</p>}

        <div className="mt-2 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving || !form.name.trim()}>
            {saving ? "Saving…" : editing ? "Save changes" : "Create event"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
