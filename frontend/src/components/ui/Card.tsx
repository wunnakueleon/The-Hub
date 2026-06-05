import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-white shadow-md border border-sand-200/60",
        hover && "transition-shadow hover:shadow-lg",
        className,
      )}
      {...props}
    />
  );
}
