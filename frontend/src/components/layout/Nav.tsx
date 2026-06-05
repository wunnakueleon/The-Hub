import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../lib/cn";
import { ROUTES } from "../../lib/constants";
import { Icon } from "../icons/Icon";
import { Avatar } from "../ui/Avatar";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { Logo } from "./Logo";

// Routes that open with a dark hero — the nav sits as a solid jade bar there
// until the user scrolls, then turns into the light surface bar.
function isHeroRoute(pathname: string): boolean {
  return (
    pathname === ROUTES.home ||
    pathname === ROUTES.events ||
    /^\/events\/[^/]+$/.test(pathname)
  );
}

interface NavItem {
  to: string;
  label: string;
}

const PUBLIC_LINKS: NavItem[] = [
  { to: ROUTES.events, label: "Retreats" },
  { to: ROUTES.about, label: "How it works" },
];

export function Nav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthed, user, role, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const dark = isHeroRoute(pathname) && !scrolled;

  const links = [...PUBLIC_LINKS];
  if (isAuthed) links.push({ to: ROUTES.myBookings, label: "My bookings" });

  function handleLogout() {
    logout();
    setMenuOpen(false);
    setMobileOpen(false);
    navigate(ROUTES.home);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 backdrop-blur-md transition-colors",
        dark ? "bg-jade-900 border-b border-transparent" : "bg-sand-50/90 border-b border-sand-300",
        scrolled && !dark && "shadow-sm",
      )}
    >
      <div className="site-container flex h-[70px] items-center justify-between gap-5">
        <Link to={ROUTES.home} aria-label="The Hub — home">
          <Logo light={dark} />
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "relative text-sm font-medium transition-colors",
                  dark ? "text-white/90 hover:text-white" : "text-ink-700 hover:text-jade-700",
                  isActive &&
                    "after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:rounded after:bg-gold-500",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          {role === "admin" && (
            <NavLink
              to={ROUTES.admin}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 text-sm font-medium transition-colors",
                  dark ? "text-white/90 hover:text-white" : "text-ink-700 hover:text-jade-700",
                  isActive && "text-jade-800",
                )
              }
            >
              <Icon name="shield" size={15} /> Admin
            </NavLink>
          )}
        </nav>

        {/* Desktop right side */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthed && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className={cn(
                  "flex items-center gap-2.5 rounded-pill border py-1.5 pl-1.5 pr-3 transition-colors",
                  dark
                    ? "border-white/25 bg-white/15 text-white"
                    : "border-sand-300 bg-sand-100 text-jade-900",
                )}
              >
                <Avatar name={user.name} hue={user.hue} size={30} />
                <span className="text-sm font-semibold">{user.name.split(" ")[0]}</span>
                <Icon name="chevron-down" size={15} />
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-58 rounded-lg border border-sand-200 bg-white p-2 shadow-lg">
                    <Link to={ROUTES.profile} className="flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-sand-100">
                      <Icon name="user" size={18} /> Profile
                    </Link>
                    <Link to={ROUTES.myBookings} className="flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-sand-100">
                      <Icon name="ticket" size={18} /> My bookings
                    </Link>
                    <div className="my-1.5 border-t border-sand-200" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-sm font-medium text-coral-600 hover:bg-sand-100"
                    >
                      <Icon name="log-out" size={18} /> Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                to={ROUTES.login}
                className={cn(
                  "rounded-pill px-4 py-2 text-sm font-semibold transition-colors",
                  dark ? "text-white hover:bg-white/10" : "text-jade-800 hover:bg-sand-100",
                )}
              >
                Sign in
              </Link>
              <Link
                to={ROUTES.signup}
                className="rounded-pill bg-gold-500 px-4 py-2 text-sm font-semibold text-jade-900 shadow-sm transition-colors hover:bg-gold-400"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className={cn("md:hidden", dark ? "text-white" : "text-jade-900")}
        >
          <Icon name={mobileOpen ? "x" : "menu"} size={26} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mx-3 mb-3 grid gap-1 rounded-lg bg-white p-2.5 shadow-lg md:hidden">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="rounded-[10px] px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-sand-100">
              {link.label}
            </Link>
          ))}
          {role === "admin" && (
            <Link to={ROUTES.admin} className="flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-sand-100">
              <Icon name="shield" size={18} /> Admin
            </Link>
          )}
          <div className="my-1 border-t border-sand-200" />
          {isAuthed ? (
            <>
              <Link to={ROUTES.profile} className="flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-sand-100">
                <Icon name="user" size={18} /> Profile
              </Link>
              <button type="button" onClick={handleLogout} className="flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-sm font-medium text-coral-600 hover:bg-sand-100">
                <Icon name="log-out" size={18} /> Sign out
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.login} className="rounded-[10px] px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-sand-100">
                Sign in
              </Link>
              <Link to={ROUTES.signup} className="m-1 rounded-pill bg-gold-500 px-4 py-2.5 text-center text-sm font-semibold text-jade-900">
                Get started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
