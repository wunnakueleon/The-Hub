import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Icon } from "../../../components/icons/Icon";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
        <Icon name="lock" size={18} />
      </span>
      <input
        type={show ? "text" : "password"}
        className="h-11 w-full rounded-md border border-sand-300 bg-white pl-10 pr-11 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-jade-500"
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-ink-400 hover:text-ink-700"
      >
        <Icon name={show ? "eye-off" : "eye"} size={18} />
      </button>
    </div>
  );
}
