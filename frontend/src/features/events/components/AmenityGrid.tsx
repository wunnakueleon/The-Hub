import type { Amenity } from "../../../types";
import { Icon, type IconName } from "../../../components/icons/Icon";

export function AmenityGrid({ amenities }: { amenities: Amenity[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {amenities.map((a, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-md border border-sand-200 bg-sand-50 px-4 py-3"
        >
          <span className="grid h-9.5 w-9.5 shrink-0 place-items-center rounded-[10px] bg-jade-100 text-jade-700">
            <Icon name={a.icon as IconName} size={20} />
          </span>
          <span className="text-sm font-medium text-ink-700">{a.label}</span>
        </div>
      ))}
    </div>
  );
}
