import type { FAQItem } from "../../../types";
import { Accordion } from "../../../components/ui";

export function EventFAQ({ faq }: { faq: FAQItem[] }) {
  return <Accordion items={faq} />;
}
