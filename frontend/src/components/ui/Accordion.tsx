import { useState } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icons/Icon";

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={cn("divide-y divide-sand-200 rounded-lg border border-sand-200 bg-white", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-medium text-jade-900">{item.question}</span>
              <span
                className={cn(
                  "shrink-0 text-ink-400 transition-transform",
                  isOpen && "rotate-180",
                )}
              >
                <Icon name="chevron-down" size={20} />
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-ink-500">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
