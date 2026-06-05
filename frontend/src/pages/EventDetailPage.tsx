import { useParams } from "react-router-dom";
import { Placeholder } from "./_Placeholder";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <Placeholder hero eyebrow="Retreat" title="Event detail">
      Full detail + booking sidebar for event <code className="text-gold-400">{id}</code> arrives
      in the events and booking slices.
    </Placeholder>
  );
}
