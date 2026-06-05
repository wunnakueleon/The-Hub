import type { SVGProps } from "react";

// Thai-island hero illustration — solid fills only (no gradients), so it
// stays crisp at any size and matches the flat design language.
export function KarstScene(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 800 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      {...props}
    >
      {/* Sky */}
      <rect width="800" height="450" fill="#dae8f5" />

      {/* Sun */}
      <circle cx="640" cy="110" r="46" fill="#f2dca6" />
      <circle cx="640" cy="110" r="30" fill="#e8b860" />

      {/* Far karst islands */}
      <path d="M0 250c40-70 70-120 120-120s70 60 90 120Z" fill="#8bb8db" />
      <path d="M540 260c30-90 60-130 110-130s80 70 100 130Z" fill="#8bb8db" />

      {/* Mid karst */}
      <path d="M150 270c30-110 70-160 120-160s90 80 110 160Z" fill="#2766a8" />
      <path d="M430 275c25-120 60-150 100-150s75 60 95 150Z" fill="#1b4f82" />

      {/* Sea */}
      <rect y="270" width="800" height="180" fill="#3a80c4" />
      <path d="M0 300c80 0 80 16 160 16s80-16 160-16 80 16 160 16 80-16 160-16 80 16 160 16v134H0Z" fill="#2766a8" />
      <path d="M0 340c80 0 80 14 160 14s80-14 160-14 80 14 160 14 80-14 160-14 80 14 160 14v92H0Z" fill="#1b4f82" />

      {/* Beach */}
      <path d="M0 410c120-20 240-20 400-10s280 10 400-6v56H0Z" fill="#f2e9d6" />

      {/* Palm */}
      <path d="M120 410c-4-40-2-70 6-104" stroke="#2a3a34" strokeWidth="6" strokeLinecap="round" />
      <path d="M126 306c-26-10-44-6-60 6 22 2 36 10 60 16Z" fill="#1b4f82" />
      <path d="M126 306c24-14 44-14 64-4-20 8-34 18-64 24Z" fill="#2766a8" />
      <path d="M126 306c-8-26-4-46 8-64-2 24 0 40 4 70Z" fill="#1b4f82" />
    </svg>
  );
}
