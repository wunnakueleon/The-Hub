import type { SVGProps } from "react";

// Section divider wave. Set the `color` prop (or text color) to tint it.
export function WaveDivider({
  flip = false,
  ...props
}: SVGProps<SVGSVGElement> & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      fill="currentColor"
      aria-hidden="true"
      style={flip ? { transform: "rotate(180deg)" } : undefined}
      {...props}
    >
      <path d="M0 40c150 30 300 30 450 12s300-42 450-30 200 34 300 28v30H0Z" />
    </svg>
  );
}
