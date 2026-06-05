import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

// Public site chrome: Nav + page + Footer.
export function AppLayout() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-dvh flex-col">
      <Nav />
      {/* key remounts main on navigation so the fade-in re-triggers */}
      <main key={pathname} className="fade-in flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
