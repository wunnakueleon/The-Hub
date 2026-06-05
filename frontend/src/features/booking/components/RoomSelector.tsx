import type { Room } from "../../../types";
import { cn } from "../../../lib/cn";
import { baht } from "../../../lib/format";
import { Icon } from "../../../components/icons/Icon";

interface RoomSelectorProps {
  rooms: Room[];
  value: string | null;
  onChange: (roomId: string) => void;
}

export function RoomSelector({ rooms, value, onChange }: RoomSelectorProps) {
  return (
    <div className="grid gap-3" role="radiogroup" aria-label="Choose your room">
      {rooms.map((room) => {
        const selected = value === room.id;
        return (
          <button
            key={room.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(room.id)}
            className={cn(
              "flex items-center gap-4 rounded-md border-2 p-4 text-left transition-colors",
              selected
                ? "border-jade-600 bg-jade-100/50"
                : "border-sand-300 bg-white hover:border-sand-400",
            )}
          >
            <span
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-[12px]",
                selected ? "bg-jade-700 text-white" : "bg-sand-200 text-jade-700",
              )}
            >
              <Icon name="bed" size={22} />
            </span>

            <div className="min-w-0 flex-1">
              <div className="text-base font-bold text-jade-900">{room.name}</div>
              <p className="mt-0.5 text-sm text-ink-500">{room.desc}</p>
            </div>

            <div className="shrink-0 text-right">
              <div className="font-display text-xl font-semibold text-jade-900">
                {baht(room.price)}
              </div>
              <div className="text-xs text-ink-400">/ week</div>
            </div>

            <span
              className={cn(
                "grid h-5.5 w-5.5 shrink-0 place-items-center rounded-full border-2",
                selected ? "border-jade-600 bg-jade-600" : "border-sand-400",
              )}
            >
              {selected && <Icon name="check" size={13} strokeWidth={3} className="text-white" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
