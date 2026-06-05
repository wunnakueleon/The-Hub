import { Link } from "react-router-dom";
import { ROUTES } from "../../lib/constants";
import { Logo } from "./Logo";
import { SunMotif } from "../icons/SunMotif";

export function Footer() {
  return (
    <footer className="relative bg-jade-900 text-white/70">
      <div className="site-container grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-[280px] text-sm leading-relaxed">
            Seasonal developer retreats in a villa by the sea, on the islands of
            southern Thailand.
          </p>
          <div className="mt-5">
            <SunMotif className="h-16 w-16 text-gold-400/55" />
          </div>
        </div>

        <div>
          <h4 className="mb-3.5 text-lg text-white">Explore</h4>
          <div className="grid gap-2.5 text-sm">
            <Link to={ROUTES.events} className="text-left transition-colors hover:text-gold-400">
              Retreats
            </Link>
            <Link to={ROUTES.about} className="text-left transition-colors hover:text-gold-400">
              How it works
            </Link>
            <Link to={ROUTES.signup} className="text-left transition-colors hover:text-gold-400">
              Sign up
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-3.5 text-lg text-white">The fine print</h4>
          <div className="grid gap-2.5 text-sm">
            <span>Free cancellation · 30 days</span>
            <span>No payment due today</span>
            <span>hello@thehub.travel</span>
          </div>
        </div>
      </div>

      <div className="site-container flex flex-wrap justify-between gap-2.5 border-t border-white/10 py-5 text-[13px] text-white/50">
        <span>© 2026 The Hub Retreats — a design prototype.</span>
        <span>Made on an island, probably.</span>
      </div>
    </footer>
  );
}
