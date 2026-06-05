import { useParams } from "react-router-dom";

export default function RegistrationsPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1 className="font-display text-4xl text-jade-900">Registrations</h1>
      <p className="mt-2 text-ink-500">
        Attendees for event <code className="text-jade-700">{id}</code>.
      </p>
      <p className="mt-6 max-w-xl text-sm text-ink-400">
        The attendee table (confirm / waitlist / cancel) arrives in the admin slice (Step 12).
      </p>
    </div>
  );
}
