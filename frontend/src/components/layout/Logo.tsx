import { cn } from "../../lib/cn";
import { HavenLogo } from "../icons/HavenLogo";

export interface LogoProps {
  light?: boolean;
  size?: number;
  className?: string;
}

// Brand lockup: a rounded tile holding the shelter mark + "The Hub" wordmark.
export function Logo({ light = false, size = 22, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid place-items-center rounded-[11px]",
          light ? "bg-white/15" : "bg-jade-700 shadow-sm",
        )}
        style={{ width: size + 12, height: size + 12 }}
      >
        <HavenLogo
          size={size - 2}
          className={light ? "text-white" : "text-gold-400"}
        />
      </span>
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
