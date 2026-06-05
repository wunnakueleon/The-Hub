import { Link, NavLink, Outlet } from "react-router-dom";
import { cn } from "../../lib/cn";
import { ROUTES } from "../../lib/constants";
import { Icon, type IconName } from "../icons/Icon";

interface NavItem {
  to: string;
  label: string;
  icon: IconName;
  end?: boolean;
}

// Registrations are reached per-event (/admin/events/:id), so the sidebar
// mirrors the production route map: Dashboard, Manage events, Users.
const ADMIN_NAV: NavItem[] = [
  { to: ROUTES.admin, label: "Dashboard", icon: "gauge", end: true },
  { to: ROUTES.adminEvents, label: "Manage events", icon: "calendar" },
  { to: ROUTES.adminUsers, label: "Users", icon: "users" },
];

export function AdminLayout() {
  return (
    <div className="grid min-h-dvh grid-cols-1 md:grid-cols-[248px_1fr]">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-dvh flex-col bg-jade-900 px-4.5 py-7 md:flex">
        <div className="flex items-center gap-2.5 px-2.5 pb-5 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
          <Icon name="shield" size={16} className="text-gold-400" /> Admin
        </div>

        <nav className="grid gap-1">
          {ADMIN_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-[11px] px-3.5 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-white/12 font-semibold text-white"
                    : "font-medium text-white/70 hover:bg-white/5 hover:text-white",
                  "[&_svg]:text-white/60",
                  isActive && "[&_svg]:text-gold-400",
                )
              }
            >
              <Icon name={item.icon} size={18} /> {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto">
          <Link
            to={ROUTES.home}
            className="flex items-center gap-2.5 rounded-[11px] border border-white/15 px-3.5 py-2.5 text-[13px] text-white/75 transition-colors hover:bg-white/5"
          >
            <Icon name="arrow-left" size={16} /> Back to site
          </Link>
        </div>
      </aside>

      {/* Mobile admin bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto bg-jade-900 px-4 py-3 md:hidden">
        {ADMIN_NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex shrink-0 items-center gap-2 rounded-pill px-3 py-1.5 text-sm",
                isActive ? "bg-white/15 text-white" : "text-white/70",
              )
            }
          >
            <Icon name={item.icon} size={16} /> {item.label}
          </NavLink>
        ))}
      </div>

      <main className="max-w-[1080px] px-6 py-8 pb-20 md:px-10 md:py-10">
        <Outlet />
      </main>
    </div>
  );
}
