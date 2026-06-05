import { useState } from "react";
import type { RegistrationRow, RegistrationStatus } from "../types";
import type { BookingStatus } from "../../../types";
import { cn } from "../../../lib/cn";
import { Avatar, StatusBadge } from "../../../components/ui";

interface RegistrationsTableProps {
  registrations: RegistrationRow[];
  onSetStatus: (id: string, status: RegistrationStatus) => void;
}

const FILTERS = ["all", "confirmed", "pending", "waitlisted", "cancelled"] as const;
type Filter = (typeof FILTERS)[number];

const TH = "px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.05em] text-ink-400";
const TD = "px-4 py-3 align-middle";

const ACTIONS: { status: RegistrationStatus; label: string; cls: string }[] = [
  { status: "confirmed", label: "Confirm", cls: "bg-jade-100 text-jade-700" },
  { status: "waitlisted", label: "Waitlist", cls: "bg-coral-200 text-coral-600" },
  { status: "cancelled", label: "Cancel", cls: "bg-sand-200 text-ink-500" },
];

export function RegistrationsTable({ registrations, onSetStatus }: RegistrationsTableProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = registrations.reduce<Record<string, number>>((m, r) => {
    m[r.status] = (m[r.status] ?? 0) + 1;
    return m;
  }, {});

  const filtered = filter === "all" ? registrations : registrations.filter((r) => r.status === filter);

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-pill border px-3.5 py-1.5 text-sm font-semibold capitalize transition-colors",
              filter === f
                ? "border-jade-700 bg-jade-700 text-white"
                : "border-sand-300 bg-white text-ink-700 hover:bg-sand-100",
            )}
          >
            {f === "all" ? "All" : f}{" "}
            <span className="opacity-70">{f === "all" ? registrations.length : counts[f] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="overflow-auto rounded-lg border border-sand-200 bg-white shadow-sm">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="bg-sand-100">
              {["Developer", "Room", "Dietary", "Notes", "Status", "Actions"].map((h) => (
                <th key={h} className={TH}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-sand-200">
                <td className={TD}>
                  <div className="flex items-center gap-3">
                    <Avatar name={r.name} hue={r.hue} size={36} />
                    <div className="min-w-0">
                      <div className="font-semibold text-jade-900">{r.name}</div>
                      <div className="text-xs text-ink-400">{r.email}</div>
                    </div>
                  </div>
                </td>
                <td className={cn(TD, "text-sm text-ink-700")}>{r.roomName}</td>
                <td className={cn(TD, "text-sm text-ink-500")}>{r.diet}</td>
                <td className={cn(TD, "max-w-[180px] text-sm text-ink-400")}>{r.notes || "—"}</td>
                <td className={TD}>
                  <StatusBadge status={r.status as BookingStatus} />
                </td>
                <td className={cn(TD, "whitespace-nowrap")}>
                  <div className="flex gap-1.5">
                    {ACTIONS.filter((a) => a.status !== r.status).map((a) => (
                      <button
                        key={a.status}
                        type="button"
                        onClick={() => onSetStatus(r.id, a.status)}
                        className={cn("rounded-md px-2.5 py-1.5 text-xs font-semibold", a.cls)}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className={cn(TD, "text-sm text-ink-400")} colSpan={6}>
                  No registrations in this view.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
