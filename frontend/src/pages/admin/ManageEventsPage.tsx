import { useState } from "react";
import { AdminHeader } from "../../features/admin/components/AdminHeader";
import { EventsTable } from "../../features/admin/components/EventsTable";
import { EventForm } from "../../features/admin/components/EventForm";
import { useAdminEvents } from "../../features/admin/hooks/useAdminEvents";
import { createEvent, updateEvent, deleteEvent } from "../../features/admin/api";
import type { AdminEventRow, EventInput } from "../../features/admin/types";
import { isApiClientError } from "../../lib/api-client";
import { Button, Modal } from "../../components/ui";
import { Icon } from "../../components/icons/Icon";

export default function ManageEventsPage() {
  const { events, loading, error, refetch } = useAdminEvents();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminEventRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [deleting, setDeleting] = useState<AdminEventRow | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  function openNew() {
    setEditing(null);
    setFormError(null);
    setFormOpen(true);
  }
  function openEdit(e: AdminEventRow) {
    setEditing(e);
    setFormError(null);
    setFormOpen(true);
  }

  async function onSubmit(input: EventInput) {
    setSaving(true);
    setFormError(null);
    try {
      if (editing) await updateEvent(editing.id, input);
      else await createEvent(input);
      await refetch();
      setFormOpen(false);
    } catch (err) {
      setFormError(isApiClientError(err) ? err.message : "Couldn't save the event.");
    } finally {
      setSaving(false);
    }
  }

  async function onTogglePublish(e: AdminEventRow) {
    await updateEvent(e.id, { published: !e.published });
    await refetch();
  }

  async function confirmDelete() {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await deleteEvent(deleting.id);
      await refetch();
      setDeleting(null);
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <>
      <AdminHeader
        title="Manage events"
        sub="Create, edit, publish and archive retreats."
        action={
          <Button onClick={openNew}>
            <Icon name="plus" size={17} /> New event
          </Button>
        }
      />

      {loading && <p className="text-ink-500">Loading events…</p>}
      {error && <p className="text-coral-600">{error}</p>}
      {!loading && !error && (
        <EventsTable
          events={events}
          onEdit={openEdit}
          onDelete={setDeleting}
          onTogglePublish={onTogglePublish}
        />
      )}

      <EventForm
        open={formOpen}
        editing={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={onSubmit}
        saving={saving}
        error={formError}
      />

      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete event?" size="sm">
        {deleting && (
          <>
            <p className="text-sm leading-relaxed text-ink-500">
              <b className="text-jade-900">{deleting.name}</b> and its registrations will be
              removed. This can't be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleting(null)} disabled={deleteLoading}>
                Keep
              </Button>
              <Button
                className="bg-coral-500 text-white hover:bg-coral-600"
                onClick={confirmDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
