import { cn } from "../../lib/cn";

export interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl text-jade-900 sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className={cn("max-w-2xl text-ink-500", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
