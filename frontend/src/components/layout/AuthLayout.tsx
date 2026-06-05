import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "../../lib/constants";
import { KarstScene } from "../icons/KarstScene";
import { SunMotif } from "../icons/SunMotif";
import { Logo } from "./Logo";

// Split screen: scenery on the left (hidden on small screens), form on the right.
export function AuthLayout() {
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden overflow-hidden lg:flex">
        <KarstScene className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-jade-900/45" />
        <div className="relative mt-auto p-13 text-white">
          <SunMotif className="mb-5 h-20 w-20 text-gold-400/85" />
          <h2 className="max-w-[380px] font-display text-4xl text-white">
            Seven days. One villa. A room full of builders.
          </h2>
          <p className="mt-3.5 max-w-[360px] text-white/85">
            Your account lets you book retreats, manage your stay, and see who
            else is coming.
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex flex-col items-center justify-center px-7 py-12">
        <div className="mb-8 self-start lg:hidden">
          <Link to={ROUTES.home}>
            <Logo />
          </Link>
        </div>
        <div className="slide-up w-full max-w-[420px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
