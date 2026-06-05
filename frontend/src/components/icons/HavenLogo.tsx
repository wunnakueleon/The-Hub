import type { SVGProps } from "react";

// Brand mark: a shelter roof framed by code brackets — "a home for devs".
export function HavenLogo({ size = 32, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* Shelter roof */}
      <path d="M6 15 16 7l10 8" />
      <path d="M9 14v9h14v-9" />
      {/* Code brackets */}
      <path d="M13 18l-2 2 2 2" />
      <path d="M19 18l2 2-2 2" />
    </svg>
  );
}
