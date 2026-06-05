import type { SVGProps } from "react";

// Decorative Thai sun-ray lines — a thin radial burst used as an accent.
export function SunMotif(props: SVGProps<SVGSVGElement>) {
  const rays = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="50" cy="50" r="14" />
      {rays.map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="26"
          x2="50"
          y2="18"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
    </svg>
  );
}
