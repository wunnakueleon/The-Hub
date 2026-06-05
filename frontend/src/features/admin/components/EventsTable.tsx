import { Link } from "react-router-dom";
import type { AdminEventRow } from "../types";
import { cn } from "../../../lib/cn";
import { formatDateRange } from "../../../lib/format";
import { ROUTES } from "../../../lib/constants";
import { CapacityBar } from "../../../components/ui";
import { Icon } from "../../../components/icons/Icon";

interface EventsTableProps {
  events: AdminEventRow[];
  onEdit: (event: AdminEventRow) => void;
  onDelete: (event: AdminEventRow) => void;
  onTogglePublish: (event: AdminEventRow) => void;
}

const TH = "px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.06em] text-ink-400";
const TD = "px-4 py-3.5 align-middle";

export function EventsTable({ events, onEdit, onDelete, onTogglePublish }: EventsTableProps) {
  return (
    <div className="overflow-auto rounded-lg border border-sand-200 bg-white shadow-sm">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="bg-sand-100">
            <th className={TH}>Event</th>
            <th className={TH}>Dates</th>
            <th className={TH}>Capacity</th>
            <th className={TH}>Status</th>
            <th className={TH} />
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id} className="border-t border-sand-200">
              <td className={TD}>
                <div className="font-semibold text-jade-900">{e.name}</div>
                <div className="text-xs text-ink-400">{e.island}</div>
              </td>
              <td className={cn(TD, "whitespace-nowrap text-sm text-ink-500")}>
                {formatDateRange(e.startDate, e.endDate)}
              </td>
              <td className={cn(TD, "min-w-[160px]")}>
                <div className="mb-1.5 text-xs text-ink-500">
                  {e.booked}/{e.capacity}
                </div>
                <CapacityBar capacity={e.capacity} booked={e.booked} className="[&>p]:hidden" />
              </td>
              <td className={TD}>
                <button
                  type="button"
                  onClick={() => onTogglePublish(e)}
                  title="Toggle publish"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-medium",
                    e.published ? "bg-jade-100 text-jade-700" : "bg-sand-200 text-ink-500",
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {e.published ? "Published" : "Draft"}
                </button>
              </td>
              <td className={cn(TD, "whitespace-nowrap text-right")}>
                <div className="inline-flex gap-1.5">
                  <Link
                    to={ROUTES.adminEventRegs(e.id)}
                    title="Registrations"
                    className="rounded-md bg-sand-200 p-2 text-ink-700 hover:bg-sand-300"
                  >
                    <Icon name="users" size={16} />
                  </Link>
                  <button
                    type="button"
                    title="Edit"
                    onClick={() => onEdit(e)}
                    className="rounded-md bg-sand-200 p-2 text-ink-700 hover:bg-sand-300"
                  >
                    <Icon name="edit" size={16} />
                  </button>
                  <button
                    type="button"
                    title="Delete"
                    onClick={() => onDelete(e)}
                    className="rounded-md bg-sand-200 p-2 text-coral-600 hover:bg-coral-200"
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
