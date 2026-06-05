import { useParams, useNavigate } from "react-router-dom";
import { AdminHeader } from "../../features/admin/components/AdminHeader";
import { RegistrationsTable } from "../../features/admin/components/RegistrationsTable";
import { useAdminEvents } from "../../features/admin/hooks/useAdminEvents";
import { useRegistrations } from "../../features/admin/hooks/useRegistrations";
import { ROUTES } from "../../lib/constants";
import { formatDateRange } from "../../lib/format";
import { Select } from "../../components/ui";

export default function RegistrationsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events } = useAdminEvents();
  const { registrations, loading, error, setStatus } = useRegistrations(id);

  const current = events.find((e) => e.id === id);

  return (
    <>
      <AdminHeader
        title="Registrations"
        sub={current ? `${current.name} · ${formatDateRange(current.startDate, current.endDate)}` : undefined}
        action={
          <div className="w-[280px]">
            <Select
              value={id ?? ""}
              onChange={(e) => navigate(ROUTES.adminEventRegs(e.target.value))}
            >
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </Select>
          </div>
        }
      />

      {loading && <p className="text-ink-500">Loading registrations…</p>}
      {error && <p className="text-coral-600">{error}</p>}
      {!loading && !error && (
        <RegistrationsTable registrations={registrations} onSetStatus={setStatus} />
      )}
    </>
  );
}
