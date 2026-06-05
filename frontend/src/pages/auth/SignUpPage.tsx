import { Link } from "react-router-dom";
import { ROUTES } from "../../lib/constants";
import { SignUpForm } from "../../features/auth/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div>
      <h1 className="font-display text-4xl text-jade-900">Claim your spot</h1>
      <p className="mb-7 mt-2.5 text-sm text-ink-500">
        A few details and you're in. No payment required.
      </p>

      <SignUpForm />

      <p className="mt-6 text-center text-sm text-ink-500">
        Already have an account?{" "}
        <Link to={ROUTES.login} className="font-bold text-jade-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}
