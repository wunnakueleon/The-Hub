import { cn } from "../../lib/cn";
import { Avatar } from "./Avatar";

export interface AvatarStackPerson {
  name: string;
  hue?: number;
}

export interface AvatarStackProps {
  people: AvatarStackPerson[];
  max?: number;
  size?: number;
  className?: string;
}

export function AvatarStack({ people, max = 5, size = 36, className }: AvatarStackProps) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;

  return (
    <div className={cn("flex items-center", className)}>
      {shown.map((p, i) => (
        <span
          key={i}
          className="rounded-full ring-2 ring-white"
          style={{ marginLeft: i === 0 ? 0 : -size * 0.3 }}
        >
          <Avatar name={p.name} hue={p.hue} size={size} />
        </span>
      ))}
      {extra > 0 && (
        <span
          className="inline-flex items-center justify-center rounded-full bg-sand-300 font-medium text-ink-700 ring-2 ring-white"
          style={{
            width: size,
            height: size,
            fontSize: size * 0.36,
            marginLeft: -size * 0.3,
          }}
        >
          +{extra}
        </span>
      )}
    </div>
  );
}
