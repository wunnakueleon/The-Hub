import { Icon } from "../../../components/icons/Icon";

export function IncludedList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-7 gap-y-3.5 sm:grid-cols-2">
      {items.map((text, i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] leading-snug text-ink-700">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-jade-100 text-jade-700">
            <Icon name="check" size={15} strokeWidth={2.4} />
          </span>
          {text}
        </li>
      ))}
    </ul>
  );
}
