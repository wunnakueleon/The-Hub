import type { ReactNode } from "react";
import { cn } from "../lib/cn";

interface PlaceholderProps {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  /** Render a dark jade hero band (for routes the nav treats as hero routes). */
  hero?: boolean;
}

// Temporary scaffold page. Each feature step replaces these with real content.
export function Placeholder({ eyebrow, title, children, hero }: PlaceholderProps) {
  return (
    <>
      {hero && (
        <div className="bg-jade-900 py-20 text-center">
          <div className="site-container">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-4xl text-white sm:text-5xl">{title}</h1>
          </div>
        </div>
      )}

      <div className={cn("site-container", hero ? "py-16" : "py-20")}>
        {!hero && (
          <>
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-4xl text-jade-900">{title}</h1>
          </>
        )}
        <p className="mt-4 max-w-xl text-ink-500">
          {children ?? "This page is part of the scaffold — its real content lands in a later step."}
        </p>
      </div>
    </>
  );
}
