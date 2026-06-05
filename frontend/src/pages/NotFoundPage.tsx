import { Link } from "react-router-dom";
import { ROUTES } from "../lib/constants";
import { Button } from "../components/ui";

export default function NotFoundPage() {
  return (
    <div className="site-container flex flex-col items-center py-28 text-center">
      <p className="font-display text-7xl text-jade-900">404</p>
      <h1 className="mt-2 font-display text-3xl text-jade-900">Page not found</h1>
      <p className="mt-3 max-w-md text-ink-500">
        That island drifted off the map. Let's get you back to dry land.
      </p>
      <Link to={ROUTES.home} className="mt-8">
        <Button>Back home</Button>
      </Link>
    </div>
  );
}
