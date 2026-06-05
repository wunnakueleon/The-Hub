import { cn } from "../../lib/cn";

export interface LogoProps {
  light?: boolean;
  size?: number;
  className?: string;
}

// Brand lockup: the haven mark (public/haven-logo.png) + "The Hub" wordmark.
export function Logo({ light = false, size = 22, className }: LogoProps) {
  const tile = size + 12;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src="/haven-logo.png"
        alt=""
        width={tile}
        height={tile}
        className="rounded-[11px]"
        style={{ width: tile, height: tile }}
      />
      <span
        className={cn(
          "font-display font-semibold leading-none tracking-tight",
          light ? "text-white" : "text-jade-900",
        )}
        style={{ fontSize: size + 4 }}
      >
        The Hub
      </span>
    </span>
  );
}
