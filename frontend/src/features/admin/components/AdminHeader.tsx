import type { ReactNode } from "react";

export function AdminHeader({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
      <div>
        <h1 className="font-display text-4xl text-jade-900">{title}</h1>
        {sub && <p className="mt-2 text-ink-500">{sub}</p>}
      </div>
      {action}
    </div>
  );
}
