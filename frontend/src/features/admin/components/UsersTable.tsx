import { useState } from "react";
import type { AdminUserRow } from "../types";
import { cn } from "../../../lib/cn";
import { formatDate } from "../../../lib/format";
import { Avatar, Badge, Input } from "../../../components/ui";

const TH = "px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.05em] text-ink-400";
const TD = "px-4 py-3.5 align-middle";

export function UsersTable({ users }: { users: AdminUserRow[] }) {
  const [q, setQ] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(q.toLowerCase()) ||
      u.email.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-5 max-w-[280px]">
        <Input icon="search" placeholder="Search name or email" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="overflow-auto rounded-lg border border-sand-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="bg-sand-100">
              {["Developer", "Email", "Joined", "Events booked", "Role"].map((h) => (
                <th key={h} className={TH}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t border-sand-200">
                <td className={TD}>
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} hue={u.hue} size={36} />
                    <span className="font-semibold text-jade-900">{u.name}</span>
                  </div>
                </td>
                <td className={cn(TD, "text-sm text-ink-500")}>{u.email}</td>
                <td className={cn(TD, "text-sm text-ink-500")}>{formatDate(u.joined)}</td>
                <td className={cn(TD, "text-sm font-semibold text-jade-900")}>{u.events}</td>
                <td className={TD}>
                  <Badge tone={u.role === "admin" ? "gold" : "neutral"}>{u.role}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
